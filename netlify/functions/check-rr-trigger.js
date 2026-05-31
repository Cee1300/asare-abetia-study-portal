// netlify/functions/check-rr-trigger.js
// Called after every auto-mark completes
// Checks if student has hit a 5-session milestone and generates R&R pack automatically
// Triggered from DayPackPage after autoMark completes

import admin from 'firebase-admin'

let adminInitialised = false
function getDb() {
  if (!adminInitialised) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
    })
    adminInitialised = true
  }
  return admin.firestore()
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
  const SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT

  if (!CLAUDE_API_KEY || !SERVICE_ACCOUNT) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing config' }) }
  }

  let body
  try { body = JSON.parse(event.body) }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) } }

  const { studentId, level } = body
  if (!studentId) return { statusCode: 400, body: JSON.stringify({ error: 'Missing studentId' }) }

  const db = getDb()

  try {
    // Get all marked submissions for this student (regular days only, not recaps/quizzes)
    const subsSnap = await db.collection('submissions')
      .where('studentId', '==', studentId)
      .where('status', '==', 'marked')
      .get()

    const markedSubs = []
    subsSnap.forEach(d => {
      const data = d.data()
      // Only count regular day sessions
      if (typeof data.dayNum === 'number') {
        markedSubs.push(data)
      }
    })

    const markedCount = markedSubs.length

    // R&R triggers at every 5th session: 5, 10, 15, 20
    if (markedCount % 5 !== 0 || markedCount === 0) {
      return { statusCode: 200, body: JSON.stringify({ triggered: false, markedCount }) }
    }

    const recapNum = markedCount / 5

    // Check if this R&R already exists
    const existing = await db.collection('packs').doc(`${studentId}_recap${recapNum}`).get()
    if (existing.exists) {
      return { statusCode: 200, body: JSON.stringify({ triggered: false, reason: 'Already exists', recapNum }) }
    }

    // Find weak areas from the last 5 sessions
    const lastFive = markedSubs
      .sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0))
      .slice(0, 5)

    const weakAreas = []
    for (const sub of lastFive) {
      if (!sub.markedAnswers) continue
      for (const [qIdx, ma] of Object.entries(sub.markedAnswers)) {
        if ((ma.marks || 0) < 1) {
          weakAreas.push({
            dayNum: sub.dayNum,
            subject: sub.subject,
            topic: sub.topic,
            qNum: Number(qIdx) + 1,
            correctAnswer: ma.correctAnswer || '',
            feedback: ma.feedback || '',
          })
        }
      }
    }

    if (weakAreas.length === 0) {
      return { statusCode: 200, body: JSON.stringify({ triggered: false, reason: 'No weak areas found' }) }
    }

    // Build R&R pack using Claude
    const subjectGroups = {}
    weakAreas.forEach(w => {
      if (!subjectGroups[w.subject]) subjectGroups[w.subject] = []
      subjectGroups[w.subject].push(w)
    })

    const weakSummary = Object.entries(subjectGroups).map(([subj, items]) =>
      `${subj}: ${items.slice(0, 3).map(i => `Day ${i.dayNum} Q${i.qNum} (${i.topic})`).join(', ')}`
    ).join('\n')

    const prompt = `You are building a Recap & Repair (R&R) session for a ${level} student at a Ghanaian school.

The student's weak areas from their last 5 sessions:
${weakSummary}

Generate exactly 9 questions (3 per subject: Mathematics, Science, English) targeting these weak areas.
Return ONLY valid JSON with no preamble:
{
  "questions": [
    { "subject": "Mathematics", "q": "[MATHS] Q1. [question text]", "a": "[answer]", "hint": "[brief hint]" },
    ...
  ],
  "intro": "One encouraging sentence for the student about this R&R session."
}

Rules:
- Questions must directly target the identified weak areas
- Use ${level} level language appropriate for Ghana (GES/NaCCA curriculum)
- Include [MATHS], [SCIENCE], or [ENGLISH] prefix on each question
- Ghanaian context in examples (cedis, local names, familiar objects)
- British English`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text || ''
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(clean)

    // Save R&R pack to Firestore
    const dayRange = `Days ${markedCount - 4}–${markedCount}`
    const packData = {
      studentId,
      dayNum: `recap${recapNum}`,
      subject: 'All',
      topic: `Recap & Repair Session ${recapNum} — ${dayRange} weaknesses`,
      isRecap: true,
      recapNum,
      autoGenerated: true,
      objectives: [
        `Correct weak areas from ${dayRange}`,
        ...Object.keys(subjectGroups).map(s => `Strengthen ${s}`),
      ],
      concepts: [{
        heading: `Recap & Repair Session ${recapNum}`,
        body: result.intro + `\n\nThis session covers your weak areas from ${dayRange}.\n\nThree questions per subject. Show your working clearly.`,
        note: `Session ${recapNum} of your programme. Every mistake you correct makes you stronger.`,
      }],
      worked: [],
      questions: result.questions.map(q => ({ q: q.q, a: q.a, hint: q.hint })),
      answerKey: result.questions.map(q => q.a),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }

    await db.collection('packs').doc(`${studentId}_recap${recapNum}`).set(packData)

    console.log(`✅ Auto-generated ${studentId}_recap${recapNum}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        triggered: true,
        recapNum,
        packId: `${studentId}_recap${recapNum}`,
        questionsGenerated: result.questions.length,
      }),
    }
  } catch (err) {
    console.error('R&R trigger error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

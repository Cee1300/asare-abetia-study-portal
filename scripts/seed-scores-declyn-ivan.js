// scripts/seed-scores-declyn-ivan.js
import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

console.log('Script started...')

const SESSIONS = [
  {
    studentId: 'declyn',
    day: 1,
    date: '2026-04-29',
    subject: 'Mathematics',
    topic: 'Numbers to 1,000,000: Place Value, Reading & Ordering',
    score: 6.5,
    dadFeedback: 'Good start, Declyn. Solid place value understanding. Work on rounding — that cost you marks.',
  },
  {
    studentId: 'declyn',
    day: 4,
    date: '2026-05-03',
    subject: 'English',
    topic: 'Oral Language: Communication, Discussions & Presentations',
    score: 7,
    dadFeedback: 'Well done on the presentation outline and opinion paragraph. Keep developing your arguments.',
  },
  {
    studentId: 'ivan',
    day: 3,
    date: '2026-05-01',
    subject: 'Mathematics',
    topic: 'Addition & Subtraction: 2- and 3-digit Numbers',
    score: 5.5,
    dadFeedback: 'You understand the method Ivan — errors are in borrowing steps. Practise Q2b and Q5 again.',
  },
  {
    studentId: 'ivan',
    day: 4,
    date: '2026-05-03',
    subject: 'English',
    topic: 'Oral Language: Songs, Stories & Conversation',
    score: 8.5,
    originalScore: 7,
    dadFeedback: 'Excellent after corrections — 8.5 is a strong score. The Anansi analysis was very good. Keep this standard.',
  },
]

function calculatePoints(score) {
  let pts = 10
  if (score >= 9) pts += 35
  else if (score >= 7) pts += 20
  return pts
}

async function seed() {
  console.log('Starting seed...')
  const batch = db.batch()

  for (const session of SESSIONS) {
    const docId = `${session.studentId}_day${session.day}`
    const ref = db.collection('submissions').doc(docId)
    batch.set(ref, {
      studentId: session.studentId,
      dayNum: session.day,
      subject: session.subject,
      topic: session.topic,
      score: session.score,
      originalScore: session.originalScore || null,
      status: 'marked',
      submittedAt: admin.firestore.Timestamp.fromDate(new Date(session.date)),
      markedAt: admin.firestore.Timestamp.fromDate(new Date(session.date)),
      answers: {},
      markedAnswers: {},
      dadFeedback: session.dadFeedback || '',
      historical: true,
    }, { merge: true })

    const pts = calculatePoints(session.score)
    const ptsRef = db.collection('points').doc(`${session.studentId}_day${session.day}`)
    batch.set(ptsRef, {
      studentId: session.studentId,
      dayNum: session.day,
      amount: pts,
      reason: `Day ${session.day} ${session.subject}: ${session.score}/10`,
      createdAt: admin.firestore.Timestamp.fromDate(new Date(session.date)),
    }, { merge: true })

    console.log(`✅ ${session.studentId} — Day ${session.day} — ${session.score}/10`)
  }

  await batch.commit()
  console.log('\n✅ All scores seeded!')
  console.log('Declyn: Day 1 Maths 6.5, Day 4 English 7.0')
  console.log('Ivan:   Day 3 Maths 5.5, Day 4 English 8.5')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
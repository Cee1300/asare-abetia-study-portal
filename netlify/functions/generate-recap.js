// netlify/functions/generate-recap.js
// Generates a Recap & Repair pack based on student weak areas

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
  if (!CLAUDE_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { studentName, level, weakAreas, recapNum } = body

  // Group weak areas by subject — max 3 questions per subject
  const bySubject = {}
  for (const w of weakAreas) {
    if (!bySubject[w.subject]) bySubject[w.subject] = []
    if (bySubject[w.subject].length < 3) bySubject[w.subject].push(w)
  }

  const subjects = Object.keys(bySubject)
  const totalQuestions = subjects.reduce((sum, s) => sum + bySubject[s].length, 0)

  const weakSummary = subjects.map(subject => {
    const items = bySubject[subject]
    return `${subject}:\n${items.map(w => `- Day ${w.dayNum} Q${w.qIdx}: ${w.topic}. Missed because: ${w.feedback || 'incorrect answer'}. Correct answer was: ${w.correctAnswer || 'see answer key'}`).join('\n')}`
  }).join('\n\n')

  const prompt = `You are creating a Recap & Repair Session ${recapNum} for ${studentName}, a ${level} student at a Ghanaian junior high school.

The session targets specific weak areas from recent sessions. For each weak area, write ONE targeted question that:
1. Tests the SAME concept the student got wrong
2. Is slightly different from the original question (not identical)
3. Has a clear, concise answer key

WEAK AREAS TO TARGET:
${weakSummary}

Return ONLY valid JSON in this exact structure:
{
  "title": "Recap & Repair Session ${recapNum}",
  "intro": "<2-sentence intro explaining what this session covers — encouraging tone>",
  "questions": [
    {
      "subject": "<Mathematics|Science|English>",
      "topic": "<topic name>",
      "q": "<question text>",
      "a": "<answer key>",
      "hint": "<1-sentence hint to guide student without giving away answer>"
    }
  ]
}

Generate exactly ${totalQuestions} questions — one per weak area listed above.
British English throughout. GES/NaCCA curriculum standards for ${level}.`

  try {
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

    let result
    try {
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      result = JSON.parse(clean)
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to parse response' }) }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

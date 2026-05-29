// netlify/functions/ask-question.js
// AI tutor — limited to current SUBJECT (not just current topic)

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

  const { question, subject, topic, level, studentName, studentId, dayNum } = body

  // For recap/quiz sessions with subject 'All', allow all three subjects
  const subjectScope = (!subject || subject === 'All')
    ? 'Mathematics, Science or English'
    : subject

  const prompt = `You are a friendly, patient tutor helping ${studentName}, a ${level} student at a Ghanaian school.

The student is currently studying ${subject || 'their school subjects'} — today's topic is "${topic}".

WHAT YOU CAN HELP WITH:
- Any question related to ${subjectScope} at ${level} level (GES/NaCCA curriculum)
- Explaining concepts, methods and rules within ${subjectScope}
- Helping the student understand WHY something works, not just HOW
- Related background knowledge that helps them understand (e.g. if they are on fractions and ask about negative numbers, help them)

WHAT YOU CANNOT HELP WITH:
- Subjects completely outside ${subjectScope} (e.g. if subject is Mathematics, do not answer History or Geography questions)
- Direct answers to their practice questions — guide them to the concept instead
- Inappropriate topics, social media, games, or anything unrelated to school
- If asked something completely off-topic, say: "That is not something I can help with here. Do you have a ${subjectScope} question?"

HOW TO ANSWER:
- Keep answers SHORT — 3-5 sentences maximum
- Use simple, clear language for a ${level} student
- Use Ghanaian everyday examples where helpful (cedis, markets, cocoa, familiar objects)
- Be encouraging — celebrate curiosity
- If the student asks WHY something works (like why negative × negative = positive), explain the reasoning clearly — these conceptual questions are exactly what you are here for
- British English throughout

Student's question: "${question}"

Answer directly — no preamble.`

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
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const answer = data.content?.[0]?.text?.trim() || 'I could not answer that. Please try again.'

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer,
        logData: {
          studentId,
          studentName,
          dayNum,
          subject,
          topic,
          question,
          answer,
          timestamp: new Date().toISOString(),
        }
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

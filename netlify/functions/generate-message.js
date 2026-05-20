// netlify/functions/generate-message.js
// Generates contextual daily messages for each student using Claude

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

  const { studentName, level, todaySubject, todayTopic, lastScore, lastSubject, streak, overdueDays, prioritySubject } = body

  const prompt = `Generate a short motivational daily message from a father to his son who is doing a self-study programme in Ghana.

Student: ${studentName}
Level: ${level}
Today's pack: ${todaySubject} — ${todayTopic}
Last score: ${lastScore ? `${lastScore}/10 in ${lastSubject}` : 'No recent score'}
Current streak: ${streak} day${streak !== 1 ? 's' : ''}
Overdue sessions: ${overdueDays || 0}
Priority subject: ${prioritySubject || 'None'}

Write a message that is:
- Direct and personal — not generic
- 1-2 sentences maximum
- Mentions today's subject or topic specifically
- References the last score if relevant (push harder if low, acknowledge if high)
- Mentions streak if 3 or more days
- Firm but encouraging — like a proud father who expects excellence
- Ends with "— Dad 💪" 
- NO emojis except the final 💪
- British English

Return ONLY the message text, nothing else.`

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
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const message = data.content?.[0]?.text?.trim() || ''

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

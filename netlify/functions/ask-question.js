// netlify/functions/ask-question.js
// Students can ask Claude questions about their pack content

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

  const { question, subject, topic, level, studentName, context } = body

  const prompt = `You are a friendly, patient tutor helping ${studentName}, a ${level} student at a Ghanaian junior high school, understand their ${subject} work on the topic "${topic}".

The student has asked: "${question}"

${context ? `Context from their learning pack:\n${context}\n` : ''}

Answer guidelines:
- Use simple, clear language appropriate for a ${level} student in Ghana
- Keep the answer concise — 2-4 sentences maximum unless a longer explanation is truly needed
- Use examples from Ghanaian daily life where helpful (e.g. cedis, markets, cocoa, local distances)
- If the question is about a calculation, show the steps clearly
- Be encouraging — end with a brief motivating phrase
- British English throughout
- Do NOT give away the answer to any exam question — guide them to understand the concept instead
- If the question is off-topic or inappropriate, gently redirect to the subject

Return ONLY your answer text — no preamble, no "Here's my answer:", just the response directly.`

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
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const answer = data.content?.[0]?.text?.trim() || ''

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

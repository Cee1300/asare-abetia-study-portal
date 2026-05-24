// netlify/functions/ask-question.js
// AI tutor for students — strictly limited to current pack subject/topic

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

  const { question, subject, topic, level, studentName } = body

  const prompt = `You are a strict but friendly classroom tutor helping ${studentName}, a ${level} student in Ghana, understand their ${subject} work on the topic "${topic}".

STRICT RULES — you must follow these without exception:
1. ONLY answer questions directly related to ${subject} and the topic "${topic}". 
2. If the student asks about ANYTHING else (other subjects, general knowledge, news, people, games, social media, or anything unrelated to ${subject}/${topic}), respond ONLY with: "I can only help you with ${subject} — ${topic} right now. Do you have a question about that?"
3. Do NOT give direct answers to practice questions. If the student pastes a question that looks like it is from their exercise, say: "That looks like one of your practice questions. I won't give you the answer, but I can explain the concept. What part do you not understand?"
4. Keep answers SHORT — maximum 4 sentences.
5. Use simple language for a ${level} student in Ghana.
6. Use Ghanaian examples where helpful (cedis, markets, cocoa, local places).
7. Be encouraging but firm about staying on topic.
8. Never discuss violence, relationships, social issues, politics, or anything inappropriate for a school-age student.
9. British English throughout.

Student's question: "${question}"

Respond directly — no preamble.`

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
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const answer = data.content?.[0]?.text?.trim() || 'I could not answer that. Please try again.'

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

// netlify/functions/mark-answers.js
// Server-side Claude API marking — key never exposed to browser

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
  if (!CLAUDE_API_KEY) {
    console.error('CLAUDE_API_KEY is not set')
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) }
  }
  console.log('API key present, length:', CLAUDE_API_KEY.length)

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { questions, answers, subject, topic, level } = body

  if (!questions?.length) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No questions provided' }) }
  }

  const qList = questions.map((q, i) => {
    const qText = q.q?.replace('[Challenge] ', '') || ''
    const isChallenge = q.q?.includes('[Challenge]')
    return `Q${i+1}${isChallenge ? ' (CHALLENGE)' : ''}:
Question: ${qText}
Answer Key: ${q.a || '(use your knowledge)'}
Student Answer: ${answers[i] || '(blank — no answer)'}`
  }).join('\n\n')

  const prompt = `You are marking a ${level || 'B7'} student's ${subject} assignment on "${topic}" at a Ghanaian junior high school (GES/NaCCA curriculum).

Mark each question. Return ONLY valid JSON with no preamble or markdown backticks.

${qList}

Return this exact JSON structure:
{
  "totalScore": <number, max ${questions.length}, 0.5 increments allowed>,
  "questions": [
    {
      "qNum": <1-based number>,
      "correct": <boolean>,
      "marks": <0, 0.5, or 1>,
      "feedback": "<max 2 sentences if wrong, empty string if correct>",
      "correctAnswer": "<correct answer if student was wrong, empty string if correct>"
    }
  ],
  "overallFeedback": "<1-2 sentence overall message — encouraging and specific>"
}

MARKING RULES:
- 1 mark: correct answer and method
- 0.5 mark: correct method but arithmetic error, or partially correct  
- 0 marks: wrong method, blank, or completely wrong
- British English throughout
- Do not inflate scores`

  try {
    // Use AbortController for timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000) // 25 second timeout

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const errText = await response.text()
      console.error('Claude API error:', response.status, errText)
      return { 
        statusCode: 502, 
        body: JSON.stringify({ 
          error: `Claude API returned ${response.status}`,
          details: errText
        }) 
      }
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''

    let result
    try {
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      result = JSON.parse(clean)
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'Raw text:', text)
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to parse marking response' }) }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      return { statusCode: 504, body: JSON.stringify({ error: 'Marking timed out — will be marked manually' }) }
    }
    console.error('Function error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}

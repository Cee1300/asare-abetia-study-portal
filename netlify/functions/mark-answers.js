// netlify/functions/mark-answers.js
// ─────────────────────────────────────────────────────────────
// This function runs SERVER-SIDE on Netlify.
// The CLAUDE_API_KEY environment variable is set in Netlify dashboard.
// It is NEVER sent to the browser.
//
// Set in Netlify: Site Settings → Environment Variables
// Key: CLAUDE_API_KEY
// Value: your Anthropic API key
// ─────────────────────────────────────────────────────────────

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

  const { questions, answers, subject, topic, level } = body

  // Build the marking prompt
  const prompt = buildMarkingPrompt(questions, answers, subject, topic, level)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text || ''

    // Parse the JSON response
    let result
    try {
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      result = JSON.parse(clean)
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to parse marking response' }) }
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

function buildMarkingPrompt(questions, answers, subject, topic, level) {
  const qList = questions.map((q, i) => {
    const qText = q.q?.replace('[Challenge] ', '') || ''
    const isChallenge = q.q?.includes('[Challenge]')
    return `Q${i+1}${isChallenge ? ' (CHALLENGE)' : ''}:
Question: ${qText}
Answer Key: ${q.a || '(no answer key provided — use your knowledge)'}
Student's Answer: ${answers[i] || '(blank — no answer submitted)'}`
  }).join('\n\n')

  return `You are marking a ${level} student's ${subject} assignment on the topic "${topic}" at a Ghanaian junior high school (GES/NaCCA curriculum).

Mark each question and return ONLY a JSON object with no preamble or markdown.

Questions and student answers:
${qList}

Return this exact JSON structure:
{
  "totalScore": <number, max ${questions.length}, can be in 0.5 increments>,
  "questions": [
    {
      "qNum": <number>,
      "correct": <boolean>,
      "marks": <0, 0.5, or 1>,
      "feedback": "<brief, encouraging feedback — max 2 sentences. Only include if wrong or partial. If correct, return empty string.>",
      "correctAnswer": "<the correct answer — only include if student was wrong or partial>"
    }
  ],
  "overallFeedback": "<1-2 sentence overall feedback to the student — encouraging, specific, honest>"
}

MARKING GUIDELINES:
- Full mark (1): correct answer, correct method shown
- Half mark (0.5): correct method but arithmetic error, or partially correct
- Zero (0): wrong method, no answer, or completely wrong
- For written/extended answers: judge understanding and key ideas, not exact wording
- Challenge questions worth 1 mark — reward genuine attempt even if wrong
- British English spelling throughout
- Be encouraging but honest — do not inflate scores`
}

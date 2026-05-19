// netlify/functions/mark-handwritten.js
// Marks handwritten student work from a photo using Claude's vision

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

  const { imageBase64, mediaType, questions, subject, topic, level } = body

  if (!imageBase64 || !questions?.length) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing image or questions' }) }
  }

  const qList = questions.map((q, i) => {
    const qText = q.q?.replace('[Challenge] ', '') || ''
    const isChallenge = q.q?.includes('[Challenge]')
    return `Q${i+1}${isChallenge ? ' (CHALLENGE)' : ''}:
Question: ${qText}
Answer Key: ${q.a || '(use your knowledge)'}`
  }).join('\n\n')

  const prompt = `You are marking a ${level} student's handwritten ${subject} work on "${topic}" at a Ghanaian junior high school (GES/NaCCA curriculum).

The image shows the student's handwritten answers. Read them carefully and mark each question.

Questions and answer keys:
${qList}

Return ONLY a JSON object with no preamble or markdown:
{
  "totalScore": <number, max ${questions.length}, can be in 0.5 increments>,
  "questions": [
    {
      "qNum": <number>,
      "correct": <boolean>,
      "marks": <0, 0.5, or 1>,
      "feedback": "<brief encouraging feedback if wrong — max 2 sentences, empty string if correct>",
      "correctAnswer": "<correct answer if student was wrong or partial, empty string if correct>"
    }
  ],
  "overallFeedback": "<1-2 sentence overall message — encouraging, specific, honest>"
}

MARKING GUIDELINES:
- Full mark (1): correct answer and method
- Half mark (0.5): correct method but arithmetic error, or partially correct
- Zero (0): wrong method, blank, or completely wrong
- Be encouraging but honest — do not inflate scores
- If handwriting is unclear for a question, award half mark and note it in feedback
- British English throughout`

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
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64,
              },
            },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text || ''

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

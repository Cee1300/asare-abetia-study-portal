// src/components/AskQuestion.jsx
import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { STUDENTS } from '../utils/students'

export default function AskQuestion({ subject, topic, level, studentId, conceptContext, dayNum }) {
  const [question, setQuestion] = useState('')
  const [asking, setAsking] = useState(false)
  const [history, setHistory] = useState([])
  const [open, setOpen] = useState(false)

  const student = STUDENTS[studentId]

  async function askQuestion() {
    if (!question.trim()) return
    setAsking(true)
    const q = question.trim()
    setQuestion('')

    try {
      const response = await fetch('/.netlify/functions/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          subject,
          topic,
          level,
          studentId,
          studentName: student?.name || 'Student',
          dayNum,
          context: conceptContext || '',
        }),
      })
      const result = await response.json()
      const a = result.answer || 'Sorry, I could not answer that. Try asking differently.'

      setHistory(prev => [...prev, { q, a }])

      // Log to Firestore
      if (result.logData) {
        try {
          await addDoc(collection(db, 'questions'), {
            ...result.logData,
            createdAt: serverTimestamp(),
          })
        } catch (logErr) {
          console.error('Question log error:', logErr)
          // Don't show error to student — logging failure is silent
        }
      }
    } catch {
      setHistory(prev => [...prev, { q, a: 'Something went wrong. Please try again.' }])
    }
    setAsking(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full card p-4 flex items-center gap-3 hover:border-blue-500/30 transition-all text-left"
      >
        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-base">🤔</span>
        </div>
        <div>
          <p className="text-white text-sm font-medium">Have a question?</p>
          <p className="text-slate-400 text-xs">Ask the AI tutor — it will explain in simple terms</p>
        </div>
        <span className="ml-auto text-blue-400 text-xs font-medium">Ask →</span>
      </button>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-4 py-3 bg-blue-500/10 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🤔</span>
          <p className="text-blue-400 text-sm font-medium">Ask the AI Tutor</p>
        </div>
        <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300 text-xs">
          Close ×
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Chat history */}
        {history.length > 0 && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {history.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-500/20 border border-blue-500/20 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                    <p className="text-white text-sm">{item.q}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                    <p className="text-slate-200 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {asking && (
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xs">🤖</span>
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !asking && askQuestion()}
            placeholder={`Ask about ${topic}...`}
            className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500
              rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
            disabled={asking}
          />
          <button
            onClick={askQuestion}
            disabled={asking || !question.trim()}
            className="btn-primary px-4 py-2.5 text-sm flex-shrink-0 disabled:opacity-50"
          >
            {asking ? '...' : 'Ask'}
          </button>
        </div>
        <p className="text-slate-600 text-xs text-center">
          The AI tutor explains concepts — it won't give exam answers directly
        </p>
      </div>
    </div>
  )
}

// src/pages/AdminQuestions.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase'
import { ChevronLeft, MessageCircle } from 'lucide-react'
import { STUDENTS } from '../utils/students'

const STUDENT_IDS = Object.keys(STUDENTS)

export default function AdminQuestions() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all | jezreel | declyn | ivan

  useEffect(() => { loadQuestions() }, [filter])

  async function loadQuestions() {
    setLoading(true)
    try {
      let q
      if (filter === 'all') {
        q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'), limit(100))
      } else {
        q = query(
          collection(db, 'questions'),
          where('studentId', '==', filter),
          orderBy('createdAt', 'desc'),
          limit(100)
        )
      }
      const snap = await getDocs(q)
      setQuestions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Load questions error:', err)
    } finally {
      setLoading(false)
    }
  }

  function formatTime(ts) {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    })
  }

  function getSubjectColour(subject) {
    if (subject === 'Mathematics') return 'text-blue-400 bg-blue-500/10'
    if (subject === 'Science') return 'text-emerald-400 bg-emerald-500/10'
    if (subject === 'English') return 'text-purple-400 bg-purple-500/10'
    return 'text-slate-400 bg-slate-800'
  }

  // Group by student
  const grouped = STUDENT_IDS.reduce((acc, id) => {
    acc[id] = questions.filter(q => q.studentId === id)
    return acc
  }, {})

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <MessageCircle size={18} className="text-blue-400" />
          <div>
            <p className="text-white font-medium text-sm">Student Questions</p>
            <p className="text-slate-400 text-xs">AI tutor conversation log</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">

        {/* Filter tabs */}
        <div className="flex gap-1 bg-slate-900 rounded-xl p-1">
          {['all', ...STUDENT_IDS].map(id => (
            <button key={id} onClick={() => setFilter(id)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all
                ${filter === id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
              {id === 'all' ? 'All' : STUDENTS[id]?.name || id}
            </button>
          ))}
        </div>

        {/* Summary counts */}
        <div className="grid grid-cols-3 gap-3">
          {STUDENT_IDS.map(id => (
            <div key={id} className="card p-3 text-center">
              <p className="text-white font-bold text-lg">{grouped[id]?.length || 0}</p>
              <p className="text-slate-400 text-xs">{STUDENTS[id]?.name}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-4xl mb-3">🤔</p>
            <p className="text-slate-400 text-sm">No questions yet.</p>
            <p className="text-slate-500 text-xs mt-1">Questions will appear here when the boys use the AI tutor.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map(q => (
              <div key={q.id} className="card overflow-hidden">
                {/* Header */}
                <div className="px-4 py-2.5 bg-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-xs font-medium capitalize">
                      {STUDENTS[q.studentId]?.name || q.studentId}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 text-xs">Day {q.dayNum}</span>
                    {q.subject && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getSubjectColour(q.subject)}`}>
                        {q.subject}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 text-xs">{formatTime(q.createdAt)}</span>
                </div>

                {/* Question */}
                <div className="p-4 border-b border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">Student asked:</p>
                  <p className="text-white text-sm">{q.question}</p>
                </div>

                {/* Answer */}
                <div className="p-4 bg-blue-500/5">
                  <p className="text-xs text-blue-400 mb-1">AI tutor replied:</p>
                  <p className="text-slate-200 text-sm leading-relaxed">{q.answer}</p>
                </div>

                {/* Topic */}
                {q.topic && (
                  <div className="px-4 py-2 border-t border-slate-800">
                    <p className="text-slate-500 text-xs">Topic: {q.topic}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

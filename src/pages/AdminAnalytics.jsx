// src/pages/AdminAnalytics.jsx
// Intelligence layer — weak areas, progress charts, auto R&R trigger

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { STUDENTS, TIMETABLE, SUBJECT_COLOURS } from '../utils/students'
import { ChevronLeft, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Zap, RefreshCw } from 'lucide-react'

const STUDENTS_LIST = ['jezreel', 'declyn', 'ivan']

export default function AdminAnalytics() {
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeStudent, setActiveStudent] = useState('jezreel')
  const [generatingMessage, setGeneratingMessage] = useState('')
  const [generatedMessages, setGeneratedMessages] = useState({})
  const [savingMessage, setSavingMessage] = useState('')

  useEffect(() => { loadAllData() }, [])

  async function loadAllData() {
    const result = {}
    for (const studentId of STUDENTS_LIST) {
      const snap = await getDocs(query(collection(db, 'submissions'), where('studentId', '==', studentId)))
      const subs = {}
      snap.forEach(d => { subs[d.data().dayNum] = d.data() })
      result[studentId] = analyseStudent(studentId, subs)
    }
    setData(result)
    setLoading(false)
  }

  function analyseStudent(studentId, submissions) {
    const timetable = TIMETABLE[studentId] || []
    const marked = Object.values(submissions).filter(s => s.score !== undefined && s.subject !== 'All' && typeof s.dayNum === 'number')

    // Per-subject analysis
    const bySubject = {}
    for (const sub of marked.filter(s => s.subject !== 'All' && typeof s.dayNum === 'number')) {
      if (!bySubject[sub.subject]) bySubject[sub.subject] = []
      bySubject[sub.subject].push(sub)
    }

    const subjectStats = {}
    const validSubjects = ['Mathematics', 'Science', 'English']
    for (const [subject, subs] of Object.entries(bySubject).filter(([s]) => validSubjects.includes(s))) {
      const scores = subs.map(s => s.score)
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      const trend = scores.length >= 2
        ? scores[scores.length - 1] - scores[scores.length - 2]
        : 0
      subjectStats[subject] = { avg, trend, scores, count: scores.length }
    }

    // Weak areas from marked answers
    const weakAreas = []
    for (const sub of marked) {
      if (!sub.markedAnswers) continue
      for (const [qIdx, ma] of Object.entries(sub.markedAnswers)) {
        if (ma.marks < 1) {
          weakAreas.push({
            dayNum: sub.dayNum,
            subject: sub.subject,
            topic: sub.topic,
            qIdx: Number(qIdx) + 1,
            marks: ma.marks,
            correctAnswer: ma.correctAnswer || '',
            feedback: ma.feedback || '',
          })
        }
      }
    }

    // Overall stats
    const totalScore = marked.reduce((sum, s) => sum + s.score, 0)
    const avgScore = marked.length > 0 ? totalScore / marked.length : 0
    const completed = marked.length
    const lastScore = marked.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0))[0]

    // Streak
    const sorted = [...marked].sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0))
    let streak = sorted.length > 0 ? 1 : 0
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i-1].submittedAt?.seconds * 1000)
      const curr = new Date(sorted[i].submittedAt?.seconds * 1000)
      const diff = Math.abs(prev - curr) / (1000 * 60 * 60 * 24)
      if (diff <= 2) streak++
      else break
    }

    // Overdue
    const today = new Date()
    const overdue = timetable.filter(day => {
      const packDate = new Date(day.date)
      return packDate < today && !submissions[day.day]
    }).length

    // Today's pack
    const todayPack = timetable.find(day => {
      const packDate = new Date(day.date)
      const t = new Date()
      return packDate.toDateString() === t.toDateString()
    })

    // R&R readiness — check if 7 new sessions done since last recap
    const recapSessions = Object.values(submissions).filter(s => typeof s.dayNum === 'string' && s.dayNum.includes('recap'))
    const lastRecapNum = recapSessions.length
    const dailyCompleted = marked.filter(s => typeof s.dayNum === 'number').length
    const sessionsSinceLastRecap = dailyCompleted - (lastRecapNum * 7)
    const recapReady = sessionsSinceLastRecap >= 7

    return {
      subjectStats,
      weakAreas,
      avgScore,
      completed,
      lastScore: lastScore ? { score: lastScore.score, subject: lastScore.subject, topic: lastScore.topic } : null,
      streak,
      overdue,
      todayPack,
      recapReady,
      recapNum: lastRecapNum + 1,
    }
  }

  async function generateMessage(studentId) {
    setGeneratingMessage(studentId)
    const student = STUDENTS[studentId]
    const d = data[studentId]
    if (!d) return

    try {
      const response = await fetch('/.netlify/functions/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.name,
          level: student.level,
          todaySubject: d.todayPack?.subject || 'No pack today',
          todayTopic: d.todayPack?.topic || '',
          lastScore: d.lastScore?.score,
          lastSubject: d.lastScore?.subject,
          streak: d.streak,
          overdueDays: d.overdue,
          prioritySubject: student.prioritySubject || null,
        }),
      })
      const result = await response.json()
      setGeneratedMessages(prev => ({ ...prev, [studentId]: result.message }))
    } catch (err) {
      console.error(err)
    }
    setGeneratingMessage('')
  }

  async function saveMessage(studentId) {
    const message = generatedMessages[studentId]
    if (!message) return
    setSavingMessage(studentId)
    await setDoc(doc(db, 'dadMessages', `msg_${studentId}`), {
      studentId,
      message,
      updatedAt: serverTimestamp(),
    })
    setTimeout(() => setSavingMessage(''), 1500)
  }

  function getScoreColour(score) {
    if (score >= 9) return 'text-amber-400'
    if (score >= 7) return 'text-emerald-400'
    if (score >= 5) return 'text-amber-400'
    return 'text-red-400'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  const student = STUDENTS[activeStudent]
  const d = data[activeStudent] || {}

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-semibold text-sm">Analytics & Intelligence</h1>
            <p className="text-slate-400 text-xs">Weak areas · Progress · Auto-messages</p>
          </div>
          <button onClick={loadAllData} className="btn-ghost p-2">
            <RefreshCw size={16} className="text-slate-400" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-6 space-y-6">

        {/* Student selector */}
        <div className="flex gap-2">
          {STUDENTS_LIST.map(id => {
            const s = STUDENTS[id]
            const d2 = data[id] || {}
            return (
              <button key={id} onClick={() => setActiveStudent(id)}
                className={`flex-1 card p-3 text-center transition-all ${activeStudent === id ? 'border border-amber-500/40' : ''}`}>
                <p className="text-white font-medium text-sm">{s.name}</p>
                <p className={`text-xs font-bold ${getScoreColour(d2.avgScore || 0)}`}>
                  {d2.avgScore ? `${d2.avgScore.toFixed(1)}/10` : '—'}
                </p>
                {d2.recapReady && (
                  <p className="text-amber-400 text-[10px] mt-0.5">R&R Ready!</p>
                )}
              </button>
            )
          })}
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Completed', value: d.completed || 0, colour: 'text-emerald-400' },
            { label: 'Average', value: d.avgScore ? `${d.avgScore.toFixed(1)}` : '—', colour: getScoreColour(d.avgScore || 0) },
            { label: 'Streak', value: `${d.streak || 0}🔥`, colour: 'text-orange-400' },
            { label: 'Overdue', value: d.overdue || 0, colour: d.overdue > 0 ? 'text-red-400' : 'text-slate-400' },
          ].map(({ label, value, colour }) => (
            <div key={label} className="card p-3 text-center">
              <p className={`font-bold text-lg ${colour}`}>{value}</p>
              <p className="text-slate-500 text-[10px]">{label}</p>
            </div>
          ))}
        </div>

        {/* R&R Alert */}
        {d.recapReady && (
          <div className="card p-4 border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-amber-400" />
              <p className="text-amber-400 font-medium text-sm">
                Recap & Repair Session {d.recapNum} is due for {student?.name}!
              </p>
            </div>
            <p className="text-slate-400 text-xs mb-3">
              {d.completed} sessions completed. Time to consolidate weak areas before moving on.
            </p>
            <button
              onClick={() => navigate(`/admin/recap/${activeStudent}/${d.recapNum}`)}
              className="btn-gold text-sm px-4 py-2"
            >
              Build R&R Session {d.recapNum} →
            </button>
          </div>
        )}

        {/* Subject performance */}
        <div>
          <h3 className="text-slate-300 text-sm font-medium mb-3">Subject Performance</h3>
          <div className="space-y-3">
            {Object.entries(d.subjectStats || {}).map(([subject, stats]) => {
              const colours = SUBJECT_COLOURS[subject] || SUBJECT_COLOURS.Mathematics
              const isUp = stats.trend > 0
              const isDown = stats.trend < 0
              return (
                <div key={subject} className="card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`subject-badge ${colours.bg} ${colours.text} ${colours.border}`}>
                        {subject}
                      </span>
                      <span className="text-slate-500 text-xs">{stats.count} session{stats.count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {stats.count >= 2 && (
                        isUp
                          ? <TrendingUp size={14} className="text-emerald-400" />
                          : isDown
                          ? <TrendingDown size={14} className="text-red-400" />
                          : null
                      )}
                      <span className={`font-bold text-sm ${getScoreColour(stats.avg)}`}>
                        {stats.avg.toFixed(1)}/10
                      </span>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="flex items-end gap-1 h-8">
                    {stats.scores.map((score, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full rounded-sm transition-all"
                          style={{
                            height: `${(score / 10) * 100}%`,
                            minHeight: '2px',
                            background: colours.hex,
                            opacity: 0.7 + (i / stats.scores.length) * 0.3,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Warning if average below 6 */}
                  {stats.avg < 6 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <AlertCircle size={12} className="text-red-400" />
                      <p className="text-red-400 text-xs">Below target — needs focused attention</p>
                    </div>
                  )}
                  {stats.avg >= 8 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-emerald-400" />
                      <p className="text-emerald-400 text-xs">Strong performance — keep this standard</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Weak areas */}
        {d.weakAreas?.length > 0 && (
          <div>
            <h3 className="text-slate-300 text-sm font-medium mb-3">
              Weak Areas ({d.weakAreas.length} questions missed)
            </h3>
            <div className="space-y-2">
              {/* Group by subject */}
              {['Mathematics', 'Science', 'English'].map(subject => {
                const subjectWeak = (d.weakAreas || []).filter(w => w.subject === subject && w.subject !== 'All')
                if (subjectWeak.length === 0) return null
                const colours = SUBJECT_COLOURS[subject] || SUBJECT_COLOURS.Mathematics
                return (
                  <div key={subject} className="card overflow-hidden">
                    <div className={`px-4 py-2.5 flex items-center justify-between ${colours.bg}`}>
                      <span className={`text-xs font-semibold ${colours.text}`}>{subject}</span>
                      <span className={`text-xs ${colours.text}`}>{subjectWeak.length} weak point{subjectWeak.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="divide-y divide-slate-800">
                      {subjectWeak.slice(0, 5).map((w, i) => (
                        <div key={i} className="px-4 py-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-slate-300 text-xs font-medium">Day {w.dayNum} — Q{w.qIdx}</p>
                            <span className={`text-xs font-bold ${w.marks === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                              {w.marks === 0 ? '0 marks' : '½ mark'}
                            </span>
                          </div>
                          <p className="text-slate-500 text-xs truncate">{w.topic}</p>
                          {w.correctAnswer && (
                            <p className="text-emerald-400/70 text-xs mt-1 truncate">
                              ✓ {w.correctAnswer}
                            </p>
                          )}
                        </div>
                      ))}
                      {subjectWeak.length > 5 && (
                        <div className="px-4 py-2 text-center">
                          <p className="text-slate-600 text-xs">+{subjectWeak.length - 5} more weak areas</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Auto message generator */}
        <div>
          <h3 className="text-slate-300 text-sm font-medium mb-3">Auto-Generate Dad's Message</h3>
          <div className="card p-4 space-y-3">
            <div className="bg-slate-800/50 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">Context being used:</p>
              <div className="space-y-1">
                {d.todayPack && <p className="text-slate-300 text-xs">📅 Today: {d.todayPack.subject} — {d.todayPack.topic}</p>}
                {d.lastScore && <p className="text-slate-300 text-xs">📊 Last score: {d.lastScore.score}/10 ({d.lastScore.subject})</p>}
                <p className="text-slate-300 text-xs">🔥 Streak: {d.streak} day{d.streak !== 1 ? 's' : ''}</p>
                {d.overdue > 0 && <p className="text-red-400 text-xs">⚠️ Overdue: {d.overdue} session{d.overdue !== 1 ? 's' : ''}</p>}
              </div>
            </div>

            {generatedMessages[activeStudent] && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                <p className="text-slate-400 text-xs mb-1.5">Generated message:</p>
                <p className="text-white text-sm leading-relaxed">"{generatedMessages[activeStudent]}"</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => generateMessage(activeStudent)}
                disabled={generatingMessage === activeStudent}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-2.5 text-sm"
              >
                {generatingMessage === activeStudent ? (
                  <><svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>Generating...</>
                ) : <><RefreshCw size={13} /> Generate Message</>}
              </button>
              {generatedMessages[activeStudent] && (
                <button
                  onClick={() => saveMessage(activeStudent)}
                  className="btn-gold px-4 py-2.5 text-sm flex-shrink-0"
                >
                  {savingMessage === activeStudent ? '✓ Sent!' : 'Send to ' + student?.name}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Last score summary */}
        {d.lastScore && (
          <div className="card p-4 border border-slate-700">
            <p className="text-slate-400 text-xs mb-2">Most Recent Submission</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">{d.lastScore.topic}</p>
                <p className="text-slate-500 text-xs">{d.lastScore.subject}</p>
              </div>
              <span className={`font-bold text-2xl ${getScoreColour(d.lastScore.score)}`}>
                {d.lastScore.score}/10
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

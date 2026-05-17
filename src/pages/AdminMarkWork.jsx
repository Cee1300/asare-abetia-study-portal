import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { STUDENTS, TIMETABLE, POINTS } from '../utils/students'
import { ChevronLeft, CheckCircle, XCircle, Minus, Save, Zap } from 'lucide-react'

export default function AdminMarkWork() {
  const { studentId, dayNum } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [pack, setPack] = useState(null)
  const [marks, setMarks] = useState({})
  const [feedback, setFeedback] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState({})
  const [dadFeedback, setDadFeedback] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const student = STUDENTS[studentId]
  const dayData = TIMETABLE[studentId]?.find(d => d.day === Number(dayNum))

  useEffect(() => { loadData() }, [studentId, dayNum])

  async function loadData() {
    const [subSnap, packSnap] = await Promise.all([
      getDoc(doc(db, 'submissions', `${studentId}_day${dayNum}`)),
      getDoc(doc(db, 'packs', `${studentId}_day${dayNum}`)),
    ])
    if (subSnap.exists()) setSubmission(subSnap.data())
    if (packSnap.exists()) setPack(packSnap.data())
    setLoading(false)
  }

  function setMark(qIndex, value) {
    setMarks(prev => ({ ...prev, [qIndex]: value }))
  }

  const totalScore = Object.values(marks).reduce((sum, m) => sum + (m || 0), 0)
  const questions = pack?.questions || []

  async function saveMarks() {
    setSaving(true)
    try {
      const markedAnswers = {}
      questions.forEach((q, i) => {
        markedAnswers[i] = {
          correct: marks[i] >= 1,
          marks: marks[i] || 0,
          feedback: feedback[i] || '',
          correctAnswer: correctAnswers[i] || pack?.answerKey?.[i] || '',
        }
      })

      await updateDoc(doc(db, 'submissions', `${studentId}_day${dayNum}`), {
        score: totalScore,
        markedAnswers,
        dadFeedback,
        markedAt: serverTimestamp(),
        status: 'marked',
      })

      let pointsEarned = 0
      if (totalScore >= 9) pointsEarned += POINTS.score9plus
      else if (totalScore >= 7) pointsEarned += POINTS.score7plus
      pointsEarned += POINTS.submitOnTime

      await addDoc(collection(db, 'points'), {
        studentId,
        dayNum: Number(dayNum),
        amount: pointsEarned,
        reason: `Day ${dayNum} marked: ${totalScore}/10`,
        createdAt: serverTimestamp(),
      })

      navigate(`/admin/student/${studentId}`)
    } catch (err) {
      console.error(err)
    }
    setSaving(false)
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

  return (
    <div className="min-h-screen pb-24">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Marking: {student?.name} — Day {dayNum}</p>
            <p className="text-slate-400 text-xs">{dayData?.subject} · {dayData?.topic}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-lg">{totalScore.toFixed(1)}</p>
            <p className="text-slate-400 text-xs">/ {questions.length}</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">

        {/* Score summary */}
        <div className="card p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Current total</p>
            <p className={`text-3xl font-bold ${getScoreColour(totalScore)}`}>
              {totalScore.toFixed(1)}/10
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Zap size={14} className="text-amber-400" />
            <span className="text-amber-400 font-medium">
              +{totalScore >= 9 ? POINTS.score9plus : totalScore >= 7 ? POINTS.score7plus : 0} pts
            </span>
          </div>
        </div>

        {/* Question marking */}
        {questions.map((q, i) => {
          const qText = q.q?.replace('[Challenge] ', '') || ''
          const isChallenge = q.q?.includes('[Challenge]')
          const studentAnswer = submission?.answers?.[i] || '(no answer submitted)'
          const correctAns = correctAnswers[i] !== undefined ? correctAnswers[i] : (q.a || '')
          const mark = marks[i]

          return (
            <div key={i} className="card overflow-hidden">
              <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300">Q{i+1}{isChallenge ? ' ⭐' : ''}</span>
                  <span className="text-xs text-slate-500">{q.a ? 'Has answer key' : 'No answer key'}</span>
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-line">{qText}</p>
              </div>

              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-slate-400 text-xs mb-1.5">Student's answer</p>
                <p className="text-slate-200 text-sm leading-relaxed bg-slate-800/50 rounded-lg px-3 py-2">
                  {studentAnswer}
                </p>
              </div>

              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-emerald-400 text-xs mb-1.5">Correct answer</p>
                <textarea
                  value={correctAns}
                  onChange={e => setCorrectAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                  rows={2}
                  placeholder={q.a || 'Enter correct answer...'}
                  className="w-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-200/90
                    placeholder-emerald-900/50 rounded-xl px-3 py-2 text-sm resize-none
                    focus:outline-none focus:border-emerald-500/40"
                />
              </div>

              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-slate-400 text-xs mb-2">Award marks</p>
                <div className="flex gap-2">
                  {[
                    { value: 0,   icon: XCircle,     label: '0',  colour: 'border-red-500/30 text-red-400 hover:bg-red-500/10' },
                    { value: 0.5, icon: Minus,        label: '½',  colour: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' },
                    { value: 1,   icon: CheckCircle,  label: '1',  colour: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' },
                  ].map(({ value, icon: Icon, label, colour }) => (
                    <button
                      key={value}
                      onClick={() => setMark(i, value)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border
                        text-sm font-bold transition-all ${colour}
                        ${mark === value ? 'opacity-100 scale-105 ring-1 ring-current' : 'opacity-50'}`}
                    >
                      <Icon size={14} />
                      {label} mark
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-3">
                <input
                  type="text"
                  value={feedback[i] || ''}
                  onChange={e => setFeedback(prev => ({ ...prev, [i]: e.target.value }))}
                  placeholder="Optional feedback for this question..."
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500
                    rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>
          )
        })}

        {/* Dad's overall feedback */}
        <div className="card p-4">
          <p className="text-slate-300 text-sm font-medium mb-2">Dad's overall message</p>
          <textarea
            value={dadFeedback}
            onChange={e => setDadFeedback(e.target.value)}
            rows={3}
            placeholder="Write a personal message to appear on his results screen..."
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500
              rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-slate-500"
          />
        </div>

        <button
          onClick={saveMarks}
          disabled={saving || Object.keys(marks).length < questions.length}
          className="btn-gold w-full flex items-center justify-center gap-2 sticky bottom-4"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Saving...
            </>
          ) : (
            <><Save size={16} /> Save Marks & Notify Student</>
          )}
        </button>

        {Object.keys(marks).length < questions.length && (
          <p className="text-center text-slate-500 text-xs">
            Mark all {questions.length} questions to save
          </p>
        )}
      </div>
    </div>
  )
}
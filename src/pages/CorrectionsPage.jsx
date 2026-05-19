// src/pages/CorrectionsPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { TIMETABLE, SUBJECT_COLOURS, STUDENTS, POINTS } from '../utils/students'
import { BookOpen, FlaskConical, Pencil, ChevronLeft, Send, CheckCircle } from 'lucide-react'

const SUBJECT_ICONS = { Mathematics: BookOpen, Science: FlaskConical, English: Pencil }

export default function CorrectionsPage() {
  const { dayNum } = useParams()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [pack, setPack] = useState(null)
  const [corrections, setCorrections] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  const studentId = profile?.studentId
  const student = STUDENTS[studentId]
  const dayData = TIMETABLE[studentId]?.find(d => d.day === Number(dayNum))

  useEffect(() => { loadData() }, [dayNum, studentId])

  async function loadData() {
    const [subSnap, packSnap] = await Promise.all([
      getDoc(doc(db, 'submissions', `${studentId}_day${dayNum}`)),
      getDoc(doc(db, 'packs', `${studentId}_day${dayNum}`)),
    ])
    if (subSnap.exists()) {
      setSubmission(subSnap.data())
      setSubmitted(!!subSnap.data().correctionsSubmitted)
    }
    if (packSnap.exists()) setPack(packSnap.data())
    setLoading(false)
  }

  async function submitCorrections() {
    if (Object.keys(corrections).length === 0) return
    setSubmitting(true)
    try {
      await updateDoc(doc(db, 'submissions', `${studentId}_day${dayNum}`), {
        corrections,
        correctionsSubmitted: true,
        correctionsSubmittedAt: serverTimestamp(),
      })

      // Award correction points
      await addDoc(collection(db, 'points'), {
        studentId,
        dayNum: Number(dayNum),
        amount: POINTS.correctionsSubmit,
        reason: `Day ${dayNum} corrections submitted`,
        createdAt: serverTimestamp(),
      })

      setSubmitted(true)
    } catch (err) {
      console.error(err)
    }
    setSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  const questions = pack?.questions || []
  const wrongQuestions = questions.filter((q, i) => {
    const ma = submission?.markedAnswers?.[i]
    return ma && !ma.correct
  })
  const colours = SUBJECT_COLOURS[dayData?.subject] || SUBJECT_COLOURS.Mathematics
  const SubjectIcon = SUBJECT_ICONS[dayData?.subject] || BookOpen

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-white font-bold text-xl mb-2">Corrections Submitted!</h2>
          <p className="text-slate-400 text-sm mb-2">+{POINTS.correctionsSubmit} points earned</p>
          <p className="text-slate-500 text-xs mb-6">Dad will review your corrections.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-gold w-full">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (wrongQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card p-8 max-w-sm w-full text-center">
          <p className="text-4xl mb-4">🌟</p>
          <h2 className="text-white font-bold text-xl mb-2">No corrections needed!</h2>
          <p className="text-slate-400 text-sm mb-6">You got everything right on Day {dayNum}.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-ghost w-full">← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${colours.bg}`}>
            <SubjectIcon size={14} className={colours.text} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">Corrections — Day {dayNum}</p>
            <p className="text-slate-400 text-xs">{dayData?.subject} · {wrongQuestions.length} question{wrongQuestions.length !== 1 ? 's' : ''} to correct</p>
          </div>
          <div className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1.5 rounded-full font-medium">
            +{POINTS.correctionsSubmit} pts
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">

        <div className="card p-4 bg-amber-500/5 border border-amber-500/20">
          <p className="text-amber-400 text-sm font-medium mb-1">📝 Corrections Session</p>
          <p className="text-slate-400 text-xs">
            Review each wrong answer, understand the mistake, then write the correct answer in your own words.
            Earn +{POINTS.correctionsSubmit} points for submitting.
          </p>
        </div>

        {questions.map((q, i) => {
          const ma = submission?.markedAnswers?.[i]
          if (!ma || ma.correct) return null

          const qText = q.q?.replace('[Challenge] ', '') || ''
          const yourAnswer = submission?.answers?.[i] || '(no answer)'

          return (
            <div key={i} className="card overflow-hidden">
              <div className="px-4 py-3 bg-red-500/5 border-b border-slate-800">
                <span className="text-xs font-bold text-red-400">Q{i+1} — Incorrect ({ma.marks} mark{ma.marks !== 1 ? 's' : ''})</span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-slate-400 text-xs mb-1.5">Question</p>
                  <p className="text-white text-sm leading-relaxed whitespace-pre-line">{qText}</p>
                </div>

                <div>
                  <p className="text-red-400 text-xs mb-1.5">Your answer</p>
                  <p className="text-slate-300 text-sm bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-2">
                    {yourAnswer}
                  </p>
                </div>

                {ma.correctAnswer && (
                  <div>
                    <p className="text-emerald-400 text-xs mb-1.5">Correct answer</p>
                    <p className="text-emerald-200/90 text-sm bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-3 py-2 whitespace-pre-line">
                      {ma.correctAnswer}
                    </p>
                  </div>
                )}

                {ma.feedback && (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2">
                    <p className="text-amber-400 text-xs mb-1">📌 Feedback</p>
                    <p className="text-amber-200/80 text-xs leading-relaxed">{ma.feedback}</p>
                  </div>
                )}

                <div>
                  <p className="text-slate-300 text-xs mb-1.5 font-medium">Write the correct answer in your own words:</p>
                  <textarea
                    value={corrections[i] || ''}
                    onChange={e => setCorrections(prev => ({ ...prev, [i]: e.target.value }))}
                    placeholder="Show that you understand the correct answer..."
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500
                      rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>
              </div>
            </div>
          )
        })}

        <button
          onClick={submitCorrections}
          disabled={submitting || Object.keys(corrections).length === 0}
          className="btn-gold w-full flex items-center justify-center gap-2"
        >
          {submitting ? (
            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>Submitting...</>
          ) : <><Send size={16} /> Submit Corrections (+{POINTS.correctionsSubmit} pts)</>}
        </button>
      </div>
    </div>
  )
}

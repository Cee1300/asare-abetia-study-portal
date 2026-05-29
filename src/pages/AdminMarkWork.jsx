import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { STUDENTS, TIMETABLE, POINTS } from '../utils/students'
import { ChevronLeft, CheckCircle, XCircle, Minus, Save, Zap, RefreshCw, Image } from 'lucide-react'
import MathText from '../components/MathText'

// Match the same helper used in DayPackPage
function docId(studentId, dayNum) {
  const s = String(dayNum)
  if (s.startsWith('recap') || s.startsWith('quiz')) return `${studentId}_${s}`
  return `${studentId}_day${dayNum}`
}

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
  const [isOverride, setIsOverride] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [markingImage, setMarkingImage] = useState(false)

  const student = STUDENTS[studentId]

  // Handle string dayNums (recap3, quiz1) as well as numbers
  const dayData = TIMETABLE[studentId]?.find(d => String(d.day) === String(dayNum))

  useEffect(() => { loadData() }, [studentId, dayNum])

  async function loadData() {
    const id = docId(studentId, dayNum)
    const [subSnap, packSnap] = await Promise.all([
      getDoc(doc(db, 'submissions', id)),
      getDoc(doc(db, 'packs', id)),
    ])
    if (subSnap.exists()) {
      const sub = subSnap.data()
      setSubmission(sub)
      setDadFeedback(sub.dadFeedback || '')
      if (sub.markedAnswers) {
        const preFilled = {}
        Object.entries(sub.markedAnswers).forEach(([i, m]) => { preFilled[i] = m.marks })
        setMarks(preFilled)
        setIsOverride(!!sub.autoMarked)
      }
    }
    if (packSnap.exists()) setPack(packSnap.data())
    setLoading(false)
  }

  function setMark(qIndex, value) {
    setMarks(prev => ({ ...prev, [qIndex]: value }))
  }

  const questions = pack?.questions || []
  const totalScore = Object.values(marks).reduce((sum, m) => sum + (m || 0), 0)
  const isAutoMarked = submission?.autoMarked
  const isRecapOrQuiz = String(dayNum).startsWith('recap') || String(dayNum).startsWith('quiz')

  async function markHandwrittenImage() {
    if (!imageFile || !pack?.questions?.length) return
    setMarkingImage(true)
    try {
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload = () => res(reader.result.split(',')[1])
        reader.onerror = rej
        reader.readAsDataURL(imageFile)
      })
      const response = await fetch('/.netlify/functions/mark-handwritten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          mediaType: imageFile.type,
          questions: pack.questions,
          subject: dayData?.subject || 'All',
          topic: dayData?.topic || '',
          level: student?.level || 'B7',
        }),
      })
      if (!response.ok) throw new Error(`Function returned ${response.status}`)
      const result = await response.json()
      const newMarks = {}
      const newFeedback = {}
      const newCorrect = {}
      result.questions?.forEach(q => {
        newMarks[q.qNum - 1] = q.marks
        newFeedback[q.qNum - 1] = q.feedback || ''
        newCorrect[q.qNum - 1] = q.correctAnswer || ''
      })
      setMarks(newMarks)
      setFeedback(newFeedback)
      setCorrectAnswers(newCorrect)
      setDadFeedback(result.overallFeedback || '')
    } catch (err) {
      console.error('Handwritten marking error:', err)
      alert(`Marking failed: ${err.message}. Please mark manually.`)
    }
    setMarkingImage(false)
  }

  async function saveMarks() {
    setSaving(true)
    try {
      const id = docId(studentId, dayNum)
      const markedAnswers = {}
      questions.forEach((q, i) => {
        markedAnswers[i] = {
          correct: (marks[i] || 0) >= 1,
          marks: marks[i] || 0,
          feedback: feedback[i] !== undefined ? feedback[i] : (submission?.markedAnswers?.[i]?.feedback || ''),
          correctAnswer: correctAnswers[i] || submission?.markedAnswers?.[i]?.correctAnswer || pack?.answerKey?.[i] || '',
        }
      })
      await updateDoc(doc(db, 'submissions', id), {
        score: totalScore,
        markedAnswers,
        dadFeedback,
        markedAt: serverTimestamp(),
        status: 'marked',
        autoMarked: false,
        manualOverride: isOverride,
      })

      // Only award points if not previously scored
      if (!submission?.score) {
        let pts = POINTS.submitOnTime
        if (totalScore >= 9) pts += POINTS.score9plus
        else if (totalScore >= 7) pts += POINTS.score7plus
        const normDay = String(dayNum).startsWith('recap') || String(dayNum).startsWith('quiz')
          ? dayNum
          : Number(dayNum)
        await addDoc(collection(db, 'points'), {
          studentId,
          dayNum: normDay,
          amount: pts,
          reason: `Day ${dayNum} marked: ${totalScore}/${questions.length}`,
          createdAt: serverTimestamp(),
        })
      }
      navigate(`/admin/student/${studentId}`)
    } catch (err) {
      console.error('saveMarks error:', err)
      alert(`Save failed: ${err.message}`)
    }
    setSaving(false)
  }

  function getScoreColour(score) {
    if (score >= questions.length * 0.9) return 'text-amber-400'
    if (score >= questions.length * 0.7) return 'text-emerald-400'
    if (score >= questions.length * 0.5) return 'text-amber-400'
    return 'text-red-400'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  if (!submission) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card p-6 max-w-sm w-full text-center">
        <p className="text-slate-400 mb-2">No submission found</p>
        <p className="text-slate-500 text-xs mb-4">
          {student?.name} has not submitted Day {dayNum} yet.
        </p>
        <button onClick={() => navigate(-1)} className="btn-ghost w-full">← Go back</button>
      </div>
    </div>
  )

  // Strip subject prefixes for recap/quiz questions
  function cleanQuestion(q) {
    return (q || '')
      .replace('[Challenge] ', '')
      .replace(/^\[(MATHS|SCIENCE|ENGLISH)\] Q\d+\.? ?/i, '')
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-white font-medium text-sm">
                {isOverride ? 'Override: ' : 'Marking: '}{student?.name} — {isRecapOrQuiz ? dayNum : `Day ${dayNum}`}
              </p>
              {isAutoMarked && (
                <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  Auto-marked
                </span>
              )}
            </div>
            <p className="text-slate-400 text-xs">{dayData?.subject || 'All Subjects'} · {dayData?.topic}</p>
          </div>
          <div className="text-right">
            <p className={`font-bold text-lg ${getScoreColour(totalScore)}`}>{totalScore.toFixed(1)}</p>
            <p className="text-slate-400 text-xs">/ {questions.length}</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">

        {isAutoMarked && (
          <div className="card p-4 border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw size={14} className="text-blue-400" />
              <p className="text-blue-400 text-sm font-medium">Auto-marked by Claude</p>
            </div>
            <p className="text-slate-400 text-xs">Review each question and adjust if needed. Save to finalise.</p>
          </div>
        )}

        {/* Corrections viewer */}
        {submission?.correctionsSubmitted && submission?.corrections && (
          <div className="card overflow-hidden">
            <div className="px-4 py-3 bg-emerald-500/10 border-b border-slate-800 flex items-center gap-2">
              <span className="text-emerald-400 text-sm">✅</span>
              <p className="text-emerald-400 text-sm font-medium">Corrections Submitted by {student?.name}</p>
            </div>
            <div className="divide-y divide-slate-800">
              {Object.entries(submission.corrections).map(([qIdx, correction]) => {
                const ma = submission.markedAnswers?.[qIdx]
                return (
                  <div key={qIdx} className="p-4 space-y-2">
                    <p className="text-slate-400 text-xs font-medium">Q{Number(qIdx) + 1} Correction</p>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
                      <p className="text-xs text-red-400 mb-0.5">Original answer</p>
                      <p className="text-slate-300 text-sm">{submission.answers?.[qIdx] || '(blank)'}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-3 py-2">
                      <p className="text-xs text-emerald-400 mb-0.5">Student correction</p>
                      <p className="text-white text-sm">{correction}</p>
                    </div>
                    {ma?.correctAnswer && (
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2">
                        <p className="text-xs text-blue-400 mb-0.5">Expected answer</p>
                        <p className="text-slate-300 text-xs">{ma.correctAnswer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Handwritten upload — shown when no typed answers */}
        {(!submission?.answers || Object.keys(submission.answers).length === 0) && (
          <div className="card p-4 border border-dashed border-slate-700">
            <p className="text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
              <Image size={14} className="text-slate-400" />
              Handwritten Work — Upload Photo to Mark with AI
            </p>
            <div className="flex gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files?.[0] || null)}
                className="flex-1 text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg
                  file:border-0 file:text-xs file:font-medium file:bg-slate-700 file:text-slate-200
                  hover:file:bg-slate-600"
              />
              <button
                onClick={markHandwrittenImage}
                disabled={!imageFile || markingImage}
                className="btn-primary px-4 py-2 text-sm flex-shrink-0 flex items-center gap-2 disabled:opacity-50"
              >
                {markingImage ? (
                  <><svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>Marking...</>
                ) : 'Mark with AI'}
              </button>
            </div>
            {imageFile && <p className="text-slate-500 text-xs mt-2">📎 {imageFile.name} — ready to mark</p>}
            {!imageFile && (
              <p className="text-slate-500 text-xs mt-2">
                Or mark each question manually below using the 0 / ½ / 1 buttons.
              </p>
            )}
          </div>
        )}

        {/* Score summary */}
        <div className="card p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Current total</p>
            <p className={`text-3xl font-bold ${getScoreColour(totalScore)}`}>
              {totalScore.toFixed(1)}/{questions.length}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Zap size={14} className="text-amber-400" />
            <span className="text-amber-400 font-medium">
              +{totalScore >= 9 ? POINTS.score9plus : totalScore >= 7 ? POINTS.score7plus : 0} pts bonus
            </span>
          </div>
        </div>

        {/* Questions */}
        {questions.map((q, i) => {
          const qText = cleanQuestion(q.q)
          const isChallenge = (q.q || '').includes('[Challenge]')
          const studentAnswer = submission?.answers?.[i] || '(handwritten — see photo)'
          const correctAns = correctAnswers[i] !== undefined
            ? correctAnswers[i]
            : (submission?.markedAnswers?.[i]?.correctAnswer || q.a || '')
          const fb = feedback[i] !== undefined
            ? feedback[i]
            : (submission?.markedAnswers?.[i]?.feedback || '')
          const mark = marks[i]

          return (
            <div key={i} className="card overflow-hidden">
              <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300">Q{i + 1}{isChallenge ? ' ⭐' : ''}</span>
                  <span className="text-xs text-slate-500">{q.a ? 'Has answer key' : 'No answer key'}</span>
                </div>
                <MathText text={qText} className="text-white text-sm leading-relaxed" />
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
                    { value: 0, icon: XCircle, label: '0', colour: 'border-red-500/30 text-red-400 hover:bg-red-500/10' },
                    { value: 0.5, icon: Minus, label: '½', colour: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' },
                    { value: 1, icon: CheckCircle, label: '1', colour: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' },
                  ].map(({ value, icon: Icon, label, colour }) => (
                    <button
                      key={value}
                      onClick={() => setMark(i, value)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border
                        text-sm font-bold transition-all ${colour}
                        ${mark === value ? 'opacity-100 scale-105 ring-1 ring-current' : 'opacity-50'}`}
                    >
                      <Icon size={14} />{label} mark
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 py-3">
                <input
                  type="text"
                  value={fb}
                  onChange={e => setFeedback(prev => ({ ...prev, [i]: e.target.value }))}
                  placeholder="Optional feedback for this question..."
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500
                    rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>
          )
        })}

        {/* Dad's overall message */}
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

        {/* Save button */}
        <button
          onClick={saveMarks}
          disabled={saving || Object.keys(marks).length < questions.length}
          className="btn-gold w-full flex items-center justify-center gap-2 sticky bottom-4"
        >
          {saving ? (
            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>Saving...</>
          ) : (
            <><Save size={16} />{isOverride ? 'Save Override' : 'Save Marks'}</>
          )}
        </button>
        {Object.keys(marks).length < questions.length && (
          <p className="text-center text-slate-500 text-xs">
            Mark all {questions.length} questions to save ({Object.keys(marks).length}/{questions.length} done)
          </p>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { TIMETABLE, SUBJECT_COLOURS, STUDENTS, POINTS } from '../utils/students'
import { BookOpen, FlaskConical, Pencil, ChevronLeft, Send, Star, CheckCircle, Clock, Zap } from 'lucide-react'
import ReviewModal from '../components/ReviewModal'
import AskQuestion from '../components/AskQuestion'

const SUBJECT_ICONS = { Mathematics: BookOpen, Science: FlaskConical, English: Pencil }

// Derive Firestore document ID from studentId + dayNum
function packId(studentId, dayNum) {
  const isRecap = String(dayNum).startsWith('recap')
  return `${studentId}_${isRecap ? dayNum : 'day' + dayNum}`
}

// Normalise dayNum for storage — recaps stay as strings, daily sessions become numbers
function normaliseDayNum(dayNum) {
  return String(dayNum).startsWith('recap') ? dayNum : Number(dayNum)
}

// Render text with real line breaks — splits on \n and returns paragraphs
function TextBlock({ text, className }) {
  if (!text) return null
  const lines = text.split('\n')
  return (
    <div className={className}>
      {lines.map((line, i) =>
        line.trim()
          ? <p key={i} style={{ marginBottom: 4 }}>{line}</p>
          : <div key={i} style={{ height: 8 }} />
      )}
    </div>
  )
}

export default function DayPackPage() {
  const { dayNum } = useParams()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [pack, setPack] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submission, setSubmission] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [marking, setMarking] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('learn')
  const [loadError, setLoadError] = useState(null)

  const studentId = profile?.studentId
  const student = STUDENTS[studentId]
  const dayData = TIMETABLE[studentId]?.find(d => String(d.day) === String(dayNum))

  useEffect(() => {
    if (studentId && dayNum) loadPack()
  }, [dayNum, studentId])

  async function loadPack() {
    try {
      const id = packId(studentId, dayNum)
      const [packSnap, subSnap] = await Promise.all([
        getDoc(doc(db, 'packs', id)),
        getDoc(doc(db, 'submissions', id)),
      ])
      if (packSnap.exists()) setPack(packSnap.data())
      if (subSnap.exists()) {
        const sub = subSnap.data()
        setSubmission(sub)
        setAnswers(sub.answers || {})
        if (sub.score !== undefined) setActiveTab('results')
        else setActiveTab('practice')
      }
    } catch (err) {
      console.error('loadPack error:', err)
      setLoadError('Could not load pack. Please go back and try again.')
    } finally {
      setLoading(false)
    }
  }

  async function submitAnswers() {
    setShowReview(false)
    if (Object.keys(answers).length === 0) return
    setSubmitting(true)
    try {
      const id = packId(studentId, dayNum)
      const subData = {
        studentId,
        dayNum: normaliseDayNum(dayNum),
        subject: dayData?.subject,
        topic: dayData?.topic,
        answers,
        submittedAt: serverTimestamp(),
        status: 'submitted',
      }
      await setDoc(doc(db, 'submissions', id), subData)
      setSubmission(subData)
      setActiveTab('practice')
      await autoMark(answers, pack)
    } catch (err) {
      console.error('submitAnswers error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  async function autoMark(submittedAnswers, packData) {
    const currentPack = packData || pack
    if (!currentPack?.questions?.length) { console.error("autoMark: no questions in pack"); return }
    setMarking(true)
    try {
      const id = packId(studentId, dayNum)
      const response = await fetch('/.netlify/functions/mark-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: currentPack.questions,
          answers: submittedAnswers,
          subject: dayData?.subject,
          topic: dayData?.topic,
          level: student?.level || 'B7',
        }),
      })

      if (!response.ok) throw new Error(`Marking returned ${response.status}`)
      const result = await response.json()

      const markedAnswers = {}
      result.questions?.forEach(q => {
        markedAnswers[q.qNum - 1] = {
          correct: q.correct,
          marks: q.marks,
          feedback: q.feedback || '',
          correctAnswer: q.correctAnswer || '',
        }
      })

      const score = result.totalScore || 0

      await updateDoc(doc(db, 'submissions', id), {
        score,
        markedAnswers,
        dadFeedback: result.overallFeedback || '',
        markedAt: serverTimestamp(),
        status: 'marked',
        autoMarked: true,
      })

      let pts = POINTS.submitOnTime
      if (score >= 9) pts += POINTS.score9plus
      else if (score >= 7) pts += POINTS.score7plus

      await addDoc(collection(db, 'points'), {
        studentId,
        dayNum: normaliseDayNum(dayNum),
        amount: pts,
        reason: `Day ${dayNum} auto-marked: ${score}/10`,
        createdAt: serverTimestamp(),
      })

      const updatedSnap = await getDoc(doc(db, 'submissions', id))
      if (updatedSnap.exists()) {
        setSubmission(updatedSnap.data())
        setActiveTab('results')
      }
    } catch (err) {
      console.error('autoMark error:', err)
      // Graceful fallback — submission saved, pending manual marking
    } finally {
      setMarking(false)
    }
  }

  function getScoreColour(score) {
    if (score >= 9) return 'text-amber-400'
    if (score >= 7) return 'text-emerald-400'
    if (score >= 5) return 'text-amber-400'
    return 'text-red-400'
  }

  // Loading state
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  // Error state
  if (loadError) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card p-6 max-w-sm w-full text-center">
        <p className="text-red-400 mb-4">{loadError}</p>
        <button onClick={() => navigate('/dashboard')} className="btn-ghost w-full">← Back to Dashboard</button>
      </div>
    </div>
  )

  // Day not found
  if (!dayData) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card p-6 max-w-sm w-full text-center">
        <p className="text-slate-400 mb-4">Session not found</p>
        <button onClick={() => navigate('/dashboard')} className="btn-ghost w-full">← Back</button>
      </div>
    </div>
  )

  const colours = SUBJECT_COLOURS[dayData.subject] || SUBJECT_COLOURS.Mathematics
  const SubjectIcon = SUBJECT_ICONS[dayData.subject] || BookOpen
  const questions = pack?.questions || []
  const hasSubmitted = !!submission
  const isMarked = submission?.score !== undefined
  const isRecap = !!dayData.isRecap

  return (
    <div className="min-h-screen pb-20">

      {showReview && (
        <ReviewModal
          onConfirm={submitAnswers}
          onCancel={() => setShowReview(false)}
          answeredCount={Object.keys(answers).length}
          totalCount={questions.length}
        />
      )}

      {marking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center max-w-xs">
            <div className="w-12 h-12 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white font-medium mb-1">Marking your work...</p>
            <p className="text-slate-400 text-sm">Dad's AI is reviewing your answers</p>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="btn-ghost p-2 -ml-2">
              <ChevronLeft size={20} />
            </button>
            <div className={`w-7 h-7 rounded-md flex items-center justify-center ${colours.bg}`}>
              {isRecap ? <span className="text-sm">🔧</span> : <SubjectIcon size={14} className={colours.text} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{dayData.topic}</p>
              <p className="text-slate-400 text-xs">{dayData.subject} · {isRecap ? 'Recap' : `Day ${dayNum}`}</p>
            </div>
            {isMarked && (
              <div className={`font-bold text-sm font-mono ${getScoreColour(submission.score)}`}>
                {submission.score}/{questions.length}
              </div>
            )}
          </div>
          <div className="flex gap-1 mt-3 bg-slate-900 rounded-xl p-1">
            {['learn', 'practice', ...(isMarked ? ['results'] : [])].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all
                  ${activeTab === tab ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>
                {tab === 'learn' ? '📖 Learn' : tab === 'practice' ? '✏️ Practice' : '📊 Results'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6">

        {/* ── LEARN TAB ─────────────────────────────────── */}
        {activeTab === 'learn' && (
          <div className="space-y-4 animate-fade-in">

            {/* Timing banner */}
            <div className="card p-4">
              <div className="grid grid-cols-3 divide-x divide-slate-800 text-center">
                {[['📖 Read', '10 min'], ['✏️ Solve', '35 min'], ['📸 Submit', '5 min']].map(([label, time]) => (
                  <div key={label} className="px-3">
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECAP: intro card */}
            {isRecap && pack?.concepts?.[0] && (
              <div className="card p-5 border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm">{pack.concepts[0].heading}</p>
                    <p className="text-slate-400 text-xs">Repair session — targeted questions only</p>
                  </div>
                </div>
                <TextBlock
                  text={pack.concepts[0].body}
                  className="text-slate-200 text-sm leading-relaxed"
                />
                {pack.concepts[0].note && (
                  <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
                    <p className="text-amber-300 text-xs">📌 {pack.concepts[0].note}</p>
                  </div>
                )}
              </div>
            )}

            {/* RECAP: subject breakdown */}
            {isRecap && questions.length > 0 && (
              <div className="card p-5">
                <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">What This Session Covers</h3>
                <div className="space-y-2">
                  {[
                    { subj: 'Mathematics', prefix: 'MATHS' },
                    { subj: 'Science', prefix: 'SCIENCE' },
                    { subj: 'English', prefix: 'ENGLISH' },
                  ].map(({ subj, prefix }) => {
                    const subjQs = questions.filter(q => (q.q || '').includes('[' + prefix + ']'))
                    if (!subjQs.length) return null
                    const c = SUBJECT_COLOURS[subj] || SUBJECT_COLOURS.Mathematics
                    return (
                      <div key={subj} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${c.bg}`}>
                        <span className={`text-xs font-bold ${c.text}`}>{subj}</span>
                        <span className="text-slate-400 text-xs">{subjQs.length} question{subjQs.length !== 1 ? 's' : ''}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 bg-blue-500/5 border border-blue-500/20 rounded-xl px-3 py-2">
                  <p className="text-blue-300 text-xs">Before you start — review your notes from the sessions listed above. This session tests the same concepts.</p>
                </div>
              </div>
            )}

            {/* DAILY: objectives */}
            {!isRecap && pack?.objectives && (
              <div className="card p-5">
                <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">What You Will Learn Today</h3>
                <div className="space-y-2">
                  {pack.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${colours.bg}`}>
                        <span className={`text-[10px] font-bold ${colours.text}`}>{i + 1}</span>
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DAILY: concept cards */}
            {!isRecap && pack?.concepts?.map((concept, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-5 rounded-full" style={{ background: colours.hex }} />
                  <h3 className="text-white font-semibold text-base">{concept.heading}</h3>
                </div>
                <TextBlock
                  text={concept.body}
                  className="text-slate-200 text-sm leading-relaxed"
                />
                {concept.note && (
                  <div className="mt-4 flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2.5">
                    <span className="text-amber-400 text-sm mt-0.5">📌</span>
                    <TextBlock text={concept.note} className="text-amber-200/80 text-xs leading-relaxed" />
                  </div>
                )}
              </div>
            ))}

            {/* DAILY: worked examples */}
            {!isRecap && pack?.worked?.map((ex, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: colours.hex + '20' }}>
                  <CheckCircle size={14} className={colours.text} />
                  <span className={`text-xs font-semibold ${colours.text}`}>Example {i + 1}</span>
                </div>
                <div className="p-4 border-b border-slate-800">
                  <TextBlock text={ex.q} className="text-white text-sm font-medium leading-relaxed" />
                </div>
                <div className="p-4 bg-emerald-500/5">
                  <p className="text-emerald-400 text-xs font-semibold mb-1.5">Answer</p>
                  <TextBlock text={ex.a} className="text-emerald-200/90 text-sm leading-relaxed" />
                </div>
              </div>
            ))}

            {/* AI Tutor */}
            <AskQuestion
              subject={dayData?.subject}
              topic={dayData?.topic}
              level={student?.level || 'B7'}
              studentId={studentId}
              conceptContext={pack?.concepts?.map(c => c.heading + ': ' + c.body).join('\n\n').substring(0, 500)}
            />

            <button onClick={() => setActiveTab('practice')} className="btn-gold w-full">
              Start Practice Questions →
            </button>
          </div>
        )}

        {/* ── PRACTICE TAB ──────────────────────────────── */}
        {activeTab === 'practice' && (
          <div className="space-y-4 animate-fade-in">

            {hasSubmitted && !isMarked && (
              <div className="card p-4 border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock size={16} />
                  <p className="text-sm font-medium">Submitted — being marked automatically...</p>
                </div>
              </div>
            )}

            {questions.map((q, i) => {
              const isChallenge = (q.q || '').includes('[Challenge]')
              const subjectMatch = (q.q || '').match(/^\[(MATHS|SCIENCE|ENGLISH)\]/i)
              const recapSubject = subjectMatch
                ? subjectMatch[1].charAt(0) + subjectMatch[1].slice(1).toLowerCase()
                : null
              const qText = (q.q || '')
                .replace('[Challenge] ', '')
                .replace(/^\[(MATHS|SCIENCE|ENGLISH)\] Q\d+\.? ?/i, '')
              const answer = answers[i] || ''
              const markedAnswer = submission?.markedAnswers?.[i]

              return (
                <div key={i} className="card overflow-hidden">
                  <div className={`px-4 py-2.5 flex items-center justify-between ${isChallenge ? 'bg-amber-500/10' : 'bg-slate-800/50'}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-mono ${isChallenge ? 'text-amber-400' : colours.text}`}>Q{i + 1}</span>
                      {isChallenge && <span className="text-amber-400 text-xs flex items-center gap-1"><Star size={11} /> Challenge</span>}
                      {recapSubject && <span className="text-slate-400 text-xs bg-slate-800 px-2 py-0.5 rounded-full">{recapSubject}</span>}
                    </div>
                    {markedAnswer && (
                      <span className={`text-xs font-bold ${markedAnswer.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                        {markedAnswer.marks} mark{markedAnswer.marks !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <TextBlock text={qText} className="text-white text-sm leading-relaxed mb-3" />

                    {markedAnswer ? (
                      <div className="space-y-2">
                        <div className={`rounded-xl p-3 ${markedAnswer.correct ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                          <p className="text-xs text-slate-400 mb-1">Your answer</p>
                          <p className="text-white text-sm">{answers[i] || '(no answer)'}</p>
                        </div>
                        {!markedAnswer.correct && markedAnswer.correctAnswer && (
                          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                            <p className="text-xs text-emerald-400 mb-1">Correct answer</p>
                            <TextBlock text={markedAnswer.correctAnswer} className="text-emerald-200/90 text-sm" />
                          </div>
                        )}
                        {markedAnswer.feedback && (
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                            <p className="text-xs text-amber-400 mb-1">📝 Feedback</p>
                            <p className="text-amber-200/80 text-xs leading-relaxed">{markedAnswer.feedback}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <textarea
                        value={answer}
                        onChange={e => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                        disabled={hasSubmitted}
                        placeholder={hasSubmitted ? 'Submitted' : 'Write your answer here...'}
                        rows={3}
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500
                          rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-500 resize-none
                          transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    )}
                  </div>
                </div>
              )
            })}

            {!hasSubmitted && questions.length > 0 && (
              <button
                onClick={() => setShowReview(true)}
                disabled={submitting || Object.keys(answers).length === 0}
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>Submitting...</>
                ) : <><Send size={16} /> Submit to Dad</>}
              </button>
            )}

            <div className="card p-4 border-dashed">
              <p className="text-slate-400 text-xs text-center">
                📸 For diagrams and extended written work — take a clear photo and send to Dad on WhatsApp
              </p>
            </div>
          </div>
        )}

        {/* ── RESULTS TAB ───────────────────────────────── */}
        {activeTab === 'results' && isMarked && (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-6 text-center">
              <p className="text-slate-400 text-sm mb-2">Your Score</p>
              <div className={`text-6xl font-bold mb-2 ${getScoreColour(submission.score)}`}>
                {submission.score}
                <span className="text-slate-500 text-3xl">/{questions.length}</span>
              </div>
              <p className={`text-lg font-medium ${getScoreColour(submission.score)}`}>
                {submission.score >= questions.length * 0.9 ? '🌟 Outstanding!' :
                 submission.score >= questions.length * 0.8 ? '🎉 Excellent!' :
                 submission.score >= questions.length * 0.7 ? '💪 Good work!' :
                 submission.score >= questions.length * 0.5 ? '📚 Keep going!' :
                 '🔄 Review corrections below'}
              </p>
              {submission.autoMarked && (
                <p className="text-slate-500 text-xs mt-2">Marked automatically · Dad may review</p>
              )}
            </div>

            <div className="card p-4 border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amber-400" />
                <p className="text-amber-400 font-medium text-sm">
                  +{submission.score >= 9 ? POINTS.score9plus + POINTS.submitOnTime :
                     submission.score >= 7 ? POINTS.score7plus + POINTS.submitOnTime :
                     POINTS.submitOnTime} points earned
                </p>
              </div>
            </div>

            {submission.dadFeedback && (
              <div className="card p-5 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700">
                    <img src="/dad.jpg" alt="Dad" className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <p className="text-slate-300 text-sm font-medium">Dad's feedback</p>
                </div>
                <p className="text-white text-sm leading-relaxed">"{submission.dadFeedback}"</p>
              </div>
            )}

            <h3 className="text-slate-300 text-sm font-medium px-1">Question Breakdown</h3>
            {questions.map((q, i) => {
              const markedAnswer = submission?.markedAnswers?.[i]
              if (!markedAnswer) return null
              return (
                <div key={i} className={`card p-4 border ${markedAnswer.correct ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Q{i + 1}</span>
                    <span className={`text-sm font-bold ${markedAnswer.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                      {markedAnswer.correct ? '✅' : '❌'} {markedAnswer.marks}mk
                    </span>
                  </div>
                  {!markedAnswer.correct && markedAnswer.correctAnswer && (
                    <div className="mt-2 bg-emerald-500/5 rounded-lg p-3">
                      <p className="text-emerald-400 text-xs mb-1">Correct answer</p>
                      <TextBlock text={markedAnswer.correctAnswer} className="text-emerald-200/90 text-xs" />
                    </div>
                  )}
                  {markedAnswer.feedback && (
                    <p className="text-amber-200/70 text-xs mt-2 leading-relaxed">📝 {markedAnswer.feedback}</p>
                  )}
                </div>
              )
            })}

            {questions.some((q, i) => submission?.markedAnswers?.[i] && !submission.markedAnswers[i].correct) &&
              !submission?.correctionsSubmitted && (
                <button
                  onClick={() => navigate(`/corrections/${dayNum}`)}
                  className="btn-gold w-full flex items-center justify-center gap-2"
                >
                  ✏️ Submit Corrections (+{POINTS.correctionsSubmit} pts)
                </button>
              )}

            {submission?.correctionsSubmitted && (
              <div className="card p-3 border border-emerald-500/20 bg-emerald-500/5 text-center">
                <p className="text-emerald-400 text-sm">✅ Corrections submitted — well done!</p>
              </div>
            )}

            <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">
              ← Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

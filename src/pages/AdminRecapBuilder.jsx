// src/pages/AdminRecapBuilder.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { STUDENTS, TIMETABLE, SUBJECT_COLOURS } from '../utils/students'
import { ChevronLeft, RefreshCw, Save, BookOpen, FlaskConical, Pencil } from 'lucide-react'

const SUBJECT_ICONS = { Mathematics: BookOpen, Science: FlaskConical, English: Pencil }

export default function AdminRecapBuilder() {
  const { studentId, recapNum } = useParams()
  const navigate = useNavigate()
  const [weakAreas, setWeakAreas] = useState([])
  const [generatedPack, setGeneratedPack] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const student = STUDENTS[studentId]

  useEffect(() => { loadWeakAreas() }, [studentId])

  async function loadWeakAreas() {
    const snap = await getDocs(query(collection(db, 'submissions'), where('studentId', '==', studentId)))
    const weak = []
    snap.forEach(d => {
      const sub = d.data()
      if (!sub.markedAnswers || sub.score === undefined) return
      Object.entries(sub.markedAnswers).forEach(([qIdx, ma]) => {
        if (ma.marks < 1) {
          weak.push({
            dayNum: sub.dayNum,
            subject: sub.subject,
            topic: sub.topic,
            qIdx: Number(qIdx) + 1,
            marks: ma.marks,
            correctAnswer: ma.correctAnswer || '',
            feedback: ma.feedback || '',
          })
        }
      })
    })
    // Sort by marks ascending (biggest failures first)
    weak.sort((a, b) => a.marks - b.marks)
    setWeakAreas(weak)
    setLoading(false)
  }

  async function generateRecap() {
    if (weakAreas.length === 0) return
    setGenerating(true)
    try {
      const response = await fetch('/.netlify/functions/generate-recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.name,
          level: student.level,
          weakAreas: weakAreas.slice(0, 9), // max 9 questions (3 per subject)
          recapNum: Number(recapNum),
        }),
      })
      if (!response.ok) throw new Error('Generation failed')
      const result = await response.json()
      setGeneratedPack(result)
    } catch (err) {
      console.error(err)
      alert('Generation failed. Try again.')
    }
    setGenerating(false)
  }

  async function saveRecapPack() {
    if (!generatedPack) return
    setSaving(true)
    try {
      const docId = `${studentId}_recap${recapNum}`
      await setDoc(doc(db, 'packs', docId), {
        studentId,
        dayNum: `recap${recapNum}`,
        subject: 'All',
        topic: generatedPack.title,
        isRecap: true,
        recapNum: Number(recapNum),
        objectives: [`Review and correct weak areas from recent sessions`],
        concepts: [{
          heading: 'About This Session',
          body: generatedPack.intro || 'This session targets your specific weak areas. Read each question carefully.',
          note: 'This is a REPAIR session — every question targets something you got wrong before. You know this material.',
        }],
        worked: [],
        questions: generatedPack.questions.map(q => ({
          q: q.q,
          a: q.a,
          hint: q.hint,
          subject: q.subject,
          topic: q.topic,
        })),
        answerKey: generatedPack.questions.map(q => q.a),
        createdAt: serverTimestamp(),
      })
      alert(`Recap ${recapNum} pack saved! ${student.name} can now access it.`)
      navigate('/admin/analytics')
    } catch (err) {
      console.error(err)
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">R&R Session {recapNum} — {student?.name}</p>
            <p className="text-slate-400 text-xs">{weakAreas.length} weak areas identified</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">

        {/* Weak areas summary */}
        <div>
          <h3 className="text-slate-300 text-sm font-medium mb-3">Weak Areas to Target</h3>
          {weakAreas.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="text-slate-400 text-sm">No weak areas found — {student?.name} is doing well!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {['Mathematics', 'Science', 'English'].map(subject => {
                const subWeak = weakAreas.filter(w => w.subject === subject).slice(0, 3)
                if (subWeak.length === 0) return null
                const colours = SUBJECT_COLOURS[subject] || SUBJECT_COLOURS.Mathematics
                const SubIcon = SUBJECT_ICONS[subject] || BookOpen
                return (
                  <div key={subject} className="card overflow-hidden">
                    <div className={`px-4 py-2 flex items-center gap-2 ${colours.bg}`}>
                      <SubIcon size={13} className={colours.text} />
                      <span className={`text-xs font-semibold ${colours.text}`}>{subject} — {subWeak.length} question{subWeak.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="divide-y divide-slate-800">
                      {subWeak.map((w, i) => (
                        <div key={i} className="px-4 py-2.5">
                          <div className="flex items-center justify-between">
                            <p className="text-slate-300 text-xs">Day {w.dayNum} Q{w.qIdx} — {w.topic}</p>
                            <span className={`text-xs font-bold ${w.marks === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                              {w.marks === 0 ? 'Wrong' : 'Partial'}
                            </span>
                          </div>
                          {w.feedback && <p className="text-slate-500 text-xs mt-0.5 truncate">{w.feedback}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Generate button */}
        {weakAreas.length > 0 && !generatedPack && (
          <button onClick={generateRecap} disabled={generating}
            className="btn-gold w-full flex items-center justify-center gap-2">
            {generating ? (
              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>Generating R&R Pack...</>
            ) : <><RefreshCw size={16} /> Generate Recap & Repair Pack</>}
          </button>
        )}

        {/* Generated pack preview */}
        {generatedPack && (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-4 border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-emerald-400 text-sm font-medium mb-1">✅ Pack Generated</p>
              <p className="text-slate-300 text-sm">{generatedPack.title}</p>
              <p className="text-slate-400 text-xs mt-1">{generatedPack.questions?.length} questions</p>
            </div>

            <div className="card p-4 bg-slate-800/50">
              <p className="text-slate-400 text-xs mb-1">Intro shown to student:</p>
              <p className="text-white text-sm italic">"{generatedPack.intro}"</p>
            </div>

            {generatedPack.questions?.map((q, i) => {
              const colours = SUBJECT_COLOURS[q.subject] || SUBJECT_COLOURS.Mathematics
              return (
                <div key={i} className="card overflow-hidden">
                  <div className={`px-4 py-2 flex items-center gap-2 ${colours.bg}`}>
                    <span className={`text-xs font-bold ${colours.text}`}>Q{i+1}</span>
                    <span className={`text-xs ${colours.text}`}>{q.subject} — {q.topic}</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-white text-sm leading-relaxed">{q.q}</p>
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
                      <p className="text-amber-400 text-xs mb-0.5">💡 Hint</p>
                      <p className="text-amber-200/80 text-xs">{q.hint}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-3 py-2">
                      <p className="text-emerald-400 text-xs mb-0.5">Answer key</p>
                      <p className="text-emerald-200/90 text-xs">{q.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="flex gap-3">
              <button onClick={generateRecap} disabled={generating}
                className="btn-ghost flex-1 flex items-center justify-center gap-2 text-sm">
                <RefreshCw size={14} /> Regenerate
              </button>
              <button onClick={saveRecapPack} disabled={saving}
                className="btn-gold flex-1 flex items-center justify-center gap-2 text-sm">
                {saving ? (
                  <><svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>Saving...</>
                ) : <><Save size={14} /> Save & Publish</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

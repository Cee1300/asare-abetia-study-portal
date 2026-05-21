import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { STUDENTS, TIMETABLE, SUBJECT_COLOURS } from '../utils/students'
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Lock, BookOpen, FlaskConical, Pencil } from 'lucide-react'
import { format, parseISO } from 'date-fns'

const SUBJECT_ICONS = { Mathematics: BookOpen, Science: FlaskConical, English: Pencil }

export default function AdminStudentView() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState({})
  const [loading, setLoading] = useState(true)

  const student = STUDENTS[studentId]
  const timetable = TIMETABLE[studentId] || []

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'submissions'), where('studentId', '==', studentId))
      const snap = await getDocs(q)
      const subMap = {}
      snap.forEach(d => { subMap[d.data().dayNum] = d.data() })
      setSubmissions(subMap)
      setLoading(false)
    }
    load()
  }, [studentId])

  function getScoreColour(score) {
    if (score >= 9) return 'text-gold-400'
    if (score >= 7) return 'text-emerald-400'
    if (score >= 5) return 'text-amber-400'
    return 'text-red-400'
  }

  const marked = Object.values(submissions).filter(s => s.score !== undefined)
  const avgScore = marked.length > 0
    ? marked.reduce((sum, s) => sum + s.score, 0) / marked.length
    : 0

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-navy-600 border-t-gold-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-40 bg-navy-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/admin')} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: student?.colour + '30', color: student?.colour }}
          >
            {student?.name[0]}
          </div>
          <div>
            <p className="text-white font-medium">{student?.name}</p>
            <p className="text-navy-400 text-xs">{student?.class} · {student?.level}</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Completed', value: marked.length },
            { label: 'Avg Score', value: marked.length > 0 ? `${avgScore.toFixed(1)}/10` : '—' },
            { label: 'Pending', value: Object.values(submissions).filter(s => s.score === undefined).length },
          ].map(({ label, value }) => (
            <div key={label} className="card p-4 text-center">
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-navy-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Score chart */}
        {marked.length > 0 && (
          <div className="card p-4">
            <p className="text-navy-300 text-xs font-medium mb-3">Score History</p>
            <div className="flex items-end gap-1.5 h-16">
              {timetable.map(day => {
                const sub = submissions[day.day]
                const score = sub?.score
                const height = score !== undefined ? (score / 10) * 100 : 0
                const colours = SUBJECT_COLOURS[day.subject]
                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm transition-all duration-500"
                      style={{
                        height: `${height}%`,
                        minHeight: score !== undefined ? '4px' : '0px',
                        background: score !== undefined ? colours.hex : 'transparent',
                        opacity: score !== undefined ? 1 : 0.2,
                      }}
                    />
                    <span className="text-[9px] text-navy-600">{day.day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All days */}
        <div className="space-y-2">
          {timetable.map(day => {
            const sub = submissions[day.day]
            const isMarked = sub?.score !== undefined
            const isPending = sub && !isMarked
            const SubIcon = SUBJECT_ICONS[day.subject] || BookOpen
            const colours = SUBJECT_COLOURS[day.subject]

            return (
              <div
                key={day.day}
                onClick={() => isPending ? navigate(`/admin/mark/${studentId}/${day.day}`) : undefined}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all
                  ${isPending ? 'border-amber-500/30 bg-amber-500/5 cursor-pointer hover:border-amber-500/50' :
                    isMarked ? 'border-slate-800 bg-slate-900' : 'border-slate-800/50 bg-slate-900/30 opacity-50'}`}
              >
                <span className="text-slate-500 text-xs font-mono w-5">{day.day}</span>

                <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${colours.bg}`}>
                  <SubIcon size={13} className={colours.text} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{day.topic}</p>
                  <p className="text-slate-500 text-xs">
                    {sub?.submittedAt
                      ? `Submitted ${format(new Date(sub.submittedAt.seconds * 1000), 'EEE, MMM d')}`
                      : format(parseISO(day.date), 'EEE, MMM d')}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {isMarked && (
                    <span className={`font-bold text-sm font-mono ${getScoreColour(sub.score)}`}>
                      {sub.score}/10
                    </span>
                  )}
                  {isPending && (
                    <span className="text-amber-400 text-xs flex items-center gap-1 font-medium">
                      Mark <ChevronRight size={14} />
                    </span>
                  )}
                  {!sub && <Lock size={13} className="text-slate-700" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

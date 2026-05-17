import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { TIMETABLE, SUBJECT_COLOURS, STUDENTS } from '../utils/students'
import { format, parseISO, isToday, isPast } from 'date-fns'
import {
  BookOpen, FlaskConical, Pencil, Star,
  ChevronRight, Lock, CheckCircle, Clock, Zap, LogOut
} from 'lucide-react'

const SUBJECT_ICONS = {
  Mathematics: BookOpen,
  Science: FlaskConical,
  English: Pencil,
}

export default function StudentDashboard() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState({})
  const [points, setPoints] = useState(0)
  const [dadMessage, setDadMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const studentId = profile?.studentId
  const student = STUDENTS[studentId]
  const timetable = TIMETABLE[studentId] || []

  useEffect(() => {
    if (!studentId) return
    loadData()
  }, [studentId])

  async function loadData() {
    const q = query(collection(db, 'submissions'), where('studentId', '==', studentId))
    const snap = await getDocs(q)
    const subMap = {}
    snap.forEach(d => { subMap[d.data().dayNum] = d.data() })
    setSubmissions(subMap)

    const pointsSnap = await getDocs(query(collection(db, 'points'), where('studentId', '==', studentId)))
    let total = 0
    pointsSnap.forEach(d => { total += d.data().amount || 0 })
    setPoints(total)

    const msgSnap = await getDocs(query(collection(db, 'dadMessages'), where('studentId', '==', studentId)))
    if (!msgSnap.empty) {
      const msgs = []
      msgSnap.forEach(d => msgs.push(d.data()))
      msgs.sort((a, b) => b.createdAt - a.createdAt)
      setDadMessage(msgs[0]?.message || '')
    }

    setLoading(false)
  }

  function getPackStatus(day) {
    const packDate = parseISO(day.date)
    const sub = submissions[day.day]
    if (sub?.score !== undefined) return 'marked'
    if (sub) return 'submitted'
    if (isToday(packDate)) return 'today'
    if (isPast(packDate)) return 'overdue'
    return 'upcoming'
  }

  function getScoreColour(score) {
    if (score >= 9) return 'text-amber-400'
    if (score >= 7) return 'text-emerald-400'
    if (score >= 5) return 'text-amber-400'
    return 'text-red-400'
  }

  const completed = Object.values(submissions).filter(s => s.score !== undefined).length
  const avgScore = completed > 0
    ? Object.values(submissions).filter(s => s.score !== undefined)
        .reduce((sum, s) => sum + s.score, 0) / completed
    : 0

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-16">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: student?.colour }}
            >
              {student?.name[0]}
            </div>
            <div>
              <p className="text-white font-medium text-sm leading-tight">{student?.name}</p>
              <p className="text-slate-400 text-xs">{student?.class} • {student?.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
              <Zap size={13} className="text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">{points}</span>
              <span className="text-slate-400 text-xs">pts</span>
            </div>
            <button onClick={logout} className="btn-ghost p-2">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">

        {/* Welcome card with Dad's photo */}
        <div className="card overflow-hidden animate-fade-up">
          <div className="flex items-center gap-4 p-5">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 overflow-hidden bg-slate-700 flex items-center justify-center">
                <img
                  src="/dad.jpg"
                  alt="Dad"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                />
                <div className="hidden w-full h-full items-center justify-center text-2xl">👨🏾</div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-xs mb-1">Message from Dad</p>
              {dadMessage ? (
                <p className="text-white font-medium leading-snug">"{dadMessage}"</p>
              ) : (
                <p className="text-white font-medium leading-snug">
                  "Good morning, {student?.name}. Your pack is ready. Let's go. 💪"
                </p>
              )}
            </div>
          </div>
          {student?.prioritySubject && (
            <div className="border-t border-slate-800 px-5 py-3 bg-red-500/5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <p className="text-red-400 text-xs font-medium">
                🔬 Science is your priority subject this term — give it your best every session
              </p>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 animate-fade-up delay-100">
          {[
            { label: 'Days Done', value: completed, icon: CheckCircle, colour: 'text-emerald-400' },
            { label: 'Avg Score', value: completed > 0 ? `${avgScore.toFixed(1)}/10` : '—', icon: Star, colour: 'text-amber-400' },
            { label: 'Points', value: points, icon: Zap, colour: 'text-blue-400' },
          ].map(({ label, value, icon: Icon, colour }) => (
            <div key={label} className="card p-4 text-center">
              <Icon size={18} className={`${colour} mx-auto mb-2`} />
              <p className={`font-bold text-lg ${colour}`}>{value}</p>
              <p className="text-slate-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Today's pack highlight */}
        {timetable.filter(d => getPackStatus(d) === 'today').map(day => {
          const SubjectIcon = SUBJECT_ICONS[day.subject] || BookOpen
          const colours = SUBJECT_COLOURS[day.subject]
          return (
            <div
              key={day.day}
              onClick={() => navigate(`/pack/${day.day}`)}
              className="card-hover cursor-pointer p-5 border-2 animate-fade-up delay-200"
              style={{ borderColor: colours.hex + '40' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${colours.bg}`}>
                  <SubjectIcon size={13} className={colours.text} />
                </div>
                <span className={`subject-badge ${colours.bg} ${colours.text} ${colours.border}`}>
                  {day.subject}
                </span>
                <span className="ml-auto text-xs text-slate-400">Day {day.day}</span>
              </div>
              <h2 className="text-lg text-white font-semibold mb-1">{day.topic}</h2>
              <p className="text-slate-400 text-sm mb-4">{day.standard} · Today</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock size={14} />
                  <span>50 minutes · Read → Solve → Submit</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
                  Start <ChevronRight size={16} />
                </div>
              </div>
            </div>
          )
        })}

        {/* All packs list */}
        <div className="animate-fade-up delay-300">
          <h3 className="text-slate-300 text-sm font-medium mb-3 px-1">All Sessions</h3>
          <div className="space-y-2">
            {timetable.map(day => {
              const status = getPackStatus(day)
              const sub = submissions[day.day]
              const SubjectIcon = SUBJECT_ICONS[day.subject] || BookOpen
              const colours = SUBJECT_COLOURS[day.subject]
              const isLocked = status === 'upcoming'
              const isAccessible = !isLocked

              return (
                <div
                  key={day.day}
                  onClick={() => isAccessible && navigate(`/pack/${day.day}`)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200
                    ${isLocked
                      ? 'border-slate-800/50 opacity-40 cursor-not-allowed bg-slate-900/30'
                      : 'border-slate-800 hover:border-slate-600 cursor-pointer bg-slate-900 hover:bg-slate-800/50'
                    }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-400 text-xs font-mono font-bold">{day.day}</span>
                  </div>

                  <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${colours.bg}`}>
                    <SubjectIcon size={13} className={colours.text} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{day.topic}</p>
                    <p className="text-slate-500 text-xs">
                      {format(parseISO(day.date), 'EEE, MMM d')} · {day.subject}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {status === 'marked' && (
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm font-mono ${getScoreColour(sub.score)}`}>
                          {sub.score}/10
                        </span>
                        <CheckCircle size={15} className="text-emerald-400" />
                      </div>
                    )}
                    {status === 'submitted' && (
                      <span className="text-amber-400 text-xs flex items-center gap-1">
                        <Clock size={13} /> Pending
                      </span>
                    )}
                    {status === 'today' && (
                      <span className="text-amber-400 text-xs font-medium flex items-center gap-1">
                        <Star size={13} /> Today
                      </span>
                    )}
                    {status === 'overdue' && (
                      <span className="text-red-400 text-xs">Overdue</span>
                    )}
                    {status === 'upcoming' && (
                      <Lock size={14} className="text-slate-600" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
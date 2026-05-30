import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, getDoc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { TIMETABLE, SUBJECT_COLOURS, STUDENTS } from '../utils/students'
import { BADGES, getTitle, getAvatar, checkNewBadges } from '../utils/rewards'
import { format, parseISO, differenceInCalendarDays } from 'date-fns'
import {
  BookOpen, FlaskConical, Pencil, Star,
  ChevronRight, Lock, CheckCircle, Clock, Zap, LogOut, Trophy
} from 'lucide-react'
import BadgeUnlock from '../components/BadgeUnlock'

const SUBJECT_ICONS = { Mathematics: BookOpen, Science: FlaskConical, English: Pencil }

export default function StudentDashboard() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState({})
  const [points, setPoints] = useState(0)
  const [dadMessage, setDadMessage] = useState('')
  const [earnedBadges, setEarnedBadges] = useState([])
  const [newBadges, setNewBadges] = useState([])
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState([])

  const studentId = profile?.studentId
  const student = STUDENTS[studentId]
  const timetable = TIMETABLE[studentId] || []

  useEffect(() => { if (studentId) loadData() }, [studentId])

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
      msgs.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0))
      setDadMessage(msgs[0]?.message || '')
    }

    const badgeSnap = await getDoc(doc(db, 'badges', studentId))
    const existing = badgeSnap.exists() ? (badgeSnap.data().earned || []) : []
    setEarnedBadges(existing)

    const unlocked = checkNewBadges(subMap, existing)
    if (unlocked.length > 0) {
      const updated = [...existing, ...unlocked]
      await setDoc(doc(db, 'badges', studentId), { earned: updated, updatedAt: serverTimestamp() })
      for (const badgeId of unlocked) {
        const badge = BADGES[badgeId]
        if (badge) {
          await addDoc(collection(db, 'points'), {
            studentId, amount: badge.points,
            reason: `Badge unlocked: ${badge.name}`,
            createdAt: serverTimestamp(),
          })
          total += badge.points
        }
      }
      setPoints(total)
      setEarnedBadges(updated)
      setNewBadges(unlocked)
    }

    const marked = Object.values(subMap).filter(s => s.score !== undefined)
    marked.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0))
    let currentStreak = marked.length > 0 ? 1 : 0
    for (let i = 1; i < marked.length; i++) {
      const prev = new Date(marked[i-1].submittedAt?.seconds * 1000)
      const curr = new Date(marked[i].submittedAt?.seconds * 1000)
      if (differenceInCalendarDays(prev, curr) <= 2) currentStreak++
      else break
    }
    setStreak(currentStreak)
    // Load leaderboard
    try {
      const board = []
      for (const [id, s] of Object.entries(STUDENTS)) {
        const lsnap = await getDocs(query(collection(db, 'points'), where('studentId', '==', id)))
        let pts = 0
        lsnap.forEach(d => { pts += d.data().amount || 0 })
        board.push({ id, name: s.name, colour: s.colour, points: pts })
      }
      board.sort((a, b) => b.points - a.points)
      setLeaderboard(board)
    } catch (err) { console.error('Leaderboard error:', err) }

    setLoading(false)
  }

  function getPackStatus(day) {
    const sub = submissions[day.day] || submissions[String(day.day)]
    if (sub?.score !== undefined) return 'marked'
    if (sub) return 'submitted'
    // Quiz sessions — available once all 20 regular days are done
    if (day.isQuiz) {
      const regularDays = timetable.filter(d => typeof d.day === 'number')
      const allDone = regularDays.every(d => submissions[d.day]?.score !== undefined)
      return allDone ? 'available' : 'upcoming'
    }
    // Recap sessions always available
    if (day.isRecap) return 'available'
    // Day 1 always available
    if (day.day === 1) {
      const today = new Date()
      const packDate = new Date(day.date)
      return packDate < today ? 'overdue' : 'available'
    }
    // Sequential unlock: previous day must be MARKED
    const prevSub = submissions[day.day - 1] || submissions[String(day.day - 1)]
    if (prevSub?.score !== undefined) {
      const today = new Date()
      const packDate = new Date(day.date)
      return packDate < today ? 'overdue' : 'available'
    }
    return 'upcoming'
  }

  function getScoreColour(score) {
    if (score >= 9) return 'text-amber-400'
    if (score >= 7) return 'text-emerald-400'
    if (score >= 5) return 'text-amber-400'
    return 'text-red-400'
  }

  // Day label for display
  function dayLabel(day) {
    if (day.isQuiz) return `Quiz ${day.day.replace('quiz', '')}`
    if (day.isRecap) return `R&R ${day.day.replace('recap', '')}`
    return `Day ${day.day}`
  }

  const completed = Object.values(submissions).filter(s => s.score !== undefined).length
  const avgScore = completed > 0
    ? Object.values(submissions).filter(s => s.score !== undefined).reduce((sum, s) => sum + s.score, 0) / completed
    : 0

  const title = getTitle(points)
  const avatar = getAvatar(points)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-16">
      {newBadges.length > 0 && <BadgeUnlock badgeIds={newBadges} onClose={() => setNewBadges([])} />}

      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/rewards')}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg border border-amber-500/30 bg-slate-800">
              {avatar.emoji}
            </div>
            <div>
              <p className="text-white font-medium text-sm leading-tight">{student?.name}</p>
              <p className={`text-xs font-medium ${title.colour}`}>{title.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {streak >= 3 && (
              <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1.5 rounded-full">
                <span className="text-xs">🔥</span>
                <span className="text-orange-400 text-xs font-bold">{streak}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full cursor-pointer" onClick={() => navigate('/rewards')}>
              <Zap size={13} className="text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">{points}</span>
              <span className="text-slate-400 text-xs">pts</span>
            </div>
            <button onClick={() => navigate('/rewards')} className="btn-ghost p-2">
              <Trophy size={16} className="text-amber-400" />
            </button>
            <button onClick={logout} className="btn-ghost p-2">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">

        {/* Dad message */}
        <div className="card overflow-hidden animate-fade-up">
          <div className="flex items-center gap-4 p-5">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 overflow-hidden bg-slate-700 flex items-center justify-center">
                <img src="/dad.jpg" alt="Dad" className="w-full h-full object-cover"
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                <div className="hidden w-full h-full items-center justify-center text-2xl">👨🏾</div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-xs mb-1">Message from Dad</p>
              <p className="text-white font-medium leading-snug">
                "{dadMessage || `Good morning, ${student?.name}. Your pack is ready. Let's go. 💪`}"
              </p>
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

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 animate-fade-up delay-100">
          {[
            { label: 'Done', value: completed, icon: CheckCircle, colour: 'text-emerald-400' },
            { label: 'Average', value: completed > 0 ? `${avgScore.toFixed(1)}` : '—', icon: Star, colour: 'text-amber-400' },
            { label: 'Points', value: points, icon: Zap, colour: 'text-blue-400' },
            { label: 'Streak', value: `${streak}🔥`, icon: null, colour: 'text-orange-400' },
          ].map(({ label, value, icon: Icon, colour }) => (
            <div key={label} className="card p-3 text-center">
              {Icon && <Icon size={15} className={`${colour} mx-auto mb-1.5`} />}
              <p className={`font-bold text-base ${colour}`}>{value}</p>
              <p className="text-slate-500 text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Mini leaderboard */}
        {leaderboard.length > 0 && (
          <div className="card overflow-hidden animate-fade-up cursor-pointer" onClick={() => navigate('/rewards')}>
            <div className="px-4 py-2.5 bg-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={13} className="text-amber-400" />
                <p className="text-white text-xs font-medium">Leaderboard</p>
              </div>
              <ChevronRight size={13} className="text-slate-500" />
            </div>
            <div className="divide-y divide-slate-800/50">
              {leaderboard.map((entry, i) => {
                const isMe = entry.id === studentId
                const emoji = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'
                return (
                  <div key={entry.id} className={`px-4 py-2.5 flex items-center gap-3 ${isMe ? 'bg-amber-500/5' : ''}`}>
                    <span className="text-sm w-6 text-center">{emoji}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ background: entry.colour + '40', color: entry.colour }}>
                      {entry.name[0]}
                    </div>
                    <p className={`flex-1 text-xs font-medium ${isMe ? 'text-amber-400' : 'text-white'}`}>
                      {entry.name}{isMe ? ' (you)' : ''}
                    </p>
                    <span className={`text-xs font-bold ${isMe ? 'text-amber-400' : 'text-slate-400'}`}>
                      {entry.points} pts
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="card p-4 cursor-pointer hover:border-slate-600 transition-all" onClick={() => navigate('/rewards')}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-300 text-sm font-medium">🏅 My Badges ({earnedBadges.length})</p>
              <ChevronRight size={14} className="text-slate-500" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {earnedBadges.slice(0, 6).map(id => {
                const badge = BADGES[id]
                if (!badge) return null
                return (
                  <div key={id} className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center text-xl shadow-md`} title={badge.name}>
                    {badge.icon}
                  </div>
                )
              })}
              {earnedBadges.length > 6 && (
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 font-bold">
                  +{earnedBadges.length - 6}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active packs — available or overdue */}
        {timetable.filter(d => {
          const status = getPackStatus(d)
          return (status === 'available' || status === 'overdue') && !submissions[d.day]
        }).map(day => {
          const SubjectIcon = SUBJECT_ICONS[day.subject] || BookOpen
          const colours = SUBJECT_COLOURS[day.subject] || SUBJECT_COLOURS.Mathematics
          const isQuiz = !!day.isQuiz
          const borderColour = isQuiz ? '#ef4444' : colours.hex
          return (
            <div key={day.day} onClick={() => navigate(`/pack/${day.day}`)}
              className="card-hover cursor-pointer p-5 border-2 animate-fade-up delay-200"
              style={{ borderColor: borderColour + '40' }}>
              <div className="flex items-center gap-2 mb-3">
                {isQuiz
                  ? <div className="w-6 h-6 rounded-md flex items-center justify-center bg-red-500/10">
                      <span className="text-xs">📝</span>
                    </div>
                  : <div className={`w-6 h-6 rounded-md flex items-center justify-center ${colours.bg}`}>
                      <SubjectIcon size={13} className={colours.text} />
                    </div>
                }
                <span className={`subject-badge ${isQuiz ? 'bg-red-500/10 text-red-400 border-red-500/20' : `${colours.bg} ${colours.text} ${colours.border}`}`}>
                  {isQuiz ? 'Assessment' : day.subject}
                </span>
                <span className="ml-auto text-xs text-slate-400">{dayLabel(day)}</span>
              </div>
              <h2 className="text-lg text-white font-semibold mb-1">{day.topic}</h2>
              <p className="text-slate-400 text-sm mb-4">
                {isQuiz ? '15 questions · No hints · Show all working' : `${day.standard} · Today`}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Clock size={14} />
                  <span>{isQuiz ? '60 minutes · Assessment' : '50 minutes · Read → Solve → Submit'}</span>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isQuiz ? 'text-red-400' : 'text-amber-400'}`}>
                  {isQuiz ? 'Begin Quiz' : 'Start'} <ChevronRight size={16} />
                </div>
              </div>
            </div>
          )
        })}

        {/* All sessions list */}
        <div className="animate-fade-up delay-300">
          <h3 className="text-slate-300 text-sm font-medium mb-3 px-1">All Sessions</h3>
          <div className="space-y-2">
            {timetable.map(day => {
              const status = getPackStatus(day)
              const sub = submissions[day.day]
              const SubjectIcon = SUBJECT_ICONS[day.subject] || BookOpen
              const colours = SUBJECT_COLOURS[day.subject] || SUBJECT_COLOURS.Mathematics
              const isLocked = status === 'upcoming'
              const isOverdue = status === 'overdue'
              const isQuiz = !!day.isQuiz
              const isRecap = !!day.isRecap

              return (
                <div key={day.day}
                  onClick={() => !isLocked && navigate(`/pack/${day.day}`)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200
                    ${isLocked
                      ? 'border-slate-800/50 opacity-40 cursor-not-allowed bg-slate-900/30'
                      : isQuiz
                        ? 'border-red-500/20 hover:border-red-500/40 cursor-pointer bg-red-500/5'
                        : 'border-slate-800 hover:border-slate-600 cursor-pointer bg-slate-900 hover:bg-slate-800/50'
                    }`}>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    {isQuiz
                      ? <span className="text-xs">📝</span>
                      : isRecap
                        ? <span className="text-xs">🔧</span>
                        : <span className="text-slate-400 text-xs font-mono font-bold">{day.day}</span>
                    }
                  </div>
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isQuiz ? 'bg-red-500/10' : colours.bg}`}>
                    {isQuiz
                      ? <span className="text-xs text-red-400 font-bold">Q</span>
                      : <SubjectIcon size={13} className={colours.text} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{day.topic}</p>
                    <p className="text-slate-500 text-xs">
                      {format(parseISO(day.date), 'EEE, MMM d')} · {isQuiz ? 'Assessment' : isRecap ? 'R&R' : day.subject}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {status === 'marked' && (
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm font-mono ${getScoreColour(sub.score)}`}>
                          {sub.score}/{isQuiz ? 15 : 10}
                        </span>
                        {sub.correctionsSubmitted
                          ? <CheckCircle size={15} className="text-emerald-400" />
                          : (sub.markedAnswers && Object.values(sub.markedAnswers).some(m => !m.correct))
                            ? <span className="text-orange-400 text-[10px] font-medium">✏️ Fix</span>
                            : <CheckCircle size={15} className="text-emerald-400" />
                        }
                      </div>
                    )}
                    {status === 'submitted' && (
                      <span className="text-amber-400 text-xs flex items-center gap-1">
                        <Clock size={13} /> Pending
                      </span>
                    )}
                    {(status === 'available' || status === 'overdue') && (
                      <span className={status === 'overdue' ? 'text-red-400 text-xs font-medium' : isQuiz ? 'text-red-400 text-xs font-medium' : 'text-amber-400 text-xs font-medium flex items-center gap-1'}>
                        {status === 'overdue' ? 'Overdue' : isQuiz ? '📝 Ready' : <><Star size={13} /> Next</>}
                      </span>
                    )}
                    {status === 'upcoming' && <Lock size={14} className="text-slate-600" />}
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

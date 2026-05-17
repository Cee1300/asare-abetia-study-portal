import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { STUDENTS } from '../utils/students'
import {
  BookOpen, FlaskConical, Pencil, ChevronRight,
  LogOut, Bell, Clock, CheckCircle, AlertCircle, Zap
} from 'lucide-react'

const SUBJECT_ICONS = { Mathematics: BookOpen, Science: FlaskConical, English: Pencil }

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({})
  const [pendingSubmissions, setPendingSubmissions] = useState([])
  const [dadMessages, setDadMessages] = useState({ jezreel: '', declyn: '', ivan: '' })
  const [loading, setLoading] = useState(true)
  const [savingMsg, setSavingMsg] = useState('')

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const allSubmissions = []
    const studentStats = {}

    for (const [id, student] of Object.entries(STUDENTS)) {
      const q = query(collection(db, 'submissions'), where('studentId', '==', id))
      const snap = await getDocs(q)
      const subs = []
      snap.forEach(d => subs.push({ id: d.id, ...d.data() }))

      const marked = subs.filter(s => s.score !== undefined)
      const pending = subs.filter(s => s.score === undefined)
      const avgScore = marked.length > 0
        ? marked.reduce((sum, s) => sum + s.score, 0) / marked.length
        : 0

      studentStats[id] = { marked: marked.length, pending: pending.length, avgScore, total: subs.length }
      pending.forEach(s => allSubmissions.push({ ...s, studentName: student.name, studentId: id }))
    }

    for (const id of Object.keys(STUDENTS)) {
      const q = query(collection(db, 'points'), where('studentId', '==', id))
      const snap = await getDocs(q)
      let pts = 0
      snap.forEach(d => { pts += d.data().amount || 0 })
      studentStats[id].points = pts
    }

    const msgSnap = await getDocs(collection(db, 'dadMessages'))
    const msgs = { jezreel: '', declyn: '', ivan: '' }
    msgSnap.forEach(d => {
      const data = d.data()
      if (msgs[data.studentId] !== undefined) msgs[data.studentId] = data.message || ''
    })

    setStats(studentStats)
    setPendingSubmissions(allSubmissions.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0)))
    setDadMessages(msgs)
    setLoading(false)
  }

  async function saveDadMessage(studentId) {
    setSavingMsg(studentId)
    await setDoc(doc(db, 'dadMessages', `msg_${studentId}`), {
      studentId,
      message: dadMessages[studentId],
      updatedAt: serverTimestamp(),
    })
    setTimeout(() => setSavingMsg(''), 1500)
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
    <div className="min-h-screen pb-16">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg text-white font-semibold">Admin Panel</h1>
            <p className="text-slate-400 text-xs">Asare-Abetia Study Portal</p>
          </div>
          <div className="flex items-center gap-2">
            {pendingSubmissions.length > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
                <Bell size={13} className="text-amber-400" />
                <span className="text-amber-400 text-xs font-medium">{pendingSubmissions.length} pending</span>
              </div>
            )}
            <button onClick={logout} className="btn-ghost p-2">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-6 space-y-8">

        {/* Student cards */}
        <div>
          <h2 className="text-slate-300 text-sm font-medium mb-3">Students</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(STUDENTS).map(([id, student]) => {
              const st = stats[id] || {}
              return (
                <div
                  key={id}
                  onClick={() => navigate(`/admin/student/${id}`)}
                  className="card-hover cursor-pointer p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                        style={{ background: student.colour + '30', color: student.colour }}
                      >
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-slate-400 text-xs">{student.class}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                      <p className={`font-bold text-base ${getScoreColour(st.avgScore || 0)}`}>
                        {st.avgScore ? st.avgScore.toFixed(1) : '—'}
                      </p>
                      <p className="text-slate-500 text-[10px]">Avg Score</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                      <p className="font-bold text-base text-blue-400">{st.points || 0}</p>
                      <p className="text-slate-500 text-[10px]">Points</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle size={11} /> {st.marked || 0} marked
                    </span>
                    {st.pending > 0 && (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Clock size={11} /> {st.pending} pending
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pending submissions */}
        {pendingSubmissions.length > 0 && (
          <div>
            <h2 className="text-slate-300 text-sm font-medium mb-3 flex items-center gap-2">
              <AlertCircle size={14} className="text-amber-400" />
              Pending Marking ({pendingSubmissions.length})
            </h2>
            <div className="space-y-2">
              {pendingSubmissions.map(sub => {
                const SubIcon = SUBJECT_ICONS[sub.subject] || BookOpen
                const colours = {
                  Mathematics: 'text-blue-400 bg-blue-500/10',
                  Science: 'text-emerald-400 bg-emerald-500/10',
                  English: 'text-purple-400 bg-purple-500/10',
                }[sub.subject] || 'text-blue-400 bg-blue-500/10'

                return (
                  <div
                    key={sub.id}
                    onClick={() => navigate(`/admin/mark/${sub.studentId}/${sub.dayNum}`)}
                    className="card-hover cursor-pointer p-4 flex items-center gap-4"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colours.split(' ')[1]}`}>
                      <SubIcon size={16} className={colours.split(' ')[0]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{sub.topic}</p>
                      <p className="text-slate-400 text-xs">{sub.studentName} · Day {sub.dayNum} · {sub.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 text-xs flex-shrink-0">
                      <Clock size={12} />
                      <span>Mark now</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Dad messages */}
        <div>
          <h2 className="text-slate-300 text-sm font-medium mb-3">Daily Messages to Boys</h2>
          <div className="space-y-3">
            {Object.entries(STUDENTS).map(([id, student]) => (
              <div key={id} className="card p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: student.colour }}
                  >
                    {student.name[0]}
                  </div>
                  <p className="text-white text-sm font-medium">{student.name}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dadMessages[id]}
                    onChange={e => setDadMessages(prev => ({ ...prev, [id]: e.target.value }))}
                    placeholder={`Message for ${student.name}...`}
                    className="input-field flex-1 py-2.5 text-sm"
                  />
                  <button
                    onClick={() => saveDadMessage(id)}
                    className="btn-primary px-4 py-2.5 text-sm flex-shrink-0"
                  >
                    {savingMsg === id ? '✓' : 'Send'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
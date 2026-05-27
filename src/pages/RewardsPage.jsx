// src/pages/RewardsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { STUDENTS, POINTS } from '../utils/students'
import { ChevronLeft, Zap, Trophy, Star, TrendingUp } from 'lucide-react'
import { getStudentBadges, getTitle, getAvatar } from '../utils/rewards'

export default function RewardsPage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [pointsHistory, setPointsHistory] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  const studentId = profile?.studentId
  const student = STUDENTS[studentId]

  useEffect(() => { loadData() }, [studentId])

  async function loadData() {
    if (!studentId) return

    // Load this student's points history
    const q = query(
      collection(db, 'points'),
      where('studentId', '==', studentId),
      orderBy('createdAt', 'desc')
    )
    const snap = await getDocs(q)
    const history = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    const total = history.reduce((sum, p) => sum + (p.amount || 0), 0)
    setPointsHistory(history)
    setTotalPoints(total)

    // Load leaderboard — all students' total points
    const board = []
    for (const [id, s] of Object.entries(STUDENTS)) {
      const lq = query(collection(db, 'points'), where('studentId', '==', id))
      const lsnap = await getDocs(lq)
      let pts = 0
      lsnap.forEach(d => { pts += d.data().amount || 0 })
      board.push({ id, name: s.name, colour: s.colour, points: pts, level: s.level })
    }
    board.sort((a, b) => b.points - a.points)
    setLeaderboard(board)
    setLoading(false)
  }

  function formatDate(ts) {
    if (!ts) return ''
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  }

  function getPointsColour(amount) {
    if (amount >= 25) return 'text-amber-400'
    if (amount >= 15) return 'text-emerald-400'
    if (amount >= 10) return 'text-blue-400'
    return 'text-slate-400'
  }

  function getRankEmoji(index) {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `${index + 1}.`
  }

  const myRank = leaderboard.findIndex(b => b.id === studentId)
  const badges = getStudentBadges ? getStudentBadges(studentId, pointsHistory) : []
  const title = getTitle ? getTitle(totalPoints) : ''

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <Trophy size={18} className="text-amber-400" />
          <div>
            <p className="text-white font-medium text-sm">Rewards</p>
            <p className="text-slate-400 text-xs">{student?.name} · {totalPoints} points</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">

        {/* Points total card */}
        <div className="card p-6 text-center border border-amber-500/20">
          <div className="text-5xl font-bold text-amber-400 mb-1">{totalPoints}</div>
          <p className="text-slate-400 text-sm mb-2">Total Points</p>
          {title && <p className="text-amber-300 text-xs font-medium">{title}</p>}
          {myRank >= 0 && (
            <p className="text-slate-400 text-xs mt-1">
              {getRankEmoji(myRank)} Rank {myRank + 1} of {leaderboard.length}
            </p>
          )}
        </div>

        {/* How points are earned */}
        <div className="card p-5">
          <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap size={12} className="text-amber-400" /> How You Earn Points
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Submit a session', points: POINTS.submitOnTime, colour: 'text-blue-400' },
              { label: 'Score 7 or above', points: `+${POINTS.score7plus} bonus`, colour: 'text-emerald-400' },
              { label: 'Score 9 or above', points: `+${POINTS.score9plus} bonus`, colour: 'text-amber-400' },
              { label: 'Submit corrections', points: `+${POINTS.correctionsSubmit}`, colour: 'text-purple-400' },
            ].map(({ label, points, colour }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-800 last:border-0">
                <p className="text-slate-200 text-sm">{label}</p>
                <span className={`text-sm font-bold ${colour}`}>+{points} pts</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2">
            <p className="text-amber-200/70 text-xs">
              💡 Best score: submit on time AND score 9+ = <span className="text-amber-400 font-bold">+{POINTS.submitOnTime + POINTS.score9plus} points</span> in one session
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card overflow-hidden">
          <div className="px-4 py-3 bg-slate-800/50 flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" />
            <p className="text-white text-sm font-medium">Leaderboard</p>
          </div>
          <div className="divide-y divide-slate-800">
            {leaderboard.map((entry, i) => {
              const isMe = entry.id === studentId
              return (
                <div key={entry.id}
                  className={`px-4 py-3 flex items-center gap-3 ${isMe ? 'bg-amber-500/5' : ''}`}>
                  <span className="text-lg w-8 text-center">{getRankEmoji(i)}</span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: entry.colour + '40', color: entry.colour }}
                  >
                    {entry.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isMe ? 'text-amber-400' : 'text-white'}`}>
                      {entry.name} {isMe ? '(you)' : ''}
                    </p>
                    <p className="text-slate-500 text-xs">{entry.level}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${i === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {entry.points}
                    </p>
                    <p className="text-slate-500 text-xs">pts</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Points history */}
        <div className="card overflow-hidden">
          <div className="px-4 py-3 bg-slate-800/50 flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-400" />
            <p className="text-white text-sm font-medium">Points History</p>
          </div>
          {pointsHistory.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-slate-400 text-sm">No points yet — submit your first session!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800 max-h-80 overflow-y-auto">
              {pointsHistory.map(entry => (
                <div key={entry.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 text-sm truncate">{entry.reason}</p>
                    <p className="text-slate-500 text-xs">{formatDate(entry.createdAt)}</p>
                  </div>
                  <span className={`font-bold text-sm ml-3 flex-shrink-0 ${getPointsColour(entry.amount)}`}>
                    +{entry.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Score to points guide */}
        <div className="card p-5">
          <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star size={12} className="text-amber-400" /> Score to Points Guide
          </h3>
          <div className="space-y-2">
            {[
              { range: 'Score 9-10', total: POINTS.submitOnTime + POINTS.score9plus, label: 'Outstanding', colour: 'text-amber-400', bar: 'bg-amber-400' },
              { range: 'Score 7-8', total: POINTS.submitOnTime + POINTS.score7plus, label: 'Good work', colour: 'text-emerald-400', bar: 'bg-emerald-400' },
              { range: 'Score 5-6', total: POINTS.submitOnTime, label: 'Keep going', colour: 'text-blue-400', bar: 'bg-blue-400' },
              { range: 'Score 0-4', total: POINTS.submitOnTime, label: 'Try harder', colour: 'text-slate-400', bar: 'bg-slate-600' },
            ].map(({ range, total, label, colour, bar }) => (
              <div key={range} className="flex items-center gap-3">
                <div className="w-20 flex-shrink-0">
                  <p className="text-slate-300 text-xs">{range}</p>
                </div>
                <div className="flex-1 bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${bar}`}
                    style={{ width: `${(total / (POINTS.submitOnTime + POINTS.score9plus)) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-right flex-shrink-0">
                  <span className={`text-xs font-bold ${colour}`}>+{total} pts</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-3 text-center">
            Plus +{POINTS.correctionsSubmit} pts for submitting corrections on wrong answers
          </p>
        </div>

      </div>
    </div>
  )
}

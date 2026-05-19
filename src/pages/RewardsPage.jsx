// src/pages/RewardsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { STUDENTS } from '../utils/students'
import {
  BADGES, TITLES, AVATARS, TIER_LABELS,
  getTitle, getAvatar, getNextTitle
} from '../utils/rewards'
import BadgeCard from '../components/BadgeCard'
import { ChevronLeft, Zap, Trophy, Star } from 'lucide-react'

export default function RewardsPage() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [points, setPoints] = useState(0)
  const [pointsLog, setPointsLog] = useState([])
  const [earnedBadges, setEarnedBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('badges')

  const studentId = profile?.studentId
  const student = STUDENTS[studentId]

  useEffect(() => { loadData() }, [studentId])

  async function loadData() {
    // Load points log
    const ptsSnap = await getDocs(
      query(collection(db, 'points'), where('studentId', '==', studentId))
    )
    const log = []
    let total = 0
    ptsSnap.forEach(d => {
      log.push(d.data())
      total += d.data().amount || 0
    })
    log.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    setPoints(total)
    setPointsLog(log)

    // Load badges
    const badgeSnap = await getDoc(doc(db, 'badges', studentId))
    if (badgeSnap.exists()) {
      setEarnedBadges(badgeSnap.data().earned || [])
    }

    setLoading(false)
  }

  const title = getTitle(points)
  const avatar = getAvatar(points)
  const nextTitle = getNextTitle(points)
  const allBadgeIds = Object.keys(BADGES)
  const unearnedBadges = allBadgeIds.filter(id => !earnedBadges.includes(id))

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen pb-16">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-ghost p-2 -ml-2">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">My Rewards</p>
            <p className="text-slate-400 text-xs">{student?.name} · {student?.class}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
            <Zap size={13} className="text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{points}</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">

        {/* Profile card */}
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800
                  border-2 border-amber-500/40 flex items-center justify-center text-4xl shadow-lg">
                  {avatar.emoji}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full px-1.5 py-0.5">
                  <span className="text-[9px] font-bold text-slate-950">{avatar.label}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-white font-bold text-xl">{student?.name}</p>
                <p className={`font-semibold text-sm ${title.colour}`}>{title.title}</p>
                <p className="text-slate-400 text-xs mt-1">{student?.class} · {student?.level}</p>

                {/* Points bar */}
                {nextTitle && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>{points} pts</span>
                      <span>{nextTitle.minPoints} pts → {nextTitle.title}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (points / nextTitle.minPoints) * 100)}%`
                        }}
                      />
                    </div>
                  </div>
                )}
                {!nextTitle && (
                  <p className="text-amber-400 text-xs mt-2 font-medium">👑 Maximum rank achieved!</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-slate-800">
            {[
              { label: 'Total Points', value: points, icon: Zap, colour: 'text-amber-400' },
              { label: 'Badges', value: earnedBadges.length, icon: Trophy, colour: 'text-blue-400' },
              { label: 'Rank', value: title.title, icon: Star, colour: title.colour },
            ].map(({ label, value, icon: Icon, colour }) => (
              <div key={label} className="px-4 py-3 text-center">
                <p className={`font-bold text-base ${colour}`}>{value}</p>
                <p className="text-slate-500 text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900 rounded-xl p-1">
          {['badges', 'points', 'ranks'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all
                ${activeTab === tab ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab === 'badges' ? '🏅 Badges' : tab === 'points' ? '⚡ Points Log' : '🎖️ Ranks'}
            </button>
          ))}
        </div>

        {/* BADGES TAB */}
        {activeTab === 'badges' && (
          <div className="space-y-6 animate-fade-in">
            {earnedBadges.length > 0 && (
              <div>
                <h3 className="text-slate-300 text-sm font-medium mb-4">
                  Earned ({earnedBadges.length})
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {earnedBadges.map(id => (
                    <BadgeCard key={id} badgeId={id} earned={true} size="md" />
                  ))}
                </div>
              </div>
            )}

            {unearnedBadges.length > 0 && (
              <div>
                <h3 className="text-slate-600 text-sm font-medium mb-4">
                  Locked ({unearnedBadges.length})
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {unearnedBadges.map(id => (
                    <div key={id} className="flex flex-col items-center gap-1.5">
                      <BadgeCard badgeId={id} earned={false} size="md" />
                      <p className="text-[9px] text-slate-600 text-center max-w-[72px] leading-tight">
                        {BADGES[id]?.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {earnedBadges.length === 0 && (
              <div className="card p-8 text-center">
                <p className="text-4xl mb-3">🔒</p>
                <p className="text-white font-medium mb-1">No badges yet</p>
                <p className="text-slate-400 text-sm">Submit your first pack to unlock your first badge!</p>
              </div>
            )}
          </div>
        )}

        {/* POINTS LOG TAB */}
        {activeTab === 'points' && (
          <div className="space-y-2 animate-fade-in">
            {pointsLog.length === 0 && (
              <div className="card p-6 text-center">
                <p className="text-slate-400 text-sm">No points earned yet.</p>
              </div>
            )}
            {pointsLog.map((entry, i) => (
              <div key={i} className="card p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={14} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{entry.reason}</p>
                  {entry.createdAt && (
                    <p className="text-slate-500 text-xs">
                      {new Date(entry.createdAt.seconds * 1000).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
                <span className="text-amber-400 font-bold text-sm flex-shrink-0">
                  +{entry.amount}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* RANKS TAB */}
        {activeTab === 'ranks' && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-slate-400 text-xs px-1 mb-3">
              Earn points to climb the ranks. Keep submitting and scoring high!
            </p>
            {TITLES.map((t, i) => {
              const isCurrentRank = title.title === t.title
              const isAchieved = points >= t.minPoints
              const nextT = TITLES[i + 1]
              return (
                <div key={t.title}
                  className={`card p-4 flex items-center gap-4
                    ${isCurrentRank ? 'border border-amber-500/40 bg-amber-500/5' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${isAchieved ? 'bg-amber-500/20' : 'bg-slate-800'}`}>
                    {isAchieved
                      ? <span className="text-xl">✅</span>
                      : <span className="text-xl">🔒</span>
                    }
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isAchieved ? t.colour : 'text-slate-600'}`}>
                      {t.title}
                      {isCurrentRank && <span className="ml-2 text-amber-400 text-xs">← You are here</span>}
                    </p>
                    <p className="text-slate-500 text-xs">{t.minPoints} points required</p>
                    {isCurrentRank && nextT && (
                      <p className="text-slate-400 text-xs mt-0.5">
                        {nextT.minPoints - points} more points to reach {nextT.title}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

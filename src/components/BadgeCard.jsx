// src/components/BadgeCard.jsx
import { BADGES, TIER_LABELS } from '../utils/rewards'

export default function BadgeCard({ badgeId, earned = true, size = 'md' }) {
  const badge = BADGES[badgeId]
  if (!badge) return null

  const sizes = {
    sm: { outer: 'w-16 h-16', icon: 'text-2xl', name: 'text-[10px]' },
    md: { outer: 'w-24 h-24', icon: 'text-4xl', name: 'text-xs' },
    lg: { outer: 'w-32 h-32', icon: 'text-5xl', name: 'text-sm' },
  }
  const s = sizes[size] || sizes.md

  if (!earned) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className={`${s.outer} rounded-2xl bg-slate-800 border-2 border-slate-700 
          flex items-center justify-center relative overflow-hidden`}>
          <span className={`${s.icon} grayscale opacity-20`}>{badge.icon}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        </div>
        <p className={`${s.name} text-slate-600 font-medium text-center leading-tight max-w-[80px]`}>
          {badge.name}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <div className={`${s.outer} rounded-2xl bg-gradient-to-br ${badge.gradient}
        flex items-center justify-center relative overflow-hidden shadow-lg
        transition-transform duration-200 group-hover:scale-105`}
        style={{ boxShadow: `0 8px 24px ${badge.colour}40` }}
      >
        {/* Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-2xl" />
        <span className={`${s.icon} relative z-10`}>{badge.icon}</span>
      </div>
      <p className={`${s.name} text-white font-semibold text-center leading-tight max-w-[80px]`}>
        {badge.name}
      </p>
      <p className={`text-[9px] text-slate-500 text-center leading-tight max-w-[80px]`}>
        {TIER_LABELS[badge.tier]}
      </p>
    </div>
  )
}

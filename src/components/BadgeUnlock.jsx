// src/components/BadgeUnlock.jsx
import { useState, useEffect } from 'react'
import { BADGES } from '../utils/rewards'

export default function BadgeUnlock({ badgeIds = [], onClose }) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  if (!badgeIds.length || !visible) return null

  const badge = BADGES[badgeIds[current]]
  if (!badge) return null

  function handleNext() {
    if (current < badgeIds.length - 1) {
      setCurrent(current + 1)
    } else {
      setVisible(false)
      onClose?.()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}>

      {/* Confetti dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i}
            className="absolute w-2 h-2 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#f59e0b','#3b82f6','#10b981','#ef4444','#8b5cf6'][i % 5],
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${0.8 + Math.random() * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center
        animate-fade-up shadow-2xl">

        {/* Badge count */}
        {badgeIds.length > 1 && (
          <p className="text-slate-500 text-xs mb-4">{current + 1} of {badgeIds.length}</p>
        )}

        <p className="text-slate-400 text-sm mb-4 font-medium uppercase tracking-widest">
          Badge Unlocked!
        </p>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${badge.gradient}
            flex items-center justify-center shadow-2xl relative overflow-hidden`}
            style={{ boxShadow: `0 16px 48px ${badge.colour}60` }}
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-3xl" />
            <span className="text-6xl relative z-10">{badge.icon}</span>
          </div>
        </div>

        <h2 className="text-white font-bold text-2xl mb-2">{badge.name}</h2>
        <p className="text-slate-400 text-sm mb-2">{badge.description}</p>
        <p className="text-amber-400 font-bold text-sm mb-8">+{badge.points} bonus points</p>

        <button
          onClick={handleNext}
          className="btn-gold w-full"
        >
          {current < badgeIds.length - 1 ? 'Next Badge →' : 'Awesome! 🎉'}
        </button>
      </div>
    </div>
  )
}

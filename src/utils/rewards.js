// src/utils/rewards.js
// Badge definitions, reward logic and points system

export const BADGES = {
  // ─── MILESTONE BADGES ─────────────────────────────────────
  first_submission: {
    id: 'first_submission',
    name: 'First Step',
    description: 'Submitted your very first pack',
    icon: '🚀',
    colour: '#6366f1',
    gradient: 'from-indigo-500 to-purple-600',
    tier: 'bronze',
    points: 50,
  },
  day_5: {
    id: 'day_5',
    name: 'Getting Started',
    description: 'Completed 5 sessions',
    icon: '📚',
    colour: '#f59e0b',
    gradient: 'from-amber-400 to-orange-500',
    tier: 'bronze',
    points: 75,
  },
  day_10: {
    id: 'day_10',
    name: 'Halfway There',
    description: 'Completed 10 sessions',
    icon: '⚡',
    colour: '#3b82f6',
    gradient: 'from-blue-400 to-cyan-500',
    tier: 'silver',
    points: 150,
  },
  day_20: {
    id: 'day_20',
    name: 'Programme Complete',
    description: 'Completed all 20 sessions',
    icon: '🏆',
    colour: '#f59e0b',
    gradient: 'from-yellow-400 to-amber-500',
    tier: 'gold',
    points: 500,
  },

  // ─── SCORE BADGES ──────────────────────────────────────────
  first_nine: {
    id: 'first_nine',
    name: 'Excellence',
    description: 'Scored 9 or above for the first time',
    icon: '⭐',
    colour: '#f59e0b',
    gradient: 'from-yellow-400 to-amber-500',
    tier: 'silver',
    points: 100,
  },
  perfect_score: {
    id: 'perfect_score',
    name: 'Perfect',
    description: 'Scored 10 out of 10',
    icon: '💎',
    colour: '#06b6d4',
    gradient: 'from-cyan-400 to-blue-500',
    tier: 'gold',
    points: 200,
  },
  three_nines: {
    id: 'three_nines',
    name: 'On Fire',
    description: 'Scored 9+ three times',
    icon: '🔥',
    colour: '#ef4444',
    gradient: 'from-red-400 to-orange-500',
    tier: 'gold',
    points: 200,
  },
  comeback: {
    id: 'comeback',
    name: 'Comeback',
    description: 'Improved by 3+ points on the same subject',
    icon: '📈',
    colour: '#10b981',
    gradient: 'from-emerald-400 to-teal-500',
    tier: 'silver',
    points: 100,
  },

  // ─── SUBJECT BADGES ────────────────────────────────────────
  maths_star: {
    id: 'maths_star',
    name: 'Maths Star',
    description: 'Averaged 8+ across all Maths sessions',
    icon: '📐',
    colour: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    tier: 'gold',
    points: 150,
  },
  science_star: {
    id: 'science_star',
    name: 'Science Star',
    description: 'Averaged 8+ across all Science sessions',
    icon: '🔬',
    colour: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    tier: 'gold',
    points: 150,
  },
  english_star: {
    id: 'english_star',
    name: 'English Star',
    description: 'Averaged 8+ across all English sessions',
    icon: '✍️',
    colour: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    tier: 'gold',
    points: 150,
  },

  // ─── STREAK BADGES ─────────────────────────────────────────
  streak_5: {
    id: 'streak_5',
    name: 'On a Roll',
    description: 'Submitted 5 days in a row',
    icon: '🎯',
    colour: '#f59e0b',
    gradient: 'from-amber-400 to-yellow-500',
    tier: 'silver',
    points: 125,
  },
  streak_10: {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Submitted 10 days in a row',
    icon: '🌟',
    colour: '#f59e0b',
    gradient: 'from-yellow-400 to-amber-500',
    tier: 'gold',
    points: 250,
  },

  // ─── CHARACTER BADGES ──────────────────────────────────────
  challenger: {
    id: 'challenger',
    name: 'Challenger',
    description: 'Attempted all challenge questions in a session',
    icon: '🦁',
    colour: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    tier: 'silver',
    points: 75,
  },
  corrector: {
    id: 'corrector',
    name: 'Corrector',
    description: 'Submitted corrections for a session',
    icon: '✅',
    colour: '#10b981',
    gradient: 'from-emerald-400 to-green-500',
    tier: 'bronze',
    points: 50,
  },
  recap_champion: {
    id: 'recap_champion',
    name: 'Recap Champion',
    description: 'Scored 80%+ in a Recap & Repair session',
    icon: '🎖️',
    colour: '#6366f1',
    gradient: 'from-indigo-400 to-violet-500',
    tier: 'gold',
    points: 150,
  },
}

export const TITLES = [
  { minPoints: 0,    title: 'Learner',       colour: 'text-slate-400' },
  { minPoints: 100,  title: 'Student',        colour: 'text-blue-400' },
  { minPoints: 250,  title: 'Scholar',        colour: 'text-emerald-400' },
  { minPoints: 500,  title: 'Achiever',       colour: 'text-amber-400' },
  { minPoints: 800,  title: 'Top Student',    colour: 'text-orange-400' },
  { minPoints: 1200, title: 'Excellence',     colour: 'text-purple-400' },
  { minPoints: 1800, title: 'Champion',       colour: 'text-red-400' },
  { minPoints: 2500, title: 'Legend',         colour: 'text-yellow-400' },
]

export const AVATARS = [
  { minPoints: 0,    emoji: '👦🏾', label: 'Starter' },
  { minPoints: 100,  emoji: '📚', label: 'Reader' },
  { minPoints: 300,  emoji: '🎓', label: 'Scholar' },
  { minPoints: 600,  emoji: '⭐', label: 'Star' },
  { minPoints: 1000, emoji: '🏆', label: 'Champion' },
  { minPoints: 1500, emoji: '💎', label: 'Diamond' },
  { minPoints: 2000, emoji: '🦁', label: 'Lion' },
  { minPoints: 3000, emoji: '👑', label: 'King' },
]

export function getTitle(points) {
  const titles = [...TITLES].reverse()
  return titles.find(t => points >= t.minPoints) || TITLES[0]
}

export function getAvatar(points) {
  const avatars = [...AVATARS].reverse()
  return avatars.find(a => points >= a.minPoints) || AVATARS[0]
}

export function getNextTitle(points) {
  return TITLES.find(t => t.minPoints > points) || null
}

export function checkNewBadges(submissions, existingBadgeIds) {
  const newBadges = []
  const marked = Object.values(submissions).filter(s => s.score !== undefined)
  const scores = marked.map(s => s.score)
  const count = marked.length

  const has = (id) => existingBadgeIds.includes(id)

  // Milestone badges
  if (count >= 1 && !has('first_submission')) newBadges.push('first_submission')
  if (count >= 5 && !has('day_5')) newBadges.push('day_5')
  if (count >= 10 && !has('day_10')) newBadges.push('day_10')
  if (count >= 20 && !has('day_20')) newBadges.push('day_20')

  // Score badges
  if (scores.some(s => s >= 9) && !has('first_nine')) newBadges.push('first_nine')
  if (scores.some(s => s >= 10) && !has('perfect_score')) newBadges.push('perfect_score')
  if (scores.filter(s => s >= 9).length >= 3 && !has('three_nines')) newBadges.push('three_nines')

  // Subject averages
  const mathScores = marked.filter(s => s.subject === 'Mathematics').map(s => s.score)
  const sciScores = marked.filter(s => s.subject === 'Science').map(s => s.score)
  const engScores = marked.filter(s => s.subject === 'English').map(s => s.score)

  const avg = arr => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

  if (mathScores.length >= 2 && avg(mathScores) >= 8 && !has('maths_star')) newBadges.push('maths_star')
  if (sciScores.length >= 2 && avg(sciScores) >= 8 && !has('science_star')) newBadges.push('science_star')
  if (engScores.length >= 2 && avg(engScores) >= 8 && !has('english_star')) newBadges.push('english_star')

  return newBadges
}

export const TIER_COLOURS = {
  bronze: 'from-amber-600 to-amber-800',
  silver: 'from-slate-300 to-slate-500',
  gold: 'from-yellow-400 to-amber-500',
}

export const TIER_LABELS = {
  bronze: '🥉 Bronze',
  silver: '🥈 Silver',
  gold: '🥇 Gold',
}

// scripts/report.js
// Generates a full summary of all three students' progress
// Run: node scripts/report.js
// Paste the output into the chat to give Claude full context

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const STUDENTS = ['jezreel', 'declyn', 'ivan']
const STUDENT_INFO = {
  jezreel: { name: 'Jezreel', class: 'JHS 1B', level: 'B7' },
  declyn:  { name: 'Declyn',  class: 'BS 5D',  level: 'B5' },
  ivan:    { name: 'Ivan',    class: 'BS 3A',  level: 'B3' },
}

async function generateReport() {
  const lines = []
  const now = new Date()
  lines.push(`AASP PROGRESS REPORT`)
  lines.push(`Generated: ${now.toDateString()} ${now.toLocaleTimeString()}`)
  lines.push(`${'='.repeat(60)}`)

  for (const studentId of STUDENTS) {
    const info = STUDENT_INFO[studentId]
    const snap = await db.collection('submissions').where('studentId', '==', studentId).get()
    
    const submissions = []
    snap.forEach(d => submissions.push(d.data()))
    
    const daily = submissions.filter(s => typeof s.dayNum === 'number')
    const recaps = submissions.filter(s => typeof s.dayNum === 'string')
    const marked = daily.filter(s => s.score !== undefined)
    const pending = daily.filter(s => s.score === undefined)
    
    const avgScore = marked.length > 0
      ? (marked.reduce((sum, s) => sum + s.score, 0) / marked.length).toFixed(1)
      : '—'

    // Points
    const ptsSnap = await db.collection('points').where('studentId', '==', studentId).get()
    let totalPts = 0
    ptsSnap.forEach(d => { totalPts += d.data().amount || 0 })

    lines.push(``)
    lines.push(`${info.name.toUpperCase()} | ${info.class} | ${info.level}`)
    lines.push(`${'─'.repeat(40)}`)
    lines.push(`Sessions completed: ${marked.length} | Avg score: ${avgScore}/10 | Points: ${totalPts}`)
    
    if (pending.length > 0) {
      lines.push(`PENDING (${pending.length}): ${pending.map(s => `Day ${s.dayNum}`).join(', ')}`)
    }

    // Score history
    if (marked.length > 0) {
      lines.push(``)
      lines.push(`SCORES:`)
      marked
        .sort((a, b) => a.dayNum - b.dayNum)
        .forEach(s => {
          const flag = s.score < 5 ? ' ⚠️' : s.score >= 9 ? ' 🌟' : ''
          lines.push(`  Day ${s.dayNum} | ${s.subject} | ${s.topic} | ${s.score}/10${flag}`)
        })
    }

    // Recaps
    if (recaps.length > 0) {
      lines.push(``)
      lines.push(`RECAP SESSIONS:`)
      recaps.forEach(s => {
        lines.push(`  ${s.dayNum} | ${s.topic} | ${s.score}/${s.scoreOutOf || 10}`)
      })
    }

    // Weak areas
    const weakAreas = []
    for (const sub of marked) {
      if (!sub.markedAnswers) continue
      Object.entries(sub.markedAnswers).forEach(([qIdx, ma]) => {
        if (ma.marks < 1) {
          weakAreas.push(`Day ${sub.dayNum} Q${Number(qIdx)+1} (${sub.subject}): ${ma.marks === 0 ? 'Wrong' : 'Partial'} — ${sub.topic}`)
        }
      })
    }

    if (weakAreas.length > 0) {
      lines.push(``)
      lines.push(`WEAK AREAS (${weakAreas.length} questions):`)
      weakAreas.slice(0, 10).forEach(w => lines.push(`  ${w}`))
      if (weakAreas.length > 10) lines.push(`  ...and ${weakAreas.length - 10} more`)
    }

    // Corrections
    const corrections = marked.filter(s => s.correctionsSubmitted)
    if (corrections.length > 0) {
      lines.push(``)
      lines.push(`CORRECTIONS SUBMITTED: Days ${corrections.map(s => s.dayNum).join(', ')}`)
    }
  }

  lines.push(``)
  lines.push(`${'='.repeat(60)}`)
  lines.push(`END OF REPORT`)
  
  console.log(lines.join('\n'))
  process.exit(0)
}

generateReport().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})

// scripts/seed-scores.js
// Seeds Jezreel's historical scores into Firestore
// Run: node scripts/seed-scores.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const STUDENT_ID = 'jezreel'

const SESSIONS = [
  {
    day: 1, date: '2026-04-29', subject: 'Mathematics',
    topic: 'Place Value & Large Numbers',
    score: 7.5, status: 'marked',
  },
  {
    day: 2, date: '2026-04-30', subject: 'Science',
    topic: 'States of Matter & Particle Theory',
    score: 7.5, status: 'marked',
  },
  {
    day: 3, date: '2026-05-01', subject: 'Mathematics',
    topic: 'Rounding: Decimal Places & Significant Figures',
    score: 7.5, originalScore: 4, status: 'marked',
    notes: 'Corrected after resubmission',
  },
  {
    day: 4, date: '2026-05-03', subject: 'English',
    topic: 'Nouns, Pronouns & Adjectives',
    score: 7.5, status: 'marked',
  },
  {
    day: 5, date: '2026-05-05', subject: 'Mathematics',
    topic: 'Mental Maths & Multiplication',
    score: 6, status: 'marked',
  },
  {
    day: 6, date: '2026-05-06', subject: 'Science',
    topic: 'Cells: Structure & Function',
    score: 8, status: 'marked',
  },
  {
    day: 7, date: '2026-05-07', subject: 'Mathematics',
    topic: 'HCF, LCM & Indices',
    score: 5, status: 'marked',
  },
  {
    day: 8, date: '2026-05-07', subject: 'English',
    topic: 'Verbs, Tense & Subject-Verb Agreement',
    score: 7, status: 'marked',
    markedAnswers: {
      0: { correct: false, marks: 0.5, feedback: '(b) and (d) correct. (a) eats is simple present — habitual. (c) will go is future.', correctAnswer: '(a) eats — Simple Present (b) wrote — Simple Past (c) will go — Simple Future (d) is explaining — Present Continuous' },
      1: { correct: true, marks: 1, feedback: 'Perfect — all four tense forms correct.', correctAnswer: '(a) played (b) are studying (c) will come (d) barks' },
      2: { correct: false, marks: 0, feedback: 'Not attempted. Must memorise irregular verbs.', correctAnswer: 'go→went/gone  do→did/done  come→came/come  have→had/had  be→was/were/been' },
      3: { correct: false, marks: 0.5, feedback: '(a)(b)(c) correct. (d) crossed out — Mathematics IS (singular).', correctAnswer: '(a) goes (b) were playing (c) has finished (d) Mathematics IS' },
      4: { correct: true, marks: 1, feedback: 'All four correct — excellent subject-verb agreement.', correctAnswer: '(a) has (b) is (c) knows (d) is' },
      5: { correct: false, marks: 0.5, feedback: 'woke, brushed, ate correct. Ruined should be RAN.', correctAnswer: 'woke, brushed, ate, ran' },
      6: { correct: true, marks: 1, feedback: 'Correct — will study and base form pass both right.', correctAnswer: 'Declyn will study hard and pass his exams.' },
      7: { correct: true, marks: 1, feedback: 'All three correct — strong analytical thinking.', correctAnswer: 'Action: working  State: know  Auxiliary: have' },
      8: { correct: false, marks: 0.5, feedback: "I'm learning is present continuous, not simple present.", correctAnswer: '(a) I studied. (b) I study every day. (c) I will learn.' },
      9: { correct: false, marks: 0, feedback: 'Have has only one past tense: had. Needed verb with two past forms.', correctAnswer: 'HANG → hung/hanged  or  LIE → lay/lied' },
    },
    dadFeedback: 'Strong on Q2, Q5 and Q8 — the grammar foundation is there. Q3 irregular verbs must be memorised. Corrections: Q3 and Q10.',
  },
  {
    day: 9, date: '2026-05-09', subject: 'Mathematics',
    topic: 'Fractions, Decimals & Percentages',
    score: 6.5, status: 'marked',
    notes: 'Known errors: 40+25=29 slip, 3/5×75=31',
  },
  {
    day: 10, date: '2026-05-13', subject: 'Science',
    topic: 'The Water Cycle & Earth Science',
    score: 9.5, status: 'marked',
    dadFeedback: 'Your best score yet. Q6 drought reasoning and Q9 temperature regulation were outstanding. This is the standard.',
  },
  {
    day: 11, date: '2026-05-14', subject: 'Mathematics',
    topic: 'Fractions: Multiply & Divide',
    score: 5.5, originalScore: 6.5, status: 'marked',
    markedAnswers: {
      0:  { correct: false, marks: 0,   feedback: 'Wrote 31. 3/5×75: 75÷5=15, ×3=45.', correctAnswer: '45' },
      1:  { correct: false, marks: 0,   feedback: 'Used numbers from Q1c. 2/3×240: 240÷3=80, ×2=160.', correctAnswer: '160' },
      2:  { correct: false, marks: 0.5, feedback: 'Correct answer for Q1b, mislabelled. 5/8×160: 160÷8=20, ×5=100.', correctAnswer: '100' },
      3:  { correct: true,  marks: 1,   feedback: 'Correct.', correctAnswer: '1/2' },
      4:  { correct: false, marks: 0,   feedback: 'Numerator error and did not simplify. 5/6×3/5=15/30=1/2.', correctAnswer: '1/2' },
      5:  { correct: false, marks: 0,   feedback: 'Did not cross-cancel. 7s cancel → 1/8×4/1=4/8=1/2.', correctAnswer: '1/2' },
      6:  { correct: false, marks: 0,   feedback: '45÷5=9, 0.75÷5=0.15, total=9.15m.', correctAnswer: '9.15m' },
      7:  { correct: false, marks: 0,   feedback: 'Skipped. Keep-Change-Flip method.', correctAnswer: '(a) 12  (b) 5/4  (c) 9' },
      8:  { correct: false, marks: 0.5, feedback: 'Method perfect — got 1/4 litre. Final step: ×1000=250ml.', correctAnswer: '250ml' },
      9:  { correct: false, marks: 0,   feedback: '35×7=245, not 266. Arithmetic slip.', correctAnswer: 'GH₵245' },
      10: { correct: true,  marks: 1,   feedback: 'Correct. 40%×450=180. 450-180=270.', correctAnswer: 'GH₵270' },
      11: { correct: true,  marks: 1,   feedback: 'Correct — outstanding persistence solving two ways.', correctAnswer: 'GH₵5.115' },
      12: { correct: true,  marks: 1,   feedback: 'Correct. 2/5=18, 1/5=9, 5/5=45.', correctAnswer: '45 students' },
      13: { correct: true,  marks: 1,   feedback: 'Correct. 80%=GH₵80, 1%=1, 100%=GH₵100.', correctAnswer: 'GH₵100' },
    },
    dadFeedback: 'Good persistence on Q8 and Q10 — both correct. Watch arithmetic slips on multiplication. Q1 and Q2 cost marks unnecessarily.',
  },
  {
    day: 12, date: '2026-05-15', subject: 'English',
    topic: 'Reading Comprehension — The Importance of Trees',
    score: 5.5, status: 'marked',
    markedAnswers: {
      0: { correct: false, marks: 0,   feedback: 'Two words is not a main idea. Write a complete sentence.', correctAnswer: 'Trees are vital to all life — they provide oxygen, absorb CO₂ and support animals.' },
      1: { correct: true,  marks: 1,   feedback: 'All three trees and benefits correct.', correctAnswer: '(a) Cocoa — export  (b) Neem — medicinal  (c) Shea — shea butter' },
      2: { correct: false, marks: 0.5, feedback: 'All three threats correct but reduced rainfall is a consequence, not a threat.', correctAnswer: '(a) Illegal logging  (b) Bush burning  (c) Farmland expansion' },
      3: { correct: true,  marks: 1,   feedback: 'Both consequences correct.', correctAnswer: 'Reduced rainfall, soil erosion, loss of biodiversity' },
      4: { correct: false, marks: 0.5, feedback: 'Damaging is too vague. Deforestation = large-scale clearing/removal of trees.', correctAnswer: 'The large-scale clearing or removal of trees and forests.' },
      5: { correct: false, marks: 0,   feedback: 'Repeated protect without reasoning. WHY questions need purpose and logic.', correctAnswer: 'Many trees already destroyed — protection alone cannot replace lost forest. New trees must be planted.' },
      6: { correct: false, marks: 0,   feedback: 'One sentence on paragraph 1 only. Summary must cover the entire passage.', correctAnswer: '3-4 sentences covering: trees globally, Ghana trees, threats, call to action.' },
      7: { correct: false, marks: 0.5, feedback: 'Right ideas but underdeveloped. Less trees → fewer trees. Two reasons not separated.', correctAnswer: 'Opinion + two separate reasons + personal connection.' },
      8: { correct: true,  marks: 1,   feedback: 'Correct — understood backbone means central support.', correctAnswer: 'Cocoa trees are the most important foundation of Ghana\'s export trade.' },
      9: { correct: false, marks: 0,   feedback: 'Answered WHO but left WHY blank. Always check for AND in two-part questions.', correctAnswer: 'Future generations = people not yet born. Writer appeals to them to create urgency.' },
    },
    dadFeedback: 'Q2, Q3, Q9 well done. The main weakness: WHY and summary questions need full development. Never answer half a question.',
  },
]

// Points per session based on score
function calculatePoints(score) {
  let pts = 10 // submitted on time
  if (score >= 9) pts += 35
  else if (score >= 7) pts += 20
  return pts
}

async function seed() {
  console.log('🌱 Seeding Jezreel historical scores...\n')

  const batch = db.batch()
  let totalPoints = 0

  for (const session of SESSIONS) {
    if (session.score === null) {
      console.log(`⏳ Day ${session.day} — not yet submitted, skipping`)
      continue
    }

    const docId = `${STUDENT_ID}_day${session.day}`
    const ref = db.collection('submissions').doc(docId)

    const data = {
      studentId: STUDENT_ID,
      dayNum: session.day,
      subject: session.subject,
      topic: session.topic,
      score: session.score,
      status: 'marked',
      submittedAt: admin.firestore.Timestamp.fromDate(new Date(session.date)),
      markedAt: admin.firestore.Timestamp.fromDate(new Date(session.date)),
      answers: {},
      markedAnswers: session.markedAnswers || {},
      dadFeedback: session.dadFeedback || '',
      notes: session.notes || '',
      historical: true,
    }

    if (session.originalScore) data.originalScore = session.originalScore

    batch.set(ref, data, { merge: true })

    // Points
    const pts = calculatePoints(session.score)
    totalPoints += pts
    const pointsRef = db.collection('points').doc(`${STUDENT_ID}_day${session.day}`)
    batch.set(pointsRef, {
      studentId: STUDENT_ID,
      dayNum: session.day,
      amount: pts,
      reason: `Day ${session.day} ${session.subject}: ${session.score}/10`,
      createdAt: admin.firestore.Timestamp.fromDate(new Date(session.date)),
    }, { merge: true })

    console.log(`✅ Day ${session.day} — ${session.subject} — ${session.score}/10 — +${pts} pts`)
  }

  // Recap Session 1
  const recap1Ref = db.collection('submissions').doc(`${STUDENT_ID}_recap1`)
  batch.set(recap1Ref, {
    studentId: STUDENT_ID,
    dayNum: 'recap1',
    subject: 'All',
    topic: 'Recap & Repair Session 1 — Days 1–7 weaknesses',
    score: 8.5,
    scoreOutOf: 9,
    percentage: 94,
    status: 'marked',
    submittedAt: admin.firestore.Timestamp.fromDate(new Date('2026-05-12')),
    markedAt: admin.firestore.Timestamp.fromDate(new Date('2026-05-12')),
    historical: true,
  }, { merge: true })

  // Recap 1 bonus points
  const recap1PtsRef = db.collection('points').doc(`${STUDENT_ID}_recap1`)
  batch.set(recap1PtsRef, {
    studentId: STUDENT_ID,
    dayNum: 'recap1',
    amount: 35,
    reason: 'Recap & Repair Session 1: 8.5/9 (94%)',
    createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-05-12')),
  }, { merge: true })
  totalPoints += 35
  console.log(`✅ Recap Session 1 — 8.5/9 (94%) — +35 pts`)

  // Recap Session 2
  const recap2Ref = db.collection('submissions').doc(`${STUDENT_ID}_recap2`)
  batch.set(recap2Ref, {
    studentId: STUDENT_ID,
    dayNum: 'recap2',
    subject: 'Maths + English',
    topic: 'Recap & Repair Session 2 — Days 8–12 weaknesses',
    score: 10.5,
    scoreOutOf: 13,
    percentage: 81,
    status: 'marked',
    submittedAt: admin.firestore.Timestamp.fromDate(new Date('2026-05-17')),
    markedAt: admin.firestore.Timestamp.fromDate(new Date('2026-05-17')),
    historical: true,
  }, { merge: true })

  const recap2PtsRef = db.collection('points').doc(`${STUDENT_ID}_recap2`)
  batch.set(recap2PtsRef, {
    studentId: STUDENT_ID,
    dayNum: 'recap2',
    amount: 25,
    reason: 'Recap & Repair Session 2: 10.5/13 (81%)',
    createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-05-17')),
  }, { merge: true })
  totalPoints += 25
  console.log(`✅ Recap Session 2 — 10.5/13 (81%) — +25 pts`)

  await batch.commit()

  console.log(`\n✅ All scores seeded successfully!`)
  console.log(`📊 Total points awarded: ${totalPoints}`)
  console.log(`\nJezreel's dashboard will now show:`)
  console.log(`  • 12 sessions marked`)
  console.log(`  • ${totalPoints} total points`)
  console.log(`  • Days 1–12 no longer showing as overdue`)
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
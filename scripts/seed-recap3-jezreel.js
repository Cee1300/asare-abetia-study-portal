// scripts/seed-recap3-jezreel.js
// Seeds Jezreel Recap & Repair Session 3 into Firestore
// Targets: Science (Day 14 Ecosystems 3.5/10), English (Day 16 Writing 4.5/10), Maths (Day 11 Fractions)
// Run: node scripts/seed-recap3-jezreel.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const PACK = {
  studentId: 'jezreel',
  dayNum: 'recap3',
  subject: 'All',
  topic: 'Recap & Repair Session 3 — Days 13–16',
  isRecap: true,
  recapNum: 3,
  objectives: [
    'Correct weak areas from Days 13–16',
    'Strengthen Science: Ecosystems and the Housefly Life Cycle',
    'Strengthen English: Writing skills and two-part questions',
    'Consolidate Maths: Fractions multiply and divide',
  ],
  concepts: [
    {
      heading: 'About This Session',
      body: 'Jezreel — this session targets your THREE weakest areas from the last four days.\n\nDay 14 Science scored 3.5/10 — your lowest Science score yet. The housefly questions were mostly missed.\n\nDay 16 English scored 4.5/10 — formal letters and essay writing need attention.\n\nDay 11 Maths fractions: cross-cancellation errors cost marks.\n\nThis is repair work. Read each question, apply what you know, and show your working clearly.',
      note: 'Three questions per subject. Nine questions total. Take your time — do not rush.',
    },
  ],
  worked: [],
  questions: [
    // ─── MATHEMATICS — Fractions ───────────────────────────────
    {
      q: '[MATHS] Q1. Find: (a) 3/5 × 80  (b) 2/3 × 360  (c) 5/8 × 240\nShow your working for each one.',
      a: '(a) 80 ÷ 5 = 16, × 3 = 48\n(b) 360 ÷ 3 = 120, × 2 = 240\n(c) 240 ÷ 8 = 30, × 5 = 150',
    },
    {
      q: '[MATHS] Q2. Calculate: (a) 4/5 × 5/8  (b) 3/7 × 7/9  (c) 2/3 × 9/10\nSimplify each answer fully. Use cross-cancellation where possible.',
      a: '(a) Cross-cancel 5s: 4/1 × 1/8 = 4/8 = 1/2\n(b) Cross-cancel 7s: 3/1 × 1/9 = 3/9 = 1/3\n(c) Cross-cancel: 2/3 × 9/10 = 2×9 / 3×10 = 18/30 = 3/5',
    },
    {
      q: '[MATHS] Q3. A rope is 7½ metres long. Pieces of 1¼ metres are cut from it. How many full pieces can be cut? How much rope remains?',
      a: '7½ ÷ 1¼ = 15/2 ÷ 5/4 = 15/2 × 4/5 = 60/10 = 6 full pieces.\nCheck: 6 × 1¼ = 7½. No remainder.',
    },

    // ─── SCIENCE — Housefly Life Cycle ─────────────────────────
    {
      q: '[SCIENCE] Q4. Draw and label the FOUR stages of the housefly life cycle in the correct order. For each stage, state ONE key feature.',
      a: '1. EGG — tiny, white, laid in clusters on decaying matter. Hatches in 8–24 hours.\n2. LARVA (Maggot) — legless, white, feeds on decaying matter. Moults twice over 4–8 days.\n3. PUPA — enclosed in hard brown case (puparium). Body reorganises. No feeding. Lasts 3–6 days.\n4. ADULT — can fly within hours. Mates in 2–3 days. Lives 2–4 weeks.',
    },
    {
      q: '[SCIENCE] Q5. Explain EXACTLY how a housefly can cause a person to get cholera. Describe the complete chain from the fly landing on filth to the person becoming ill.',
      a: 'Step 1: Housefly lands on human faeces or sewage containing Vibrio cholerae bacteria.\nStep 2: Bacteria attach to the fly\'s legs, body hairs and mouthparts.\nStep 3: Fly lands on uncovered food being prepared or eaten.\nStep 4: Bacteria transfer from fly onto the food.\nStep 5: Person eats the contaminated food.\nStep 6: Bacteria enter the digestive system and cause cholera — severe diarrhoea, vomiting and dehydration.',
    },
    {
      q: '[SCIENCE] Q6. Give FIVE practical steps that a family in Kumasi can take to prevent housefly infestation in their home. Explain WHY each step works.',
      a: '1. Cover all food — flies cannot land on and contaminate covered food.\n2. Dispose of rubbish in sealed bins — removes breeding sites for flies.\n3. Keep toilets clean and covered — eliminates the filth flies breed in.\n4. Install fly screens on windows and doors — physical barrier prevents entry.\n5. Clear stagnant water and decaying matter — removes conditions flies need to lay eggs.',
    },

    // ─── ENGLISH — Writing & Two-Part Questions ────────────────
    {
      q: '[ENGLISH] Q7. Write a complete FORMAL letter to your headmaster, Mr Kramo, requesting permission to start a Science Club at Marist Preparatory JHS.\nYour letter must include:\n— Correct formal letter format (address, date, salutation, subject line, body, closing)\n— At least TWO reasons why the club would benefit students\n— A polite request for a meeting to discuss further',
      a: 'Check for: your address (top right), date, headmaster\'s address (top left), subject line "Re: Proposed Science Club", "Dear Mr Kramo,", formal body with two reasons (e.g. develops scientific curiosity, prepares students for BECE science paper), polite request for meeting, "Yours sincerely," (name known), full name printed below.',
    },
    {
      q: '[ENGLISH] Q8. Read this statement: "Trees are essential to Ghana\'s economy AND to the health of its people."\n\n(a) In what way are trees essential to Ghana\'s ECONOMY?\n(b) In what way are trees essential to the HEALTH of Ghanaians?\n\nAnswer BOTH parts in full sentences.',
      a: '(a) Trees are essential to Ghana\'s economy because cocoa trees are the backbone of Ghana\'s export trade, supporting the livelihoods of hundreds of thousands of farming families.\n(b) Trees are essential to the health of Ghanaians because they produce oxygen for breathing, absorb harmful carbon dioxide, regulate rainfall patterns, and some trees (like Neem) provide medicinal benefits.',
    },
    {
      q: '[ENGLISH] Q9. Write a paragraph (5–6 sentences) arguing FOR or AGAINST this statement:\n"Students should be allowed to use mobile phones in school."\n\nYour paragraph MUST include:\n— A clear topic sentence stating your position\n— TWO reasons supporting your position\n— ONE counterargument you acknowledge\n— A concluding sentence',
      a: 'Check for: clear topic sentence stating position, two reasons with explanations (not just statements), one counterargument acknowledged ("Although some may argue that..."), concluding sentence that restates position. Accept any well-reasoned paragraph on either side.',
    },
  ],
}

async function seed() {
  console.log('🌱 Seeding Jezreel Recap 3...\n')

  const docId = 'jezreel_recap3'
  await db.collection('packs').doc(docId).set({
    ...PACK,
    answerKey: PACK.questions.map(q => q.a),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  console.log('✅ Recap 3 seeded successfully!')
  console.log('\nPack contents:')
  console.log('  Mathematics (Q1-Q3): Fractions × and ÷, cross-cancellation, mixed numbers')
  console.log('  Science (Q4-Q6): Housefly life cycle, cholera transmission chain, prevention')
  console.log('  English (Q7-Q9): Formal letter, two-part AND questions, paragraph writing')
  console.log('\nJezreel can now access Recap 3 from his dashboard.')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌', err)
  process.exit(1)
})

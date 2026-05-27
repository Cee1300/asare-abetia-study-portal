// scripts/seed-jezreel-quiz1.js
// Jezreel End-of-Programme Quiz 1 — covers Days 1-20
// 15 questions: 5 Maths, 5 Science, 5 English
// Based on weak areas identified in progress report
// Run: node scripts/seed-jezreel-quiz1.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const QUIZ = {
  studentId: 'jezreel',
  dayNum: 'quiz1',
  subject: 'All',
  topic: 'End-of-Programme Quiz 1 — Days 1–20',
  isRecap: false,
  isQuiz: true,
  quizNum: 1,
  objectives: [
    'Demonstrate mastery across Mathematics, Science and English from Days 1–20',
    'Apply knowledge without hints or worked examples',
    'Identify remaining gaps before moving to the next 20-day programme',
  ],
  concepts: [
    {
      heading: 'End-of-Programme Assessment',
      body: 'Jezreel — this is your Quiz 1 assessment covering everything from Days 1 to 20.\n\nThis is NOT a practice session. There are no hints and no worked examples.\n\n15 questions: 5 Mathematics, 5 Science, 5 English.\n\nShow ALL working for Mathematics questions.\nWrite in full sentences for English questions.\nUse correct scientific terms for Science questions.\n\nThis quiz tests what you have genuinely learned — not what you can guess.',
      note: 'No hints. No help. Just you and what you know. Dad is watching. 💪',
    },
  ],
  worked: [],
  questions: [
    // ── MATHEMATICS (5 questions — targeting weak areas) ──────────────────
    {
      q: '[MATHS] Q1. Find: (a) 3/4 × 5/6  (b) 7/8 ÷ 7/16  (c) 2/3 of GH₵150\nShow full working for each part.',
      a: '(a) Cross-cancel 3&6: 1/4 × 5/2 = 5/8\n(b) Keep-Change-Flip: 7/8 × 16/7 = 16/8 = 2\n(c) 150 ÷ 3 × 2 = GH₵100',
    },
    {
      q: '[MATHS] Q2. The mean of five numbers is 14. Four of the numbers are 8, 12, 17 and 19. Find the fifth number.',
      a: 'Total = 5 × 14 = 70. Sum of four = 8+12+17+19 = 56. Fifth number = 70 - 56 = 14.',
    },
    {
      q: '[MATHS] Q3. Kofi and Ama share GH₵480 in the ratio 5:3. How much does each person receive?',
      a: 'Total parts = 8. One part = 480 ÷ 8 = GH₵60.\nKofi = 5 × 60 = GH₵300. Ama = 3 × 60 = GH₵180.\nCheck: 300 + 180 = 480 ✓',
    },
    {
      q: '[MATHS] Q4. A television costs GH₵800. It is reduced by 15% in a sale. What is the sale price?',
      a: '15% of 800 = 0.15 × 800 = GH₵120.\nSale price = 800 - 120 = GH₵680.\nOr: 800 × 0.85 = GH₵680.',
    },
    {
      q: '[MATHS] Q5. The input-output rule for a sequence is: output = 4n - 3.\n(a) Find the 5th and 10th terms.\n(b) Which term has value 49?',
      a: '(a) T(5) = 4(5)-3 = 17. T(10) = 4(10)-3 = 37.\n(b) 4n-3 = 49 → 4n = 52 → n = 13. The 13th term.',
    },

    // ── SCIENCE (5 questions — targeting weak areas) ──────────────────────
    {
      q: '[SCIENCE] Q6. Draw and label a food chain with FOUR organisms found in Ghana. Identify the producer, primary consumer, secondary consumer and tertiary consumer.',
      a: 'Example: Grass → Grasshopper → Lizard → Eagle\nGrass = producer (makes own food via photosynthesis).\nGrasshopper = primary consumer (eats grass).\nLizard = secondary consumer (eats grasshopper).\nEagle = tertiary consumer (eats lizard).',
    },
    {
      q: '[SCIENCE] Q7. Explain the difference between EVAPORATION and CONDENSATION. Give one real-life example of each.',
      a: 'Evaporation: liquid → gas when heated. Example: puddles disappear after rain as sun heats the water.\nCondensation: gas → liquid when cooled. Example: water droplets form on the outside of a cold glass.',
    },
    {
      q: '[SCIENCE] Q8. Name the FOUR stages of the water cycle in the correct order. For each stage, state what is happening.',
      a: '1. Evaporation: sun heats surface water → turns to water vapour → rises.\n2. Condensation: water vapour cools at altitude → forms clouds.\n3. Precipitation: water falls as rain, hail or snow.\n4. Collection: water collects in rivers, lakes, oceans → cycle begins again.',
    },
    {
      q: '[SCIENCE] Q9. Name FOUR nutrients the human body needs and state ONE food source for each.',
      a: 'Accept any four:\nCarbohydrates → yam, rice, bread (energy).\nProtein → fish, beans, eggs (growth and repair).\nFats → palm oil, groundnuts (energy store).\nVitamins → fruits, vegetables (protect body).\nMinerals → milk, leafy greens (bones, teeth).\nWater → drinking water, fruits (all body processes).',
    },
    {
      q: '[SCIENCE] Q10. What is the difference between a PRODUCER and a CONSUMER in an ecosystem? Why are producers essential for all life?',
      a: 'Producer: organism that makes its own food using sunlight (photosynthesis). Examples: grass, trees, maize.\nConsumer: organism that must eat other organisms to get energy. Examples: goat, eagle, human.\nProducers are essential because they are the ONLY entry point for energy (from the sun) into the food chain. Without producers, all consumers would have no food source and ecosystems would collapse.',
    },

    // ── ENGLISH (5 questions — targeting weak areas) ──────────────────────
    {
      q: '[ENGLISH] Q11. Identify and correct ALL grammatical errors in this passage:\n"Yesterday, me and my friend goes to the market. We buyed some tomatoes and we was very happy. The tomatoes costed a lot of money but they was fresh."',
      a: '"Yesterday, my friend and I went to the market. We bought some tomatoes and we were very happy. The tomatoes cost a lot of money but they were fresh."\n\nErrors corrected:\n1. "me and my friend" → "my friend and I"\n2. "goes" → "went" (past tense)\n3. "buyed" → "bought" (irregular past tense)\n4. "was" → "were" (subject-verb agreement)\n5. "costed" → "cost" (irregular past tense)\n6. "was" → "were" (subject-verb agreement)',
    },
    {
      q: '[ENGLISH] Q12. Write a formal letter to the headmaster of your school requesting permission to start an environmental club. Your letter must include:\n— Correct formal letter format\n— Two reasons why the club will benefit the school\n— A polite request for a meeting',
      a: 'Check for: sender address (top right), date, recipient address (left), subject line, "Dear Mr/Mrs [Name],", formal body paragraphs with two clear reasons, polite request for meeting, "Yours sincerely," with full name. Deduct marks for missing format elements.',
    },
    {
      q: '[ENGLISH] Q13. Read this passage and answer the questions.\n\n"The Harmattan wind blows across Ghana from the Sahara Desert between November and March. It brings dry, dusty air that reduces visibility and dries out skin and lips. Farmers dislike the Harmattan because it dries out their crops, but fishermen sometimes welcome it because the clear skies make navigation easier."\n\n(a) What is the main idea of this passage?\n(b) Give TWO effects of the Harmattan wind.\n(c) Why might fishermen welcome the Harmattan? Use evidence from the passage.',
      a: '(a) The Harmattan is a dry, dusty wind from the Sahara that affects Ghana between November and March, bringing both negative and positive effects.\n(b) Any two: reduces visibility; dries skin and lips; dries out crops; brings clear skies.\n(c) Fishermen welcome it because "clear skies make navigation easier" — they can see where they are going on the water.',
    },
    {
      q: '[ENGLISH] Q14. Rewrite these sentences correctly, changing the verb tense as instructed:\n(a) "She walks to school." → Change to PAST TENSE\n(b) "They were eating." → Change to PRESENT TENSE\n(c) "He finishes his work." → Change to FUTURE TENSE\n(d) "We had gone to the market." → Change to SIMPLE PAST',
      a: '(a) She walked to school.\n(b) They are eating.\n(c) He will finish his work.\n(d) We went to the market.',
    },
    {
      q: '[ENGLISH] Q15. [Challenge] Write a well-structured essay (3 paragraphs) on the topic: "Trees are more important than buildings."\nYour essay must include:\n— An introduction stating your position\n— A middle paragraph with TWO supporting arguments\n— A conclusion that restates your view',
      a: 'Award marks for: clear introduction with position stated; two well-argued points in body (e.g. trees produce oxygen, prevent soil erosion, support wildlife, regulate rainfall); logical conclusion. Deduct for poor sentence structure, missing paragraphs, or lack of supporting evidence.',
    },
  ],
}

async function seed() {
  console.log('🌱 Seeding Jezreel Quiz 1...\n')

  const answerKey = QUIZ.questions.map(q => q.a)
  await db.collection('packs').doc('jezreel_quiz1').set({
    ...QUIZ,
    answerKey,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  console.log('✅ Quiz 1 seeded: jezreel_quiz1')
  console.log('\nQuiz contents:')
  console.log('  Mathematics (Q1-Q5): Fractions, Data, Ratio, Percentage, Sequences')
  console.log('  Science (Q6-Q10): Food chains, Water cycle, Nutrition, Ecosystems')
  console.log('  English (Q11-Q15): Grammar errors, Formal letter, Comprehension, Tenses, Essay')
  console.log('\nNext: Add quiz1 to Jezreel\'s timetable in students.js')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌', err)
  process.exit(1)
})

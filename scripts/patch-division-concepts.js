// scripts/patch-division-concepts.js
// Adds long division (bus stop method) to Declyn Day 3 and Ivan Day 7
// Run AFTER reseed-maths-enriched.js
// Run: node scripts/patch-division-concepts.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

// ─── DECLYN DAY 3 — Add long division concept ─────────────────────────────
const declyn_day3_concepts = [
  {
    heading: 'Multiplying and Dividing by 10, 100 and 1,000',
    body: 'When multiplying or dividing whole numbers by powers of 10, think of it as SHIFTING the digits.\n\nMULTIPLYING — each digit moves LEFT to a higher value column:\n× 10: add ONE zero at the end\n× 100: add TWO zeros at the end\n× 1,000: add THREE zeros at the end\n\nExamples:\n347 × 10 = 3,470\n347 × 100 = 34,700\n56 × 1,000 = 56,000\n\nDIVIDING — each digit moves RIGHT to a lower value column:\n÷ 10: remove one zero\n÷ 100: remove two zeros\n÷ 1,000: remove three zeros\n\nExamples:\n82,000 ÷ 10 = 8,200\n82,000 ÷ 100 = 820\n82,000 ÷ 1,000 = 82\n\nMENTAL CHECK: Multiplying → answer should be BIGGER. Dividing → answer should be SMALLER.\n\nCOMMON MISTAKE: Removing zeros when multiplying or adding zeros when dividing. × 10 = BIGGER (add zero). ÷ 10 = SMALLER (remove zero).',
    note: 'This only works cleanly with whole numbers and multiples of 10. For other divisions, use the long division method below.',
  },
  {
    heading: 'Long Multiplication — Step by Step',
    body: 'Long multiplication breaks a big multiplication into smaller, easier steps.\n\nExample: 347 × 26\n\nSTEP 1: Multiply 347 by the UNITS digit (6):\nUnits: 7 × 6 = 42. Write 2, carry 4.\nTens: 4 × 6 = 24 + 4 = 28. Write 8, carry 2.\nHundreds: 3 × 6 = 18 + 2 = 20. Write 20.\nResult: 2,082\n\nSTEP 2: Write a ZERO placeholder, then multiply 347 by the TENS digit (2):\n347 × 20 = 6,940\n\nSTEP 3: Add:\n2,082 + 6,940 = 9,022\n\nCOMMON MISTAKE: Forgetting the zero placeholder in Step 2. Without it, you add in the wrong column and get a completely wrong answer.',
    note: 'The zero placeholder is NOT optional. It shifts the second partial product one column to the left because you are multiplying by TENS.',
  },
  {
    heading: 'Long Division — The Bus Stop Method',
    body: 'Long division solves problems like 952 ÷ 7 where you cannot just remove zeros.\n\nSET UP: Write the dividend (952) inside the "bus stop". Write the divisor (7) outside on the left.\n\n     ___\n7 ) 952\n\nSTEP BY STEP — work from LEFT to RIGHT:\n\nSTEP 1: How many times does 7 go into the FIRST digit (9)?\n7 × 1 = 7 (fits). 7 × 2 = 14 (too big).\nSo 7 goes into 9 ONE time. Write 1 above the 9.\nSubtract: 9 − 7 = 2. This is the REMAINDER — carry it to the next digit.\n\nSTEP 2: Bring the remainder (2) next to the next digit (5) to make 25.\nHow many times does 7 go into 25?\n7 × 3 = 21. 7 × 4 = 28 (too big).\nSo 7 goes into 25 THREE times. Write 3 above the 5.\nSubtract: 25 − 21 = 4. Carry 4 to next digit.\n\nSTEP 3: Bring the remainder (4) next to the next digit (2) to make 42.\nHow many times does 7 go into 42?\n7 × 6 = 42. Exactly!\nWrite 6 above the 2. Subtract: 42 − 42 = 0. No remainder.\n\nANSWER: 136\nCHECK: 136 × 7 = 952 ✓\n\nEXAMPLE WITH REMAINDER: 648 ÷ 6\nStep 1: 6 into 6 = 1. Remainder 0. Write 1.\nStep 2: Bring down 4. 6 into 04 = 0. Write 0.\nStep 3: Bring down 8. 6 into 48 = 8. Write 8.\nAnswer: 108. Check: 108 × 6 = 648 ✓\n\nEXAMPLE WITH FINAL REMAINDER: 1,248 ÷ 8\nStep 1: 8 into 12 = 1 rem 4. Write 1.\nStep 2: 8 into 44 = 5 rem 4. Write 5.\nStep 3: 8 into 48 = 6. Write 6.\nAnswer: 156. Check: 156 × 8 = 1,248 ✓\n\nCOMMON MISTAKES:\n1. Working right to left instead of left to right — always start from the LEFT.\n2. Forgetting to write 0 when the divisor does not go into a digit.\n3. Forgetting to check by multiplying back.',
    note: 'THE CHECK IS ESSENTIAL. After every long division, multiply your answer by the divisor. If you get the original number back, you are correct. If not, find the error.',
  },
]

const declyn_day3_worked = [
  {
    q: 'Calculate mentally: (a) 485 × 1,000  (b) 720,000 ÷ 100  (c) 36 × 100',
    a: '(a) Add three zeros: 485,000\n(b) Remove two zeros: 7,200\n(c) Add two zeros: 3,600',
  },
  {
    q: 'Find 268 × 34. Show all working.',
    a: 'Step 1: 268 × 4\n8×4=32, write 2 carry 3. 6×4=24+3=27, write 7 carry 2. 2×4=8+2=10. Result: 1,072\n\nStep 2: 268 × 30 (write 0 first, then × 3)\n8×3=24, write 4 carry 2. 6×3=18+2=20, write 0 carry 2. 2×3=6+2=8. Result: 8,040\n\nStep 3: 1,072 + 8,040 = 9,112',
  },
  {
    q: 'Divide 952 ÷ 7 using the bus stop method. Show all steps.',
    a: 'Step 1: 7 into 9 = 1 (7×1=7). Remainder: 9−7=2. Write 1.\nStep 2: Carry 2, bring down 5 → 25. 7 into 25 = 3 (7×3=21). Remainder: 25−21=4. Write 3.\nStep 3: Carry 4, bring down 2 → 42. 7 into 42 = 6 (7×6=42). Remainder: 0. Write 6.\nAnswer: 136\nCheck: 136 × 7 = 952 ✓',
  },
  {
    q: 'Divide 1,248 ÷ 8. Show all steps and check your answer.',
    a: 'Step 1: 8 into 1 = 0 (8 does not go into 1). Move to next: 8 into 12 = 1 rem 4. Write 1.\nStep 2: Carry 4, bring down 4 → 44. 8 into 44 = 5 rem 4 (8×5=40). Write 5.\nStep 3: Carry 4, bring down 8 → 48. 8 into 48 = 6 (8×6=48). Write 6.\nAnswer: 156\nCheck: 156 × 8 = 1,248 ✓',
  },
]

// ─── IVAN DAY 7 — Enhance with clearer long division for 2-digit numbers ───
const ivan_day7_concepts = [
  {
    heading: 'Division — What Does It Mean?',
    body: 'Division answers two questions:\n\nSHARING: If I share 24 mangoes equally among 6 children, how many does each child get?\n24 ÷ 6 = 4. Each child gets 4.\n\nGROUPING: If I have 24 mangoes and put 6 in each bag, how many bags do I fill?\n24 ÷ 6 = 4. I fill 4 bags.\n\nDIVISION AND MULTIPLICATION ARE OPPOSITES:\nIf 6 × 4 = 24, then:\n24 ÷ 6 = 4 AND 24 ÷ 4 = 6\n\nUSE MULTIPLICATION FACTS TO DIVIDE:\n56 ÷ 8 → think: 8 × ? = 56 → 8 × 7 = 56 → answer: 7\n\nALWAYS CHECK by multiplying:\n56 ÷ 8 = 7. Check: 7 × 8 = 56 ✓\n\nSPECIAL RULES:\n• Any number ÷ 1 = that number (12 ÷ 1 = 12)\n• Any number ÷ itself = 1 (9 ÷ 9 = 1)\n• Zero ÷ any number = 0 (0 ÷ 5 = 0)\n• You CANNOT divide by zero — it is impossible\n\nCOMMON MISTAKE: Getting confused about which number goes inside the bus stop. The number being DIVIDED (the bigger one usually) goes INSIDE. The number you are dividing BY goes OUTSIDE on the left.',
    note: 'Learn your multiplication facts thoroughly — they are the key to fast, accurate division. If you know 7 × 8 = 56, then 56 ÷ 7 = 8 and 56 ÷ 8 = 7 come for free.',
  },
  {
    heading: 'The Bus Stop Method for 2-Digit Division',
    body: 'When dividing a 2-digit number by a 1-digit number, use the BUS STOP method.\nWork from LEFT to RIGHT — hundreds first, then tens, then units.\n\nEXAMPLE 1 — No remainder: 84 ÷ 4\n\n    __\n4 ) 84\n\nSTEP 1: 4 into 8? 4 × 2 = 8. Write 2 above the 8. Subtract: 8−8=0.\nSTEP 2: 4 into 4? 4 × 1 = 4. Write 1 above the 4. Subtract: 4−4=0.\nAnswer: 21. Check: 21 × 4 = 84 ✓\n\nEXAMPLE 2 — With remainder carried forward: 76 ÷ 4\n\n    __\n4 ) 76\n\nSTEP 1: 4 into 7? 4 × 1 = 4 (fits). 4 × 2 = 8 (too big). So 4 goes into 7 ONCE.\nWrite 1 above the 7. Subtract: 7−4 = 3. CARRY the 3 to the next digit.\n\nSTEP 2: Carry 3 next to 6 → makes 36. 4 into 36? 4 × 9 = 36. Write 9 above the 6.\nSubtract: 36−36 = 0. No remainder.\nAnswer: 19. Check: 19 × 4 = 76 ✓\n\nEXAMPLE 3 — With final remainder: 47 ÷ 5\nSTEP 1: 5 into 4? 5 is bigger than 4, so it goes 0 times. Carry the 4.\nSTEP 2: Carry 4 next to 7 → makes 47. 5 into 47? 5 × 9 = 45 (close). Remainder: 47−45=2.\nAnswer: 9 remainder 2 (written 9 r 2).\nCheck: (9 × 5) + 2 = 45 + 2 = 47 ✓\n\nTHE REMAINDER must always be LESS than the divisor.\nIf remainder ≥ divisor, you can fit one more group — check your working.',
    note: 'When the divisor is bigger than the first digit, carry that first digit to the next position immediately. Example: 4 into 3 → cannot go. Carry the 3. Now look at 3X (where X is the next digit).',
  },
]

const ivan_day7_worked = [
  {
    q: 'Use multiplication facts to find: (a) 63 ÷ 7  (b) 54 ÷ 6  (c) 81 ÷ 9',
    a: '(a) 7 × ? = 63 → 7 × 9 = 63. Answer: 9. Check: 9 × 7 = 63 ✓\n(b) 6 × ? = 54 → 6 × 9 = 54. Answer: 9. Check: 9 × 6 = 54 ✓\n(c) 9 × ? = 81 → 9 × 9 = 81. Answer: 9. Check: 9 × 9 = 81 ✓',
  },
  {
    q: 'Divide 76 ÷ 4 using the bus stop method. Show every step.',
    a: 'Step 1: 4 into 7 = 1 (4×1=4). Remainder: 7−4=3. Write 1 above 7. Carry 3.\nStep 2: Carry 3 next to 6 → 36. 4 into 36 = 9 (4×9=36). Remainder: 0. Write 9.\nAnswer: 19\nCheck: 19 × 4 = 76 ✓',
  },
  {
    q: 'Divide 53 ÷ 6. Find quotient and remainder.',
    a: 'Step 1: 6 into 5? Cannot — 6 > 5. Carry 5.\nStep 2: Carry 5 next to 3 → 53. 6 into 53? 6×8=48, 6×9=54 (too big). So 8 times.\nRemainder: 53−48=5.\nAnswer: 8 remainder 5 (8 r 5).\nCheck: (8 × 6) + 5 = 48 + 5 = 53 ✓',
  },
  {
    q: '48 mangoes are shared equally among 6 children. How many does each child get?',
    a: '"Shared equally" = divide.\n48 ÷ 6: 6 × ? = 48 → 6 × 8 = 48. Answer: 8 mangoes each.\nCheck: 8 × 6 = 48 ✓',
  },
]

async function patch() {
  console.log('🔧 Patching division concepts...\n')

  // Update Declyn Day 3
  await db.collection('packs').doc('declyn_day3').update({
    concepts: declyn_day3_concepts,
    worked: declyn_day3_worked,
  })
  console.log('✅ Declyn Day 3: Added full bus stop long division method')
  console.log('   — Concept: Long Division with worked examples 952÷7 and 1,248÷8')
  console.log('   — Worked: 4 examples including division with carry-forward')

  // Update Ivan Day 7
  await db.collection('packs').doc('ivan_day7').update({
    concepts: ivan_day7_concepts,
    worked: ivan_day7_worked,
  })
  console.log('✅ Ivan Day 7: Enhanced with bus stop method for 2-digit division')
  console.log('   — Concept: Clear carry-forward examples (76÷4, 47÷5)')
  console.log('   — Worked: 4 examples including quotient with remainder')

  console.log('\n✅ Division patch complete!')
  console.log('\nRun order reminder:')
  console.log('  1. node scripts/reseed-maths-enriched.js  (enriched concept bodies)')
  console.log('  2. node scripts/patch-division-concepts.js  (this script — adds long division)')
  process.exit(0)
}

patch().catch(err => {
  console.error('❌', err)
  process.exit(1)
})

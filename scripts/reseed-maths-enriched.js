// scripts/reseed-maths-enriched.js
// Reseeds all 20 maths packs with enriched teaching notes
// Run: node scripts/reseed-maths-enriched.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

// ─────────────────────────────────────────────────────────────────────────────
// ENRICHED CONCEPT BODIES
// Each concept has: heading, body (full teaching notes), note (tip/warning)
// ─────────────────────────────────────────────────────────────────────────────

const ENRICHED = {

  // ═══════════════════════════════════════════════════════════════════════════
  // JEZREEL — B7
  // ═══════════════════════════════════════════════════════════════════════════

  jezreel_day1: {
    concepts: [
      {
        heading: 'Place Value Columns — Understanding Each Position',
        body: 'Every digit in a number has a PLACE VALUE — its meaning depends entirely on its POSITION.\n\nThe columns from right to left are:\nUnits → Tens → Hundreds → Thousands → Ten Thousands → Hundred Thousands → Millions → Ten Millions → Hundred Millions → Billions\n\nLet us use 2,735,468,901 as our example:\n2 → Billions (2,000,000,000)\n7 → Hundred Millions (700,000,000)\n3 → Ten Millions (30,000,000)\n5 → Millions (5,000,000)\n4 → Hundred Thousands (400,000)\n6 → Ten Thousands (60,000)\n8 → Thousands (8,000)\n9 → Hundreds (900)\n0 → Tens (0)\n1 → Units (1)\n\nSo 2,735,468,901 = Two billion, seven hundred and thirty-five million, four hundred and sixty-eight thousand, nine hundred and one.\n\nWhy does position matter?\nThe digit 3 appears in different numbers:\n300 → 3 is worth three hundred\n3,000 → 3 is worth three thousand\n3,000,000 → 3 is worth three million\nSAME digit, COMPLETELY different value. This is why place value is the foundation of all number work.',
        note: 'A billion = 1,000,000,000 — nine zeros. A million = 1,000,000 — six zeros. Count the commas to find your way: each comma separates a group of three digits.',
      },
      {
        heading: 'Comparing Large Numbers — Step by Step',
        body: 'To compare two large numbers, you do NOT need to count all the digits at once. Follow this method:\n\nSTEP 1: Count the digits. The number with MORE digits is larger.\nExample: 3,456,789 vs 45,678 → 3,456,789 is larger (7 digits vs 5 digits).\n\nSTEP 2: If both have the same number of digits, compare digit by digit from LEFT to RIGHT. Stop as soon as you find a difference.\n\nExample: Compare 5,223,487,637 and 5,113,487,637.\nBoth have 10 digits.\nBillions: 5 = 5 (same)\nHundred Millions: 2 vs 1 → 2 > 1\nSTOP. 5,223,487,637 > 5,113,487,637\n\nYou do not need to look at the remaining digits once you find a difference.\n\nCOMMON MISTAKE: Students sometimes compare the last digits instead of the first. Always start from the LEFT — the most significant digit.',
        note: 'Use the symbols correctly: > means "greater than" (the open mouth faces the bigger number), < means "less than". A helpful trick: the hungry crocodile always eats the BIGGER number, so the open mouth faces the bigger value.',
      },
      {
        heading: 'Skip Counting — Building Number Fluency',
        body: 'Skip counting means adding (or subtracting) the SAME number each time. It builds mental arithmetic speed.\n\nCounting FORWARD in 250s from 1,000:\n1,000 → 1,250 → 1,500 → 1,750 → 2,000 → 2,250 → 2,500\n\nCounting BACKWARD in 50s from 5,000:\n5,000 → 4,950 → 4,900 → 4,850 → 4,800 → 4,750\n\nCounting FORWARD in 25s from 9,900:\n9,900 → 9,925 → 9,950 → 9,975 → 10,000 → 10,025\n\nNotice: when counting in 25s, the units digit cycles through 0 → 25 → 50 → 75 → 00. Recognising this pattern helps you count faster.\n\nWhy is this useful? Skip counting prepares you for multiplication tables, patterns and sequences.',
        note: null,
      },
    ],
    worked: [
      { q: 'Write 1,295,800,000 in words.', a: 'One billion, two hundred and ninety-five million, eight hundred thousand.' },
      { q: 'What is the value of the digit 7 in 2,735,000,000?', a: '7 is in the Hundred Millions column. Value = 700,000,000 (seven hundred million). The digit after the billions digit is always Hundred Millions.' },
      { q: 'Which is greater: 8,301,456,221 or 8,310,456,221? Show your comparison step by step.', a: 'Both have 10 digits. Billions: 8 = 8. Hundred Millions: 3 = 3. Ten Millions: 0 vs 1. Stop — 1 > 0. So 8,310,456,221 > 8,301,456,221.' },
    ],
  },

  jezreel_day3: {
    concepts: [
      {
        heading: 'Rounding Off — The Most Common Type',
        body: 'Rounding makes numbers easier to work with. The rule is simple but students often apply it to the WRONG digit.\n\nTHE GOLDEN RULE:\nLook at the digit IMMEDIATELY to the RIGHT of the place you are rounding to.\n• If that digit is 5, 6, 7, 8 or 9 → round UP (add 1 to the target digit)\n• If that digit is 0, 1, 2, 3 or 4 → round DOWN (keep the target digit the same)\nThen replace ALL digits to the right of the target place with zeros.\n\nExample: Round 2,846,655 to the nearest thousand.\nTarget place: thousands (the 6 in position 4 from right).\nLook RIGHT: the hundreds digit = 6. Since 6 ≥ 5, round UP.\n2,846,655 → 2,847,000\n\nExample: Round 2,846,655 to the nearest ten thousand.\nTarget place: ten thousands (the 4).\nLook RIGHT: the thousands digit = 6. Since 6 ≥ 5, round UP.\n2,846,655 → 2,850,000\n\nCOMMON MISTAKE: Students look at the TARGET digit instead of the digit to its RIGHT. Always look ONE place to the right of where you are rounding.',
        note: 'ROUNDING UP means always go higher regardless of the digit (e.g. always round to the next ten). ROUNDING DOWN means always go lower. These are different from "rounding off" which uses the 5-or-more rule.',
      },
      {
        heading: 'Rounding Decimals — Same Rule, Smaller Places',
        body: 'Decimal place names (from the decimal point going RIGHT):\n1st place after decimal → TENTHS (0.1s)\n2nd place → HUNDREDTHS (0.01s)\n3rd place → THOUSANDTHS (0.001s)\n4th place → TEN-THOUSANDTHS (0.0001s)\n\nThe rounding rule is IDENTICAL — look one place to the right of your target.\n\nExample: Round 486.3685 to different decimal places.\n\nTo 1 decimal place (nearest tenth):\nTarget: 3 (tenths position). Look right: 6 (hundredths). 6 ≥ 5 → round up. Answer: 486.4\n\nTo 2 decimal places (nearest hundredth):\nTarget: 6 (hundredths). Look right: 8 (thousandths). 8 ≥ 5 → round up. Answer: 486.37\n\nTo 3 decimal places (nearest thousandth):\nTarget: 8 (thousandths). Look right: 5 (ten-thousandths). 5 ≥ 5 → round up. Answer: 486.369\n\nNotice that rounding to 1 d.p. gave us 486.4 — when we round up the 3 to 4, the digits after disappear completely.',
        note: 'd.p. = decimal places. 1 d.p. means one digit after the decimal point (tenths). 2 d.p. means two digits (hundredths). The more decimal places, the MORE precise the answer.',
      },
      {
        heading: 'Significant Figures — Measuring Precision',
        body: 'Significant figures (s.f.) count the MEANINGFUL digits in a number, starting from the FIRST NON-ZERO digit.\n\nWHICH DIGITS ARE SIGNIFICANT?\n• All non-zero digits are significant: 4, 56, 789 → 1, 2, 3 s.f.\n• Zeros BETWEEN non-zero digits are significant: 4,008 → 4 s.f.\n• Trailing zeros AFTER a decimal point are significant: 3.40 → 3 s.f.\n• Leading zeros (before the first non-zero digit) are NOT significant: 0.0045 → 2 s.f.\n\nTo express a number to given significant figures:\nSTEP 1: Count from the first non-zero digit.\nSTEP 2: Apply the rounding rule at that position.\nSTEP 3: Replace remaining digits with zeros (before decimal) or drop them (after decimal).\n\nExample: 857,386,321 to 3 s.f.\nFirst 3 significant digits: 8, 5, 7. Next digit: 3 (< 5) → round down.\nAnswer: 857,000,000\n\nExample: 0.00234567 to 3 s.f.\nFirst non-zero digit: 2. Count: 2, 3, 4. Next digit: 5 (≥ 5) → round up.\nAnswer: 0.00235\n\nCOMMON MISTAKE: Students start counting from the decimal point or from the left of ALL digits including zeros. Always start counting from the FIRST NON-ZERO digit.',
        note: 'Trailing zeros after a decimal point ARE significant and must be written. 0.360 has 3 significant figures — the zero at the end shows precision. 0.36 has only 2 significant figures.',
      },
    ],
    worked: [
      { q: 'Round 2,846,655 to (a) the nearest thousand (b) the nearest hundred thousand', a: '(a) Target: thousands digit = 6. Look right: hundreds digit = 6 ≥ 5 → round UP. Answer: 2,847,000.\n(b) Target: hundred thousands digit = 8. Look right: ten thousands digit = 4 < 5 → round DOWN. Answer: 2,800,000.' },
      { q: 'Round 0.08475 to (a) 1 d.p. (b) 2 d.p. (c) 3 d.p.', a: '(a) Target: tenths digit = 0. Look right: hundredths = 8 ≥ 5 → round up. Answer: 0.1\n(b) Target: hundredths digit = 8. Look right: thousandths = 4 < 5 → round down. Answer: 0.08\n(c) Target: thousandths digit = 4. Look right: ten-thousandths = 7 ≥ 5 → round up. Answer: 0.085' },
      { q: 'Express 857,386,321 to 4 significant figures.', a: 'First 4 significant digits: 8, 5, 7, 3. Next digit: 8 ≥ 5 → round up the 3 to 4. Answer: 857,400,000.' },
    ],
  },

  jezreel_day5: {
    concepts: [
      {
        heading: 'Multiplying and Dividing by Powers of 10',
        body: 'When you multiply or divide by 10, 100 or 1,000, every digit shifts position. Think of it as the DIGITS MOVING along the place value columns.\n\nMULTIPLYING — digits shift LEFT (towards higher value columns):\n× 10: each digit moves ONE column to the left\n× 100: each digit moves TWO columns to the left\n× 1,000: each digit moves THREE columns to the left\n\nDIVIDING — digits shift RIGHT (towards lower value columns):\n÷ 10: each digit moves ONE column to the right\n÷ 100: each digit moves TWO columns to the right\n÷ 1,000: each digit moves THREE columns to the right\n\nWorked examples — watch each digit carefully:\n105.25 × 10 = 1,052.5 (decimal moves one right)\n105.25 × 100 = 10,525 (decimal moves two right)\n105.25 × 1,000 = 105,250 (decimal moves three right)\n105.25 ÷ 10 = 10.525 (decimal moves one left)\n105.25 ÷ 100 = 1.0525 (decimal moves two left)\n105.25 ÷ 1,000 = 0.10525 (decimal moves three left)\n\n0.075 × 10,000: moves FOUR places right → 750\n\nCOMMON MISTAKE: Students "add zeros" instead of shifting digits. This works for whole numbers but FAILS for decimals. 3.5 × 10 is NOT 3.50 — it is 35.',
        note: 'The decimal point itself never moves — it is always between the units and the tenths. What moves are the DIGITS. Think of the digits as people moving seats, while the decimal point is a fixed marker on the floor.',
      },
      {
        heading: 'Doubling, Halving & the Distributive Property',
        body: 'These are mental maths shortcuts that save time and reduce errors.\n\nDOUBLING AND HALVING:\nIf you halve one number and double the other, the product stays the same.\nThis is most useful when it creates a × 10 calculation.\n\nExample: 28 × 5\nHalve 28 = 14. Double 5 = 10.\n14 × 10 = 140 ✓ (much easier than 28 × 5 directly)\n\nExample: 16 × 25\nHalve 16 = 8. Double 25 = 50. Halve 8 = 4. Double 50 = 100.\n4 × 100 = 400 ✓\n\nTHE DISTRIBUTIVE PROPERTY:\na × (b + c) = (a × b) + (a × c)\na × (b - c) = (a × b) - (a × c)\n\nUse this to split AWKWARD numbers into EASY ones:\nExample: 9 × 98\n= 9 × (100 - 2)\n= (9 × 100) - (9 × 2)\n= 900 - 18 = 882\n\nExample: 7 × 53\n= 7 × (50 + 3)\n= (7 × 50) + (7 × 3)\n= 350 + 21 = 371\n\nCOMMON MISTAKE: Forgetting to distribute to BOTH parts. 6 × (20 + 4) ≠ 6 × 20 + 4. You must multiply the 6 by BOTH 20 AND 4.',
        note: 'These tricks save time in exams. The key question to ask yourself is: "Can I make one of these numbers into a round number (multiple of 10 or 100)?" If yes, use the distributive property.',
      },
      {
        heading: 'Key Words in Word Problems',
        body: 'Word problems hide the operation in everyday language. Learn to translate words into maths.\n\nADDITION (+):\nsum, total, altogether, combined, increased by, more than, added to, plus\nExample: "The total weight of Kofi and Ama" → add their weights\n\nSUBTRACTION (-):\ndifference, less than, reduced by, how much more, remaining, left over, decreased by\nExample: "How much more does Abena earn than Kweku?" → subtract\n\nMULTIPLICATION (×):\nproduct, times, of (with fractions/percentages), multiplied by, groups of, per (sometimes)\nExample: "3 bags of rice, each weighing 5 kg" → 3 × 5\n\nDIVISION (÷):\nquotient, share equally, split between, how many groups, divided by, per (sometimes), each\nExample: "24 mangoes shared equally among 6 children" → 24 ÷ 6\n\nTWO-STEP PROBLEMS:\nSome problems require two operations. Read carefully — do them in the right order.\nExample: "Mrs Adamu bought 13.6 kg of meat. Mrs Anderson bought 2.4 kg less. How much did they buy altogether?"\nStep 1: Find Mrs Anderson: 13.6 - 2.4 = 11.2 kg\nStep 2: Find total: 13.6 + 11.2 = 24.8 kg',
        note: 'DANGER WORDS: "less than" and "more than" often catch students out. "5 less than x" means x - 5 (NOT 5 - x). "3 more than x" means x + 3. The unknown (x) comes first.',
      },
    ],
    worked: [
      { q: 'Find: (a) 34.56 × 100  (b) 8,450 ÷ 1,000  (c) 0.075 × 10,000', a: '(a) Shift decimal 2 right: 3,456\n(b) Shift decimal 3 left: 8.45\n(c) Shift decimal 4 right: 750' },
      { q: 'Use the distributive property to find: (a) 9 × 98  (b) 6 × 204  (c) 14 × 25', a: '(a) 9 × (100-2) = 900-18 = 882\n(b) 6 × (200+4) = 1,200+24 = 1,224\n(c) Halve 14, double 25: 7 × 50 = 350' },
      { q: 'Word problem: Mrs Adamu bought 13.6 kg of meat. Mrs Anderson bought 2.4 kg less. How many kg did they buy altogether?', a: 'Step 1 — Mrs Anderson: 13.6 - 2.4 = 11.2 kg\nStep 2 — Total: 13.6 + 11.2 = 24.8 kg\nKey words: "less" (subtract), "altogether" (add)' },
    ],
  },

  jezreel_day7: {
    concepts: [
      {
        heading: 'Index Notation — Writing Powers of Numbers',
        body: 'When the same number is multiplied by itself repeatedly, we use INDEX NOTATION (also called EXPONENTIAL NOTATION) as a shorthand.\n\n2 × 2 × 2 × 2 × 2 = 2⁵\n\nThe BASE (2) is the number being multiplied.\nThe EXPONENT or INDEX (5) tells you how many times.\n2⁵ is read as "2 to the power of 5" or "2 to the fifth".\n\nBuilding up the powers of 2:\n2¹ = 2\n2² = 4 (called "2 squared")\n2³ = 8 (called "2 cubed")\n2⁴ = 16\n2⁵ = 32\n2⁶ = 64\n2⁷ = 128\n2⁸ = 256\n2⁹ = 512\n2¹⁰ = 1,024\n\nPowers of 10 — very important for place value:\n10¹ = 10\n10² = 100\n10³ = 1,000\n10⁶ = 1,000,000 (one million)\n10⁹ = 1,000,000,000 (one billion)\n\nTHE ZERO INDEX RULE: any number to the power of 0 = 1.\n7⁰ = 1. 1,000⁰ = 1. 0.5⁰ = 1. This is a rule — memorise it.\n\nCOMMON MISTAKE: 3² ≠ 3 × 2 = 6. It means 3 × 3 = 9. The exponent tells you how many FACTORS of the base, not to multiply the base by the exponent.',
        note: 'A PERFECT SQUARE is a number that equals an integer to the power of 2: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. A PERFECT CUBE: 1, 8, 27, 64, 125. Know these by heart — they appear constantly.',
      },
      {
        heading: 'Product of Prime Factors — The Factor Tree',
        body: 'PRIME NUMBERS have exactly 2 factors: 1 and themselves.\nPrimes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...\n\nNote: 1 is NOT a prime. 2 is the ONLY even prime.\n\nEVERY whole number (except 1) can be written as a unique product of prime factors. We find them using a FACTOR TREE.\n\nExample: Express 72 as a product of prime factors.\n72\n├── 8 × 9\n├── (2 × 2 × 2) × (3 × 3)\n= 2³ × 3²\n\nExample: Express 120 as a product of prime factors.\n120 = 2 × 60 = 2 × 2 × 30 = 2 × 2 × 2 × 15 = 2 × 2 × 2 × 3 × 5 = 2³ × 3 × 5\n\nVerify: 2³ × 3 × 5 = 8 × 3 × 5 = 8 × 15 = 120 ✓\n\nCOMMON MISTAKE: Stopping the factor tree too early and leaving composite numbers (non-prime) at the end. Keep splitting until EVERY branch ends in a prime.',
        note: null,
      },
      {
        heading: 'HCF and LCM — Using Prime Factors',
        body: 'HIGHEST COMMON FACTOR (HCF): the LARGEST number that divides exactly into all given numbers.\n\nTo find HCF using prime factors:\nWrite each number as prime factors. Identify COMMON factors. Multiply using the LOWEST power of each.\n\nExample: HCF of 24 and 30.\n24 = 2³ × 3\n30 = 2 × 3 × 5\nCommon primes: 2 (use lowest power: 2¹) and 3 (use lowest power: 3¹)\nHCF = 2 × 3 = 6\n\nLOWEST COMMON MULTIPLE (LCM): the SMALLEST number that is a multiple of all given numbers.\n\nTo find LCM using prime factors:\nWrite each number as prime factors. Take ALL primes that appear. Use the HIGHEST power of each.\n\nExample: LCM of 12 and 8.\n12 = 2² × 3\n8 = 2³\nAll primes: 2 (highest power: 2³) and 3 (highest power: 3¹)\nLCM = 2³ × 3 = 8 × 3 = 24\n\nCheck: Is 24 a multiple of 12? 12 × 2 = 24 ✓. Is 24 a multiple of 8? 8 × 3 = 24 ✓.\n\nWHEN TO USE EACH:\nHCF → cutting, sharing, dividing into equal groups, "what is the largest...?"\nLCM → scheduling, repeating events, "when will they next...?", "what is the smallest...?"',
        note: 'Memory trick: HCF uses COMMON factors with LOWEST powers. LCM uses ALL factors with HIGHEST powers. "HCF is picky — only what they share, the smaller amount." "LCM is generous — takes everything, the bigger amount."',
      },
    ],
    worked: [
      { q: 'Express 32 as a power of 2. Evaluate 5³ and 3⁴.', a: '32 = 2 × 2 × 2 × 2 × 2 = 2⁵\n5³ = 5 × 5 × 5 = 25 × 5 = 125\n3⁴ = 3 × 3 × 3 × 3 = 9 × 9 = 81' },
      { q: 'Find the HCF of 36 and 48 using prime factors. Show all working.', a: '36 = 2² × 3²\n48 = 2⁴ × 3\nCommon: 2 (lowest power: 2²) and 3 (lowest power: 3¹)\nHCF = 2² × 3 = 4 × 3 = 12\nCheck: 36 ÷ 12 = 3 ✓ and 48 ÷ 12 = 4 ✓' },
      { q: 'Baba exercises every 12 days. Serwa exercises every 8 days. They both exercise today. After how many days will they next exercise together?', a: 'We need the LCM of 12 and 8.\n12 = 2² × 3\n8 = 2³\nLCM = 2³ × 3 = 8 × 3 = 24 days\nCheck: 24 is a multiple of both 12 (12 × 2) and 8 (8 × 3) ✓' },
    ],
  },

  jezreel_day9: {
    concepts: [
      {
        heading: 'Converting Between Fractions, Decimals and Percentages',
        body: 'These three forms represent the SAME value in different formats. Being able to switch between them is essential.\n\nFRACTION → DECIMAL:\nDivide the numerator (top) by the denominator (bottom).\n3/8 = 3 ÷ 8 = 0.375\n7/4 = 7 ÷ 4 = 1.75\n5/3 = 5 ÷ 3 = 1.6666... = 1.6̄ (recurring)\n\nDECIMAL → PERCENTAGE:\nMultiply by 100 (move decimal 2 places right, add % sign).\n0.375 × 100 = 37.5%\n1.75 × 100 = 175%\n0.06 × 100 = 6%\n\nPERCENTAGE → FRACTION:\nWrite over 100, then simplify by dividing both by HCF.\n38% = 38/100 = 19/50 (HCF = 2)\n75% = 75/100 = 3/4 (HCF = 25)\n12.5% = 12.5/100 = 125/1000 = 1/8\n\nBENCHMARK FRACTIONS — memorise these:\n1/2 = 0.5 = 50%\n1/4 = 0.25 = 25%\n3/4 = 0.75 = 75%\n1/3 = 0.333... ≈ 33.3%\n2/3 = 0.666... ≈ 66.7%\n1/5 = 0.2 = 20%\n1/8 = 0.125 = 12.5%\n1/10 = 0.1 = 10%\n\nCOMMON MISTAKE: When converting % to fraction, students forget to simplify. 60% = 60/100 = 3/5 (NOT 60/100 — always simplify).',
        note: null,
      },
      {
        heading: 'Comparing and Ordering Fractions',
        body: 'METHOD 1 — Convert to Decimals (quickest for 2 fractions):\nDivide each fraction, then compare the decimal values.\n7/12 = 0.583... and 8/10 = 0.8 → 8/10 is greater.\n\nMETHOD 2 — Find the LCD (best for ordering multiple fractions):\nThe LCD (Lowest Common Denominator) is the LCM of all the denominators.\nConvert each fraction to an equivalent fraction with the LCD.\nThen compare numerators.\n\nExample: Order 5/6, 3/4, 7/8 from least to greatest.\nLCD of 6, 4, 8 = 24.\n5/6 = 20/24\n3/4 = 18/24\n7/8 = 21/24\nCompare numerators: 18 < 20 < 21\nOrder: 3/4 < 5/6 < 7/8\n\nCOMMON MISTAKE: Students compare denominators and assume the fraction with the BIGGER denominator is bigger. This is WRONG. 1/8 < 1/4 even though 8 > 4. A bigger denominator means MORE equal parts, so EACH part is SMALLER.',
        note: 'When denominators are the same, bigger numerator = bigger fraction. When numerators are the same, bigger denominator = SMALLER fraction. These two rules help catch errors quickly.',
      },
      {
        heading: 'Adding and Subtracting Fractions — Full Method',
        body: 'You can only add or subtract fractions when they have the SAME denominator. If they don\'t, you must convert them first.\n\nSTEP 1: Find the LCD (LCM of the denominators).\nSTEP 2: Convert each fraction to an equivalent fraction with the LCD.\nSTEP 3: Add or subtract ONLY the numerators. The denominator stays the same.\nSTEP 4: Simplify the result. If it is an improper fraction, convert to a mixed number.\n\nExample: 3/4 + 5/6\nLCD of 4 and 6: multiples of 6 = 6, 12, 18... multiples of 4 = 4, 8, 12... LCD = 12.\n3/4 = 9/12 (multiply top and bottom by 3)\n5/6 = 10/12 (multiply top and bottom by 2)\n9/12 + 10/12 = 19/12 = 1 7/12\n\nMIXED NUMBERS — add/subtract whole and fraction parts separately:\nExample: 4⅔ - 2¾\nMethod: Convert to improper fractions first.\n4⅔ = 14/3\n2¾ = 11/4\nLCD = 12.\n14/3 = 56/12. 11/4 = 33/12.\n56/12 - 33/12 = 23/12 = 1 11/12\n\nCOMMON MISTAKE: Adding the denominators as well as the numerators. 1/4 + 1/4 ≠ 2/8. It = 2/4 = 1/2. The denominator tells you the SIZE of the parts — adding fractions does not change the size of the parts.',
        note: 'Always simplify your final answer. If the answer is an improper fraction (numerator > denominator), convert to a mixed number. Example: 19/12 = 1 7/12 (12 goes into 19 once with 7 remaining).',
      },
    ],
    worked: [
      { q: 'Order from least to greatest: 0.832, 3/8, 38%', a: 'Convert all to decimals:\n0.832 = 0.832\n3/8 = 3 ÷ 8 = 0.375\n38% = 38 ÷ 100 = 0.38\nOrder: 0.375 < 0.38 < 0.832\nSo: 3/8 < 38% < 0.832' },
      { q: 'Add: 2⅖ + 1⅔', a: 'Whole numbers: 2 + 1 = 3\nFractions: 2/5 + 2/3. LCD = 15.\n2/5 = 6/15. 2/3 = 10/15.\n6/15 + 10/15 = 16/15 = 1 1/15\nTotal = 3 + 1 1/15 = 4 1/15' },
      { q: 'A board is 12¼ feet long. A piece of 3⅓ feet is cut off. How long is the remainder?', a: '12¼ - 3⅓ = 49/4 - 10/3\nLCD = 12.\n49/4 = 147/12. 10/3 = 40/12.\n147/12 - 40/12 = 107/12 = 8 11/12 feet' },
    ],
  },

  jezreel_day11: {
    concepts: [
      {
        heading: 'Multiplying Fractions — and Finding a Fraction of a Quantity',
        body: 'MULTIPLYING TWO FRACTIONS:\nMultiply the numerators together. Multiply the denominators together. Simplify.\n\nExample: 2/3 × 3/5 = (2 × 3)/(3 × 5) = 6/15 = 2/5\n\nCROSS-CANCELLING — simplify BEFORE multiplying to keep numbers small:\nLook for common factors between ANY numerator and ANY denominator (across the fraction sign, not just within one fraction).\n\nExample: 4/9 × 3/8\nCross-cancel: 4 and 8 share factor 4 → 4÷4=1, 8÷4=2. Also 9 and 3 share factor 3 → 3÷3=1, 9÷3=3.\n= 1/3 × 1/2 = 1/6 ✓ (much simpler than 12/72 = 1/6)\n\nMULTIPLYING MIXED NUMBERS:\nAlways convert to improper fractions FIRST, then multiply.\n2½ × 3⅓ = 5/2 × 10/3 = 50/6 = 25/3 = 8⅓\n\nFINDING A FRACTION OF A QUANTITY:\n"OF" means MULTIPLY.\n2/3 of GH₵60 = 2/3 × 60 = 2 × 60/3 = 120/3 = GH₵40\n3/8 of 480 = 3 × 480/8 = 3 × 60 = 180\n\nTip: Divide by the denominator first, then multiply by the numerator. This keeps numbers smaller.\n\nPERCENTAGE OF A QUANTITY:\n28% of 40 = 28/100 × 40 = (28 × 40)/100 = 1,120/100 = 11.2\nOr: 0.28 × 40 = 11.2 (convert % to decimal first)\n\nCOMMON MISTAKE: When multiplying mixed numbers, students multiply the whole parts together and fraction parts separately. This is WRONG. 2½ × 3 ≠ 6½. Convert to improper fractions first.',
        note: '"OF" always means multiply in mathematics. 3/4 of 80 = 3/4 × 80 = 60. Half of 50 = 1/2 × 50 = 25. This works for fractions, percentages and decimals.',
      },
      {
        heading: 'Dividing Fractions — The Reciprocal Method (KCF)',
        body: 'To divide by a fraction, use the KCF method:\nKEEP the first fraction.\nCHANGE ÷ to ×.\nFLIP the second fraction (write its reciprocal).\n\nThe RECIPROCAL of a fraction is obtained by swapping numerator and denominator:\nReciprocal of 3/5 = 5/3\nReciprocal of 4 = 1/4 (think of 4 as 4/1)\nReciprocal of 1/7 = 7/1 = 7\n\nExamples:\n3 ÷ 1/4 → Keep 3, Change to ×, Flip 1/4 to 4/1 → 3 × 4 = 12\n\n5/8 ÷ 1/2 → Keep 5/8, Change to ×, Flip 1/2 to 2/1 → 5/8 × 2/1 = 10/8 = 5/4 = 1¼\n\n3/4 ÷ 5/6 → Keep 3/4, Change to ×, Flip 5/6 to 6/5 → 3/4 × 6/5 = 18/20 = 9/10\n\nWhy does this work? Dividing by 1/4 is the same as asking "how many quarters fit in this number?" 3 ÷ 1/4 = 12 because twelve quarters make 3.\n\nDIVIDING MIXED NUMBERS:\nConvert to improper fractions first.\n2¼ ÷ 3/4 = 9/4 ÷ 3/4 = 9/4 × 4/3 = 36/12 = 3\n\nCOMMON MISTAKE: Flipping the FIRST fraction instead of the second. Always keep the first fraction unchanged, then flip only the divisor (second fraction).',
        note: 'Keep → Change → Flip. Say it out loud each time until it becomes automatic. The most common error in fraction division is flipping the wrong fraction.',
      },
    ],
    worked: [
      { q: 'Find: (a) 3/8 × 480  (b) 4/9 × 3/8 using cross-cancellation  (c) 3½% of GH₵50', a: '(a) 3/8 × 480: divide by denominator first: 480 ÷ 8 = 60. Then × 3 = 180.\n(b) Cross-cancel: 4÷4=1 with 8÷4=2, and 3÷3=1 with 9÷3=3. So 1/3 × 1/2 = 1/6.\n(c) 3.5/100 × 50 = 3.5 × 50 ÷ 100 = 175 ÷ 100 = GH₵1.75' },
      { q: 'There are 132 learners in a school. 2/3 are girls. How many boys are there?', a: 'Girls = 2/3 × 132 = 2 × 132 ÷ 3 = 264 ÷ 3 = 88.\nBoys = 132 - 88 = 44.\nCheck: 88 girls + 44 boys = 132 ✓' },
      { q: 'A stack of plates weighs 10 kg. Each plate weighs 1/4 kg. How many plates are in the stack?', a: '10 ÷ 1/4 = 10 × 4/1 = 40 plates.\nCheck: 40 × 1/4 = 40/4 = 10 kg ✓\nThink of it as: how many quarters are in 10? 10 × 4 = 40.' },
    ],
  },

  jezreel_day13: {
    concepts: [
      {
        heading: 'What is a Ratio? Writing and Simplifying',
        body: 'A ratio compares two or more quantities of the SAME KIND. It shows their relative sizes.\n\nWAYS TO WRITE A RATIO:\n• Using a colon: 3:5\n• As a fraction: 3/5\n• In words: "3 to 5"\n\nAll three mean the same thing — for every 3 of the first quantity, there are 5 of the second.\n\nIMPORTANT: Order matters. Boys:Girls = 3:5 is NOT the same as Girls:Boys = 5:3.\n\nSIMPLIFYING A RATIO:\nDivide ALL parts by their HCF.\nExample: 45:75. HCF of 45 and 75 = 15.\n45 ÷ 15 = 3. 75 ÷ 15 = 5. Simplified: 3:5.\n\nExample: 1.5 m : 60 cm\nFIRST — convert to the SAME unit: 1.5 m = 150 cm.\nRatio = 150:60. HCF = 30. Simplified: 5:2.\n\nTHREE-PART RATIOS:\nExample: Simplify 12:8:20. HCF = 4. → 3:2:5\n\nCOMMON MISTAKE 1: Writing the ratio in the wrong order. Read the question carefully — it tells you which quantity comes first.\nCOMMON MISTAKE 2: Forgetting to convert to the same unit before writing the ratio. You cannot ratio cm to m directly.',
        note: 'A ratio has NO units — once you have converted to the same unit and written the ratio, the units disappear. 150 cm : 60 cm = 150:60 = 5:2 (no "cm" in the answer).',
      },
      {
        heading: 'Unit Rate — Finding the Cost/Value of One',
        body: 'A UNIT RATE tells you the value for exactly ONE unit. It makes comparison easy.\n\nTo find the unit rate: DIVIDE by the given quantity.\n\nExample: 6 mangoes cost GH₵18.\nUnit rate = 18 ÷ 6 = GH₵3 per mango.\n\nOnce you have the unit rate, you can find any quantity:\nCost of 10 mangoes = 10 × GH₵3 = GH₵30\nCost of 25 mangoes = 25 × GH₵3 = GH₵75\nNumber of mangoes for GH₵45 = 45 ÷ 3 = 15 mangoes\n\nCommon unit rates in Ghana:\nSpeed: km per hour (km/h)\nPrice: GH₵ per kg, GH₵ per litre\nWages: GH₵ per day, GH₵ per hour\n\nCOMMON MISTAKE: Dividing by the wrong number. Always identify WHAT "one unit" is in the question. If 3 kg costs GH₵60, one KG (not one cedi) is the unit: 60 ÷ 3 = GH₵20 per kg.',
        note: null,
      },
      {
        heading: 'Sharing in a Ratio — The Three-Step Method',
        body: 'When an amount is shared in a ratio, follow these three steps WITHOUT FAIL:\n\nSTEP 1: Add the ratio parts to find the TOTAL number of parts.\nSTEP 2: Divide the total amount by the total parts to find ONE PART.\nSTEP 3: Multiply each person\'s ratio number by one part.\n\nALWAYS CHECK: the shares should add back to the original amount.\n\nExample: Kofi and Ama share GH₵360 in ratio 3:5.\nStep 1: Total parts = 3 + 5 = 8\nStep 2: One part = GH₵360 ÷ 8 = GH₵45\nStep 3: Kofi = 3 × GH₵45 = GH₵135. Ama = 5 × GH₵45 = GH₵225.\nCheck: 135 + 225 = 360 ✓\n\nExample (3 people): Kwame, Abena and Yaw share GH₵240 in ratio 1:2:3.\nStep 1: Total parts = 1 + 2 + 3 = 6\nStep 2: One part = 240 ÷ 6 = GH₵40\nStep 3: Kwame = 1 × 40 = GH₵40. Abena = 2 × 40 = GH₵80. Yaw = 3 × 40 = GH₵120.\nCheck: 40 + 80 + 120 = 240 ✓\n\nCOMMON MISTAKE: Dividing the total amount by the ratio numbers directly instead of by the TOTAL number of parts. Always add the parts first.',
        note: 'The check is not optional — it is how you know your answer is right. If the shares do not add back to the original total, you have made an error somewhere.',
      },
    ],
    worked: [
      { q: 'Write the ratio 1.5 m to 60 cm in simplest form.', a: 'Convert to same units: 1.5 m = 150 cm.\nRatio = 150:60. HCF = 30.\n150 ÷ 30 = 5. 60 ÷ 30 = 2.\nSimplified: 5:2' },
      { q: 'If 3 kg of meat costs GH₵60, find the cost of 7 kg.', a: 'Unit rate = 60 ÷ 3 = GH₵20 per kg.\nCost of 7 kg = 7 × 20 = GH₵140.' },
      { q: 'Kafui (36), Adoley (48) and Jantuah (24) share money in ratio of their ages. Jantuah gets GH₵24,000. Find the total.', a: 'Ratio = 36:48:24. Simplify by ÷12 → 3:4:2.\nJantuah\'s ratio = 2 parts = GH₵24,000.\nOne part = 24,000 ÷ 2 = GH₵12,000.\nTotal parts = 3+4+2 = 9.\nTotal = 9 × 12,000 = GH₵108,000.\nCheck: Kafui=36,000, Adoley=48,000, Jantuah=24,000. Sum=108,000 ✓' },
    ],
  },

  jezreel_day15: {
    concepts: [
      {
        heading: 'Proportional Reasoning — Direct Proportion',
        body: 'Two quantities are in DIRECT PROPORTION when:\n• As one increases, the other increases by the SAME factor.\n• As one decreases, the other decreases by the same factor.\n• Their ratio (one ÷ the other) always stays constant.\n\nMETHOD 1 — Unit rate (most reliable):\nFind the value for ONE unit, then multiply.\nExample: 5 kg costs GH₵40. Find cost of 8 kg.\nUnit rate = 40 ÷ 5 = GH₵8/kg.\nCost of 8 kg = 8 × 8 = GH₵64.\n\nMETHOD 2 — Cross multiplication:\nSet up: known/known = unknown/unknown\n5/40 = 8/x → cross multiply: 5x = 40 × 8 = 320 → x = 64\n\nMETHOD 3 — Scale factor:\nWhat factor takes you from 5 to 8? 8 ÷ 5 = 1.6\nSame factor applied to cost: 40 × 1.6 = GH₵64\n\nAll three methods give the same answer. Choose whichever you find clearest.\n\nNOTE: Not all real-life problems are proportional. More workers do NOT always mean proportionally more output. More medicine does NOT always mean proportionally better results. Always check whether the relationship is truly proportional before applying this method.',
        note: null,
      },
      {
        heading: 'Percentage Increase, Decrease and Expressing as Percentage',
        body: 'EXPRESS A AS A PERCENTAGE OF B:\nFormula: (A ÷ B) × 100\nExample: Express 45 as a % of 180: (45 ÷ 180) × 100 = 0.25 × 100 = 25%\n\nPERCENTAGE INCREASE:\nFormula: (Increase ÷ Original) × 100\nWhere: Increase = New value − Original value\nExample: Price rises from GH₵80 to GH₵100.\nIncrease = 100 − 80 = 20.\n% increase = (20 ÷ 80) × 100 = 25%\n\nPERCENTAGE DECREASE:\nFormula: (Decrease ÷ Original) × 100\nWhere: Decrease = Original value − New value\nExample: Salary drops from GH₵500 to GH₵400.\nDecrease = 500 − 400 = 100.\n% decrease = (100 ÷ 500) × 100 = 20%\n\nFINDING NEW VALUE AFTER % CHANGE:\nAfter 25% increase: New = Original × 1.25\nAfter 20% decrease: New = Original × 0.80\nGeneral: Increase → multiply by (1 + rate/100). Decrease → multiply by (1 − rate/100).\n\nCOMMON MISTAKE: Using the NEW value instead of the ORIGINAL as the denominator. Percentage change is ALWAYS calculated from the ORIGINAL (starting) value.',
        note: 'A 25% increase followed by a 25% decrease does NOT return to the original. Try it: 100 → +25% → 125 → -25% → 93.75. Percentage changes are not reversible.',
      },
      {
        heading: 'Simple Interest — The P×R×T Formula',
        body: 'When you save or borrow money, interest is the extra amount paid or earned.\n\nSIMPLE INTEREST FORMULA:\nSI = (P × R × T) ÷ 100\n\nWhere:\nP = Principal (the original amount saved or borrowed)\nR = Rate (the interest rate, in % per year)\nT = Time (in years)\n\nExample: Invest GH₵1,500 at 8% per year for 2 years.\nSI = (1,500 × 8 × 2) ÷ 100 = 24,000 ÷ 100 = GH₵240\nTotal amount = Principal + Interest = 1,500 + 240 = GH₵1,740\n\nFINDING MISSING VALUES:\nTo find P: P = (SI × 100) ÷ (R × T)\nTo find R: R = (SI × 100) ÷ (P × T)\nTo find T: T = (SI × 100) ÷ (P × R)\n\nExample: Simple interest = GH₵120, Rate = 5%, Time = 3 years. Find Principal.\nP = (120 × 100) ÷ (5 × 3) = 12,000 ÷ 15 = GH₵800\n\nUNIT CHECK: Time must be in YEARS. If given in months, divide by 12 first.\n6 months = 6/12 = 0.5 years.',
        note: 'SIMPLE interest is calculated on the ORIGINAL principal only — it does not grow. COMPOUND interest (not on this syllabus yet) is calculated on principal + previously earned interest, so it grows faster.',
      },
    ],
    worked: [
      { q: 'A woman saves GH₵520 at 6% per year for 1 year. How much interest does she earn? What is her total?', a: 'SI = (520 × 6 × 1) ÷ 100 = 3,120 ÷ 100 = GH₵31.20\nTotal = 520 + 31.20 = GH₵551.20' },
      { q: 'A shirt was GH₵120. It is now GH₵150. Find the percentage increase.', a: 'Increase = 150 − 120 = GH₵30.\n% increase = (30 ÷ 120) × 100 = 25%.\nCheck: 25% of 120 = 30. 120 + 30 = 150 ✓' },
      { q: 'Express 75 as a percentage of 300.', a: '(75 ÷ 300) × 100 = 0.25 × 100 = 25%.\nCheck: 25% of 300 = 75 ✓' },
    ],
  },

  jezreel_day17: {
    concepts: [
      {
        heading: 'Number Patterns and Finding the nth Term',
        body: 'A SEQUENCE is an ordered list of numbers where each term follows a RULE.\n\nARITHMETIC SEQUENCE: You ADD (or subtract) the SAME number each time. This is called the COMMON DIFFERENCE (d).\n\nExample: 3, 7, 11, 15, 19...\nDifference: +4 each time. So d = 4.\nThe nth term formula: T(n) = dn + (first term − d)\nFor this sequence: T(n) = 4n + (3 − 4) = 4n − 1\nCheck: T(1) = 4(1) − 1 = 3 ✓. T(5) = 4(5) − 1 = 19 ✓.\nT(100) = 4(100) − 1 = 399 (we can find ANY term without listing them all!)\n\nGEOMETRIC SEQUENCE: You MULTIPLY by the same number each time. This is called the COMMON RATIO (r).\n\nExample: 2, 6, 18, 54, 162...\nRatio: × 3 each time. So r = 3.\n\nHOW TO FIND THE RULE:\nLook at consecutive differences. If they are CONSTANT → arithmetic sequence.\nLook at consecutive ratios (term ÷ previous term). If CONSTANT → geometric sequence.\n\nMIXED PATTERN: Some sequences use both + and × — always check differences AND ratios.\n\nCOMMON MISTAKE: Confusing the position (n) with the value of the term. T(3) means the THIRD term, not the term equal to 3.',
        note: 'The nth term formula T(n) = dn + c works for ALL arithmetic sequences. To find c: substitute any known term and solve. If T(1) = first term, then c = first term − d.',
      },
      {
        heading: 'Input-Output Tables and the Number Plane',
        body: 'A MAPPING RULE transforms each input (x) into an output (y) using a consistent operation.\n\nExample: Rule x → 3x + 2\nInput (x):  0    1    2    3    4\nOutput (y): 2    5    8   11   14\n\nHow to FIND the rule from a table:\nStep 1: Check if outputs increase by the same amount (constant difference). If yes, it is a linear rule: y = mx + c.\nStep 2: The constant difference = m (the coefficient of x).\nStep 3: When x = 0, the output = c (the constant term).\n\nExample: Inputs 1,2,3,4 → Outputs 4,7,10,13.\nDifference = 3 each time → m = 3.\nWhen x=1, y=4: 4 = 3(1) + c → c = 1.\nRule: y = 3x + 1. Check: 3(2)+1 = 7 ✓, 3(4)+1 = 13 ✓.\n\nTHE NUMBER PLANE (Cartesian Plane):\nHorizontal axis = x-axis. Vertical axis = y-axis. Origin = (0,0).\nA point (x, y) means: move x units along horizontal, y units along vertical.\n• (3, 5): 3 right, 5 up\n• (−2, 4): 2 left, 4 up\n• (4, −3): 4 right, 3 down\n• (−1, −2): 1 left, 2 down\n\nPlotting a rule: create a table of values → plot each (x, y) point → join with a straight line (for linear rules).',
        note: 'To find a missing INPUT when you know the OUTPUT: substitute the output for y and solve for x. Rule y = 3x + 1, output = 22: 22 = 3x + 1, 3x = 21, x = 7.',
      },
    ],
    worked: [
      { q: 'Find the common difference and the 10th term of: 3, 7, 11, 15...', a: 'Common difference d = 7 − 3 = 4.\nnth term: T(n) = 4n − 1.\nT(10) = 4(10) − 1 = 40 − 1 = 39.\nCheck by listing: 3, 7, 11, 15, 19, 23, 27, 31, 35, 39. 10th term = 39 ✓' },
      { q: 'Find the rule for: Input 1,2,3,4,5 → Output 4,7,10,13,?', a: 'Difference = 3 each time → m = 3.\nWhen x=1, y=4: 4 = 3(1) + c → c = 1.\nRule: y = 3x + 1.\nFor x=5: y = 3(5) + 1 = 16.' },
      { q: 'Triangles made of sticks: Pattern 1 = 3 sticks, Pattern 2 = 5, Pattern 3 = 7. How many sticks in Pattern 20?', a: 'Common difference = 2. So m = 2.\nWhen n=1, T=3: 3 = 2(1) + c → c = 1.\nRule: T(n) = 2n + 1.\nT(20) = 2(20) + 1 = 41 sticks.' },
    ],
  },

  jezreel_day19: {
    concepts: [
      {
        heading: 'Writing Algebraic Expressions — Translating Words to Symbols',
        body: 'Algebra uses LETTERS (variables) to represent unknown numbers. Translating between words and algebra is a core skill.\n\nKEY TRANSLATIONS:\n"5 more than x" → x + 5\n"3 less than x" → x − 3\n"4 times x" → 4x\n"half of x" → x/2 or ½x\n"x squared" → x²\n"x squared minus 3" → x² − 3\n"the product of x and y" → xy\n"2 more than 5 times x" → 5x + 2\n"the square of the sum of x and 3" → (x + 3)²\n\nTRICKY TRANSLATIONS:\n"5 less than x" → x − 5 (NOT 5 − x)\n"the difference between x and 3" → x − 3 (usually; read context carefully)\n"a number increased by 7, then doubled" → 2(n + 7)\n\nREAL-LIFE EXAMPLE:\nAfrako is 3 years older than Maako. If Maako is x years:\n• Maako\'s age = x\n• Afrako\'s age = x + 3\n• Sum of their ages = x + (x + 3) = 2x + 3\n• In 5 years, Maako\'s age = x + 5\n\nAlways define your variable first: "Let x = ..." before writing the expression.',
        note: 'ALWAYS define what your variable represents before using it. "Let x = the unknown number" or "Let n = Maako\'s age in years." This habit prevents errors and earns marks in exams.',
      },
      {
        heading: 'Simplifying Algebraic Expressions — Collecting Like Terms',
        body: 'LIKE TERMS: terms with exactly the SAME variable(s) AND the same power(s). They can be added or subtracted.\n\nEXAMPLES OF LIKE TERMS:\n5x and 3x → both are "x" terms → 5x + 3x = 8x\n4x² and 7x² → both are "x²" terms → 4x² + 7x² = 11x²\n6xy and 2xy → both are "xy" terms → 6xy + 2xy = 8xy\n\nEXAMPLES OF UNLIKE TERMS (CANNOT be combined):\n4x and 3y → different variables → stays as 4x + 3y\n5x and 5x² → same variable but DIFFERENT powers → stays as 5x + 5x²\n\nSTEPS TO SIMPLIFY:\n1. Identify all like terms (group them mentally or by underlining)\n2. Add or subtract the COEFFICIENTS of like terms\n3. Keep the variable part the same\n\nExample: 7xy + 5x − 4x + 2xy − 3\nGroup: (7xy + 2xy) + (5x − 4x) + (−3)\n= 9xy + x − 3\n\nExample: 3a + 2b − a + 5b − 4\n= (3a − a) + (2b + 5b) − 4\n= 2a + 7b − 4\n\nCOMMON MISTAKES:\n• 4x + 3y ≠ 7xy (different variables, cannot add)\n• 2x + 3x² ≠ 5x³ (different powers, cannot add)\n• Remember: xy and yx are the SAME term.',
        note: 'The COEFFICIENT is the number in front of the variable. In 5x, the coefficient is 5. In −3y, the coefficient is −3. When adding like terms, only the coefficients change. The variable part (x, y, xy, x²) never changes.',
      },
      {
        heading: 'Evaluating Algebraic Expressions',
        body: 'To EVALUATE an expression: replace each variable with its given numerical value and calculate.\n\nSTEPS:\n1. Write out the expression\n2. Substitute (replace each variable with its value, using brackets)\n3. Calculate using BODMAS: Brackets, Orders (powers), Division, Multiplication, Addition, Subtraction\n\nExample: Evaluate 3xy + 2x − y when x = 2, y = 3.\n= 3(2)(3) + 2(2) − (3)\n= 18 + 4 − 3\n= 19\n\nExample: Evaluate 5x² − 3x + 2 when x = −2.\n= 5(−2)² − 3(−2) + 2\n= 5(4) − (−6) + 2\n= 20 + 6 + 2\n= 28\n\nCRITICAL: When substituting NEGATIVE numbers, ALWAYS use brackets.\n(−2)² = (−2) × (−2) = +4 ✓\n−2² = −(2²) = −4 ✗ (this means "negative of 2 squared")\n\nThis is one of the most common errors in algebra. The bracket makes all the difference.\n\nExample: If x = −3: x² = (−3)² = 9 (positive!). −x = −(−3) = 3 (positive!).',
        note: 'BODMAS: Brackets first, then Orders (powers/roots), then Division and Multiplication (left to right), then Addition and Subtraction (left to right). Never skip this order.',
      },
    ],
    worked: [
      { q: 'Write as an expression: "When 8 times x is subtracted from 5, the result is multiplied by 2."', a: 'Start inside: 8 times x = 8x. Subtract from 5: 5 − 8x. Multiply result by 2: 2(5 − 8x).\nNote: "subtracted FROM 5" means 5 comes first.' },
      { q: 'Simplify: 5x + 4 − 9y + 3x + 2y − 7', a: 'Group like terms:\nx terms: 5x + 3x = 8x\ny terms: −9y + 2y = −7y\nConstants: 4 − 7 = −3\nAnswer: 8x − 7y − 3' },
      { q: 'Evaluate 3xy × 5y when x = 2, y = 4.', a: 'First simplify: 3xy × 5y = 15xy²\nThen substitute: 15(2)(4²) = 15 × 2 × 16 = 480\n\nAlternatively: 3(2)(4) × 5(4) = 24 × 20 = 480 ✓' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DECLYN — B5
  // ═══════════════════════════════════════════════════════════════════════════

  declyn_day1: {
    concepts: [
      {
        heading: 'Place Value up to 1,000,000 — Every Digit Has a Job',
        body: 'In any number, each digit\'s VALUE depends on its POSITION. This is place value.\n\nThe six columns (from right to left):\nUnits (U) | Tens (T) | Hundreds (H) | Thousands (Th) | Ten Thousands (TTh) | Hundred Thousands (HTh)\n\nThen comes 1,000,000 = one million.\n\nLet us study 725,463 carefully:\nDigit | Position | Value\n7 | Hundred Thousands | 700,000\n2 | Ten Thousands | 20,000\n5 | Thousands | 5,000\n4 | Hundreds | 400\n6 | Tens | 60\n3 | Units | 3\n\nSo 725,463 = 700,000 + 20,000 + 5,000 + 400 + 60 + 3\n\nThis is called EXPANDED FORM. It shows exactly what each digit is worth.\n\nIn words: Seven hundred and twenty-five thousand, four hundred and sixty-three.\n\nWHY DOES THIS MATTER?\nThe digit 5 appears in 725,463. Its value is 5,000 — NOT just 5.\nIf we write 752,463, the same digit 5 is now in the Ten Thousands column: value = 50,000.\nSame digit, completely different value. Position is everything.',
        note: 'A million (1,000,000) has SIX zeros. Use commas to separate groups of three digits from the right: 1,000,000. This makes large numbers much easier to read.',
      },
      {
        heading: 'Rounding Large Numbers — The Neighbour Rule',
        body: 'Rounding replaces an exact number with a nearby "round" number. We use this every day — prices, populations, distances.\n\nTHE RULE:\nFind the digit in the place you are rounding to.\nLook at the digit IMMEDIATELY to its RIGHT (its "neighbour").\nIf the neighbour is 5, 6, 7, 8 or 9 → the target digit goes UP by 1 (round up).\nIf the neighbour is 0, 1, 2, 3 or 4 → the target digit STAYS the same (round down).\nReplace ALL digits to the right of the target with zeros.\n\nExample: Round 348,726 to the nearest THOUSAND.\nThousands digit = 8. Neighbour (hundreds) = 7. Since 7 ≥ 5 → round up: 8 becomes 9.\nAnswer: 349,000\n\nExample: Round 348,726 to the nearest TEN THOUSAND.\nTen thousands digit = 4. Neighbour (thousands) = 8. Since 8 ≥ 5 → round up: 4 becomes 5.\nAnswer: 350,000\n\nExample: Round 348,726 to the nearest HUNDRED THOUSAND.\nHundred thousands digit = 3. Neighbour (ten thousands) = 4. Since 4 < 5 → keep: stays 3.\nAnswer: 300,000\n\nCOMMON MISTAKE: Changing digits that are NOT the target. When you round 348,726 to the nearest thousand, only the thousands digit changes — everything else becomes zeros.',
        note: null,
      },
    ],
    worked: [
      { q: 'Write 483,057 in words and expanded form.', a: 'Words: Four hundred and eighty-three thousand and fifty-seven.\nExpanded: 400,000 + 80,000 + 3,000 + 0 + 50 + 7' },
      { q: 'What is the value of the digit 6 in 364,819?', a: '6 is in the Ten Thousands column.\nValue = 6 × 10,000 = 60,000 (sixty thousand).\nNote: it is NOT worth just "6".' },
      { q: 'Round 527,364 to (a) nearest thousand (b) nearest hundred thousand.', a: '(a) Thousands digit = 7. Neighbour (hundreds) = 3. 3 < 5 → round down. Answer: 527,000.\n(b) Hundred thousands digit = 5. Neighbour (ten thousands) = 2. 2 < 5 → round down. Answer: 500,000.' },
    ],
  },

  declyn_day3: {
    concepts: [
      {
        heading: 'Multiplying and Dividing by 10, 100 and 1,000',
        body: 'When multiplying or dividing whole numbers by powers of 10, think of it as SHIFTING the digits.\n\nMULTIPLYING — each digit moves LEFT to a higher value column:\n× 10: add ONE zero at the end\n× 100: add TWO zeros at the end\n× 1,000: add THREE zeros at the end\n\nExamples:\n347 × 10 = 3,470 (add one zero)\n347 × 100 = 34,700 (add two zeros)\n347 × 1,000 = 347,000 (add three zeros)\n56 × 1,000 = 56,000\n\nDIVIDING — each digit moves RIGHT to a lower value column:\n÷ 10: remove one zero (only works cleanly for multiples of 10)\n÷ 100: remove two zeros\n÷ 1,000: remove three zeros\n\nExamples:\n82,000 ÷ 10 = 8,200\n82,000 ÷ 100 = 820\n82,000 ÷ 1,000 = 82\n\nMENTAL CHECK: When multiplying, your answer should be BIGGER. When dividing, SMALLER. If your answer goes the wrong way, check your direction.\n\nCOMMON MISTAKE: Removing zeros when multiplying or adding zeros when dividing. Remember: × 10 = BIGGER number (add zero). ÷ 10 = SMALLER number (remove zero).',
        note: 'This only works cleanly with WHOLE NUMBERS and powers of 10. For decimal numbers, the decimal point shifts instead — but we will cover that in a later lesson.',
      },
      {
        heading: 'Long Multiplication — Step by Step',
        body: 'Long multiplication breaks a big multiplication into smaller, easier steps.\n\nMETHOD: Multiply by each digit of the multiplier separately, then add.\n\nExample: 347 × 26\n\nSTEP 1: Multiply 347 by the UNITS digit of 26 (which is 6):\n    347\n  ×   6\n  -----\nUnits: 7 × 6 = 42. Write 2, carry 4.\nTens: 4 × 6 = 24. Add carry 4: 24 + 4 = 28. Write 8, carry 2.\nHundreds: 3 × 6 = 18. Add carry 2: 18 + 2 = 20. Write 20.\nResult: 2,082\n\nSTEP 2: Multiply 347 by the TENS digit of 26 (which is 2, but represents 20):\nWRITE A ZERO FIRST (placeholder), then multiply by 2:\n    347\n  ×  20\n  ------\n= 6,940\n\nSTEP 3: Add both results:\n  2,082\n+ 6,940\n-------\n  9,022\n\nSo 347 × 26 = 9,022\n\nCOMMON MISTAKE: Forgetting the zero placeholder in Step 2. Without it, you would add in the wrong column and get a completely wrong answer.',
        note: 'The zero placeholder is not optional. It shifts the second partial product one column to the left, because you are multiplying by TENS not UNITS. Every experienced student writes this zero first, automatically.',
      },
    ],
    worked: [
      { q: 'Calculate mentally: (a) 485 × 1,000  (b) 720,000 ÷ 100  (c) 36 × 100', a: '(a) Add three zeros: 485,000\n(b) Remove two zeros: 7,200\n(c) Add two zeros: 3,600' },
      { q: 'Find 268 × 34. Show all working.', a: 'Step 1: 268 × 4\n8×4=32, write 2 carry 3. 6×4=24+3=27, write 7 carry 2. 2×4=8+2=10. Result: 1,072\n\nStep 2: 268 × 30 (write 0 first, then × 3)\n8×3=24, write 4 carry 2. 6×3=18+2=20, write 0 carry 2. 2×3=6+2=8. Result: 8,040\n\nStep 3: 1,072 + 8,040 = 9,112' },
      { q: 'A school orders 24 boxes of exercise books. Each box has 144 books. How many books in total?', a: '144 × 24\nStep 1: 144 × 4 = 576\nStep 2: 144 × 20 = 2,880\nTotal: 576 + 2,880 = 3,456 books' },
    ],
  },

  declyn_day5: {
    concepts: [
      {
        heading: 'Equivalent Fractions — Same Value, Different Appearance',
        body: 'EQUIVALENT FRACTIONS look different but represent the SAME amount of a whole.\n\nImagine a chocolate bar:\n• Cut into 2 equal pieces, take 1 → 1/2\n• Cut into 4 equal pieces, take 2 → 2/4\n• Cut into 8 equal pieces, take 4 → 4/8\nAll three give you EXACTLY the same amount of chocolate.\n\nSo: 1/2 = 2/4 = 4/8 = 8/16 (all equivalent)\n\nHOW TO FIND EQUIVALENT FRACTIONS:\nMultiply OR divide BOTH the numerator AND denominator by the SAME number.\n\nGoing UP (building equivalent fractions):\n2/3 → multiply both by 2 → 4/6\n2/3 → multiply both by 5 → 10/15\n2/3 → multiply both by 10 → 20/30\n\nGoing DOWN (simplifying):\n24/36 → divide both by 2 → 12/18 → divide both by 6 → 2/3\nOR: divide both by HCF = 12 → 2/3 directly\n\nSIMPLIFYING TO LOWEST TERMS:\nFind the HCF of numerator and denominator.\nDivide both by the HCF.\nThe fraction is in simplest form when no number except 1 divides into both top and bottom.\n\nExample: Simplify 36/48.\nFactors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36\nFactors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48\nHCF = 12.\n36 ÷ 12 = 3. 48 ÷ 12 = 4.\nSimplest form: 3/4\n\nCOMMON MISTAKE: Dividing only the numerator or only the denominator. You MUST divide BOTH by the same number, or you change the value of the fraction.',
        note: 'A fraction is in SIMPLEST FORM (lowest terms) when the ONLY common factor of the numerator and denominator is 1. Test: can any number (other than 1) divide exactly into both top and bottom? If no, it is simplified.',
      },
      {
        heading: 'Comparing Fractions — Using the LCD',
        body: 'To compare fractions fairly, we need to make their denominators the SAME.\nThe fair common denominator we use is the LCD — the Lowest Common Denominator.\nThe LCD = the LCM (Lowest Common Multiple) of the denominators.\n\nEXAMPLE: Which is greater, 3/4 or 5/7?\nLCM of 4 and 7: multiples of 7 = 7, 14, 21, 28... multiples of 4 = 4, 8, 12, 16, 20, 24, 28... LCD = 28.\n3/4 = 3×7 / 4×7 = 21/28\n5/7 = 5×4 / 7×4 = 20/28\nNow compare numerators: 21 > 20, so 3/4 > 5/7.\n\nEXAMPLE: Arrange 2/3, 5/8, 3/4 in ascending order.\nLCD of 3, 8, 4: LCM = 24.\n2/3 = 16/24\n5/8 = 15/24\n3/4 = 18/24\nAscending: 15/24 < 16/24 < 18/24 → 5/8 < 2/3 < 3/4\n\nCOMMON MISTAKE: Thinking the fraction with the bigger denominator is bigger. Example: 1/8 < 1/4 because eighths are SMALLER pieces than quarters. More pieces of a smaller size. Always convert to the same denominator before comparing.',
        note: 'ASCENDING order = smallest to largest (going up the number line). DESCENDING order = largest to smallest (going down). These words appear frequently in exam questions.',
      },
      {
        heading: 'Mixed Numbers and Improper Fractions — Converting Both Ways',
        body: 'An IMPROPER FRACTION has a numerator LARGER than the denominator: 11/4, 23/5, 15/2.\nIt represents more than one whole.\n\nA MIXED NUMBER combines a whole number and a proper fraction: 2¾, 4⅗, 7½.\n\nCONVERTING IMPROPER → MIXED NUMBER:\nDivide numerator by denominator. Quotient = whole number. Remainder = new numerator.\n\nExample: Convert 11/4 to a mixed number.\n11 ÷ 4 = 2 remainder 3.\nSo: 11/4 = 2 and 3/4 = 2¾\nCheck: 2 × 4 + 3 = 11 ✓\n\nExample: Convert 23/5.\n23 ÷ 5 = 4 remainder 3.\nSo: 23/5 = 4⅗\n\nCONVERTING MIXED NUMBER → IMPROPER FRACTION:\nMultiply whole number by denominator. Add the numerator. Write over the same denominator.\n\nExample: Convert 3⅔.\n3 × 3 = 9. 9 + 2 = 11. Write over 3.\nSo: 3⅔ = 11/3\nCheck: 11 ÷ 3 = 3 remainder 2 → 3⅔ ✓\n\nExample: Convert 5¾.\n5 × 4 = 20. 20 + 3 = 23. Write over 4.\n5¾ = 23/4\n\nCOMMON MISTAKE: In the mixed → improper conversion, students add whole number and numerator without multiplying first. 3⅔ ≠ (3+2)/3 = 5/3. Always MULTIPLY first: (3×3+2)/3 = 11/3.',
        note: 'Quick memory check for mixed → improper: "Multiply and Add, keep the Denominator." For 3⅔: (3×3)+2 = 11, over 3 = 11/3.',
      },
    ],
    worked: [
      { q: 'Find three fractions equivalent to 2/5.', a: '2/5 = 4/10 (×2) = 6/15 (×3) = 8/20 (×4)\nAll equivalent — same value, different denominators.' },
      { q: 'Simplify 36/48 to lowest terms.', a: 'Find HCF of 36 and 48:\n36 = 2² × 3². 48 = 2⁴ × 3. HCF = 2² × 3 = 12.\n36 ÷ 12 = 3. 48 ÷ 12 = 4.\nAnswer: 3/4\nCheck: can anything else divide both 3 and 4? No → simplified.' },
      { q: 'Convert 19/5 to a mixed number AND 3⅔ to an improper fraction.', a: '19/5: 19 ÷ 5 = 3 remainder 4. Answer: 3⅘\nCheck: 3×5+4 = 19 ✓\n\n3⅔: (3×3)+2 = 11. Over 3. Answer: 11/3\nCheck: 11÷3 = 3 rem 2 → 3⅔ ✓' },
    ],
  },

  declyn_day7: {
    concepts: [
      {
        heading: 'Adding and Subtracting Fractions — The LCD Method',
        body: 'You can ONLY add or subtract fractions with the SAME denominator.\nIf denominators are different, convert them first.\n\nFULL METHOD:\nStep 1: Find the LCD (LCM of the denominators).\nStep 2: Convert each fraction to an equivalent fraction with the LCD.\nStep 3: Add or subtract the numerators only. Keep the denominator.\nStep 4: Simplify or convert to a mixed number if needed.\n\nExample: 3/4 + 5/6\nStep 1: LCM of 4 and 6.\nMultiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... LCD = 12.\nStep 2: 3/4 = 9/12 (×3). 5/6 = 10/12 (×2).\nStep 3: 9/12 + 10/12 = 19/12.\nStep 4: 19/12 = 1 7/12.\n\nMIXED NUMBERS:\nMethod A — Convert to improper fractions first.\nExample: 4⅔ − 2¾\n4⅔ = 14/3. 2¾ = 11/4.\nLCD = 12.\n14/3 = 56/12. 11/4 = 33/12.\n56/12 − 33/12 = 23/12 = 1 11/12.\n\nMethod B — Separate whole and fraction parts.\n4⅔ − 2¾: Whole parts: 4 − 2 = 2. Fractions: ⅔ − ¾.\nBut ⅔ < ¾, so borrow 1 whole from the 2.\n2 becomes 1, and ⅔ becomes ⅔ + 1 = ⅔ + 3/3 = 5/3.\n5/3 − 3/4. LCD=12: 20/12 − 9/12 = 11/12.\nAnswer: 1 11/12. ✓\n\nCOMMON MISTAKE: Adding denominators as well as numerators. 1/3 + 1/4 ≠ 2/7. It = 4/12 + 3/12 = 7/12. The denominator shows the SIZE of the pieces — it does not change when you add.',
        note: null,
      },
      {
        heading: 'Multiplying and Dividing Fractions',
        body: 'MULTIPLYING FRACTIONS:\nSimply multiply numerators together and denominators together.\nExample: 2/3 × 4/5 = (2×4)/(3×5) = 8/15\n\nCROSS-CANCELLING (simplify before multiplying):\nLook for common factors between ANY numerator and ANY denominator before you multiply.\nThis keeps numbers smaller.\n\nExample: 3/8 × 4/9\nCross-cancel: 3 and 9 share factor 3 (3÷3=1, 9÷3=3). Also 4 and 8 share factor 4 (4÷4=1, 8÷4=2).\nResult: 1/2 × 1/3 = 1/6\nCheck: 3/8 × 4/9 = 12/72 = 1/6 ✓\n\nFINDING A FRACTION OF A QUANTITY:\n"OF" means ×. Divide by denominator, multiply by numerator.\n2/5 of 80: 80 ÷ 5 = 16. 16 × 2 = 32.\n\nDIVIDING FRACTIONS — KCF (Keep, Change, Flip):\nKeep the first fraction unchanged.\nChange ÷ to ×.\nFlip the second fraction (write its reciprocal).\n\nExample: 3/4 ÷ 2/5\nKeep: 3/4. Change: ×. Flip: 5/2.\n= 3/4 × 5/2 = 15/8 = 1⅞\n\nExample: 5 ÷ 1/3 = 5 × 3/1 = 15\n(Think: how many thirds are in 5? There are 15 thirds in 5 wholes.)\n\nCOMMON MISTAKE: In division, flipping the FIRST fraction instead of the second. Always flip the DIVISOR (the number after the ÷ sign).',
        note: '"Keep, Change, Flip" — say it out loud with every fraction division you do. Keep the first. Change divide to multiply. Flip the second. This order never changes.',
      },
    ],
    worked: [
      { q: 'Add: 2⅖ + 1⅔', a: 'Whole parts: 2 + 1 = 3.\nFractions: 2/5 + 2/3. LCD = 15.\n2/5 = 6/15. 2/3 = 10/15.\n6/15 + 10/15 = 16/15 = 1 1/15.\nTotal: 3 + 1 1/15 = 4 1/15.' },
      { q: 'Multiply using cross-cancellation: 3/8 × 4/9', a: 'Cross-cancel: 3 with 9 (÷3): gives 1/8 × 4/3.\nCross-cancel: 4 with 8 (÷4): gives 1/2 × 1/3.\nAnswer: 1/6.\nCheck: (3×4)/(8×9) = 12/72 = 1/6 ✓' },
      { q: 'A farmer has 6¾ acres. He uses ⅔ for maize. How many acres is that?', a: '⅔ of 6¾ = ⅔ × 6¾\nConvert: 6¾ = 27/4.\n⅔ × 27/4 = 54/12 = 9/2 = 4½ acres.\nCheck: ⅓ of 6¾ = 6¾ ÷ 3 = 2¼. So ⅔ = 2 × 2¼ = 4½ ✓' },
    ],
  },

  declyn_day9: {
    concepts: [
      {
        heading: 'Converting Between Fractions, Decimals and Percentages',
        body: 'These three forms all represent the same value. The key is knowing how to move between them.\n\nFRACTION → DECIMAL: divide top by bottom.\n3/8 = 3 ÷ 8 = 0.375\n7/4 = 7 ÷ 4 = 1.75\n\nDECIMAL → PERCENTAGE: multiply by 100.\n0.375 × 100 = 37.5%\n1.75 × 100 = 175%\n\nPERCENTAGE → FRACTION: write over 100, then simplify.\n45% = 45/100 = 9/20 (HCF = 5)\n12.5% = 12.5/100 = 125/1000 = 1/8 (HCF = 125)\n\nKEY BENCHMARKS — memorise these:\n1/2 = 0.5 = 50%\n1/4 = 0.25 = 25%\n3/4 = 0.75 = 75%\n1/5 = 0.2 = 20%\n2/5 = 0.4 = 40%\n3/5 = 0.6 = 60%\n1/8 = 0.125 = 12.5%\n1/10 = 0.1 = 10%\n1/3 ≈ 0.333 ≈ 33.3%\n\nCOMMON MISTAKE: When converting percentage to fraction, writing 60% = 60/10 = 6 instead of 60/100 = 3/5. Percent means "per HUNDRED" — always write over 100 first.',
        note: 'The word "percent" comes from Latin "per centum" meaning "out of one hundred." So 45% literally means 45 out of every 100. This is why percentages always go over 100 when converting to fractions.',
      },
      {
        heading: 'Percentage of a Quantity, Increase and Decrease',
        body: 'FINDING PERCENTAGE OF A QUANTITY:\nMethod 1: (Percentage ÷ 100) × quantity\nExample: 35% of GH₵480 = (35 ÷ 100) × 480 = 0.35 × 480 = GH₵168\n\nMethod 2: Find 1%, then multiply.\n1% of GH₵480 = GH₵4.80. So 35% = 35 × 4.80 = GH₵168.\n\nPERCENTAGE INCREASE:\n1. Find the increase (new − original)\n2. Divide by the ORIGINAL\n3. Multiply by 100\nFormula: % increase = (increase ÷ original) × 100\n\nExample: Price rises from GH₵120 to GH₵150.\nIncrease = 150 − 120 = 30.\n% increase = (30 ÷ 120) × 100 = 25%\n\nPERCENTAGE DECREASE:\nSame formula but using decrease (original − new).\n\nExample: Salary drops from GH₵800 to GH₵640.\nDecrease = 800 − 640 = 160.\n% decrease = (160 ÷ 800) × 100 = 20%\n\nFINDING THE NEW VALUE:\nAfter a 20% increase on GH₵500:\nNew value = 500 × 1.20 = GH₵600\n(Or: find 20% = 100, add to 500 = 600)\n\nAfter a 15% decrease on GH₵200:\nNew value = 200 × 0.85 = GH₵170\n(Or: find 15% = 30, subtract from 200 = 170)\n\nCOMMON MISTAKE: Using the NEW value instead of the ORIGINAL as the base for percentage change. Always divide by where you STARTED, not where you ended up.',
        note: 'When multiplying decimals: count the total number of decimal places in both numbers, and place the decimal point that many places from the RIGHT in your answer.\nExample: 3.6 × 1.5 → 36 × 15 = 540. Total decimal places = 1+1 = 2. Answer: 5.40 = 5.4',
      },
    ],
    worked: [
      { q: 'Convert: (a) 7/8 to decimal and %  (b) 0.64 to fraction  (c) 35% to fraction', a: '(a) 7÷8 = 0.875. 0.875×100 = 87.5%\n(b) 0.64 = 64/100. HCF=4. 64÷4=16, 100÷4=25. Answer: 16/25\n(c) 35/100. HCF=5. 35÷5=7, 100÷5=20. Answer: 7/20' },
      { q: 'Find 28% of GH₵650.', a: 'Method: 0.28 × 650\n= (28 × 650) ÷ 100\n= 18,200 ÷ 100\n= GH₵182\nCheck: 10% of 650 = 65. 28% = 2×(10%) + 8%(=0.8×10%) = 130 + 52 = 182 ✓' },
      { q: 'A shirt costs GH₵85. It is reduced by 20%. What is the new price?', a: 'Method 1: Find 20% then subtract.\n20% of 85 = 0.20 × 85 = 17. New price = 85 − 17 = GH₵68.\n\nMethod 2: New price = 85 × 0.80 = GH₵68.\n(After 20% decrease, you keep 80% of the original.)' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IVAN — B3
  // ═══════════════════════════════════════════════════════════════════════════

  ivan_day1: {
    concepts: [
      {
        heading: 'Place Value — What Each Digit Is Worth',
        body: 'Every number is made of digits (0–9). The POSITION of each digit tells us its VALUE.\n\nThere are THREE positions we use up to 1,000:\nHUNDREDS | TENS | UNITS\n\nThe UNITS column is on the RIGHT.\nThe TENS column is in the MIDDLE.\nThe HUNDREDS column is on the LEFT.\n\nLet us look at the number 347:\n3 is in the HUNDREDS column → 3 × 100 = 300\n4 is in the TENS column → 4 × 10 = 40\n7 is in the UNITS column → 7 × 1 = 7\n\nSo 347 = 300 + 40 + 7. We call this EXPANDED FORM.\n\nMore examples:\n256 = 200 + 50 + 6\n830 = 800 + 30 + 0 (the zero holds the units place — it means no units)\n104 = 100 + 0 + 4 (the zero holds the tens place — it means no tens)\n\nWHY DOES POSITION MATTER?\nLook at these numbers: 347, 437, 734, 473\nAll use the SAME digits (3, 4, 7) but the POSITIONS are different, so the values are completely different.\n347 (three hundred and forty-seven) ≠ 734 (seven hundred and thirty-four)\n\nCOMMON MISTAKE: Students sometimes read 304 as "thirty-four." Remember the middle zero — it means there are no tens. 304 is three hundred AND four.',
        note: 'Remember the order from LEFT to RIGHT: Hundreds, Tens, Units — like the letters H, T, U. You can draw a place value chart with these columns to help you.',
      },
      {
        heading: 'Reading, Writing and Comparing Numbers to 1,000',
        body: 'WRITING IN WORDS:\nAlways write the hundreds first, then "and", then the tens and units.\n\n347 → Three hundred and forty-seven\n500 → Five hundred\n608 → Six hundred and eight (no tens, so skip straight to units)\n1,000 → One thousand\n\nPractice numbers:\n125 → One hundred and twenty-five\n309 → Three hundred and nine\n870 → Eight hundred and seventy\n\nWRITING IN FIGURES:\n"Four hundred and sixty-two" → 462\n"Nine hundred and one" → 901\n"Seven hundred" → 700\n\nCOMPARING NUMBERS:\nTo decide which number is bigger:\nSTEP 1: Look at the HUNDREDS digits first. The bigger hundreds digit wins.\nExample: 456 vs 389. 4 hundreds > 3 hundreds. So 456 > 389.\n\nSTEP 2: If hundreds are equal, look at TENS.\nExample: 456 vs 472. Both have 4 hundreds. Then 5 tens vs 7 tens. 7 > 5. So 472 > 456.\n\nSTEP 3: If hundreds and tens are equal, look at UNITS.\nExample: 456 vs 458. Same hundreds and tens. 8 units > 6 units. So 458 > 456.\n\nUse the symbols: > (greater than), < (less than), = (equal to)',
        note: 'When writing a number in words, use "and" after the hundreds: "three hundred AND forty-seven." Do NOT write "and" between tens and units — it is "forty-seven" not "forty AND seven."',
      },
    ],
    worked: [
      { q: 'Write the value of each digit in 748.', a: '7 is in the hundreds → value = 700\n4 is in the tens → value = 40\n8 is in the units → value = 8\nSo 748 = 700 + 40 + 8.' },
      { q: 'Write 625 in words.', a: '6 hundreds → six hundred\n2 tens → twenty\n5 units → five\nAnswer: Six hundred and twenty-five.' },
      { q: 'Which is greater, 483 or 438? Show your comparison.', a: 'HUNDREDS: both have 4 hundreds → equal, move on.\nTENS: 483 has 8 tens. 438 has 3 tens. 8 > 3.\nSTOP. 483 > 438.\nAnswer: 483 > 438.' },
    ],
  },

  ivan_day3: {
    concepts: [
      {
        heading: 'Addition with Carrying — When a Column Adds Up to 10 or More',
        body: 'When digits in a column add up to 10 or more, we CARRY the tens part to the next column.\nAlways add from RIGHT to LEFT: units first, then tens, then hundreds.\n\nExample: 365 + 247\n\nWRITE ONE ABOVE THE OTHER, aligning units, tens and hundreds:\n   365\n + 247\n -----\n\nSTEP 1 — UNITS column: 5 + 7 = 12.\n12 = 1 ten and 2 units. Write 2. CARRY 1 to the tens column.\n\nSTEP 2 — TENS column: 6 + 4 = 10. Plus the carried 1: 10 + 1 = 11.\n11 = 1 hundred and 1 ten. Write 1. CARRY 1 to the hundreds column.\n\nSTEP 3 — HUNDREDS column: 3 + 2 = 5. Plus the carried 1: 5 + 1 = 6. Write 6.\n\nAnswer: 612\n\nLet us try another: 483 + 259\nUnits: 3 + 9 = 12. Write 2, carry 1.\nTens: 8 + 5 + 1(carried) = 14. Write 4, carry 1.\nHundreds: 4 + 2 + 1(carried) = 7. Write 7.\nAnswer: 742\n\nCHECK YOUR WORK: add in the opposite direction (bottom to top) to verify.\n\nCOMMON MISTAKE: Writing the full two-digit sum instead of carrying. When units = 12, write 2 and carry 1 — do NOT write 12 in the units column.',
        note: 'The CARRIED number is small — write it small above the next column so you remember to add it. Many errors happen because students forget the carried digit.',
      },
      {
        heading: 'Subtraction with Borrowing — When the Top Digit is Too Small',
        body: 'When the top digit is SMALLER than the bottom digit, we BORROW from the column to the LEFT.\n\nExample: 423 − 178\n\n   423\n - 178\n -----\n\nSTEP 1 — UNITS: 3 − 8. Cannot do! 3 is smaller than 8.\nBORROW 1 ten from the tens column.\nThe 2 in tens becomes 1 (gave away one ten).\nThe 3 in units becomes 13 (gained ten units).\n13 − 8 = 5. Write 5.\n\nSTEP 2 — TENS: 1 − 7. Cannot do! (We only have 1 now).\nBORROW 1 hundred from the hundreds column.\nThe 4 in hundreds becomes 3 (gave away one hundred).\nThe 1 in tens becomes 11 (gained ten tens).\n11 − 7 = 4. Write 4.\n\nSTEP 3 — HUNDREDS: 3 − 1 = 2. Write 2.\n\nAnswer: 245\n\nCHECK: 245 + 178 should = 423.\n5+8=13 write 3 carry 1. 4+7+1=12 write 2 carry 1. 2+1+1=4. Answer: 423 ✓\n\nSPECIAL CASE — Borrowing across zeros:\n700 − 364: the 7 hundreds must "pass through" the zero tens.\n700: borrow from hundreds to tens → 690. Then borrow from tens to units → 6(9+1)(0-1)... \nShorter: 700−364 = 336. (Check: 336+364=700 ✓)',
        note: 'KEY WORDS in questions: "total," "altogether," "combined," "sum" = ADD. "Difference," "left over," "remaining," "how much more," "less than" = SUBTRACT. Read the question twice and identify the key word before calculating.',
      },
    ],
    worked: [
      { q: 'Add: 456 + 378', a: 'Units: 6+8=14. Write 4, carry 1.\nTens: 5+7=12, plus carried 1 = 13. Write 3, carry 1.\nHundreds: 4+3=7, plus carried 1 = 8. Write 8.\nAnswer: 834\nCheck: start from 378 and count up 456 → 834 ✓' },
      { q: 'Subtract: 700 − 364', a: 'Units: 0<4, need to borrow. But tens is also 0.\nBorrow from hundreds: 700 → borrow 1 hundred → tens becomes 10, hundreds becomes 6.\nBorrow from tens: tens 10 → borrow 1 → units becomes 10, tens becomes 9.\nUnits: 10−4=6. Tens: 9−6=3. Hundreds: 6−3=3.\nAnswer: 336\nCheck: 336+364: 6+4=10 write 0 carry 1. 3+6+1=10 write 0 carry 1. 3+3+1=7. = 700 ✓' },
      { q: 'Ivan has 247 stamps. His brother has 185. How many altogether?', a: '"Altogether" = add.\n247 + 185:\nUnits: 7+5=12. Write 2, carry 1.\nTens: 4+8+1=13. Write 3, carry 1.\nHundreds: 2+1+1=4. Write 4.\nAnswer: 432 stamps altogether.' },
    ],
  },

  ivan_day5: {
    concepts: [
      {
        heading: 'Multiplication as Repeated Addition — What Does × Really Mean?',
        body: 'Multiplication is a SHORT WAY of writing REPEATED ADDITION.\n\nWhen you write 4 × 3, it means: 4 GROUPS OF 3, or add 3 four times.\n4 × 3 = 3 + 3 + 3 + 3 = 12\n\nOr it means 3 GROUPS OF 4:\n3 × 4 = 4 + 4 + 4 = 12\n\nBoth give the same answer because ORDER DOES NOT MATTER: 4 × 3 = 3 × 4.\n\nREAL LIFE EXAMPLES:\n6 bags of oranges. Each bag has 8 oranges. Total = 6 × 8 = 48 oranges.\n5 rows of seats. 7 seats in each row. Total = 5 × 7 = 35 seats.\n\nSPECIAL RULES (memorise these):\n• Any number × 0 = 0. (9 × 0 = 0, 1,000 × 0 = 0)\n• Any number × 1 = that same number. (7 × 1 = 7)\n• Any number × 10 = add a zero. (6 × 10 = 60)\n\nTIMES TABLE FACTS to know (2× to 10×):\nPractise until you know them without thinking:\n6 × 7 = 42. 6 × 8 = 48. 7 × 7 = 49. 7 × 8 = 56.\n8 × 8 = 64. 8 × 9 = 72. 9 × 9 = 81. 6 × 9 = 54.\n7 × 9 = 63. These are the ones students find hardest.',
        note: 'Practise your tables until they are AUTOMATIC — you should know 7×8=56 as quickly as you know your own name. These facts are the building blocks of ALL future maths.',
      },
      {
        heading: 'Multiplying a 2-Digit Number by a 1-Digit Number',
        body: 'When multiplying a 2-digit number, we split it into TENS and UNITS and multiply each part.\n\nMETHOD 1 — SHORT MULTIPLICATION (column method):\n\nExample: 34 × 6\n   34\n ×  6\n ----\nSTEP 1 — UNITS: 4 × 6 = 24. Write 4, carry 2.\nSTEP 2 — TENS: 3 × 6 = 18. Add carry 2: 18 + 2 = 20. Write 20.\nAnswer: 204\n\nExample: 67 × 8\nSTEP 1: 7 × 8 = 56. Write 6, carry 5.\nSTEP 2: 6 × 8 = 48. Add carry 5: 48 + 5 = 53. Write 53.\nAnswer: 536\n\nMETHOD 2 — EXPANDED METHOD (easier to understand):\nSplit the 2-digit number into tens and units, multiply each separately, then add.\n\n34 × 6 = (30 × 6) + (4 × 6)\n= 180 + 24\n= 204\n\n67 × 8 = (60 × 8) + (7 × 8)\n= 480 + 56\n= 536\n\nBoth methods give the same answer. Choose whichever you find clearer.\n\nCOMMON MISTAKE: Forgetting to add the carried digit in step 2. In 34 × 6, after writing 4 (units), we carried 2. In the tens step: 3 × 6 = 18, but we must add the 2 to get 20.',
        note: null,
      },
    ],
    worked: [
      { q: 'Find: (a) 7 × 8  (b) 9 × 6  (c) 4 × 7', a: '(a) 7 × 8 = 56 (7 groups of 8: 8+8+8+8+8+8+8 = 56)\n(b) 9 × 6 = 54 (9 groups of 6)\n(c) 4 × 7 = 28 (4 groups of 7)' },
      { q: 'Multiply 47 × 5. Show both methods.', a: 'Method 1 (column): Units: 7×5=35, write 5 carry 3. Tens: 4×5=20+3=23. Answer: 235.\n\nMethod 2 (expanded): (40×5) + (7×5) = 200 + 35 = 235.' },
      { q: 'A classroom has 8 rows of chairs. Each row has 9 chairs. How many chairs in total?', a: '"In total" = multiply.\n8 × 9 = 72 chairs.\nCheck: 9 rows would be 81, so 8 rows = 81 − 9 = 72 ✓' },
    ],
  },

  ivan_day7: {
    concepts: [
      {
        heading: 'Division — Sharing Equally into Groups',
        body: 'Division answers two questions:\n1. SHARING: If I share 24 mangoes equally among 6 children, how many does each child get?\n24 ÷ 6 = 4. Each child gets 4 mangoes.\n\n2. GROUPING: If I have 24 mangoes and put them in bags of 6, how many bags do I fill?\n24 ÷ 6 = 4. I fill 4 bags.\n\nBoth give the answer 4, but the meaning is different.\n\nDIVISION AND MULTIPLICATION ARE OPPOSITES (inverse operations):\nIf 6 × 4 = 24, then:\n24 ÷ 6 = 4 AND 24 ÷ 4 = 6\n\nThis is VERY IMPORTANT: you can use a multiplication fact to solve a division.\n56 ÷ 8 = ? → think: 8 × ? = 56 → 8 × 7 = 56 → answer: 7\n\nALWAYS CHECK your division answer by multiplying:\n56 ÷ 8 = 7. Check: 7 × 8 = 56 ✓\n\nSPECIAL RULES:\n• Any number ÷ 1 = that number. (9 ÷ 1 = 9)\n• Any number ÷ itself = 1. (9 ÷ 9 = 1)\n• Zero ÷ any number = 0. (0 ÷ 5 = 0)\n• You CANNOT divide by zero. (5 ÷ 0 = undefined — impossible)\n\nCOMMON MISTAKE: Thinking bigger ÷ smaller always means a big answer. 100 ÷ 25 = 4, which is a small number. Always check by multiplying back.',
        note: 'Learn your multiplication facts THOROUGHLY — they are the key to fast, accurate division. If you know 7 × 8 = 56, then 56 ÷ 7 = 8 and 56 ÷ 8 = 7 come for free.',
      },
      {
        heading: 'Dividing a 2-Digit Number — With and Without Remainders',
        body: 'For 2-digit ÷ 1-digit, we divide column by column from LEFT to RIGHT.\n\nExample WITHOUT remainder: 84 ÷ 4\n\n   21\n4 )84\n   8  ← 8 ÷ 4 = 2. Write 2 above. 2 × 4 = 8. 8 − 8 = 0.\n    4  ← bring down 4. 4 ÷ 4 = 1. Write 1 above.\nAnswer: 21. Check: 21 × 4 = 84 ✓\n\nExample WITHOUT remainder: 96 ÷ 6\n   16\n6 )96\n   6  ← 9 ÷ 6 = 1 (6 goes into 9 once). Remainder 3.\n   36 ← bring down 6: now have 36. 36 ÷ 6 = 6.\nAnswer: 16. Check: 16 × 6 = 96 ✓\n\nExample WITH remainder: 47 ÷ 5\nAsk: 5 × ? is close to 47 without going over.\n5 × 9 = 45. 47 − 45 = 2 left over.\nAnswer: 9 remainder 2. Written as: 9 r 2.\nCheck: (9 × 5) + 2 = 45 + 2 = 47 ✓\n\nThe REMAINDER is always LESS than the divisor. If your remainder is ≥ divisor, you can fit one more group.',
        note: null,
      },
    ],
    worked: [
      { q: 'Find using multiplication facts: (a) 63 ÷ 7  (b) 54 ÷ 6  (c) 81 ÷ 9', a: '(a) 7 × ? = 63 → 7 × 9 = 63. Answer: 9. Check: 9 × 7 = 63 ✓\n(b) 6 × ? = 54 → 6 × 9 = 54. Answer: 9. Check: 9 × 6 = 54 ✓\n(c) 9 × ? = 81 → 9 × 9 = 81. Answer: 9. Check: 9 × 9 = 81 ✓' },
      { q: 'Divide: 76 ÷ 4. Show column division.', a: '4 goes into 7 once (4×1=4, remainder 3). Write 1.\nBring down 6: now have 36. 4 goes into 36 nine times (4×9=36). Write 9.\nAnswer: 19. Check: 19 × 4 = 76 ✓' },
      { q: '48 mangoes are shared equally among 6 children. How many does each child get?', a: '"Shared equally" = divide.\n48 ÷ 6 = 8 mangoes each.\nCheck: 8 × 6 = 48 ✓\nVerify with multiplication fact: 6 × 8 = 48 ✓' },
    ],
  },

  ivan_day9: {
    concepts: [
      {
        heading: 'What is a Fraction? — Equal Parts of a Whole',
        body: 'A FRACTION represents part of a whole that has been divided into EQUAL PARTS.\n\nTHE TWO PARTS OF A FRACTION:\n\n    Numerator (top number)\n    ─────────────────────\n    Denominator (bottom number)\n\nNUMERATOR: how many parts you have.\nDENOMINATOR: how many EQUAL parts the whole is divided into.\n\nExample: ¾\nThe whole is cut into 4 EQUAL parts (denominator = 4).\nYou have 3 of those parts (numerator = 3).\n\nIMPORTANT FRACTIONS TO KNOW:\n1/2 = ONE HALF. Cut into 2 equal parts, take 1.\n1/4 = ONE QUARTER. Cut into 4 equal parts, take 1.\n2/4 = TWO QUARTERS = 1/2 (same amount!).\n3/4 = THREE QUARTERS. Cut into 4 equal parts, take 3.\n1/3 = ONE THIRD. Cut into 3 equal parts, take 1.\n2/3 = TWO THIRDS. Cut into 3 equal parts, take 2.\n\nTHE PARTS MUST BE EQUAL.\nIf you cut an orange into 4 pieces but they are not the same size, the fractions are NOT valid. Equal parts are essential.\n\nFRACTIONS GREATER THAN 1:\nIf you have more parts than the whole is divided into, you have more than 1 whole.\n5/4 means you have 5 quarter-pieces — that is 1 whole AND 1 quarter = 1¼.\n\nCOMMON MISTAKE: Confusing numerator and denominator. The BOTTOM number (denominator) shows the SIZE of the pieces. The BIGGER the denominator, the SMALLER each piece.',
        note: 'The word "denominator" starts with "D" — think of D for "divide" (it tells you into how many equal parts the whole is divided). The word "numerator" starts with "N" — think of N for "number" (it tells you how many parts you have).',
      },
      {
        heading: 'Finding a Fraction of a Quantity — Divide Then Multiply',
        body: 'To find a fraction of a number, use this two-step method:\n\nSTEP 1: DIVIDE the number by the DENOMINATOR (bottom).\nSTEP 2: MULTIPLY the result by the NUMERATOR (top).\n\nRemember: the word "OF" in maths means MULTIPLY.\n\nExample: Find ¾ of 24.\nStep 1: 24 ÷ 4 = 6 (divide by the denominator 4).\nStep 2: 6 × 3 = 18 (multiply by the numerator 3).\nAnswer: ¾ of 24 = 18.\nCheck: ¼ of 24 = 6. So ¾ = 3 quarters = 3 × 6 = 18 ✓\n\nExample: Find ⅓ of 30.\nStep 1: 30 ÷ 3 = 10.\nStep 2: 10 × 1 = 10 (×1 does not change anything).\nAnswer: ⅓ of 30 = 10.\n\nExample: Find ⅔ of 18.\nStep 1: 18 ÷ 3 = 6.\nStep 2: 6 × 2 = 12.\nAnswer: ⅔ of 18 = 12.\nCheck: ⅓ of 18 = 6. Two thirds = 2 × 6 = 12 ✓\n\nReal-life examples:\n¼ of GH₵80 = 80 ÷ 4 = GH₵20 (one quarter of the price)\n½ of 60 minutes = 60 ÷ 2 = 30 minutes\n¾ of a 32-piece chocolate bar = 32 ÷ 4 × 3 = 24 pieces\n\nCOMMON MISTAKE: Dividing by the numerator instead of the denominator. ALWAYS divide by the BOTTOM number first.',
        note: '"Divide by the bottom, multiply by the top." This rhyme will help you remember the order. Denominator goes first (divide), then Numerator (multiply).',
      },
    ],
    worked: [
      { q: 'What fraction is shaded? (a) Shape cut into 4 equal parts, 1 shaded. (b) Shape cut into 6 equal parts, 5 shaded.', a: '(a) 1 part out of 4 equal parts = 1/4 (one quarter).\n(b) 5 parts out of 6 equal parts = 5/6 (five sixths).' },
      { q: 'Find: (a) ½ of 48  (b) ¼ of 36  (c) ⅓ of 27', a: '(a) ½ of 48: 48 ÷ 2 = 24. Answer: 24.\n(b) ¼ of 36: 36 ÷ 4 = 9. Answer: 9.\n(c) ⅓ of 27: 27 ÷ 3 = 9. Answer: 9.' },
      { q: 'In a class of 32 pupils, ¾ are present today. How many pupils are present?', a: 'Find ¾ of 32:\nStep 1: 32 ÷ 4 = 8 (one quarter).\nStep 2: 8 × 3 = 24 (three quarters).\nAnswer: 24 pupils are present.\nCheck: ¼ = 8. So ¾ = 24. 24 + 8 = 32 (full class) ✓' },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SEED FUNCTION — updates concepts and worked examples in each pack
// ─────────────────────────────────────────────────────────────────────────────

async function reseed() {
  console.log('🌱 Reseeding all maths packs with enriched teaching notes...\n')
  let count = 0

  for (const [docId, data] of Object.entries(ENRICHED)) {
    const ref = db.collection('packs').doc(docId)
    await ref.update({
      concepts: data.concepts,
      worked: data.worked,
    })
    console.log(`✅ Updated: ${docId}`)
    count++
  }

  console.log(`\n✅ Done — ${count} packs updated with enriched teaching notes!`)
  console.log('\nChanges made to each pack:')
  console.log('  • Concept bodies: full explanations with reasoning, not just rules')
  console.log('  • Common mistakes: explicitly called out and explained')
  console.log('  • Worked examples: step-by-step with checks and verification')
  console.log('  • Ghanaian context: cedis, markets, local examples used')
  process.exit(0)
}

reseed().catch(err => {
  console.error('❌', err)
  process.exit(1)
})

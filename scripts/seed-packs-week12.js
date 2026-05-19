// scripts/seed-packs-week12.js
// Seeds Days 1–10 pack content into Firestore
// Run: node scripts/seed-packs-week12.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const STUDENT_ID = 'jezreel'

const PACKS = [
  {
    dayNum: 1,
    subject: 'Mathematics',
    topic: 'Place Value: Reading & Writing Numbers up to 1 Billion',
    standard: 'B7.1.1.1.1–B7.1.1.1.2',
    objectives: [
      'Read and write numbers up to 1 billion in words and figures',
      'Identify the value of each digit in a large number',
      'Compare two large numbers using >, < or =',
      'Skip count forwards and backwards in 25s, 50s and 250s',
    ],
    concepts: [
      {
        heading: 'Place Value Columns',
        body: 'Every digit in a number has a PLACE VALUE — its value depends on its position.\nThe columns from right to left are:\nUnits, Tens, Hundreds, Thousands, Ten Thousands, Hundred Thousands, Millions, Ten Millions, Hundred Millions, Billions.\n\nExample: In 2,735,000,000 — the digit 7 is in the Hundred Millions column, so its value is 700,000,000.',
        note: 'A billion = 1,000,000,000. Count the zeros: there are 9 of them.',
      },
      {
        heading: 'Comparing Large Numbers',
        body: 'To compare two numbers, start from the LEFTMOST digit and move right until you find a difference. The number with the bigger digit in that column is larger.\n\nExample: Compare 5,223,487,637 and 5,113,487,637.\nBoth start with 5 (billions). Then 223 million vs 113 million — 223 > 113.\nSo: 5,223,487,637 > 5,113,487,637',
        note: 'Always use the correct symbol: > means "greater than", < means "less than", = means "equal to".',
      },
      {
        heading: 'Skip Counting',
        body: 'Skip counting means adding (or subtracting) the same number each time.\n\nCounting forward in 250s from 1,000:\n1,000 — 1,250 — 1,500 — 1,750 — 2,000 — 2,250...\n\nCounting backward in 25s from 10,000:\n10,000 — 9,975 — 9,950 — 9,925 — 9,900...',
        note: null,
      },
    ],
    worked: [
      { q: 'Write 1,295,800,000 in words.', a: 'One billion, two hundred and ninety-five million, eight hundred thousand.' },
      { q: 'What is the value of the digit 7 in the number 2,735,000,000?', a: '7 is in the Hundred Millions column. Its value = 700,000,000 (seven hundred million).' },
      { q: 'Which is greater: 8,301,456,221 or 8,310,456,221? Write using the correct symbol.', a: 'Compare from left: both have 8 billion. Then 301 million vs 310 million. 310 > 301.\n8,301,456,221 < 8,310,456,221' },
    ],
    questions: [
      { q: 'Write 3,045,600,009 in words.', a: 'Three billion, forty-five million, six hundred thousand and nine.' },
      { q: 'Write in figures: Four billion, seven hundred and twenty million, nine thousand.', a: '4,720,009,000' },
      { q: 'What is the value of the digit 5 in 3,520,000,000?', a: '5 is in the Hundred Millions column. Its value = 500,000,000.' },
      { q: 'Compare using > or <: 7,890,234,100 ___ 7,809,234,100', a: '7,890,234,100 > 7,809,234,100' },
      { q: 'Arrange in descending order (largest first): 1,200,500,000; 1,020,500,000; 1,200,050,000', a: '1,200,500,000 > 1,200,050,000 > 1,020,500,000' },
      { q: 'What number is 500,000 MORE than 2,300,000,000?', a: '2,300,500,000' },
      { q: 'What number is 1,000,000 LESS than 7,451,320,000?', a: '7,450,320,000' },
      { q: 'Skip count forward in 250s from 5,000. Write the first 5 numbers.', a: '5,000 — 5,250 — 5,500 — 5,750 — 6,000' },
      { q: 'The population of Kumasi is 3,630,000 and Accra is 2,514,000. By how much is Kumasi larger?', a: '3,630,000 − 2,514,000 = 1,116,000' },
      { q: "[Challenge] Ghana's cocoa export was GH₵8,430,000,000 last year and GH₵7,985,000,000 the year before. By how much did exports increase?", a: '8,430,000,000 − 7,985,000,000 = GH₵445,000,000' },
    ],
  },
  {
    dayNum: 2,
    subject: 'Science',
    topic: 'Diversity of Matter: States of Matter — Solids, Liquids & Gases',
    standard: 'B7.1.1.1.1–B7.1.1.1.3',
    objectives: [
      'Classify materials as solids, liquids or gases using their properties',
      'Describe the importance of liquids (especially water) in everyday life',
      'Describe the importance of specific solids in daily life',
      'Give examples of each state of matter from your environment',
    ],
    concepts: [
      {
        heading: 'The Three States of Matter',
        body: 'All materials exist in one of three states — SOLID, LIQUID or GAS.\n\nSOLID: Has a definite shape and volume. Particles are packed tightly together and vibrate in fixed positions. Examples: stone, wood, iron, ice, chalk.\n\nLIQUID: Has a definite volume but NO fixed shape — takes the shape of its container. Particles are close together but can flow. Examples: water, palm oil, kerosene, blood.\n\nGAS: Has NO definite shape or volume — fills any container completely. Particles are far apart and move freely. Examples: air, steam, cooking gas, oxygen.',
        note: 'A simple test: Can you hold it without a container? → Solid. Does it pour? → Liquid. Does it fill the room? → Gas.',
      },
      {
        heading: 'Importance of Liquids',
        body: 'Water is the most important liquid. We use it for:\n• Drinking and cooking — essential for survival\n• Bathing and washing — personal hygiene\n• Farming and irrigation — growing food crops\n• Industrial processes — cooling machines\n• Transport — rivers and seas carry goods\n\nOther important liquids: palm oil (cooking), petrol (fuel), blood (carries nutrients in the body).',
        note: 'About 70% of the human body is water. Without water, a person can only survive about 3 days.',
      },
      {
        heading: 'Importance of Solids',
        body: 'Solids are essential in daily life:\n• Metals (iron, aluminium) — buildings, tools, vehicles, pots\n• Wood — furniture, fuel, construction\n• Clay and cement — building houses\n• Food solids (yam, plantain, rice) — provide energy and nutrients\n• Rocks and minerals — source of raw materials for industry',
        note: null,
      },
    ],
    worked: [
      { q: 'Classify each item as solid, liquid or gas: (a) cooking gas (b) groundnut oil (c) a stone (d) steam (e) blood', a: '(a) gas  (b) liquid  (c) solid  (d) gas  (e) liquid' },
      { q: 'Give TWO properties that distinguish a liquid from a solid.', a: '1. A liquid has NO fixed shape — it takes the shape of its container. A solid has a definite shape.\n2. A liquid can flow (pour). A solid cannot flow.' },
      { q: 'Give THREE ways water is important in everyday life in Ghana.', a: '1. Drinking and cooking — essential for survival.\n2. Farming and irrigation — growing crops like cocoa, yam and maize.\n3. Industrial use — cooling machines, processing food products.' },
    ],
    questions: [
      { q: 'Name the three states of matter.', a: 'Solid, liquid and gas.' },
      { q: 'Classify each material: (a) kerosene (b) iron nail (c) oxygen (d) groundnut oil (e) chalk', a: '(a) liquid  (b) solid  (c) gas  (d) liquid  (e) solid' },
      { q: 'What are TWO properties of a gas that make it different from a solid?', a: '1. A gas has no fixed shape or volume — it fills any container completely. A solid has a fixed shape and volume.\n2. Gas particles are far apart and move freely. Solid particles are tightly packed and vibrate in fixed positions.' },
      { q: 'Give TWO reasons why water is important to farmers in Ghana.', a: '1. Used for irrigation — watering crops during the dry season.\n2. Provides drinking water for livestock.' },
      { q: 'Name THREE solid materials used in building a house.', a: 'Any three: cement, sand, stone/gravel, iron rods, wood, clay bricks, glass.' },
      { q: 'When water is heated strongly, it changes into steam. What state of matter is steam?', a: 'Steam is a GAS (water in its gaseous state).' },
      { q: 'Is the air inside a balloon a solid, liquid or gas? Explain.', a: 'The air inside a balloon is a GAS. It has no fixed shape — it fills the entire balloon. Its particles are far apart and move freely.' },
      { q: 'Why can you pour water into any shaped container, but you cannot do the same with a stone?', a: 'Water is a liquid — it has no fixed shape and takes the shape of its container. A stone is a solid — its particles are tightly packed in fixed positions, giving it a definite shape that cannot change without breaking it.' },
      { q: 'Give ONE example of a solid, liquid and gas found in your kitchen at home.', a: 'Accept any: Solid (yam, cooking pot, wooden spoon). Liquid (water, palm oil, soup). Gas (cooking gas, steam from boiling water, air).' },
      { q: '[Challenge] Ice, water and steam are all made of the same substance (water). What causes them to be in different states?', a: 'TEMPERATURE (and therefore energy) determines the state. Ice = low temperature, particles vibrate slowly in fixed positions. Water = moderate temperature, particles move freely but stay close. Steam = high temperature, particles move rapidly and spread far apart. The same substance changes state when heat is added or removed.' },
    ],
  },
  {
    dayNum: 3,
    subject: 'Mathematics',
    topic: 'Rounding: Whole Numbers, Decimals & Significant Figures',
    standard: 'B7.1.1.1.3–B7.1.1.1.5',
    objectives: [
      'Round whole numbers to the nearest 10, 100, 1000, 10,000 and 100,000',
      'Round decimal numbers to the nearest tenth, hundredth and thousandth',
      'Distinguish between rounding up, rounding down and rounding off',
      'Express numbers to given significant figures',
    ],
    concepts: [
      {
        heading: 'Rounding Off (the most common type)',
        body: 'Look at the digit IMMEDIATELY to the RIGHT of the place you are rounding to.\n• If that digit is 5 or more → round UP (increase the target digit by 1)\n• If that digit is 4 or less → round DOWN (keep the target digit the same)\nThen replace all digits to the right with zeros.\n\nExample: Round 2,846,655 to the nearest thousand.\nLook at the hundreds digit: 6 (which is ≥ 5) → round up.\nAnswer: 2,847,000',
        note: 'Round UP = always take the larger option. Round DOWN = always take the smaller option. These ignore the digit rules.',
      },
      {
        heading: 'Rounding Decimals',
        body: 'The same rule applies to decimals. Look at the digit one place to the RIGHT.\n\nExample: Round 486.3685 to:\n• Nearest tenth (1 d.p.): look at hundredths digit = 6 (≥5) → 486.4\n• Nearest hundredth (2 d.p.): look at thousandths digit = 8 (≥5) → 486.37\n• Nearest thousandth (3 d.p.): look at ten-thousandths digit = 5 (≥5) → 486.369',
        note: 'd.p. means decimal places. 1 d.p. = tenths. 2 d.p. = hundredths. 3 d.p. = thousandths.',
      },
      {
        heading: 'Significant Figures (s.f.)',
        body: 'Count from the FIRST NON-ZERO digit. That is your first significant figure.\n\nExample: Express 857,386,321 to 3 significant figures.\nFirst 3 digits: 8, 5, 7. The next digit is 3 (< 5) → round down.\nAnswer: 857,000,000\n\nFor decimals: 0.00234567 to 3 s.f.\nFirst non-zero digit is 2. Count: 2, 3, 4. Next digit is 5 → round up.\nAnswer: 0.00235',
        note: 'Trailing zeros after a decimal point ARE significant. 0.360 has 3 significant figures.',
      },
    ],
    worked: [
      { q: 'Round 2,846,655 to (a) the nearest thousand (b) the nearest hundred thousand', a: '(a) Hundreds digit = 6 (≥5) → round up: 2,847,000\n(b) Ten-thousands digit = 4 (<5) → round down: 2,800,000' },
      { q: 'Round 0.08475 to (a) 1 decimal place (b) 2 decimal places (c) 3 decimal places', a: '(a) Hundredths digit = 8 (≥5) → round up: 0.1\n(b) Thousandths digit = 4 (<5) → round down: 0.08\n(c) Ten-thousandths digit = 7 (≥5) → round up: 0.085' },
      { q: 'Express 857,386,321 to 4 significant figures.', a: 'First 4 digits: 8, 5, 7, 3. Next digit = 8 (≥5) → round up the 3 to 4. Answer: 857,400,000' },
    ],
    questions: [
      { q: 'Round 6,573,482 to the nearest (a) hundred (b) thousand (c) ten thousand', a: '(a) 6,573,500  (b) 6,573,000  (c) 6,570,000' },
      { q: 'Round 14,899,500 to the nearest million.', a: '15,000,000' },
      { q: 'Round 486.3685 to the nearest hundredth.', a: '486.37' },
      { q: 'Round 78.4604783 to the nearest thousandth.', a: '78.460' },
      { q: 'Express 0.00234567 to 3 significant figures.', a: '0.00235' },
      { q: 'Express 84.40995 to 4 significant figures.', a: '84.41' },
      { q: 'A bag of rice weighs 49.73 kg. Round to the nearest whole number.', a: '50 kg' },
      { q: 'The distance from Kumasi to Accra is 253.4 km. Round to (a) nearest 10 km (b) nearest whole km', a: '(a) 250 km  (b) 253 km' },
      { q: 'Round 7,654,321,098 to the nearest hundred million.', a: '7,700,000,000' },
      { q: '[Challenge] Is the number 0.360 expressed to 3 significant figures? Explain whether the zero is significant.', a: 'YES — 0.360 has 3 significant figures. The first zero (before the decimal) is not significant. The digits 3, 6 are significant. The trailing zero after 6 IS significant — it shows the measurement was precise to 3 decimal places. Writing 0.360 instead of 0.36 tells us the value is exact to the thousandths place.' },
    ],
  },
  {
    dayNum: 4,
    subject: 'English',
    topic: 'Grammar: Nouns, Pronouns & Adjectives in Context',
    standard: 'B7.3.1.1.1–B7.3.1.1.3',
    objectives: [
      'Identify and use nouns (common, proper, abstract, collective) correctly in sentences',
      'Use types of pronouns (personal, possessive, reflexive) accurately',
      'Identify and use adjectives to describe nouns effectively',
      'Apply these parts of speech in writing your own sentences',
    ],
    concepts: [
      {
        heading: 'Nouns — Names of People, Places and Things',
        body: 'A noun is a word that names a person, place, thing or idea. There are four types:\n\nCOMMON NOUNS: general names. Examples: boy, school, market, chair, teacher.\n\nPROPER NOUNS: specific names. Always start with a capital letter. Examples: Jezreel, Kumasi, Ghana, Marist Preparatory JHS, Monday.\n\nABSTRACT NOUNS: things you cannot touch — ideas and feelings. Examples: love, freedom, courage, happiness, wisdom.\n\nCOLLECTIVE NOUNS: name a group. Examples: a class of students, a flock of birds, a bunch of bananas, a team of players.',
        note: 'Trick: If you can put "the" or "a" in front of it, it is probably a noun.',
      },
      {
        heading: 'Pronouns — Words that Replace Nouns',
        body: 'A pronoun replaces a noun to avoid repetition.\n\nPERSONAL PRONOUNS: I, you, he, she, it, we, they, me, him, her, us, them.\nExample: Jezreel is clever. HE works hard. (He replaces Jezreel)\n\nPOSSESSIVE PRONOUNS: mine, yours, his, hers, ours, theirs.\nExample: The book is MINE. That pen is HERS.\n\nREFLEXIVE PRONOUNS: myself, yourself, himself, herself, itself, ourselves, themselves.\nExample: He hurt HIMSELF. She did it HERSELF.',
        note: "Do not confuse 'its' (possessive) with 'it's' (short for 'it is').",
      },
      {
        heading: 'Adjectives — Words that Describe Nouns',
        body: 'An adjective describes or gives more information about a noun.\n\nTypes of adjectives:\n• Quality: tall, beautiful, old, intelligent, sweet, heavy\n• Quantity: many, few, some, several, all\n• Number: one, two, first, second, last\n• Colour: red, blue, green, golden\n\nExample: "The TALL, INTELLIGENT boy won the FIRST prize."\nTall and intelligent describe "boy". First describes "prize".',
        note: 'Adjectives usually come BEFORE the noun they describe, or after a linking verb like "is", "was", "seems".',
      },
    ],
    worked: [
      { q: 'Identify the nouns in this sentence and state their type: "The courage of Ama inspired her whole class at Marist School."', a: 'Courage → abstract noun. Ama → proper noun. Class → common noun (collective when referring to the group). Marist School → proper noun.' },
      { q: 'Replace the underlined nouns with the correct pronoun: "Kofi and Ama went to school. Kofi carried Ama\'s bag for Ama."', a: 'Kofi and Ama went to school. HE carried HER bag for HER.' },
      { q: 'Write a sentence using an adjective of quality and an adjective of quantity to describe pupils in a classroom.', a: '"Many intelligent pupils sat quietly in the clean classroom." (Many = quantity; intelligent, clean = quality adjectives)' },
    ],
    questions: [
      { q: 'Identify all the nouns in this sentence and state their type: "A flock of birds flew over the beautiful city of Kumasi."', a: 'Flock → collective noun. Birds → common noun. City → common noun. Kumasi → proper noun.' },
      { q: 'Write ONE example of each type of noun: (a) Common noun (b) Proper noun (c) Abstract noun (d) Collective noun', a: 'Accept any correct examples. E.g.: (a) market (b) Accra (c) courage (d) a pride of lions.' },
      { q: 'Choose the correct pronoun: (a) Kofi hurt ___ (himself/itself) while playing. (b) The book is ___. (mine/my) (c) Ama and I — ___ are classmates. (We/They)', a: '(a) himself  (b) mine  (c) We' },
      { q: "Rewrite this sentence replacing the repeated nouns with pronouns: 'Declyn read Declyn's book. Declyn enjoyed the book very much.'", a: "Declyn read his book. He enjoyed it very much." },
      { q: 'Identify the adjectives in this sentence: "Three small, hungry boys sat under the large mango tree."', a: 'Three (number), small (quality), hungry (quality), large (quality).' },
      { q: 'Add a suitable adjective to each blank: (a) The ___ girl won the competition. (b) There were ___ students absent today. (c) He carried a ___ bag.', a: 'Accept any appropriate adjectives. E.g.: (a) brilliant (b) five/many/few (c) heavy/large/small.' },
      { q: 'Write THREE sentences — each must include: (a) A proper noun and a pronoun (b) A collective noun (c) An abstract noun and an adjective', a: 'Accept any correctly constructed sentences demonstrating the required parts of speech.' },
      { q: 'What is the difference between a common noun and a proper noun? Give TWO examples of each.', a: 'Common noun = general name for a person, place or thing. E.g.: teacher, city. Proper noun = specific name, always capitalised. E.g.: Mr Mensah, Accra.' },
      { q: "Correct the errors in these sentences: (a) 'Ama and me went to the market.' (b) 'The dog hurt it's leg.' (c) 'Their are many books on the table.'", a: "(a) Ama and I went to the market.\n(b) The dog hurt its leg. (possessive — no apostrophe)\n(c) There are many books on the table." },
      { q: '[Challenge] Write a short paragraph (4–5 sentences) describing your school. Include at least ONE of each: common noun, proper noun, abstract noun, pronoun, and adjective. Underline each one.', a: 'Check for all five parts of speech present and correctly used. Accept any well-constructed paragraph.' },
    ],
  },
  {
    dayNum: 5,
    subject: 'Mathematics',
    topic: 'Mental Maths: Multiply & Divide by Powers of 10, Word Problems',
    standard: 'B7.1.2.1.1–B7.1.2.1.3',
    objectives: [
      'Multiply and divide numbers by 10, 100 and 1000 mentally',
      'Apply doubling, halving and the distributive property to solve problems',
      'Solve word problems using mental mathematics strategies',
      'Identify key words in problems: sum, difference, product, quotient',
    ],
    concepts: [
      {
        heading: 'Multiplying and Dividing by Powers of 10',
        body: '× 10: shift the decimal point ONE place to the RIGHT\n× 100: shift TWO places to the RIGHT\n× 1,000: shift THREE places to the RIGHT\n÷ 10: shift ONE place to the LEFT\n÷ 100: shift TWO places to the LEFT\n÷ 1,000: shift THREE places to the LEFT\n\nExamples:\n105.25 × 1,000 = 105,250\n105.25 ÷ 100 = 1.0525\n0.075 × 10,000 = 750',
        note: 'Think of the decimal point as fixed and the digits moving. Or think of the decimal point moving.',
      },
      {
        heading: 'Doubling, Halving & Distributive Property',
        body: 'DOUBLING & HALVING: to make multiplication easier, halve one number and double the other.\nExample: 28 × 5 → halve 28, double 5 → 14 × 10 = 140\n\nDISTRIBUTIVE PROPERTY: split a number into parts that are easier to multiply.\nExample: 18 × 6 → think (20 - 2) × 6 = (20 × 6) - (2 × 6) = 120 - 12 = 108\nExample: 7 × 15 → think 7 × (10 + 5) = 70 + 35 = 105',
        note: 'These tricks save time in exams. Practise them until they feel automatic.',
      },
      {
        heading: 'Key Words in Word Problems',
        body: 'Recognise the operation from the language used:\n\nADDITION: sum, total, altogether, increased by, more than\nSUBTRACTION: difference, less than, reduced by, how much more, remaining\nMULTIPLICATION: product, times, of (with fractions), multiplied by\nDIVISION: quotient, share equally, how many times, divided by, per',
        note: null,
      },
    ],
    worked: [
      { q: 'Find: (a) 34.56 × 100  (b) 8,450 ÷ 1,000  (c) 0.075 × 10,000', a: '(a) 3,456  (b) 8.45  (c) 750' },
      { q: 'Use the distributive property: 9 × 98', a: '9 × (100 - 2) = (9 × 100) - (9 × 2) = 900 - 18 = 882' },
      { q: 'Word problem: Mrs Adamu bought 13.6 kg of meat. Mrs Anderson bought 2.4 kg less. How many kg did they buy altogether?', a: 'Mrs Anderson = 13.6 - 2.4 = 11.2 kg. Together = 13.6 + 11.2 = 24.8 kg.' },
    ],
    questions: [
      { q: 'Find mentally: (a) 256.8 × 10  (b) 4,720 ÷ 100  (c) 0.38 × 1,000  (d) 93,500 ÷ 1,000', a: '(a) 2,568  (b) 47.20  (c) 380  (d) 93.5' },
      { q: 'Use doubling and halving: (a) 125 × 4  (b) 36 × 5', a: '(a) 125×2=250, 250×2=500  (b) 18×10=180' },
      { q: 'Use the distributive property: (a) 8 × 99  (b) 7 × 15  (c) 12 × 25', a: '(a) 8×(100-1)=800-8=792  (b) 7×(10+5)=70+35=105  (c) 12×(25)=12×25=300' },
      { q: 'How many 21 cm pieces can be cut from 1 metre of string? How much string remains?', a: '100 ÷ 21 = 4 pieces remainder 16 cm. 4 pieces, 16 cm remains.' },
      { q: 'Ebo weighs 28.6 kg. His father weighs four times as heavy. What is the total weight of Ebo and his father?', a: "Father = 28.6 × 4 = 114.4 kg. Total = 114.4 + 28.6 = 143 kg." },
      { q: 'What fraction of 1 litre is 250 ml? Express as a fraction in its simplest form.', a: '250/1000 = 1/4' },
      { q: 'School budget: Painting GH₵4,580; Basketball pitch GH₵3,050; Library books GH₵2,690; Choir robes GH₵5,340; Prizes GH₵4,270.\n(a) How much for painting + choir robes?\n(b) How much more for basketball pitch than library books?', a: '(a) 4,580 + 5,340 = GH₵9,920\n(b) 3,050 - 2,690 = GH₵360' },
      { q: 'Two angles of a triangle add up to 98°. What is the size of the third angle?', a: '180° - 98° = 82°' },
      { q: 'What is 60 pesewas as a decimal fraction of GH₵2.40?', a: '0.60 ÷ 2.40 = 0.25 = 1/4' },
      { q: '[Challenge] A shopkeeper bought 240 oranges at GH₵0.80 each and sold them all at GH₵1.20 each. What was the total profit?', a: 'Cost = 240 × 0.80 = GH₵192. Revenue = 240 × 1.20 = GH₵288. Profit = 288 - 192 = GH₵96.' },
    ],
  },
  {
    dayNum: 6,
    subject: 'Science',
    topic: 'Living Cells: Structure and Functions of the Cell',
    standard: 'B7.1.2.1.1–B7.1.2.1.2',
    objectives: [
      'Describe the structure and function of animal and plant cells',
      'State the functions of each cell organelle',
      'Identify the differences between animal cells and plant cells',
      'Explain why cells are important to living organisms',
    ],
    concepts: [
      {
        heading: 'What is a Cell?',
        body: 'A cell is the basic unit of life. All living things are made of cells.\nSome organisms (like bacteria) are made of just ONE cell. Humans are made of TRILLIONS of cells.\n\nThere are two main types of cells:\n• ANIMAL CELLS — found in humans and animals\n• PLANT CELLS — found in plants',
        note: 'Robert Hooke was the first person to observe cells under a microscope in 1665, using cork (dead plant cells).',
      },
      {
        heading: 'Parts of a Cell and Their Functions',
        body: 'Parts found in BOTH animal and plant cells:\n• Cell membrane: thin, flexible outer layer — controls what enters and leaves the cell\n• Nucleus: the control centre — contains DNA and directs all cell activities\n• Cytoplasm: jelly-like fluid filling the cell — holds organelles in place\n• Mitochondria: powerhouse — releases energy from food (respiration)\n• Ribosomes: make proteins for growth and repair\n\nParts found ONLY in plant cells:\n• Cell wall: rigid outer layer made of cellulose — gives the plant its shape and support\n• Chloroplasts: contain chlorophyll — capture sunlight for photosynthesis\n• Large central vacuole: stores water and maintains the plant\'s shape (turgidity)',
        note: 'Memory trick: Plant cells have a WALL, CHLOROPLASTS and a large VACUOLE — animals do not.',
      },
      {
        heading: 'Animal Cell vs Plant Cell — Key Differences',
        body: 'ANIMAL CELL:\n✗ No cell wall\n✗ No chloroplasts\n✗ Small or no central vacuole\n✓ Has centrioles (help in cell division)\n\nPLANT CELL:\n✓ Has cell wall\n✓ Has chloroplasts\n✓ Has large central vacuole\n✗ No centrioles',
        note: null,
      },
    ],
    worked: [
      { q: 'State the function of each of these cell parts: (a) nucleus (b) mitochondria (c) cell membrane', a: '(a) Nucleus: the control centre — contains DNA and directs all activities.\n(b) Mitochondria: the powerhouse — releases energy from food through respiration.\n(c) Cell membrane: controls what substances enter and leave the cell.' },
      { q: 'List THREE structures found in plant cells but NOT in animal cells.', a: '1. Cell wall — gives shape and support.\n2. Chloroplasts — capture sunlight for photosynthesis.\n3. Large central vacuole — stores water.' },
      { q: 'Why would a plant cell be unable to make its own food if it lost its chloroplasts?', a: 'Chloroplasts contain chlorophyll which captures sunlight. Without chloroplasts, the plant cannot trap light energy and so cannot carry out photosynthesis (making food from sunlight, water and carbon dioxide).' },
    ],
    questions: [
      { q: "What is a cell? Why is it called the 'basic unit of life'?", a: 'A cell is the smallest unit that can carry out all the processes of life — growth, reproduction and respiration. It is called the basic unit of life because ALL living things are made of cells.' },
      { q: 'State the function of: (a) ribosomes (b) cytoplasm (c) cell wall (d) chloroplasts', a: '(a) Ribosomes: make proteins for growth and repair.\n(b) Cytoplasm: jelly-like fluid that holds organelles in place.\n(c) Cell wall: provides structural support and maintains cell shape (plant cells only).\n(d) Chloroplasts: capture sunlight for photosynthesis (plant cells only).' },
      { q: 'List THREE similarities between animal cells and plant cells.', a: 'Both have: (a) a nucleus (b) a cell membrane (c) mitochondria (d) cytoplasm (e) ribosomes. Any three.' },
      { q: 'List TWO differences between animal cells and plant cells.', a: 'Plant cells have: cell wall (animals do not). Plant cells have: chloroplasts (animals do not). Also: plant cells have a large central vacuole; animal cells have small or none.' },
      { q: "Why is the nucleus often called the 'control centre' of the cell?", a: 'The nucleus contains DNA — the genetic information that controls all cell activities. It directs when the cell grows, divides, makes proteins and carries out all other functions.' },
      { q: 'A scientist examines a cell under a microscope. She notices it has a cell wall, chloroplasts and a large central vacuole. Is this an animal cell or a plant cell? Explain.', a: 'It is a PLANT CELL. Animal cells do not have cell walls, chloroplasts or large central vacuoles. All three structures are exclusive to plant cells.' },
      { q: 'Why do plant cells need a large central vacuole?', a: 'The large central vacuole stores water and nutrients. When full of water, it pushes against the cell wall (creating turgor pressure) which keeps the plant firm and upright. It also stores waste products.' },
      { q: 'Which organelle releases energy in a cell? Why is this important?', a: 'Mitochondria release energy through cellular respiration. This energy powers ALL cell activities — growth, movement, protein production, reproduction. Without it, no life processes can occur.' },
      { q: "If a cell's membrane was destroyed, what would happen to the cell?", a: "The cell membrane controls what enters and leaves the cell. If destroyed: the cell's contents would leak out, harmful substances would flood in uncontrolled, and the cell would lose all regulation and die." },
      { q: '[Challenge] A leaf appears green because of chlorophyll in the chloroplasts. If a plant is kept in complete darkness for several weeks, what do you think would happen to the chlorophyll? Explain your reasoning.', a: 'The chlorophyll would break down (degrade). Without sunlight, the plant cannot use the chlorophyll for photosynthesis. The plant stops producing it and the existing chlorophyll degrades — the leaf turns yellow or pale. This process is called etiolation. The plant would eventually starve and die.' },
    ],
  },
  {
    dayNum: 7,
    subject: 'Mathematics',
    topic: 'Index Notation: Powers of Numbers, HCF & LCM',
    standard: 'B7.1.2.3.1–B7.1.2.3.5',
    objectives: [
      'Understand and use index notation (powers of numbers)',
      'Express numbers as products of prime factors',
      'Apply the zero index rule: any number⁰ = 1',
      'Find the Highest Common Factor (HCF) and Lowest Common Multiple (LCM)',
    ],
    concepts: [
      {
        heading: 'Index Notation — Powers of Numbers',
        body: 'When we multiply the same number by itself repeatedly, we write it using a POWER (index).\n2 × 2 × 2 × 2 × 2 = 2⁵ = 32\n\nThe BASE is 2. The EXPONENT (index) is 5.\n2⁵ is read as "2 to the power of 5".\n\nMore examples:\n3⁴ = 3 × 3 × 3 × 3 = 81\n5³ = 5 × 5 × 5 = 125\n10⁴ = 10,000',
        note: 'THE ZERO INDEX RULE: any number to the power of zero = 1. So 7⁰ = 1, 100⁰ = 1, 1,000,000⁰ = 1.',
      },
      {
        heading: 'Product of Prime Factors',
        body: 'Every whole number can be written as a product of PRIME numbers. Use a factor tree.\n\nExample: Express 72 as a product of prime factors.\n72 = 8 × 9 = (2 × 2 × 2) × (3 × 3) = 2³ × 3²\n\nExample: Express 48 as a product of prime factors.\n48 = 2 × 24 = 2 × 2 × 12 = 2 × 2 × 2 × 2 × 3 = 2⁴ × 3',
        note: null,
      },
      {
        heading: 'HCF and LCM',
        body: 'HIGHEST COMMON FACTOR (HCF): the largest number that divides exactly into two or more numbers.\nMethod: Express both as products of primes. Multiply the COMMON factors (using the lowest power).\n\nExample: HCF of 24 and 30.\n24 = 2³ × 3. 30 = 2 × 3 × 5.\nCommon: 2 and 3. HCF = 2 × 3 = 6.\n\nLOWEST COMMON MULTIPLE (LCM): the smallest number that is a multiple of two or more numbers.\nMethod: Multiply ALL prime factors, using the HIGHEST power of each.\n\nExample: LCM of 12 and 8.\n12 = 2² × 3. 8 = 2³.\nLCM = 2³ × 3 = 24.',
        note: 'HCF is used in sharing/cutting problems. LCM is used in "when will they meet again" problems.',
      },
    ],
    worked: [
      { q: 'Express 32 as a power of 2. Then evaluate 5³ and 3⁴.', a: '32 = 2⁵. 5³ = 5×5×5 = 125. 3⁴ = 3×3×3×3 = 81.' },
      { q: 'Find the HCF of 36 and 48 using prime factors.', a: '36 = 2² × 3². 48 = 2⁴ × 3. Common factors: 2² and 3¹. HCF = 2² × 3 = 4 × 3 = 12.' },
      { q: 'Baba exercises every 12 days and Serwa every 8 days. They both exercise today. After how many days will they exercise together again?', a: 'Find LCM(12, 8): 12 = 2² × 3. 8 = 2³. LCM = 2³ × 3 = 8 × 3 = 24 days.' },
    ],
    questions: [
      { q: 'Evaluate: (a) 2⁶  (b) 4³  (c) 10³  (d) 3²  (e) 12⁰', a: '(a) 64  (b) 64  (c) 1,000  (d) 9  (e) 1' },
      { q: 'Express each number as a product of prime factors: (a) 36  (b) 60  (c) 100', a: '(a) 2² × 3²  (b) 2² × 3 × 5  (c) 2² × 5²' },
      { q: 'What is 1⁰ + 2⁰ + 3⁰ + 4⁰ + 5⁰?', a: '1+1+1+1+1 = 5 (any number to the power of zero = 1)' },
      { q: 'Find the HCF of 18 and 24.', a: '18 = 2 × 3². 24 = 2³ × 3. Common: 2 and 3. HCF = 2 × 3 = 6.' },
      { q: 'Find the LCM of 6 and 9.', a: '6 = 2 × 3. 9 = 3². LCM = 2 × 3² = 2 × 9 = 18.' },
      { q: 'Akweley has cloth strips of 24 cm and 30 cm. She wants to cut both into equal strips as wide as possible with no waste. How wide should each strip be?', a: 'HCF(24, 30) = 6 cm. Each strip should be 6 cm wide.' },
      { q: 'Find the LCM of 4, 6 and 9.', a: '4=2². 6=2×3. 9=3². LCM = 2² × 3² = 4 × 9 = 36.' },
      { q: 'Express 16 × 27 as a product of prime powers.', a: '16 = 2⁴. 27 = 3³. So 16 × 27 = 2⁴ × 3³.' },
      { q: 'Is 595 divisible by 7? Show your working using the divisibility test.', a: '595 ÷ 7 = 85. 7 × 85 = 595. Yes, 595 is divisible by 7.' },
      { q: '[Challenge] Three buses leave the bus station at the same time. Bus A leaves every 12 minutes, Bus B every 15 minutes, Bus C every 20 minutes. After how many minutes will all three buses leave together again?', a: 'LCM(12, 15, 20). 12=2²×3. 15=3×5. 20=2²×5. LCM = 2²×3×5 = 60 minutes.' },
    ],
  },
  {
    dayNum: 8,
    subject: 'English',
    topic: 'Grammar: Verbs — Tense, Forms and Subject-Verb Agreement',
    standard: 'B7.3.1.1.4',
    objectives: [
      'Identify and use verbs correctly in different tenses (past, present, future)',
      'Use the correct form of verbs — base, past simple, past participle',
      'Apply subject-verb agreement rules accurately',
      'Distinguish between regular and irregular verbs',
    ],
    concepts: [
      {
        heading: 'What is a Verb?',
        body: 'A verb is a word that shows an ACTION, STATE or OCCURRENCE.\n\nAction verbs: run, write, eat, study, play, jump\nState verbs: be, have, seem, appear, belong, know\nOccurrence verbs: happen, occur, become, develop\n\nEvery sentence MUST have a verb.\nExample: "The boy runs to school every morning." (runs = action verb)',
        note: 'Auxiliary (helping) verbs are used with main verbs: is, are, was, were, have, has, had, will, shall, do, does.',
      },
      {
        heading: 'Verb Tenses — When does it happen?',
        body: 'PAST TENSE: action already happened.\nRegular: add -ed. walk → walked. study → studied.\nIrregular: go → went. eat → ate. write → wrote. run → ran.\n\nPRESENT TENSE: action happening now or habitually.\nWith he/she/it: add -s or -es. He runs. She teaches.\nWith I/you/we/they: no change. I run. They play.\n\nFUTURE TENSE: action will happen.\nUse will/shall + base form: She will come. We shall go.',
        note: 'Common irregular verbs: go/went/gone, eat/ate/eaten, write/wrote/written, come/came/come, see/saw/seen, do/did/done.',
      },
      {
        heading: 'Subject-Verb Agreement',
        body: 'The verb must AGREE with its subject in number.\n\nSINGULAR subject → singular verb (usually adds -s):\n"The teacher SPEAKS clearly." (not "speak")\n"Jezreel IS a hard worker."\n\nPLURAL subject → plural verb:\n"The teachers SPEAK clearly." (not "speaks")\n"They ARE good students."\n\nSpecial rules:\n• Collective nouns take singular verbs: "The team IS winning."\n• "Each" and "every" take singular: "Each student HAS a book."',
        note: null,
      },
    ],
    worked: [
      { q: 'Write the correct tense of the verb in brackets:\n(a) Yesterday, she ___ (go) to school early.\n(b) Every morning, he ___ (brush) his teeth.\n(c) Tomorrow, they ___ (visit) the museum.', a: '(a) went (past tense — irregular)\n(b) brushes (present — singular "he" adds -es)\n(c) will visit (future tense)' },
      { q: "Correct the subject-verb agreement errors:\n(a) 'The boys plays football every day.'\n(b) 'Each of the students have a pencil.'\n(c) 'The team are winning the match.'", a: "(a) The boys PLAY football every day.\n(b) Each of the students HAS a pencil.\n(c) The team IS winning the match." },
      { q: 'Write the past tense and past participle of these irregular verbs: (a) write (b) eat (c) run (d) take (e) see', a: '(a) wrote/written  (b) ate/eaten  (c) ran/run  (d) took/taken  (e) saw/seen' },
    ],
    questions: [
      { q: 'Identify the verb in each sentence and state its tense:\n(a) Kofi eats rice every day.\n(b) Ama wrote a beautiful letter.\n(c) We will go to Accra next week.\n(d) The teacher is explaining the lesson.', a: '(a) eats — simple present\n(b) wrote — simple past\n(c) will go — simple future\n(d) is explaining — present continuous' },
      { q: 'Fill in the correct form of the verb:\n(a) She ___ (play) football yesterday.\n(b) They ___ (study) Science right now.\n(c) He ___ (come) to school late tomorrow.\n(d) The dog ___ (bark) at strangers.', a: '(a) played  (b) are studying  (c) will come  (d) barks' },
      { q: 'Write the past simple and past participle: (a) go (b) do (c) come (d) have (e) be', a: '(a) went/gone  (b) did/done  (c) came/come  (d) had/had  (e) was/were/been' },
      { q: "Correct the errors in these sentences:\n(a) 'She go to market every Saturday.'\n(b) 'The children was playing in the rain.'\n(c) 'He have finished his homework.'", a: "(a) She GOES to market every Saturday.\n(b) The children WERE playing in the rain.\n(c) He HAS finished his homework." },
      { q: 'Choose the correct verb:\n(a) Each of the girls (has/have) a book.\n(b) The class (is/are) writing a test.\n(c) Nobody (know/knows) the answer.\n(d) Mathematics (is/are) my favourite subject.', a: '(a) has  (b) is  (c) knows  (d) is' },
      { q: "Rewrite in the PAST tense: 'Every morning, Jezreel wakes up early, brushes his teeth, eats breakfast and runs to school.'", a: 'Yesterday morning, Jezreel woke up early, brushed his teeth, ate breakfast and ran to school.' },
      { q: "Rewrite in the FUTURE tense: 'Declyn studies hard and passes his exams.'", a: 'Declyn will study hard and pass his exams.' },
      { q: "Identify ONE action verb, ONE state verb and ONE auxiliary verb in this sentence: 'The students have been working hard because they know the exam is coming.'", a: 'Action verb: working. State verb: know. Auxiliary verb: have.' },
      { q: 'Write THREE sentences: (a) One in the simple past (b) One in the simple present (c) One in the simple future. All three must be about school or learning.', a: 'Accept any correctly tensed sentences. E.g.: (a) I studied for the exam. (b) I study every day. (c) I will pass my exams.' },
      { q: "[Challenge] Some verbs change meaning depending on their past tense form. For example 'hang' — 'I hung the picture' vs 'The man was hanged'. Can you find another verb that changes meaning depending on its past tense form?", a: "Examples: LIE → lay (to recline: 'She lay on the bed') vs lied (to be dishonest: 'He lied to me'). FLY → flew (to move through air) vs flied (in baseball: 'He flied out'). WIND → wound (to turn/coil) vs winded (to knock breath out)." },
    ],
  },
  {
    dayNum: 9,
    subject: 'Mathematics',
    topic: 'Fractions: Compare, Order, Add & Subtract',
    standard: 'B7.1.3.1.1–B7.1.3.2.2',
    objectives: [
      'Convert between fractions, decimals and percentages',
      'Compare and order fractions with different denominators',
      'Add and subtract fractions including mixed numbers',
      'Solve word problems involving fractions',
    ],
    concepts: [
      {
        heading: 'Converting Between Fractions, Decimals and Percentages',
        body: 'FRACTION → DECIMAL: divide the top by the bottom.\n3/8 = 3 ÷ 8 = 0.375\n\nDECIMAL → PERCENTAGE: multiply by 100.\n0.375 × 100 = 37.5%\n\nPERCENTAGE → FRACTION: write over 100 and simplify.\n38% = 38/100 = 19/50\n\nBenchmark fractions to memorise:\n1/2 = 0.5 = 50%\n1/4 = 0.25 = 25%\n3/4 = 0.75 = 75%\n1/3 = 0.333... = 33.3%\n1/5 = 0.2 = 20%',
        note: null,
      },
      {
        heading: 'Comparing and Ordering Fractions',
        body: 'Method 1: Convert to decimals and compare.\nMethod 2: Find the LCD (Lowest Common Denominator) and compare numerators.\n\nExample: Which is greater, 7/12 or 8/10?\n7/12 = 0.583... 8/10 = 0.8 → 8/10 is greater.\n\nTo order 5/6, 3/4, 7/8 in descending order:\n5/6 ≈ 0.833, 3/4 = 0.75, 7/8 = 0.875\nOrder: 7/8 > 5/6 > 3/4',
        note: null,
      },
      {
        heading: 'Adding and Subtracting Fractions',
        body: 'STEP 1: Find the LCD (Lowest Common Denominator)\nSTEP 2: Convert each fraction to an equivalent fraction with the LCD\nSTEP 3: Add or subtract the numerators. Keep the denominator.\nSTEP 4: Simplify if possible.\n\nExample: 3/4 + 5/6\nLCD of 4 and 6 = 12\n3/4 = 9/12. 5/6 = 10/12.\n9/12 + 10/12 = 19/12 = 1 7/12\n\nFor MIXED NUMBERS: add/subtract whole numbers first, then fractions.',
        note: 'Always simplify your final answer. If the answer is an improper fraction (top > bottom), convert to a mixed number.',
      },
    ],
    worked: [
      { q: 'Order from least to greatest: 0.832, 3/8, 38%', a: 'Convert all to %: 0.832 = 83.2%, 3/8 = 37.5%, 38% = 38%.\nOrder: 3/8 < 38% < 0.832' },
      { q: 'Add: 2⅖ + 1⅔', a: 'Whole numbers: 2+1=3. Fractions: 2/5+2/3. LCD=15. 6/15+10/15=16/15=1 1/15. Total = 3 + 1 1/15 = 4 1/15.' },
      { q: 'A board is 12¼ feet long. A piece of 3⅓ feet is cut off. How long is the remainder?', a: '12¼ - 3⅓ = 49/4 - 10/3. LCD=12: 147/12 - 40/12 = 107/12 = 8 11/12 feet.' },
    ],
    questions: [
      { q: 'Convert: (a) 3/4 to a decimal and percentage  (b) 0.625 to a fraction in simplest form  (c) 45% to a fraction in simplest form', a: '(a) 0.75 = 75%  (b) 625/1000 = 5/8  (c) 45/100 = 9/20' },
      { q: 'Which is greater: 5/8 or 7/12? Show your working.', a: '5/8 = 0.625. 7/12 = 0.583... 0.625 > 0.583, so 5/8 is greater.' },
      { q: 'Arrange in descending order: 2/3, 5/8, 3/4, 7/12', a: '3/4 (0.75) > 2/3 (0.667) > 5/8 (0.625) > 7/12 (0.583)' },
      { q: 'Add: (a) 3/4 + 5/6  (b) 2/3 + 3/8  (c) 1/2 + 3/7', a: '(a) 19/12 = 1 7/12  (b) 25/24 = 1 1/24  (c) 13/14' },
      { q: 'Subtract: (a) 7/8 - 2/3  (b) 5¼ - 2⅗', a: '(a) 21/24 - 16/24 = 5/24  (b) 5¼ - 2⅗. LCD=20: 105/20 - 52/20 = 53/20 = 2 13/20' },
      { q: 'Add: 3⅓ + 2¾', a: 'Whole: 3+2=5. Fractions: 1/3+3/4. LCD=12: 4/12+9/12=13/12=1 1/12. Total = 5 + 1 1/12 = 6 1/12.' },
      { q: 'The Musa family planned to hike 8⅝ km to a waterfall. After one hour, the waterfall was still 5⅓ km away. How far had they hiked?', a: '8⅝ - 5⅓ = 69/8 - 16/3. LCD=24: 207/24 - 128/24 = 79/24 = 3 7/24 km.' },
      { q: 'Simplify: (a) 24/36  (b) 48/60  (c) 35/49', a: '(a) 2/3  (b) 4/5  (c) 5/7' },
      { q: 'Is 5/9 + 3/9 = 1? Explain.', a: 'No. 5/9 + 3/9 = 8/9 ≠ 1. When denominators are the same, just add the numerators: 5+3=8, denominator stays 9. For it to equal 1, the result would need to be 9/9.' },
      { q: '[Challenge] A farmer used 2/5 of his land for maize and 1/4 for cassava. What fraction of the land remains unused? If the farm is 80 acres, how many acres are unused?', a: 'Used = 2/5 + 1/4. LCD=20: 8/20+5/20=13/20. Unused = 7/20. Unused acres = 7/20 × 80 = 28 acres.' },
    ],
  },
  {
    dayNum: 10,
    subject: 'Science',
    topic: 'Earth Science: The Water Cycle',
    standard: 'B7.2.1.1.1–B7.2.1.1.2',
    objectives: [
      'Explain the stages of the water cycle: evaporation, condensation, precipitation, collection',
      'Describe the importance of the water cycle in nature',
      'Identify how human activities affect the water cycle',
      'Draw and label a simple diagram of the water cycle',
    ],
    concepts: [
      {
        heading: 'What is the Water Cycle?',
        body: 'The water cycle (also called the hydrological cycle) is the continuous movement of water through the environment — from the surface of the earth, into the atmosphere, and back to the earth again. It has no beginning and no end.\n\nThe SUN provides the ENERGY that drives the water cycle.',
        note: "About 97% of Earth's water is in the oceans. Only about 3% is fresh water, and most of that is locked in ice caps.",
      },
      {
        heading: 'The Four Stages of the Water Cycle',
        body: '1. EVAPORATION: The sun heats water in oceans, rivers and lakes. Water turns into water vapour (gas) and rises into the atmosphere. TRANSPIRATION is when plants release water vapour through their leaves.\n\n2. CONDENSATION: As water vapour rises, it cools down and turns back into tiny water droplets, forming CLOUDS.\n\n3. PRECIPITATION: When water droplets in clouds join together and become heavy, they fall back to earth as RAIN, HAIL, SNOW or SLEET.\n\n4. COLLECTION (Run-off): Water collects in oceans, rivers, lakes and underground. Some soaks into the ground (infiltration). Then the cycle begins again.',
        note: 'Evaporation + Transpiration = EVAPOTRANSPIRATION. Both release water vapour into the atmosphere.',
      },
      {
        heading: 'Importance of the Water Cycle',
        body: 'The water cycle is vital because it:\n• Distributes fresh water across the earth — providing rainfall for farming and drinking\n• Regulates the earth\'s temperature — water absorbs heat and cools the atmosphere\n• Supports all life on earth — every organism needs water to survive\n• Purifies water — impurities are left behind when water evaporates\n• Recharges underground water sources (aquifers) used for boreholes and wells',
        note: 'Deforestation reduces transpiration and disrupts local rainfall patterns — this is why cutting too many trees reduces rain in Ghana.',
      },
    ],
    worked: [
      { q: 'Explain in your own words what happens during CONDENSATION in the water cycle.', a: 'Condensation occurs when water vapour (gas) in the atmosphere rises to higher altitudes where the temperature is cooler. The cool temperature causes the vapour to lose energy and change back into tiny liquid water droplets. These droplets cluster together around dust particles to form clouds.' },
      { q: 'How does the water cycle help to purify water?', a: 'When water evaporates, only the pure water molecules turn into vapour — salts, minerals and most impurities are left behind. The water vapour that rises into the atmosphere is therefore purer than the ocean water it came from. When it condenses and falls as rain, it is relatively clean fresh water.' },
      { q: 'Why does cutting down forests (deforestation) reduce rainfall in an area?', a: 'Trees contribute to the water cycle through transpiration — releasing water vapour from their leaves. This water vapour forms clouds and eventually falls as rain. When forests are cut down, there are fewer trees to transpire, so less water vapour enters the atmosphere, leading to reduced cloud formation and rainfall.' },
    ],
    questions: [
      { q: 'List and briefly explain the FOUR stages of the water cycle.', a: '1. Evaporation: sun heats water, turns to vapour, rises into atmosphere.\n2. Condensation: vapour cools, forms water droplets, making clouds.\n3. Precipitation: droplets become heavy, fall as rain/hail/snow.\n4. Collection: water collects in oceans, rivers, underground.' },
      { q: 'What is the difference between evaporation and transpiration?', a: 'Evaporation: water turning to vapour from any water surface (oceans, rivers, soil). Transpiration: water vapour specifically released through the leaves and stems of PLANTS. Together they are called evapotranspiration.' },
      { q: 'What energy source drives the water cycle?', a: 'The SUN (solar energy) provides the heat that powers evaporation, which drives the entire water cycle.' },
      { q: 'What is precipitation? Give THREE forms of precipitation.', a: 'Precipitation is water falling from clouds back to earth. Three forms: rain, hail, snow. (Also accept sleet.)' },
      { q: 'Give TWO ways the water cycle is important to farmers in Ghana.', a: 'Any two: rainfall waters crops (reducing irrigation needed); water cycle determines wet seasons which farmers plan around; recharges rivers and wells used for irrigation; provides drinking water for livestock.' },
      { q: 'A drought occurs when an area receives very little or no rain for a long time. Using your knowledge of the water cycle, explain ONE reason why droughts can occur.', a: 'When there is less evaporation and transpiration (e.g. due to deforestation or cooler temperatures), less water vapour rises into the atmosphere. This means less condensation occurs, fewer clouds form, and therefore less precipitation falls. The result is drought.' },
      { q: 'What is infiltration? Why is it important?', a: 'Infiltration is the process where rainwater soaks into the ground through the soil. It is important because it recharges underground water sources (aquifers) that feed boreholes and wells, and provides moisture for plant root systems.' },
      { q: 'Draw a simple diagram of the water cycle and label: Sun, Evaporation, Condensation, Cloud, Precipitation, River/Ocean, Run-off. (Draw on your paper.)', a: 'Diagram should show a cycle: Ocean/River (collection) → Evaporation (arrows rising) → Cloud (condensation) → Precipitation (arrows falling) → back to Ocean/River. Sun labelled as energy source. Run-off shown as water flowing back to ocean.' },
      { q: 'How does the water cycle help regulate the Earth\'s temperature?', a: 'Evaporation absorbs heat from the surface (cooling oceans and land — same principle as sweating). Condensation releases that stored heat back into the atmosphere (warming surrounding air). This constant exchange prevents extreme temperature differences between equatorial and polar regions.' },
      { q: "[Challenge] The water on Earth today is the same water that existed millions of years ago. The water cycle constantly recycles it. What does this tell you about the importance of NOT polluting water sources?", a: 'Since water is continuously recycled through the water cycle, any pollution we add today does not disappear — it re-enters the cycle and eventually becomes the water we drink, cook with and bathe in. Polluting rivers and oceans means future generations will drink that same polluted water. This is why protecting water sources is a responsibility we all share.' },
    ],
  },
]

async function seedPacks() {
  console.log('🌱 Seeding pack content for Days 1–10...\n')
  const batch = db.batch()

  for (const pack of PACKS) {
    const docId = `${STUDENT_ID}_day${pack.dayNum}`
    const ref = db.collection('packs').doc(docId)
    batch.set(ref, {
      studentId: STUDENT_ID,
      dayNum: pack.dayNum,
      subject: pack.subject,
      topic: pack.topic,
      standard: pack.standard,
      objectives: pack.objectives,
      concepts: pack.concepts,
      worked: pack.worked,
      questions: pack.questions,
      answerKey: pack.questions.map(q => q.a),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    console.log(`✅ Day ${pack.dayNum} — ${pack.subject}: ${pack.topic} (${pack.questions.length} questions)`)
  }

  await batch.commit()
  console.log('\n✅ All Days 1–10 packs seeded successfully!')
  console.log('Jezreel can now click any day (1–20) and see full content.')
  process.exit(0)
}

seedPacks().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
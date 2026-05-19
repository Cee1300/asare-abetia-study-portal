// scripts/seed-packs-declyn.js
// Seeds Declyn Days 1–10 pack content into Firestore
// Run: node scripts/seed-packs-declyn.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const STUDENT_ID = 'declyn'

const PACKS = [
  {
    dayNum: 1, subject: 'Mathematics',
    topic: 'Numbers to 1,000,000: Place Value, Reading & Ordering',
    standard: 'B5.1.1.1',
    objectives: [
      'Read and write numbers up to 1,000,000 in figures and words',
      'Identify the value of each digit using a place value chart',
      'Compare and order large numbers using >, < and =',
      'Round numbers to the nearest 10, 100, 1,000 and 10,000',
    ],
    concepts: [
      {
        heading: 'Place Value up to 1,000,000',
        body: 'Every digit in a number has a value based on its POSITION.\nColumns from right to left:\nUnits | Tens | Hundreds | Thousands | Ten Thousands | Hundred Thousands | Millions\n\nExample: 725,463\n7 → Hundred Thousands (700,000)\n2 → Ten Thousands (20,000)\n5 → Thousands (5,000)\n4 → Hundreds (400)\n6 → Tens (60)\n3 → Units (3)\n\nIn words: Seven hundred and twenty-five thousand, four hundred and sixty-three.',
        note: 'A million = 1,000,000. It has SIX zeros.',
      },
      {
        heading: 'Rounding Large Numbers',
        body: 'Look at the digit immediately to the RIGHT of the place you are rounding to.\n• If it is 5 or more → round UP\n• If it is 4 or less → round DOWN (keep the digit the same)\n\nExample: Round 348,726 to the nearest thousand.\nLook at hundreds digit: 7 (≥5) → round up.\nAnswer: 349,000\n\nExample: Round 348,726 to the nearest ten thousand.\nLook at thousands digit: 8 (≥5) → round up.\nAnswer: 350,000',
        note: null,
      },
    ],
    worked: [
      { q: 'Write 483,057 in words.', a: 'Four hundred and eighty-three thousand and fifty-seven.' },
      { q: 'What is the value of the digit 6 in 364,819?', a: '6 is in the ten-thousands place. Value = 60,000 (sixty thousand).' },
      { q: 'Round 527,364 to (a) the nearest thousand (b) the nearest hundred thousand.', a: '(a) Hundreds digit = 3 (<5) → round down: 527,000. (b) Ten-thousands digit = 2 (<5) → round down: 500,000.' },
    ],
    questions: [
      { q: 'Write the value of the underlined digit: (a) 4[5]2,831  (b) 6[0]7,140  (c) 83[9],250', a: '(a) 50,000 (ten thousands)  (b) 0 (ten thousands — zero value)  (c) 9,000 (thousands)' },
      { q: 'Write in words: (a) 204,500  (b) 750,030  (c) 1,000,000', a: '(a) Two hundred and four thousand, five hundred.\n(b) Seven hundred and fifty thousand and thirty.\n(c) One million.' },
      { q: 'Write in figures: (a) Three hundred and sixty thousand, two hundred and nine  (b) Eight hundred thousand and fifty', a: '(a) 360,209  (b) 800,050' },
      { q: 'Compare using > or <: (a) 457,832 ___ 475,238  (b) 900,000 ___ 899,999', a: '(a) 457,832 < 475,238  (b) 900,000 > 899,999' },
      { q: 'Arrange in descending order: 306,450; 360,045; 306,504; 360,405', a: '360,405 > 360,045 > 306,504 > 306,450' },
      { q: 'Round 638,742 to the nearest: (a) ten  (b) hundred  (c) thousand  (d) ten thousand', a: '(a) 638,740  (b) 638,700  (c) 639,000  (d) 640,000' },
      { q: 'A district has 284,675 people. Round this to the nearest thousand for a report.', a: '285,000' },
      { q: 'What number is 10,000 more than 467,850?', a: '477,850' },
      { q: 'What number is 100,000 less than 800,000?', a: '700,000' },
      { q: '[Challenge] I am a 6-digit number. My hundred-thousands digit is 3 more than my units digit. My units digit is 2. My tens digit equals my thousands digit. My hundreds digit is 0. My ten-thousands digit is 5. What number am I?', a: 'Hundreds=0, Tens=x, Units=2, Thousands=x, Ten-thousands=5, Hundred-thousands=5. Tens=Thousands. Let tens=t. Hundred-thousands=2+3=5. So: 5, 5, t, 0, t, 2. Answer: 550,032 (if t=0) or 551,012... Working: H-thou=5, T-thou=5, Thou=t, Hund=0, Tens=t, Units=2. If tens=thousands=3: 553,032. Accept 550,032.' },
    ],
  },
  {
    dayNum: 2, subject: 'Science',
    topic: 'Living Things: Classification by Characteristics',
    standard: 'B5.1.1.1',
    objectives: [
      'Group living things into plants and animals using their characteristics',
      'Identify the characteristics used to classify vertebrates and invertebrates',
      'Give examples of each group of vertebrates',
      'Explain why classification of living things is important',
    ],
    concepts: [
      {
        heading: 'Classifying Living Things',
        body: 'Scientists sort living things into groups based on SHARED CHARACTERISTICS. This is called CLASSIFICATION.\n\nAll living things are first divided into:\n• PLANTS: make their own food, usually have roots/stem/leaves\n• ANIMALS: cannot make their own food, most can move\n\nAnimals are further divided into:\nVERTEBRATES: animals WITH a backbone\nINVERTEBRATES: animals WITHOUT a backbone\n\nAbout 97% of all animal species are INVERTEBRATES (insects, worms, crabs, snails, jellyfish). Only about 3% are vertebrates.',
        note: 'A backbone = vertebral column = spine. Feel the bones down the centre of your back — that is YOUR backbone.',
      },
      {
        heading: 'The Five Groups of Vertebrates',
        body: 'FISH: live in water, breathe through GILLS, cold-blooded, scaly skin, lay eggs in water.\nExamples: tilapia, shark, catfish, sardine.\n\nAMPHIBIANS: live in water AND on land, breathe through skin and lungs, cold-blooded, moist skin, lay eggs in water.\nExamples: frog, toad, salamander.\n\nREPTILES: live on land (mostly), breathe through lungs, cold-blooded, dry scaly skin, lay eggs on land.\nExamples: crocodile, lizard, snake, tortoise.\n\nBIRDS: warm-blooded, have feathers and wings, breathe through lungs, lay eggs.\nExamples: eagle, parrot, weaver bird, ostrich.\n\nMAMMALS: warm-blooded, have hair/fur, breathe through lungs, give birth to live young (mostly), feed young with milk.\nExamples: dog, elephant, whale, bat, human being.',
        note: 'WARM-BLOODED: body temperature stays constant (birds and mammals). COLD-BLOODED: body temperature changes with environment (fish, amphibians, reptiles).',
      },
    ],
    worked: [
      { q: 'Classify each animal and name its group: (a) crocodile (b) tilapia (c) bat (d) frog (e) eagle', a: '(a) Reptile  (b) Fish  (c) Mammal  (d) Amphibian  (e) Bird' },
      { q: 'Give TWO differences between a fish and a mammal.', a: '1. A fish breathes through GILLS; a mammal breathes through LUNGS.\n2. A fish is cold-blooded; a mammal is warm-blooded.\n(Also: fish lay eggs in water; most mammals give birth to live young.)' },
      { q: 'Why is a whale classified as a mammal and not a fish, even though it lives in water?', a: 'A whale: (1) breathes through lungs (surfaces for air), (2) is warm-blooded, (3) gives birth to live young, (4) feeds young with milk. These are mammal characteristics. Fish breathe through gills, are cold-blooded and lay eggs.' },
    ],
    questions: [
      { q: 'What is classification? Why is it important in science?', a: 'Classification is the process of sorting living things into groups based on shared characteristics. It is important because it helps scientists study, identify and communicate about living things clearly and systematically.' },
      { q: 'Name the FIVE groups of vertebrates and give TWO examples of each.', a: 'Fish: tilapia, sardine. Amphibians: frog, toad. Reptiles: crocodile, lizard. Birds: eagle, parrot. Mammals: dog, elephant.' },
      { q: 'What is the difference between a vertebrate and an invertebrate? Give TWO examples of each.', a: 'Vertebrate: has a backbone. Examples: fish, frog. Invertebrate: has no backbone. Examples: insect, earthworm.' },
      { q: 'What does COLD-BLOODED mean? Which three vertebrate groups are cold-blooded?', a: 'Cold-blooded means the body temperature changes with the surrounding environment. Three groups: Fish, Amphibians and Reptiles.' },
      { q: 'Why can a frog live both in water and on land? What special features allow this?', a: 'Frogs can live in both habitats because they breathe through both their moist skin (in water) and their lungs (on land). They also lay eggs in water but live on land as adults.' },
      { q: 'Sort these into VERTEBRATES and INVERTEBRATES:\nearthworm, tilapia, butterfly, crocodile, snail, parrot, crab, human being, grasshopper, whale', a: 'Vertebrates: tilapia, crocodile, parrot, human being, whale.\nInvertebrates: earthworm, butterfly, snail, crab, grasshopper.' },
      { q: 'A scientist finds a new animal. It has scales, lives on land, breathes through lungs and lays eggs. To which vertebrate group does it belong?', a: 'REPTILE — dry scaly skin, lives on land, breathes through lungs, lays eggs on land.' },
      { q: 'Name THREE invertebrates you can find in a typical Ghanaian school compound.', a: 'Any three: ants, beetles, grasshoppers, butterflies, earthworms, spiders, snails, millipedes, cockroaches.' },
      { q: 'What are THREE characteristics that ALL mammals share?', a: 'Any three: warm-blooded, have hair or fur, breathe through lungs, give birth to live young (mostly), feed young with milk.' },
      { q: '[Challenge] A platypus is an unusual mammal. It lays eggs but also feeds its young with milk. Why is the platypus still classified as a mammal despite laying eggs?', a: 'The platypus is classified as a mammal because it shares MORE mammal characteristics than non-mammal ones: it is warm-blooded, has fur, breathes through lungs and feeds its young with milk. Classification is based on the OVERALL set of characteristics, not just one. Egg-laying is an exception, not enough to reclassify it.' },
    ],
  },
  {
    dayNum: 3, subject: 'Mathematics',
    topic: 'Multiply & Divide Large Numbers: Mental & Written Methods',
    standard: 'B5.1.2.1',
    objectives: [
      'Multiply and divide whole numbers by 10, 100 and 1,000 mentally',
      'Multiply a 3-digit number by a 2-digit number using long multiplication',
      'Divide a 3- or 4-digit number by a 1- or 2-digit number',
      'Solve word problems involving multiplication and division',
    ],
    concepts: [
      {
        heading: 'Multiplying & Dividing by Powers of 10',
        body: '× 10: add one zero (or shift decimal one place right)\n× 100: add two zeros\n× 1,000: add three zeros\n÷ 10: remove one zero (or shift decimal one place left)\n÷ 100: remove two zeros\n÷ 1,000: remove three zeros\n\nExamples:\n347 × 100 = 34,700\n82,000 ÷ 1,000 = 82\n56 × 1,000 = 56,000',
        note: null,
      },
      {
        heading: 'Long Multiplication (3-digit × 2-digit)',
        body: 'Example: 347 × 26\n\nStep 1: Multiply 347 × 6 (units):\n6×7=42 (write 2, carry 4)\n6×4=24+4=28 (write 8, carry 2)\n6×3=18+2=20\nResult: 2,082\n\nStep 2: Multiply 347 × 20 (tens — put a zero first):\n347 × 2 = 694, so 347 × 20 = 6,940\n\nStep 3: Add: 2,082 + 6,940 = 9,022',
        note: 'Always write a zero placeholder before multiplying by the tens digit.',
      },
    ],
    worked: [
      { q: 'Calculate mentally: (a) 485 × 1,000  (b) 720,000 ÷ 100  (c) 36 × 100', a: '(a) 485,000  (b) 7,200  (c) 3,600' },
      { q: 'Find: 268 × 34', a: '268 × 4 = 1,072. 268 × 30 = 8,040. 1,072 + 8,040 = 9,112.' },
      { q: 'A school orders 24 boxes of exercise books. Each box contains 144 books. How many books in total?', a: '144 × 24: 144×4=576. 144×20=2,880. 576+2,880 = 3,456 books.' },
    ],
    questions: [
      { q: 'Calculate mentally: (a) 67 × 1,000  (b) 4,500 ÷ 100  (c) 830 × 10  (d) 56,000 ÷ 1,000', a: '(a) 67,000  (b) 45  (c) 8,300  (d) 56' },
      { q: 'Multiply: (a) 326 × 14  (b) 418 × 23  (c) 507 × 32', a: '(a) 4,564  (b) 9,614  (c) 16,224' },
      { q: 'Divide: (a) 648 ÷ 6  (b) 952 ÷ 7  (c) 1,248 ÷ 8', a: '(a) 108  (b) 136  (c) 156' },
      { q: 'A lorry carries 48 bags of cement per trip. How many bags will it carry in 35 trips?', a: '48 × 35 = 1,680 bags' },
      { q: 'GH₵5,376 is shared equally among 8 workers. How much does each worker receive?', a: '5,376 ÷ 8 = GH₵672' },
      { q: 'A factory produces 365 items per day. How many items does it produce in 28 days?', a: '365 × 28 = 10,220 items' },
      { q: 'Find the missing number: (a) ___ × 100 = 47,000  (b) 8,100 ÷ ___ = 900', a: '(a) 470  (b) 9' },
      { q: 'A stadium seats 45,000 people. For a match, 28 buses each carrying 42 people arrive. How many seats are empty?', a: '28 × 42 = 1,176 people. 45,000 - 1,176 = 43,824 empty seats.' },
      { q: 'How many groups of 15 can be made from 2,340? How many are left over?', a: '2,340 ÷ 15 = 156 groups, remainder 0.' },
      { q: '[Challenge] A cocoa farmer sells bags of cocoa. Each bag weighs 64 kg. He sold 125 bags and received GH₵72,000 in total. What was the price per kilogram of cocoa?', a: 'Total weight = 125 × 64 = 8,000 kg. Price per kg = 72,000 ÷ 8,000 = GH₵9 per kg.' },
    ],
  },
  {
    dayNum: 4, subject: 'English',
    topic: 'Oral Language: Communication, Discussions & Presentations',
    standard: 'B5.1.1.1',
    objectives: [
      'Communicate clearly and confidently in formal and informal settings',
      'Participate effectively in discussions — ask questions and support ideas with reasons',
      'Make a short oral presentation on a familiar topic',
      'Use appropriate verbal and non-verbal cues during communication',
    ],
    concepts: [
      {
        heading: 'Effective Communication',
        body: 'Good communication involves SPEAKING, LISTENING and RESPONDING.\n\nWhen speaking:\n• Speak clearly at an appropriate pace\n• Choose the right REGISTER: formal (teacher, headmaster) or informal (friends)\n• Support your ideas with REASONS: "I think... because..."\n• Use TOPIC SENTENCES to introduce your main point\n\nWhen listening:\n• Give the speaker your full attention\n• Do not interrupt — wait for the speaker to finish\n• Show understanding: nod, make eye contact, say "I see"\n• Ask follow-up questions: "Could you explain what you mean by...?"',
        note: 'Non-verbal cues are just as important as words: eye contact shows confidence; crossed arms can signal disagreement; a smile shows openness.',
      },
      {
        heading: 'Giving a Short Presentation',
        body: 'A good presentation has THREE parts:\n\n1. INTRODUCTION: tell your audience what you will talk about.\n"Today I am going to talk about..."\n\n2. BODY: present your main points with reasons and examples.\nUse connectives: "First... Secondly... Also... Furthermore... Finally..."\n\n3. CONCLUSION: summarise your main points and close.\n"In summary... / To conclude..."\n\nTips for delivery:\n• Stand straight and make eye contact with your audience\n• Speak loudly enough to be heard\n• Do not read from your paper — speak naturally',
        note: null,
      },
    ],
    worked: [
      { q: 'Identify ONE example of good communication and ONE weakness in this extract:\n"Ama: I think we should plant more trees in our school. Trees give us shade and make the environment beautiful.\nKofi: No, that\'s wrong. We don\'t need trees.\nAma: Why do you feel that way, Kofi? Can you explain your reasons?"', a: 'Good: Ama supports her idea with reasons and asks a follow-up question respectfully.\nWeakness: Kofi disagrees rudely without giving any reasons. He should have said: "I understand your point, but I think..." and explained his reasoning.' },
      { q: 'Write an INTRODUCTION for a short presentation: "Why Science is Important in Daily Life"', a: '"Good morning everyone. Today I am going to talk about why science is important in our daily lives. Many people think science is only for laboratories, but the truth is that science affects everything we do — from the food we eat and the medicines we take, to the phones we use. By the end of my presentation, I hope you will agree that science is not just a subject — it is a way of understanding the world."' },
    ],
    questions: [
      { q: "Ama says to her teacher: 'Hey, I don't get this.' Rewrite her statement formally, as she should speak to a teacher.", a: '"Please sir/madam, I do not understand this. Could you please explain it again?"' },
      { q: 'Give THREE things a good listener does during a conversation or discussion.', a: 'Any three: maintains eye contact; does not interrupt; nods or says "yes/I see"; waits for speaker to finish; asks relevant follow-up questions.' },
      { q: 'What is the difference between FORMAL and INFORMAL communication? Give ONE example of each.', a: 'Formal: used with teachers, officials, strangers — polite, structured, no slang. Example: "Good morning, sir. I would like to request permission to leave early."\nInformal: used with friends and family — casual, relaxed. Example: "Hey! Can I leave early?"' },
      { q: 'Write a 3-part mini-presentation outline on the topic: "The Importance of Clean Water". Include: Introduction, TWO main points, and a Conclusion.', a: 'Introduction: "Good morning. Today I will talk about why clean water is essential to our lives."\nMain point 1: Clean water is necessary for drinking, cooking and hygiene — without it, diseases like cholera spread.\nMain point 2: Farmers need clean water for irrigation — dirty water damages crops and harms livestock.\nConclusion: "In summary, clean water is vital for health and food production. We must all protect our water sources."' },
      { q: "Your class is debating: 'Boys and girls should play the same sports.' Write TWO arguments FOR and TWO arguments AGAINST.", a: 'FOR: 1. Mixed sports promote equality and respect between boys and girls. 2. Playing together develops the same fitness and teamwork skills.\nAGAINST: 1. Physical differences in strength and body size may make some contact sports unsafe. 2. Some students may feel less confident competing against the opposite gender.' },
      { q: 'Give the correct greeting or expression for each situation:\n(a) Your friend\'s parent has just died.\n(b) Your teacher has just won an award.\n(c) You see your headmaster at 3pm.\n(d) A new student joins your class.', a: '(a) "We are deeply sorry for your loss. Please accept our condolences."\n(b) "Congratulations, sir/madam! You truly deserve it."\n(c) "Good afternoon, sir/madam."\n(d) "Welcome! We are very happy to have you in our class."' },
      { q: 'A student gives a presentation but reads directly from his notes without looking up. Give THREE specific ways he could improve his delivery.', a: '1. Practise enough to speak without reading — use keywords on cards instead of full sentences.\n2. Look up and make eye contact with the audience regularly.\n3. Speak naturally and explain in his own words rather than reading word for word.' },
      { q: "Write a 5-sentence paragraph presenting your opinion on: 'Students should use mobile phones in school.' Use: 'In my opinion... because... Furthermore... However... In conclusion...'", a: 'In my opinion, students should not use mobile phones in school because they cause distraction during lessons. Furthermore, they may be used to cheat during exams. However, they can be useful for research and learning when supervised. In conclusion, phones should only be allowed in school under strict teacher supervision.' },
      { q: 'What are non-verbal cues? Give THREE examples and explain what each communicates.', a: 'Non-verbal cues are body language signals used during communication.\n1. Eye contact — shows confidence and attention.\n2. Crossed arms — can signal disagreement or defensiveness.\n3. A smile — shows openness, friendliness and agreement.' },
      { q: '[Challenge] "The ability to communicate well is more important than academic knowledge." Do you agree or disagree? Write a balanced argument in 5–6 sentences, then state your personal conclusion.', a: 'Accept any well-reasoned balanced argument. FOR: communication opens doors to opportunities, builds relationships and conveys knowledge. AGAINST: academic knowledge provides the substance that communication carries — without it, there is nothing meaningful to say. BALANCED conclusion: both are important and reinforce each other.' },
    ],
  },
  {
    dayNum: 5, subject: 'Mathematics',
    topic: 'Fractions: Equivalence, Comparing & Ordering',
    standard: 'B5.1.3.1',
    objectives: [
      'Find equivalent fractions by multiplying or dividing numerator and denominator',
      'Simplify fractions to their lowest terms using the HCF',
      'Compare and order fractions with different denominators using the LCD',
      'Convert between improper fractions and mixed numbers',
    ],
    concepts: [
      {
        heading: 'Equivalent Fractions & Simplifying',
        body: 'EQUIVALENT FRACTIONS represent the same amount.\nTo find equivalent fractions: multiply OR divide both numerator and denominator by the SAME number.\n\nExample: 2/3 = 4/6 = 8/12 = 10/15\n\nTo SIMPLIFY: divide both numerator and denominator by their HCF.\nExample: Simplify 24/36.\nHCF of 24 and 36 = 12.\n24 ÷ 12 = 2. 36 ÷ 12 = 3.\nAnswer: 2/3',
        note: 'A fraction is in its SIMPLEST FORM (lowest terms) when the HCF of numerator and denominator is 1.',
      },
      {
        heading: 'Comparing, Ordering & Mixed Numbers',
        body: 'To COMPARE fractions: find the LCD and compare numerators.\nExample: Which is greater, 3/4 or 5/7?\nLCD = 28. 3/4 = 21/28. 5/7 = 20/28.\n21 > 20, so 3/4 > 5/7.\n\nIMPROPER FRACTION: numerator > denominator (e.g. 11/4)\nMIXED NUMBER: whole number + fraction (e.g. 2¾)\n\nConvert improper to mixed: 11/4 → 11 ÷ 4 = 2 remainder 3 → 2¾\nConvert mixed to improper: 2¾ → (2×4) + 3 = 11 → 11/4',
        note: null,
      },
    ],
    worked: [
      { q: 'Find three fractions equivalent to 2/5.', a: '2/5 = 4/10 = 6/15 = 8/20' },
      { q: 'Simplify 36/48 to its lowest terms.', a: 'HCF of 36 and 48 = 12. 36÷12=3. 48÷12=4. Answer: 3/4.' },
      { q: 'Convert 19/5 to a mixed number and 3⅔ to an improper fraction.', a: '19/5: 19÷5=3 remainder 4 → 3⅘. 3⅔: (3×3)+2=11 → 11/3.' },
    ],
    questions: [
      { q: 'Complete the equivalent fractions: (a) 3/4 = ___/20  (b) 5/6 = 25/___  (c) ___/9 = 24/36', a: '(a) 15  (b) 30  (c) 6' },
      { q: 'Simplify to lowest terms: (a) 16/24  (b) 30/45  (c) 56/72', a: '(a) 2/3  (b) 2/3  (c) 7/9' },
      { q: 'Compare using > or <: (a) 3/5 ___ 4/7  (b) 5/8 ___ 7/12', a: '(a) 3/5 > 4/7 (21/35 > 20/35)  (b) 5/8 > 7/12 (15/24 > 14/24)' },
      { q: 'Arrange in ascending order: 2/3, 5/8, 3/4, 7/12', a: '7/12 < 5/8 < 2/3 < 3/4\n(0.583 < 0.625 < 0.667 < 0.75)' },
      { q: 'Convert to mixed numbers: (a) 17/5  (b) 23/8  (c) 31/6', a: '(a) 3⅖  (b) 2⅞  (c) 5⅙' },
      { q: 'Convert to improper fractions: (a) 4⅓  (b) 3⅝  (c) 5¾', a: '(a) 13/3  (b) 29/8  (c) 23/4' },
      { q: 'Which is greater: 4/5 or 7/9? Show your working.', a: 'LCD=45. 4/5=36/45. 7/9=35/45. 36>35 so 4/5 > 7/9.' },
      { q: 'A recipe uses 3/4 cup of sugar. If you want to make half the recipe, how much sugar do you need?', a: '½ × 3/4 = 3/8 cup of sugar.' },
      { q: 'Is 15/20 equivalent to 9/12? Prove it.', a: '15/20 simplified: HCF=5, 15÷5=3, 20÷5=4 → 3/4.\n9/12 simplified: HCF=3, 9÷3=3, 12÷3=4 → 3/4.\nBoth equal 3/4 — YES they are equivalent.' },
      { q: '[Challenge] Arrange from least to greatest: 5/6, 2/3, 7/9, 11/18', a: 'LCD=18: 5/6=15/18, 2/3=12/18, 7/9=14/18, 11/18.\nAscending: 11/18 < 12/18 < 14/18 < 15/18 → 11/18 < 2/3 < 7/9 < 5/6.' },
    ],
  },
  {
    dayNum: 6, subject: 'Science',
    topic: 'Materials & Mixtures: Properties and Separation Techniques',
    standard: 'B5.1.2.1',
    objectives: [
      'Identify the properties of materials and explain why each material is used for a specific purpose',
      'Describe the difference between a pure substance and a mixture',
      'Explain methods of separating mixtures: filtering, evaporation, distillation, sieving, magnetic separation',
      'Give real-life examples of each separation technique',
    ],
    concepts: [
      {
        heading: 'Pure Substances vs Mixtures',
        body: 'A PURE SUBSTANCE contains only ONE type of particle.\nExamples: pure water, pure gold, pure salt, pure oxygen.\n\nA MIXTURE contains TWO or more substances mixed together but NOT chemically joined — they keep their own properties.\nExamples: salt water, sand and water, air, soil, blood.\n\nTypes of mixtures:\n• Solid-Solid: sand and iron filings\n• Solid-Liquid: sand and water, salt and water\n• Liquid-Liquid: oil and water\n• Gas-Gas: air (nitrogen, oxygen, carbon dioxide)',
        note: 'Unlike a COMPOUND, in a mixture the substances can be separated by physical means.',
      },
      {
        heading: 'Separation Techniques',
        body: 'FILTERING: separates an INSOLUBLE solid from a liquid.\nExample: sand and water — filter paper holds sand; water passes through.\n\nEVAPORATION: separates a SOLUBLE solid from a liquid by heating.\nExample: salt water — water evaporates; salt crystals remain.\n\nSIEVING: separates solid particles of different SIZES.\nExample: separating gravel from sand.\n\nMAGNETIC SEPARATION: separates MAGNETIC materials from non-magnetic ones.\nExample: iron filings from sand using a magnet.\n\nDISTILLATION: separates a liquid from a dissolved solid by boiling and condensing.\nExample: getting pure water from salt water.\n\nWINNOWING: separates by blowing air.\nExample: separating chaff from grain.',
        note: 'The choice of method depends on the PROPERTIES of the substances in the mixture.',
      },
    ],
    worked: [
      { q: 'Which separation method for each? (a) Sand and water  (b) Iron filings and sawdust  (c) Salt dissolved in water', a: '(a) FILTERING — sand is insoluble, filter holds sand while water passes through.\n(b) MAGNETIC SEPARATION — iron filings are magnetic; magnet attracts them, sawdust stays.\n(c) EVAPORATION — heat causes water to evaporate; salt crystals remain.' },
      { q: 'Is air a pure substance or a mixture? Explain.', a: 'Air is a MIXTURE. It contains several gases: ~78% nitrogen, ~21% oxygen, ~0.9% argon and traces of carbon dioxide. These are not chemically combined — they retain their own properties and can be separated.' },
      { q: 'Describe how you would separate a mixture of gravel, sand and salt water.', a: 'Step 1: SIEVING — separate gravel (too large to pass through sieve) from sand-saltwater.\nStep 2: FILTERING — filter sand-saltwater; sand stays in filter paper, saltwater passes through.\nStep 3: EVAPORATION — heat saltwater; water evaporates, salt crystals remain.' },
    ],
    questions: [
      { q: 'What is the difference between a pure substance and a mixture? Give ONE example of each.', a: 'Pure substance: contains only one type of particle. Example: pure water.\nMixture: contains two or more substances not chemically joined. Example: salt water.' },
      { q: 'Name FOUR types of mixtures and give ONE example of each.', a: 'Solid-solid: sand and iron filings. Solid-liquid: sand and water. Liquid-liquid: oil and water. Gas-gas: air.' },
      { q: 'Name the separation technique used:\n(a) A cook strains cooked rice to remove water.\n(b) A farmer blows air over threshed grain to remove chaff.\n(c) A scientist obtains pure water from sea water.\n(d) A child separates iron nails from sand.', a: '(a) Filtering  (b) Winnowing  (c) Distillation  (d) Magnetic separation' },
      { q: 'Why is filtering used to separate sand from water but NOT to separate salt from water?', a: 'Sand is INSOLUBLE — it does not dissolve in water, so it is held back by filter paper while water passes through. Salt is SOLUBLE — it dissolves completely in water and passes through the filter paper with the water.' },
      { q: 'Describe step by step how you would obtain pure salt from a mixture of salt, sand and water.', a: 'Step 1: FILTER the mixture — sand is trapped in filter paper; salt water passes through.\nStep 2: EVAPORATE the salt water — heat until water evaporates; pure salt crystals remain.' },
      { q: 'Name THREE properties of materials that determine which separation technique is used.', a: 'Any three: solubility (dissolves or not), magnetism (magnetic or not), particle size, density, boiling point.' },
      { q: 'Give ONE real-life application of each: (a) filtering  (b) evaporation  (c) magnetic separation', a: '(a) Filtering: water treatment plants filter dirty water. (b) Evaporation: salt harvested from sea water. (c) Magnetic separation: separating iron from scrap metal in recycling.' },
      { q: 'Is blood a pure substance or a mixture? Give evidence.', a: 'Blood is a MIXTURE. It contains red blood cells, white blood cells, platelets and plasma — multiple different substances that can be separated (e.g. by centrifuging). Each component retains its own properties.' },
      { q: 'Why is oil and water NOT a solution?', a: 'A solution forms when a solute dissolves completely in a solvent. Oil does not dissolve in water — it separates into a distinct layer. This is because water is polar (charged) and oil is non-polar. They cannot mix to form a homogeneous solution.' },
      { q: '[Challenge] A student claims distillation is just a more advanced form of evaporation. Is she correct? Explain the similarities and key differences.', a: 'PARTIALLY correct. Similarities: both involve heating a liquid until it evaporates. Key difference: evaporation lets the vapour escape into the air (e.g. drying salt). Distillation COLLECTS the vapour — it is cooled and condensed back into a liquid, allowing BOTH the liquid AND the dissolved substance to be recovered separately. Distillation can purify water; evaporation cannot recover the water.' },
    ],
  },
  {
    dayNum: 7, subject: 'Mathematics',
    topic: 'Fractions: Add, Subtract, Multiply & Divide',
    standard: 'B5.1.3.2',
    objectives: [
      'Add and subtract fractions with different denominators including mixed numbers',
      'Multiply fractions and find fractions of quantities',
      'Divide fractions using the reciprocal method',
      'Solve word problems involving all four operations with fractions',
    ],
    concepts: [
      {
        heading: 'Adding & Subtracting Fractions',
        body: 'Step 1: Find the LCD.\nStep 2: Convert to equivalent fractions.\nStep 3: Add or subtract numerators.\nStep 4: Simplify.\n\nExample: 3/4 + 5/6\nLCD = 12. 3/4 = 9/12. 5/6 = 10/12.\n9/12 + 10/12 = 19/12 = 1 7/12\n\nFor mixed numbers: add/subtract whole parts, then fractions.\nExample: 4⅔ - 2¾\nConvert: 14/3 - 11/4. LCD=12.\n56/12 - 33/12 = 23/12 = 1 11/12',
        note: null,
      },
      {
        heading: 'Multiplying & Dividing Fractions',
        body: "MULTIPLYING: multiply numerators together and denominators together.\nExample: 2/3 × 4/5 = 8/15\nSimplify BEFORE multiplying where possible (cross-cancelling).\n\nDIVIDING: Keep the first fraction. Change ÷ to ×. Flip the second fraction.\nExample: 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1⅞\n\nFinding a fraction OF a quantity:\n2/5 of 80 = 2/5 × 80 = 32",
        note: "'OF' means MULTIPLY. Always simplify your final answer.",
      },
    ],
    worked: [
      { q: 'Add: 2⅖ + 1⅔', a: 'Whole: 2+1=3. Fractions: 2/5+2/3. LCD=15: 6/15+10/15=16/15=1 1/15. Total=4 1/15.' },
      { q: 'Multiply: 3/8 × 4/9', a: 'Cross-cancel: 3/8 × 4/9 → divide 3&9 by 3, divide 4&8 by 4: 1/2 × 1/3 = 1/6.' },
      { q: 'A farmer has 6¾ acres of land. He uses ⅔ of it for maize. How many acres is that?', a: '⅔ of 6¾ = ⅔ × 27/4 = 54/12 = 9/2 = 4½ acres.' },
    ],
    questions: [
      { q: 'Add: (a) 5/6 + 3/8  (b) 3⅓ + 2¾', a: '(a) LCD=24: 20/24+9/24=29/24=1 5/24\n(b) Whole=5. 1/3+3/4. LCD=12: 4/12+9/12=13/12=1 1/12. Total=6 1/12.' },
      { q: 'Subtract: (a) 7/8 - 3/5  (b) 5⅓ - 2⅔', a: '(a) LCD=40: 35/40-24/40=11/40\n(b) 16/3-8/3=8/3=2⅔.' },
      { q: 'Multiply: (a) 4/5 × 3/8  (b) 2½ × 3⅓', a: '(a) Cross-cancel: 4/5×3/8=12/40=3/10\n(b) 5/2×10/3=50/6=25/3=8⅓.' },
      { q: 'Divide: (a) 5/6 ÷ 2/3  (b) 3¾ ÷ 1½', a: '(a) 5/6×3/2=15/12=5/4=1¼\n(b) 15/4÷3/2=15/4×2/3=30/12=5/2=2½.' },
      { q: 'Find: (a) ¾ of 240  (b) 5/8 of 400  (c) ⅔ of GH₵450', a: '(a) 180  (b) 250  (c) GH₵300' },
      { q: 'Declyn uses ⅖ of his study time on Science and the rest on Maths. If he studies for 3¾ hours, how long on each subject?', a: 'Science: ⅖ × 3¾ = ⅖ × 15/4 = 30/20 = 1½ hours.\nMaths: 3¾ - 1½ = 2¼ hours.' },
      { q: 'A plank is 8½ metres long. How many pieces of 1¾ metres can be cut from it?', a: '8½ ÷ 1¾ = 17/2 ÷ 7/4 = 17/2 × 4/7 = 68/14 = 34/7 = 4 remainder 6/7. So 4 full pieces.' },
      { q: 'A tank holds 12⅓ litres of water. It is 4/5 full. How much water is in it?', a: '4/5 × 12⅓ = 4/5 × 37/3 = 148/15 = 9 13/15 litres.' },
      { q: 'How many ¾ kg portions can be made from 4½ kg of meat?', a: '4½ ÷ ¾ = 9/2 ÷ 3/4 = 9/2 × 4/3 = 36/6 = 6 portions.' },
      { q: '[Challenge] Ama spends ¼ of her salary on rent, ⅓ on food and ⅙ on transport. What fraction is left? If her salary is GH₵1,800, how much money is left?', a: 'Total spent: ¼+⅓+⅙. LCD=12: 3/12+4/12+2/12=9/12=¾.\nLeft: 1-¾=¼.\nMoney left: ¼×1,800=GH₵450.' },
    ],
  },
  {
    dayNum: 8, subject: 'English',
    topic: 'Reading Comprehension: Strategies, Inference & Summarising',
    standard: 'B5.2.7.1',
    objectives: [
      'Use active reading strategies: predict, question, visualise, monitor, summarise',
      'Identify the main idea and supporting details of a passage',
      'Answer factual, inferential and evaluative questions',
      'Write a concise summary of a passage in your own words',
    ],
    concepts: [
      {
        heading: 'Active Reading Strategies',
        body: 'Good readers are ACTIVE — they think as they read.\n\nBEFORE reading:\n• PREDICT: look at the title and headings — what will this be about?\n• PURPOSE: why are you reading? What do you need to find?\n\nWHILE reading:\n• QUESTION: ask WHO? WHAT? WHERE? WHEN? WHY? HOW?\n• VISUALISE: picture the scene in your mind\n• MONITOR: if something is confusing, re-read it\n\nAFTER reading:\n• SUMMARISE: what were the main points?\n• EVALUATE: do you agree? What is the writer\'s purpose?',
        note: 'TIP: Read the questions BEFORE the passage — it tells you what to look for.',
      },
      {
        heading: 'Types of Questions',
        body: 'FACTUAL questions: the answer is DIRECTLY in the text.\n"What year did Ghana gain independence?" → Answer: 1957 (from the text)\n\nINFERENTIAL questions: you must READ BETWEEN THE LINES.\n"What does the writer\'s choice of words suggest about his feelings?" → No direct answer — infer from clues.\n\nEVALUATIVE questions: your OPINION is required, supported by evidence.\n"Do you agree with the writer\'s view? Give reasons."\n\nVOCABULARY questions: explain what a word means IN CONTEXT.\n"What does the word ARID mean in line 3?"',
        note: "INFERENCE: using clues in the text to work out something that is NOT directly stated. Ask: 'What does this suggest?'",
      },
    ],
    worked: [
      { q: 'Read this passage: "Cocoa farming is one of the most important agricultural activities in Ghana. Ghana is currently the world\'s second largest producer of cocoa, after Ivory Coast. Over 800,000 farming families depend on cocoa for their livelihoods. Despite its importance, many cocoa farmers remain poor because they receive only a small fraction of the final price that consumers pay for chocolate in Europe and America. Organisations such as Fairtrade work to ensure farmers receive a fairer price."\n\n(a) What is the main idea?  (b) What is ONE inference you can draw?', a: '(a) Main idea: Cocoa farming is vital to Ghana but many farmers do not benefit fairly from it.\n(b) Inference: The international cocoa/chocolate trade is unfair to Ghanaian farmers — they produce most of the raw material but receive only a small portion of the profit.' },
      { q: 'Write a 2-sentence summary of the cocoa passage in your own words.', a: 'Ghana is a major cocoa producer supporting hundreds of thousands of farming families, yet most farmers remain poor because they receive little of the price paid for chocolate overseas. Organisations like Fairtrade are working to improve this situation by ensuring farmers get fairer payment.' },
    ],
    questions: [
      { q: 'Read the passage carefully then answer ALL questions.\n\nPLASTIC POLLUTION IN GHANA\nPlastic pollution has become one of the most pressing environmental challenges facing Ghana today. Every day, millions of single-use plastic bags, sachets and bottles are used across the country and discarded carelessly into streets, gutters and water bodies. In cities like Accra and Kumasi, blocked drains caused by plastic waste are a leading cause of the devastating floods that kill people and destroy property every rainy season. The impact on marine life is equally alarming. Studies show that fish caught off Ghana\'s coast contain microplastics — tiny fragments of broken-down plastic that have entered the food chain. When humans eat these fish, the microplastics enter our bodies, with potentially serious health consequences. Ghana\'s government has taken some steps, including a partial ban on certain plastic bags. However, enforcement remains weak and many traders continue to use banned plastics openly. Environmental groups argue that a cultural shift is needed: Ghanaians must change their relationship with single-use plastics, embracing reusable alternatives and participating in community clean-up exercises. The solution to plastic pollution will not come from government alone. It requires every individual to take personal responsibility. As one campaigner put it: "The ocean does not separate us from our rubbish. It brings it back."\n\nQ1: What is the main idea of the FIRST paragraph?', a: 'Plastic pollution is one of Ghana\'s most serious environmental problems — millions of single-use plastics are discarded daily, causing floods in major cities.' },
      { q: 'According to the passage, what is ONE health risk of plastic pollution to humans?', a: 'Microplastics from fish enter the human body when people eat fish caught off Ghana\'s coast, with potentially serious health consequences.' },
      { q: 'What TWO steps has the Ghanaian government taken or not taken regarding plastic pollution?', a: 'Taken: introduced a partial ban on certain plastic bags.\nNot taken: enforcement remains weak — banned plastics are still openly used by many traders.' },
      { q: "What does the word 'PRESSING' mean in the phrase 'one of the most pressing environmental challenges'?", a: 'Pressing means urgent, serious and requiring immediate attention.' },
      { q: "The passage ends with: 'The ocean does not separate us from our rubbish. It brings it back.' What does this mean?", a: "Rubbish dumped into the ocean doesn't disappear — the water cycle and ocean currents bring it back to our shores in the form of polluted water and fish containing microplastics. We cannot escape the consequences of our own pollution." },
      { q: "The writer says 'a cultural shift is needed.' What does this mean and why does the writer think government action alone is not enough?", a: 'A cultural shift means a fundamental change in attitudes and habits — Ghanaians must stop seeing single-use plastic as acceptable and embrace reusable alternatives. Government action alone is not enough because laws cannot change what individuals choose to do every day — enforcement is weak and behaviour change requires personal responsibility from every citizen.' },
      { q: 'Write a 3-4 sentence SUMMARY of the entire passage in your own words.', a: 'Plastic pollution is a major environmental crisis in Ghana, where carelessly discarded single-use plastics block drains, cause floods and contaminate the food chain through microplastics in fish. The government has introduced a partial plastic ban but enforcement is poor. Environmental groups say a cultural change is needed — every individual must take responsibility for reducing plastic use and participating in clean-ups.' },
      { q: 'Is this passage BIASED or BALANCED? Give evidence.', a: 'The passage is largely BIASED against plastic use and supports environmental groups\' position. Evidence: the writer uses emotive language ("devastating floods", "alarming"), quotes a campaigner directly, and presents no counter-argument from the plastics industry or traders. However, it does mention the government\'s partial ban as a positive step.' },
      { q: 'Identify ONE piece of evidence the writer uses to make the argument more convincing, and explain why it is effective.', a: "The statistic that 'fish caught off Ghana's coast contain microplastics' is effective because it provides scientific evidence of harm — it makes the problem concrete and personal (everyone eats fish). It also shows the issue is not just environmental but affects human health directly." },
      { q: "[Challenge] Do you think plastic pollution requires 'every individual' to take responsibility? Or is it mainly the responsibility of large corporations and governments that produce and profit from plastic? Write a balanced argument in 5–6 sentences.", a: 'Accept any well-reasoned balanced response. FOR individual responsibility: individual choices drive demand for plastics; collective behaviour change can reduce pollution immediately. FOR corporate/government responsibility: companies produce and profit from single-use plastics; governments must regulate and provide alternatives; individuals cannot solve a systemic problem alone. CONCLUSION: both are needed — structural change and individual action.' },
    ],
  },
  {
    dayNum: 9, subject: 'Mathematics',
    topic: 'Decimals & Percentages: Converting, Operating & Applying',
    standard: 'B5.1.3.3',
    objectives: [
      'Convert between fractions, decimals and percentages',
      'Add, subtract, multiply and divide decimal numbers',
      'Calculate percentage of a quantity, percentage increase and decrease',
      'Solve word problems involving decimals and percentages',
    ],
    concepts: [
      {
        heading: 'Converting Between Fractions, Decimals & Percentages',
        body: 'FRACTION → DECIMAL: divide top by bottom\n3/8 = 3 ÷ 8 = 0.375\n\nDECIMAL → PERCENTAGE: multiply by 100\n0.375 × 100 = 37.5%\n\nPERCENTAGE → FRACTION: write over 100 and simplify\n45% = 45/100 = 9/20\n\nKey benchmarks:\n½ = 0.5 = 50%\n¼ = 0.25 = 25%\n¾ = 0.75 = 75%\n⅕ = 0.2 = 20%\n⅓ ≈ 0.333 ≈ 33.3%\n⅛ = 0.125 = 12.5%',
        note: null,
      },
      {
        heading: 'Percentage Increase, Decrease & Finding Amounts',
        body: '% of a quantity: (% ÷ 100) × quantity\nExample: 35% of GH₵480 = 0.35 × 480 = GH₵168\n\n% INCREASE: (increase ÷ original) × 100\nExample: Price rises from GH₵120 to GH₵150.\nIncrease=30. %=(30÷120)×100=25%\n\n% DECREASE: (decrease ÷ original) × 100\nExample: Salary drops from GH₵800 to GH₵640.\nDecrease=160. %=(160÷800)×100=20%\n\nAdding decimals: line up the decimal points.\nMultiplying decimals: multiply as whole numbers, then count decimal places.',
        note: 'When multiplying decimals, count the total decimal places in BOTH numbers and put that many in the answer.',
      },
    ],
    worked: [
      { q: 'Convert: (a) 7/8 to decimal and %  (b) 0.64 to fraction  (c) 35% to fraction', a: '(a) 7÷8=0.875; 0.875×100=87.5%  (b) 0.64=64/100=16/25  (c) 35/100=7/20' },
      { q: 'Find 28% of GH₵650.', a: '28/100 × 650 = 0.28 × 650 = GH₵182' },
      { q: 'A shirt costs GH₵85. It is reduced by 20%. What is the new price?', a: 'Discount = 20% × 85 = GH₵17. New price = 85 - 17 = GH₵68.' },
    ],
    questions: [
      { q: 'Convert to decimals and percentages: (a) 3/5  (b) 5/8  (c) 7/20', a: '(a) 0.6 = 60%  (b) 0.625 = 62.5%  (c) 0.35 = 35%' },
      { q: 'Convert to fractions in simplest form: (a) 0.48  (b) 0.375  (c) 85%', a: '(a) 48/100=12/25  (b) 375/1000=3/8  (c) 85/100=17/20' },
      { q: 'Add: (a) 4.73 + 8.6 + 0.47  (b) 12.9 - 7.38', a: '(a) 13.80  (b) 5.52' },
      { q: 'Multiply: (a) 3.6 × 8  (b) 0.45 × 12  (c) 2.4 × 1.5', a: '(a) 28.8  (b) 5.4  (c) 3.6' },
      { q: 'Find: (a) 15% of GH₵320  (b) 7.5% of GH₵840  (c) 120% of GH₵250', a: '(a) GH₵48  (b) GH₵63  (c) GH₵300' },
      { q: 'A market price rose from GH₵160 to GH₵200. Find the percentage increase.', a: 'Increase=40. %=(40÷160)×100=25%.' },
      { q: 'A phone was GH₵750. After a fault was found, the price was reduced by 30%. What is the new price?', a: 'Discount=30%×750=GH₵225. New price=750-225=GH₵525.' },
      { q: 'A student scored 68 out of 80 in an exam. Express this as a percentage.', a: '(68÷80)×100=85%.' },
      { q: "A school's enrolment increased from 640 to 784 students. Find the percentage increase.", a: 'Increase=144. %=(144÷640)×100=22.5%.' },
      { q: '[Challenge] Declyn scores 72% on a test. The total marks are 150. He needs 80% to get an A. How many more marks does he need, and what percentage improvement is that from his current score?', a: 'Declyn\'s marks=72%×150=108. Marks for A=80%×150=120. More needed=120-108=12 marks.\nImprovement from 72%: 80%-72%=8 percentage points.' },
    ],
  },
  {
    dayNum: 10, subject: 'Science',
    topic: 'The Human Body: Digestive & Circulatory Systems',
    standard: 'B5.3.1.1',
    objectives: [
      'Describe the organs of the digestive system and their functions',
      'Trace the journey of food from the mouth to the anus',
      'Describe the main components and function of the circulatory system',
      'Explain the importance of nutrition and a balanced diet for body health',
    ],
    concepts: [
      {
        heading: 'The Digestive System',
        body: 'The digestive system BREAKS DOWN food into nutrients the body can absorb and use.\n\nThe journey of food (alimentary canal):\n1. MOUTH: teeth chew (mechanical digestion); saliva begins chemical digestion of starch.\n2. OESOPHAGUS (gullet): muscular tube that pushes food from mouth to stomach by peristalsis.\n3. STOMACH: food mixed with gastric acid; proteins begin to be broken down. Food becomes chyme.\n4. SMALL INTESTINE: further chemical digestion; nutrients (glucose, amino acids, fatty acids) absorbed into bloodstream.\n5. LARGE INTESTINE: water absorbed back into body; waste material compacted.\n6. RECTUM and ANUS: solid waste (faeces) stored and expelled.',
        note: 'The LIVER produces bile which helps digest fats. The PANCREAS produces enzymes that help digest proteins, fats and carbohydrates in the small intestine.',
      },
      {
        heading: 'The Circulatory System',
        body: 'The circulatory system TRANSPORTS blood around the body carrying nutrients, oxygen and waste products.\n\nMain components:\nHEART: the pump. Four chambers — two atria (receive blood) and two ventricles (pump blood out).\n• Right side: receives deoxygenated blood from body, pumps it to lungs.\n• Left side: receives oxygenated blood from lungs, pumps it to the body.\n\nBLOOD VESSELS:\n• ARTERIES: carry blood AWAY from the heart (thick walls, high pressure).\n• VEINS: carry blood TO the heart (thinner walls, lower pressure).\n• CAPILLARIES: tiny vessels where exchange of oxygen, nutrients and waste occurs.\n\nBLOOD: red blood cells (carry oxygen), white blood cells (fight infection), platelets (clot wounds), plasma (transport nutrients).',
        note: 'Remember: Arteries = Away from heart. Veins = go to the heart. "AAVV".',
      },
    ],
    worked: [
      { q: 'Trace the journey of a piece of yam from the mouth to when nutrients reach the blood.', a: '1. MOUTH: yam chewed and mixed with saliva (starts starch digestion).\n2. OESOPHAGUS: swallowed and pushed down by peristalsis.\n3. STOMACH: mixed with gastric acid; further digestion.\n4. SMALL INTESTINE: enzymes complete digestion of starch into glucose; glucose absorbed through intestine wall into BLOOD.\n5. BLOOD carries glucose to all cells for energy.' },
      { q: 'What is the difference between an artery and a vein?', a: 'ARTERY: carries blood AWAY from the heart. Usually oxygenated. Thick, muscular walls, high pressure.\nVEIN: carries blood TOWARDS the heart. Usually deoxygenated. Thinner walls, contains valves to prevent backflow.' },
      { q: 'Why is the left side of the heart thicker and more muscular than the right side?', a: 'The LEFT side pumps blood to the ENTIRE BODY — a much greater distance at higher pressure. The RIGHT side only pumps blood the short distance to the LUNGS. So the left side needs thicker walls to generate greater force.' },
    ],
    questions: [
      { q: 'Name the organs of the digestive system in the correct order from mouth to anus.', a: 'Mouth → Oesophagus → Stomach → Small intestine → Large intestine → Rectum → Anus.' },
      { q: 'State the function of each digestive organ: (a) stomach  (b) small intestine  (c) large intestine', a: '(a) Stomach: mixes food with gastric acid; breaks down proteins; produces chyme.\n(b) Small intestine: chemical digestion is completed; nutrients absorbed into bloodstream.\n(c) Large intestine: water reabsorbed into body; waste compacted into faeces.' },
      { q: 'What is PERISTALSIS and why is it important?', a: 'Peristalsis is the wave-like muscular contractions in the oesophagus (and other parts of the alimentary canal) that push food from the mouth towards the stomach and onwards. It is important because it moves food through the digestive system automatically — we do not need to control it consciously.' },
      { q: 'Name the FOUR components of blood and state ONE function of each.', a: 'Red blood cells: carry oxygen around the body.\nWhite blood cells: fight infection and disease.\nPlatelets: cause blood to clot at wounds, preventing excessive bleeding.\nPlasma: liquid that transports nutrients, hormones and waste products.' },
      { q: 'Describe the double circulation of blood through the heart.', a: 'The heart has two circuits:\n1. PULMONARY circulation: right side of heart receives deoxygenated blood from the body and pumps it to the LUNGS to pick up oxygen.\n2. SYSTEMIC circulation: left side of heart receives oxygenated blood from the lungs and pumps it to the BODY to deliver oxygen to all cells.' },
      { q: 'Why is it important to eat a BALANCED DIET? Name the six classes of nutrients.', a: 'A balanced diet provides all the nutrients needed for growth, energy, repair and protection against disease.\nSix classes: Carbohydrates, Proteins, Fats/Oils, Vitamins, Minerals, Water.' },
      { q: 'Explain why a person with a blocked artery in the heart is in serious danger.', a: 'Arteries carry oxygenated blood at high pressure. If the coronary artery (which supplies the heart muscle itself) is blocked, the heart muscle cells are starved of oxygen and begin to die. This causes a heart attack — the heart may stop pumping effectively, which can be fatal.' },
      { q: 'What would happen to digestion if the pancreas stopped working? Explain.', a: 'The pancreas produces digestive enzymes (amylase, lipase, protease) that are released into the small intestine. Without these enzymes, proteins, fats and carbohydrates cannot be fully broken down into forms the body can absorb. Nutrients would pass through the body unabsorbed, causing malnutrition despite eating.' },
      { q: 'Compare the structure and function of CAPILLARIES with ARTERIES.', a: 'ARTERIES: thick walls, large diameter, carry blood at high pressure away from heart.\nCAPILLARIES: extremely thin walls (one cell thick), microscopic diameter, found in tissues — allow exchange of oxygen, nutrients and waste between blood and body cells. Arteries carry blood to capillaries; capillaries are where the actual work of supplying cells occurs.' },
      { q: '[Challenge] The digestive and circulatory systems work together. Explain the connection, tracing what happens from the moment food is digested to when the energy from that food is used by a muscle.', a: 'Food is broken down in the small intestine into glucose (from carbohydrates). Glucose is absorbed through the intestine wall into the BLOODSTREAM (circulatory system). The blood (via arteries → capillaries) carries glucose to muscle cells. Inside the muscle cells, MITOCHONDRIA convert glucose and oxygen into ENERGY (ATP) through cellular respiration. This energy powers the muscle contraction. The digestive and circulatory systems are therefore partners — digestion produces the nutrients, circulation delivers them.' },
    ],
  },
]

async function seedPacks() {
  console.log('🌱 Seeding Declyn Days 1–10 packs...\n')
  const batch = db.batch()
  for (const pack of PACKS) {
    const ref = db.collection('packs').doc(`${STUDENT_ID}_day${pack.dayNum}`)
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
    console.log(`✅ Day ${pack.dayNum} — ${pack.subject}: ${pack.topic}`)
  }
  await batch.commit()
  console.log('\n✅ Declyn Days 1–10 packs seeded!')
  process.exit(0)
}
seedPacks().catch(err => { console.error('❌', err); process.exit(1) })
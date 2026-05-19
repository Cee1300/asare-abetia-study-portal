// scripts/seed-packs-ivan.js
// Seeds Ivan Days 1–10 pack content into Firestore
// Run: node scripts/seed-packs-ivan.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const STUDENT_ID = 'ivan'

const PACKS = [
  {
    dayNum: 1, subject: 'Mathematics',
    topic: 'Numbers: Counting & Place Value to 1,000',
    standard: 'B3.1.1.1',
    objectives: [
      'Count forwards and backwards to 1,000',
      'Read and write numbers up to 1,000 in words and figures',
      'Identify the value of each digit (hundreds, tens, units)',
      'Compare numbers using >, < and = signs',
    ],
    concepts: [
      {
        heading: 'Place Value — Hundreds, Tens and Units',
        body: 'Every number has digits in different POSITIONS. Each position has a value.\n\nExample: The number 347\n3 is in the HUNDREDS place → value = 300\n4 is in the TENS place → value = 40\n7 is in the UNITS place → value = 7\n\nSo 347 = 300 + 40 + 7',
        note: 'Remember: Hundreds | Tens | Units — from left to right.',
      },
      {
        heading: 'Reading, Writing & Comparing Numbers to 1,000',
        body: 'Numbers in figures → write in words:\n356 → Three hundred and fifty-six\n908 → Nine hundred and eight\n1,000 → One thousand\n\nComparing numbers: always start from the HUNDREDS digit.\n456 > 389 because 4 hundreds > 3 hundreds\n\nUse > (greater than), < (less than), = (equal to)',
        note: "When writing numbers in words, use 'and' after the hundreds: 'three hundred AND fifty-six'.",
      },
    ],
    worked: [
      { q: 'Write the value of each digit in 748.', a: '7 → hundreds (700). 4 → tens (40). 8 → units (8). So 748 = 700 + 40 + 8.' },
      { q: 'Write 625 in words.', a: 'Six hundred and twenty-five.' },
      { q: 'Which is greater: 483 or 438? Use the correct symbol.', a: 'Both have 4 hundreds. Then compare tens: 8 tens > 3 tens. So 483 > 438.' },
    ],
    questions: [
      { q: 'Write the value of the digit 5 in each number: (a) 523  (b) 350  (c) 105', a: '(a) 500 (hundreds)  (b) 50 (tens)  (c) 5 (units)' },
      { q: 'Write in words: (a) 417  (b) 890  (c) 306  (d) 1,000', a: '(a) Four hundred and seventeen.\n(b) Eight hundred and ninety.\n(c) Three hundred and six.\n(d) One thousand.' },
      { q: 'Write in figures: (a) Two hundred and sixty-three  (b) Nine hundred and one  (c) Five hundred', a: '(a) 263  (b) 901  (c) 500' },
      { q: 'Compare using > or <: (a) 674 ___ 647  (b) 509 ___ 590  (c) 832 ___ 832', a: '(a) 674 > 647  (b) 509 < 590  (c) 832 = 832' },
      { q: 'Arrange in ascending order (smallest first): 712, 271, 127, 721', a: '127, 271, 712, 721' },
      { q: 'What number is: (a) 10 more than 456?  (b) 100 less than 800?  (c) 1 more than 999?', a: '(a) 466  (b) 700  (c) 1,000' },
      { q: 'Count forward in 10s from 840. Write the next 5 numbers.', a: '850, 860, 870, 880, 890' },
      { q: 'What is the largest number you can make using the digits 3, 8 and 5?', a: '853' },
      { q: 'A school has 346 boys and 412 girls. Which group is larger? By how many?', a: 'Girls are larger. 412 - 346 = 66 more girls.' },
      { q: '[Challenge] I am a 3-digit number. My hundreds digit is twice my units digit. My tens digit is 0. My units digit is 3. What number am I?', a: 'Units = 3. Hundreds = 2×3 = 6. Tens = 0. Answer: 603.' },
    ],
  },
  {
    dayNum: 2, subject: 'Science',
    topic: 'Living & Non-Living Things: How to Tell Them Apart',
    standard: 'B3.1.1.1.1',
    objectives: [
      'Classify things as living or non-living using their life processes',
      'Group living things into plants and animals',
      'Identify the characteristics that make something living',
      'Give examples of living and non-living things from your environment',
    ],
    concepts: [
      {
        heading: 'Living Things — What Makes Something Alive?',
        body: 'Living things share these LIFE PROCESSES (MRS GREN):\n• Movement: they can move all or part of themselves\n• Respiration: they use air/oxygen to release energy\n• Sensitivity: they respond to things around them\n• Growth: they get bigger over time\n• Reproduction: they produce young ones like themselves\n• Excretion: they get rid of waste\n• Nutrition: they need food or make their own\n\nALL living things do ALL of these things.',
        note: 'Memory tip: MRS GREN — Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.',
      },
      {
        heading: 'Plants vs Animals vs Non-Living Things',
        body: 'PLANTS:\n• Make their own food using sunlight (photosynthesis)\n• Usually stay in one place — roots hold them in the ground\n• Examples: mango tree, cocoa, maize, grass, pawpaw\n\nANIMALS:\n• Cannot make their own food — they eat plants or other animals\n• Can move from place to place\n• Examples: goat, fish, butterfly, chicken, human beings\n\nNON-LIVING THINGS:\n• Do NONE of the MRS GREN processes\n• Examples: stone, water, chair, pencil, cloud',
        note: 'A dead tree is NOT living — it does not carry out life processes anymore. But it was once alive, so it is different from a stone which was never alive.',
      },
    ],
    worked: [
      { q: 'Sort into LIVING and NON-LIVING: butterfly, stone, maize plant, pencil, goat, river water, mango tree, cloud', a: 'LIVING: butterfly, maize plant, goat, mango tree.\nNON-LIVING: stone, pencil, river water, cloud.' },
      { q: 'Explain TWO reasons why a dog is a living thing but a toy dog is not.', a: '1. The real dog GROWS — starts as a puppy and gets bigger. The toy never changes.\n2. The real dog FEEDS — eats food for energy. The toy does not need food.' },
      { q: 'How is a plant different from an animal? Give TWO differences.', a: '1. A plant makes its own food using sunlight. An animal must eat.\n2. A plant usually stays in one place. An animal can move from place to place.' },
    ],
    questions: [
      { q: 'Name the 7 life processes. (Use MRS GREN to help you.)', a: 'Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.' },
      { q: 'Classify each as PLANT, ANIMAL or NON-LIVING:\n(a) cocoa tree  (b) stone  (c) tilapia  (d) chair  (e) grasshopper  (f) water  (g) cassava', a: '(a) Plant  (b) Non-living  (c) Animal  (d) Non-living  (e) Animal  (f) Non-living  (g) Plant' },
      { q: 'Give TWO ways you can tell that a mango tree is a living thing.', a: 'Any two: it grows taller over time; it produces mangoes (reproduction); it has roots that absorb water (nutrition); its leaves turn toward sunlight (sensitivity).' },
      { q: 'Give TWO differences between a plant and an animal.', a: '1. Plants make their own food using sunlight; animals eat other organisms.\n2. Plants stay rooted in one place; animals can move around freely.' },
      { q: 'Is a dead leaf living or non-living? Explain your answer.', a: 'A dead leaf is NON-LIVING. Although it was once part of a living tree, it no longer carries out any life processes — it does not grow, feed, respond or reproduce. It is no longer alive.' },
      { q: 'Name THREE living things and THREE non-living things you can find in your home.', a: 'Accept any correct examples. Living: plants, insects, people, pets, bacteria on food. Non-living: tables, phones, books, pots, stones, water.' },
      { q: 'A cloud can move. Does that make it a living thing? Explain.', a: 'No. Movement alone does not make something living. A cloud moves because of wind, not because it has muscles or life processes. It does not grow, feed, reproduce, breathe or respond to things around it — so it is NOT living.' },
      { q: 'Name FIVE plants and FIVE animals that are common in Ghana.', a: 'Plants: cocoa, maize, mango, cassava, plantain. Animals: tilapia, eagle, grasshopper, lizard, goat. Accept any correct Ghanaian examples.' },
      { q: 'Draw a simple table with two columns: LIVING THINGS and NON-LIVING THINGS. Put these in the correct column:\nhoney bee, textbook, tomato plant, soil, earthworm, plastic bottle, snail, thermometer', a: 'LIVING: honey bee, tomato plant, earthworm, snail.\nNON-LIVING: textbook, soil, plastic bottle, thermometer.' },
      { q: '[Challenge] Fire moves, grows bigger and needs air (oxygen). Does that make fire a living thing? Explain carefully.', a: "No, fire is NOT living. Although fire moves, grows and uses oxygen, it does not carry out ALL MRS GREN processes. Fire cannot reproduce itself (it needs an external source to spread), it cannot respond to stimuli in a coordinated way, it does not excrete waste products in a biological sense, and it has no cells. Living things are made of cells — fire is not. Meeting some conditions of MRS GREN is not enough; ALL must be present." },
    ],
  },
  {
    dayNum: 3, subject: 'Mathematics',
    topic: 'Addition & Subtraction: 2- and 3-digit Numbers',
    standard: 'B3.1.2.1',
    objectives: [
      'Add 2-digit and 3-digit numbers with and without carrying (regrouping)',
      'Subtract 2-digit and 3-digit numbers with and without borrowing',
      'Solve word problems involving addition and subtraction',
      'Check answers using the inverse operation',
    ],
    concepts: [
      {
        heading: 'Addition with Carrying (Regrouping)',
        body: 'When the sum of a column is 10 or more, we CARRY the tens digit to the next column.\n\nExample: 365 + 247\nUnits: 5 + 7 = 12. Write 2, carry 1.\nTens: 6 + 4 + 1 (carried) = 11. Write 1, carry 1.\nHundreds: 3 + 2 + 1 (carried) = 6.\nAnswer: 612\n\nAlways add from RIGHT to LEFT (units first, then tens, then hundreds).',
        note: 'Check your answer by adding again or by using subtraction.',
      },
      {
        heading: 'Subtraction with Borrowing',
        body: 'When the top digit is smaller than the bottom digit, we BORROW from the next column.\n\nExample: 423 - 178\nUnits: 3 < 8. Borrow from tens: 13 - 8 = 5.\nTens: 1 (was 2, gave 1) < 7. Borrow from hundreds: 11 - 7 = 4.\nHundreds: 3 (was 4, gave 1) - 1 = 2.\nAnswer: 245\n\nCheck: 245 + 178 = 423 ✓',
        note: "KEY WORD CLUES: 'total', 'altogether', 'sum' = addition. 'difference', 'left', 'remaining', 'less' = subtraction.",
      },
    ],
    worked: [
      { q: 'Add: 456 + 378', a: 'Units: 6+8=14, write 4, carry 1. Tens: 5+7+1=13, write 3, carry 1. Hundreds: 4+3+1=8. Answer: 834.' },
      { q: 'Subtract: 700 - 364', a: 'Units: 0<4, borrow. 10-4=6. Tens: 9<6... borrow from hundreds: 10-6=4. Hundreds: 6-3=3. Answer: 336. Check: 336+364=700 ✓' },
      { q: 'Ivan collected 247 stamps and his brother collected 185 stamps. How many do they have altogether?', a: '247 + 185 = 432 stamps altogether.' },
    ],
    questions: [
      { q: 'Add: (a) 345 + 278  (b) 567 + 189  (c) 403 + 398', a: '(a) 623  (b) 756  (c) 801' },
      { q: 'Subtract: (a) 864 - 327  (b) 500 - 246  (c) 731 - 458', a: '(a) 537  (b) 254  (c) 273' },
      { q: 'A market stall sold 356 oranges in the morning and 247 in the afternoon. How many oranges were sold in total?', a: '356 + 247 = 603 oranges.' },
      { q: 'There are 842 pupils in a school. 375 are boys. How many are girls?', a: '842 - 375 = 467 girls.' },
      { q: 'Find the missing number: (a) 456 + ___ = 700  (b) ___ - 128 = 345', a: '(a) 244  (b) 473' },
      { q: 'Ama had GH₵650. She spent GH₵278 on books and GH₵145 on food. How much money does she have left?', a: '278 + 145 = 423 spent. 650 - 423 = GH₵227 left.' },
      { q: 'A lorry carries 486 kg of maize. It delivers 194 kg to one town and 127 kg to another. How much maize is left?', a: '194 + 127 = 321 kg delivered. 486 - 321 = 165 kg left.' },
      { q: 'Use addition to CHECK this subtraction: 623 - 278 = 355. Is it correct?', a: 'Check: 355 + 278 = 633 ≠ 623. So NO, it is NOT correct. The correct answer is 623 - 278 = 345.' },
      { q: 'The sum of two numbers is 900. One number is 364. What is the other number?', a: '900 - 364 = 536.' },
      { q: '[Challenge] Ivan scored 347 points in a game. He needs 600 points to win. He scores 178 more points. Does he win? How many points short or extra does he have?', a: 'Ivan now has 347 + 178 = 525 points. He needs 600 to win. 525 < 600 so he does NOT win. He is 600 - 525 = 75 points short.' },
    ],
  },
  {
    dayNum: 4, subject: 'English',
    topic: 'Oral Language: Songs, Stories & Conversation',
    standard: 'B3.1.1.1–B3.1.6.2',
    objectives: [
      'Respond to and ask questions about stories heard or read',
      'Use appropriate greetings for different times and occasions',
      'Talk confidently about places and events in your community',
      'Take turns properly in conversation and ask questions to find out more',
    ],
    concepts: [
      {
        heading: 'Asking and Answering Questions',
        body: 'Good communication means BOTH speaking AND listening carefully.\n\nWhen someone tells you a story or gives information:\n• Listen carefully without interrupting\n• Ask questions to find out MORE: Who? What? Where? When? Why? How?\n• Answer in full sentences — not just one word\n\nExample question: "Why did Anansi trick the other animals?"\nWeak answer: "Because he wanted food."\nStrong answer: "Anansi tricked the other animals because he was hungry and he wanted to get the yams without doing any of the hard work."',
        note: 'A full sentence answer always tells WHO, WHAT and WHY when possible.',
      },
      {
        heading: 'Greetings for Different Occasions',
        body: 'We use different greetings depending on:\n• The TIME of day: Good morning / Good afternoon / Good evening / Good night\n• The OCCASION: Happy Birthday / Congratulations / Condolences\n• The PERSON: formal (Good morning, sir/madam) vs informal (Hey, how are you?)\n\nImportant greetings:\n• Meeting someone for the first time: "How do you do?" / "Pleased to meet you."\n• After a long time: "It is good to see you again."\n• Special occasions: "Happy Easter!" / "Eid Mubarak!" / "Merry Christmas!"',
        note: 'In Ghanaian culture, greetings are VERY important. Always greet elders first and use respectful language.',
      },
      {
        heading: 'Taking Turns in Conversation',
        body: 'Good conversation requires TURN-TAKING:\n• Wait until the other person finishes before you speak\n• Show you are listening: nod, make eye contact, say "yes" or "I see"\n• Ask follow-up questions: "Really? What happened next?"\n• Express your own ideas clearly and politely\n• If you disagree: say "I see what you mean, but I think..." — not "You are wrong!"',
        note: null,
      },
    ],
    worked: [
      { q: 'Read this story, then answer: "Kofi found a wallet full of money on the way to school. Inside was a name card with a phone number. Instead of keeping the money, Kofi called the number. The wallet belonged to a teacher. The teacher was very grateful and praised Kofi at assembly."\n(a) What did Kofi find?  (b) What did Kofi do?  (c) What does this tell us about Kofi?', a: '(a) Kofi found a wallet full of money on his way to school.\n(b) Instead of keeping the money, Kofi called the number on the name card and returned the wallet.\n(c) Kofi is honest and responsible — he did the right thing even when he could have kept the money.' },
      { q: 'Write the correct greeting for each situation:\n(a) You meet your headmaster at 8am.\n(b) You greet a friend you haven\'t seen since last term.\n(c) Today is your teacher\'s birthday.', a: '(a) "Good morning, sir/madam. I hope you are well."\n(b) "It is so good to see you again! How have you been?"\n(c) "Happy Birthday, sir/madam. I hope you have a wonderful day!"' },
    ],
    questions: [
      { q: 'Read and answer:\nAma\'s grandmother told her a story about Anansi the spider. Anansi wanted to own all the stories in the world. He went to Nyame, the Sky God, to buy them. Nyame said the price was: a swarm of hornets, a python and a leopard. Everyone thought it was impossible. But clever Anansi tricked all three creatures and brought them to Nyame. Nyame kept his promise and gave Anansi all the stories.\n\n(a) What did Anansi want to own?\n(b) What was the price set by Nyame?\n(c) Did Anansi succeed? How?\n(d) What does this story tell us about Anansi?', a: '(a) Anansi wanted to own all the stories in the world.\n(b) A swarm of hornets, a python and a leopard.\n(c) Yes. He tricked all three creatures and brought them to Nyame.\n(d) Anansi is clever and determined — he achieved something everyone thought was impossible using his intelligence.' },
      { q: 'Write FOUR different questions you could ask after hearing the Anansi story. Use different question words: Who, What, Why, How.', a: 'Accept any four using different question words. Examples:\nWho: "Who is Nyame?"\nWhat: "What did Anansi get from Nyame?"\nWhy: "Why did Anansi want to own the stories?"\nHow: "How did Anansi trick the python?"' },
      { q: 'What greeting would you use in each situation?\n(a) It is 7:30pm and you are meeting your uncle.\n(b) Your classmate passed all his exams.\n(c) It is the first day of the new school year.', a: '(a) "Good evening, Uncle."\n(b) "Congratulations! You worked very hard and you deserve it."\n(c) "Good morning! It is great to be back. Happy new term!"' },
      { q: 'Write a short conversation (6–8 lines) between two friends meeting after the school holiday. Include: an appropriate greeting, at least TWO questions, at least ONE full-sentence answer.', a: 'Accept any natural conversation with: a greeting (Good morning/Hey/It\'s good to see you), two questions (How were your holidays? What did you do?), and at least one full-sentence answer describing the holiday.' },
      { q: "Your friend says: 'I think playing football is better than reading books.' How would you respond politely if you DISAGREE? Write your response in 2–3 sentences.", a: '"I understand why you feel that way — football is great fun. However, I think reading is also very important because it helps us learn and do well in school. Perhaps we can enjoy both!"' },
      { q: 'Tell the story of a time when you were honest or kind. Write 4–5 sentences.', a: 'Accept any personal story with: a clear event, what the student did, the outcome and a reflection. Should be 4-5 complete sentences.' },
      { q: 'A stranger stops you on the street and asks for directions to the school. Write what you would say. Use: turn left/right, go straight, pass, opposite, near.', a: 'Accept any logical set of directions using the required direction words. E.g.: "Go straight out of this junction. Turn left at the traffic light. Pass the church on your right. The school is on your left, opposite the petrol station."' },
      { q: 'Name THREE things a good listener does during a conversation.', a: 'Any three: maintains eye contact; does not interrupt; nods or says "yes/I see"; waits for the speaker to finish; asks follow-up questions; gives full attention.' },
      { q: 'What is the difference between a FORMAL greeting and an INFORMAL greeting? Give ONE example of each.', a: 'Formal greeting: used with teachers, elders and officials — polite and respectful. Example: "Good morning, sir. How do you do?"\nInformal greeting: used with friends and family — casual and relaxed. Example: "Hey! What\'s up?"' },
      { q: "[Challenge] Anansi stories are told all over West Africa and even in the Caribbean. Why do you think these stories have travelled so far? What makes Anansi a character people all over the world enjoy? Write 4–5 sentences.", a: 'Accept any thoughtful response covering: Anansi represents cleverness over physical strength (universally appealing); stories were carried by enslaved Africans to the Caribbean; Anansi became a symbol of survival and resistance; his stories teach lessons about courage and intelligence that people everywhere understand.' },
    ],
  },
  {
    dayNum: 5, subject: 'Mathematics',
    topic: 'Multiplication: 2× to 10× Tables',
    standard: 'B3.1.3.1',
    objectives: [
      'Recall multiplication facts for the 2× to 10× tables',
      'Use multiplication as repeated addition',
      'Multiply a 2-digit number by a 1-digit number',
      'Solve word problems using multiplication',
    ],
    concepts: [
      {
        heading: 'Multiplication as Repeated Addition',
        body: 'Multiplication means adding the same number over and over.\n4 × 3 means "4 groups of 3" or 3 + 3 + 3 + 3 = 12\n7 × 5 means "7 groups of 5" or 5 + 5 + 5 + 5 + 5 + 5 + 5 = 35\n\nImportant rules:\n• Any number × 0 = 0. (9 × 0 = 0)\n• Any number × 1 = that number. (7 × 1 = 7)\n• Order does not matter: 4 × 6 = 6 × 4 = 24',
        note: 'Practise your tables until they are automatic — this will help in ALL areas of maths.',
      },
      {
        heading: 'Multiplying a 2-digit Number by a 1-digit Number',
        body: 'Method: Split the 2-digit number into tens and units.\n\nExample: 34 × 6\nStep 1: Multiply units: 4 × 6 = 24. Write 4, carry 2.\nStep 2: Multiply tens: 3 × 6 = 18. Add carried 2: 18 + 2 = 20.\nAnswer: 204\n\nAnother way — expanded method:\n34 × 6 = (30 × 6) + (4 × 6) = 180 + 24 = 204',
        note: null,
      },
    ],
    worked: [
      { q: 'Find: (a) 7 × 8  (b) 9 × 6  (c) 4 × 7', a: '(a) 56  (b) 54  (c) 28' },
      { q: 'Multiply: 47 × 5', a: 'Units: 7×5=35. Write 5, carry 3. Tens: 4×5=20. Add 3: 23. Answer: 235.' },
      { q: 'A classroom has 8 rows of chairs. Each row has 9 chairs. How many chairs in total?', a: '8 × 9 = 72 chairs.' },
    ],
    questions: [
      { q: 'Complete the multiplication facts: (a) 6 × 7 = ___  (b) 8 × 9 = ___  (c) 7 × 7 = ___  (d) 9 × 9 = ___  (e) 6 × 8 = ___', a: '(a) 42  (b) 72  (c) 49  (d) 81  (e) 48' },
      { q: 'Multiply: (a) 23 × 4  (b) 36 × 5  (c) 48 × 3', a: '(a) 92  (b) 180  (c) 144' },
      { q: 'A tray holds 6 eggs. How many eggs in 9 trays?', a: '6 × 9 = 54 eggs.' },
      { q: 'Kofi reads 8 pages of his book every day. How many pages will he read in 7 days?', a: '8 × 7 = 56 pages.' },
      { q: 'A farmer plants 35 rows of maize. Each row has 6 plants. How many plants are there altogether?', a: '35 × 6 = 210 plants.' },
      { q: 'Use the expanded method to find 46 × 7.', a: '(40 × 7) + (6 × 7) = 280 + 42 = 322.' },
      { q: 'Find the missing number: (a) ___ × 7 = 56  (b) 9 × ___ = 63  (c) 6 × ___ = 48', a: '(a) 8  (b) 7  (c) 8' },
      { q: 'A pack of biscuits costs GH₵4. How much will 28 packs cost?', a: '28 × 4 = GH₵112.' },
      { q: 'Write a multiplication WORD PROBLEM that uses the fact 7 × 9 = 63.', a: 'Accept any correct word problem. E.g.: "There are 7 baskets. Each basket has 9 oranges. How many oranges are there altogether? Answer: 63."' },
      { q: '[Challenge] Ivan has 56 football stickers. He arranges them in rows with 8 stickers in each row. Then he adds 3 more rows of 8. How many stickers does he have now?', a: 'Original rows: 56 ÷ 8 = 7 rows. New rows: 7 + 3 = 10 rows. Total stickers: 10 × 8 = 80 stickers.' },
    ],
  },
  {
    dayNum: 6, subject: 'Science',
    topic: 'Materials & States of Matter: Solids, Liquids and Gases',
    standard: 'B3.1.2.1–B3.1.2.3',
    objectives: [
      'Identify the properties of solids, liquids and gases',
      'Give examples of materials used for different purposes based on their properties',
      'Explain how substances can change state through heating or cooling',
      'Describe what a solid-liquid mixture is and how to separate it',
    ],
    concepts: [
      {
        heading: 'Properties of Solids, Liquids and Gases',
        body: 'SOLID: has a definite shape and volume. Particles are tightly packed.\nProperties: hard or soft, can be held, keeps its shape.\nExamples: wood, iron, stone, chalk, ice.\n\nLIQUID: has a definite volume but NO fixed shape. Takes the shape of its container.\nProperties: flows/pours, surface is level.\nExamples: water, palm oil, milk, blood.\n\nGAS: has NO fixed shape or volume. Fills any container completely.\nProperties: cannot be seen (usually), spreads out.\nExamples: air, steam, cooking gas, oxygen.',
        note: 'Test: Can you hold it? = solid. Does it pour? = liquid. Does it fill the room? = gas.',
      },
      {
        heading: 'Materials and Their Uses & Changing State',
        body: 'Materials are chosen for their PROPERTIES:\n• Metal → pots and pans (conducts heat, strong)\n• Wood → furniture (strong, can be shaped)\n• Plastic → bottles (can be moulded, does not break easily)\n• Cotton → clothes (soft, absorbs sweat)\n• Glass → windows (transparent)\n\nTemperature changes the STATE of matter:\nMELTING: solid → liquid (heat added). Example: ice melts into water.\nFREEZING: liquid → solid (heat removed). Example: water freezes into ice.\nEVAPORATION: liquid → gas (heat added). Example: water boils into steam.\nCONDENSATION: gas → liquid (heat removed). Example: steam cools into water drops.',
        note: 'No new substance is formed when matter changes state — it is the SAME substance in a different form.',
      },
    ],
    worked: [
      { q: 'Classify each material as SOLID, LIQUID or GAS:\n(a) cooking gas  (b) shea butter  (c) kerosene  (d) iron nail  (e) steam', a: '(a) gas  (b) solid  (c) liquid  (d) solid  (e) gas' },
      { q: 'Why is metal used to make cooking pots instead of plastic?', a: 'Metal is strong, hard and conducts heat well — it gets hot quickly and cooks food evenly. Plastic would melt if placed on a fire because it cannot withstand high temperatures.' },
      { q: 'What happens to shea butter when you leave it in the sun? Name the process.', a: 'Shea butter MELTS — changes from solid to liquid. This is called MELTING. The sun\'s heat adds energy to the particles, causing them to move more freely.' },
    ],
    questions: [
      { q: 'Name TWO properties of: (a) a solid  (b) a liquid  (c) a gas', a: '(a) Solid: has definite shape; particles are tightly packed.\n(b) Liquid: no fixed shape (takes shape of container); can pour/flow.\n(c) Gas: no fixed shape or volume; fills any container completely.' },
      { q: 'Give the correct material for each use and explain why:\n(a) Making a window  (b) Making a cooking spoon  (c) Making a school bag', a: '(a) Glass — it is transparent so you can see through it.\n(b) Wood or metal — wood does not conduct heat well; metal is strong and durable.\n(c) Cloth or plastic — flexible, lightweight and can hold items.' },
      { q: 'Name the state change in each situation:\n(a) Ice cream melting on a hot day\n(b) Wet clothes drying in the sun\n(c) Dew forming on leaves in the morning', a: '(a) Melting (solid → liquid).\n(b) Evaporation (liquid → gas).\n(c) Condensation (gas → liquid).' },
      { q: 'A mobile phone is made of glass, plastic and metal. Give ONE reason why each material is used.', a: 'Glass: transparent — used for the screen so you can see the display.\nPlastic: light and can be moulded into any shape — used for the casing.\nMetal: strong and conducts electricity — used for internal circuits and frame.' },
      { q: 'You mix sand and water together. Is this a mixture? How can you separate them?', a: 'Yes, this is a mixture. Sand and water keep their own properties and are not chemically joined.\nTo separate: use FILTERING — filter paper holds the sand while water passes through.' },
      { q: 'What happens to candle wax when you light a candle? When you blow it out? Name the processes.', a: 'When lit: wax near the flame MELTS (solid → liquid), then EVAPORATES/burns (liquid → gas).\nWhen blown out: the liquid wax FREEZES/SOLIDIFIES (liquid → solid) as it cools.' },
      { q: 'Give ONE example of an object in your home where each state of matter is useful:\n(a) a solid  (b) a liquid  (c) a gas', a: '(a) Solid: a table — solid wood gives it strength and a fixed shape to hold things.\n(b) Liquid: water — liquid form allows it to be poured, drunk and used for cooking.\n(c) Gas: cooking gas — gas flows through pipes easily and burns to produce heat for cooking.' },
      { q: 'Why can you pour water into any shaped container, but you cannot do the same with a stone?', a: 'Water is a LIQUID — its particles move freely and it has no fixed shape, so it takes the shape of whatever container it is put in. A stone is a SOLID — its particles are tightly packed in fixed positions, giving it a definite shape that cannot change without breaking.' },
      { q: 'Steam and ice are both made of water. What is different about them?', a: 'Steam is water in its GASEOUS state (very hot — particles move rapidly and spread out to fill any space). Ice is water in its SOLID state (very cold — particles vibrate slowly in fixed positions, giving it a definite shape). The difference is TEMPERATURE (and therefore the energy of the particles).' },
      { q: '[Challenge] When you breathe out on a cold morning, you can see a cloud of mist. Explain exactly what is happening using the words: water vapour, condensation, liquid, temperature.', a: 'When you breathe out, warm air from your lungs contains WATER VAPOUR (water in its gaseous state). When this warm, moist air meets the cold outside air, the TEMPERATURE drops rapidly. This causes the water vapour to lose energy and undergo CONDENSATION — it changes from a gas into tiny LIQUID water droplets. These tiny droplets are what you see as a cloud of mist or "steam" from your breath.' },
    ],
  },
  {
    dayNum: 7, subject: 'Mathematics',
    topic: 'Division: Sharing Equally & The Relationship with Multiplication',
    standard: 'B3.1.4.1',
    objectives: [
      'Understand division as equal sharing and as repeated subtraction',
      'Use the relationship between multiplication and division',
      'Divide a 2-digit number by a 1-digit number',
      'Solve word problems involving division',
    ],
    concepts: [
      {
        heading: 'Division as Equal Sharing',
        body: 'Division means sharing equally into groups.\n24 ÷ 6 = ? means: share 24 equally into 6 groups. Each group gets 4.\n\nDivision and multiplication are INVERSE operations — they undo each other:\nIf 6 × 4 = 24, then 24 ÷ 6 = 4 AND 24 ÷ 4 = 6\n\nCHECK a division answer using multiplication:\n72 ÷ 8 = 9. Check: 9 × 8 = 72 ✓',
        note: 'You cannot divide by ZERO. Division by 0 is undefined.',
      },
      {
        heading: 'Dividing a 2-digit Number by a 1-digit Number',
        body: 'Example: 84 ÷ 4\nStep 1: Divide the tens digit: 8 ÷ 4 = 2. Write 2 above the tens.\nStep 2: Divide the units digit: 4 ÷ 4 = 1. Write 1 above the units.\nAnswer: 21. Check: 21 × 4 = 84 ✓\n\nExample with remainder: 47 ÷ 5\nHow many times does 5 go into 47? 5 × 9 = 45. Remainder = 47 - 45 = 2.\nAnswer: 9 remainder 2 (written as 9 r 2)',
        note: null,
      },
    ],
    worked: [
      { q: 'Find: (a) 63 ÷ 7  (b) 54 ÷ 6  (c) 81 ÷ 9', a: '(a) 9  (b) 9  (c) 9. Check: 9×7=63 ✓, 9×6=54 ✓, 9×9=81 ✓.' },
      { q: 'Divide: 76 ÷ 4', a: '7÷4=1 remainder 3. Bring down 6: 36÷4=9. Answer: 19. Check: 19×4=76 ✓.' },
      { q: '48 mangoes are shared equally among 6 children. How many does each child get?', a: '48 ÷ 6 = 8 mangoes each.' },
    ],
    questions: [
      { q: 'Find: (a) 56 ÷ 8  (b) 72 ÷ 9  (c) 45 ÷ 5  (d) 64 ÷ 8', a: '(a) 7  (b) 8  (c) 9  (d) 8' },
      { q: 'Divide and find the remainder: (a) 50 ÷ 7  (b) 37 ÷ 4  (c) 53 ÷ 6', a: '(a) 7 r 1  (b) 9 r 1  (c) 8 r 5' },
      { q: 'Use a multiplication fact to FIND the answer:\n(a) ___ × 6 = 42 so 42 ÷ 6 = ___\n(b) ___ × 8 = 56 so 56 ÷ 8 = ___', a: '(a) 7 × 6 = 42 so 42 ÷ 6 = 7.\n(b) 7 × 8 = 56 so 56 ÷ 8 = 7.' },
      { q: '63 exercise books are shared equally among 9 pupils. How many does each pupil get?', a: '63 ÷ 9 = 7 exercise books each.' },
      { q: 'A farmer has 75 plantains. He puts 5 in each bag. How many bags does he fill?', a: '75 ÷ 5 = 15 bags.' },
      { q: 'GH₵96 is shared equally among 8 children. How much does each child get?', a: '96 ÷ 8 = GH₵12 each.' },
      { q: 'A minibus carries 8 passengers per trip. How many trips does it need to carry 56 passengers?', a: '56 ÷ 8 = 7 trips.' },
      { q: 'Find the missing number: (a) 42 ÷ ___ = 6  (b) ___ ÷ 7 = 9  (c) 64 ÷ 8 = ___', a: '(a) 7  (b) 63  (c) 8' },
      { q: 'Write a word problem that uses the fact 48 ÷ 6 = 8.', a: 'Accept any correct word problem. E.g.: "48 biscuits are shared equally among 6 children. How many biscuits does each child get? Answer: 8."' },
      { q: '[Challenge] Ivan has 85 stickers. He wants to put them in groups of 9. How many full groups will he have? How many stickers will be left over?', a: '85 ÷ 9 = 9 remainder 4. Ivan will have 9 full groups with 4 stickers left over. Check: 9×9=81, 81+4=85 ✓.' },
    ],
  },
  {
    dayNum: 8, subject: 'English',
    topic: 'Reading: Phonics, Digraphs, Diphthongs & Word Families',
    standard: 'B3.2.2.1–B3.2.5.1',
    objectives: [
      'Use digraphs (ch, sh, gh, ph) to build and read words',
      'Use diphthongs (ou, oi, au, ea) to build and read words',
      'Use consonant blends (bl, br, st, tr) to build words',
      'Decode unfamiliar words using letter-sound knowledge',
    ],
    concepts: [
      {
        heading: 'Digraphs — Two Letters, One Sound',
        body: 'A DIGRAPH is two letters that together make ONE sound.\n\nCH → church, chair, chicken, cheese, child, march\nSH → shirt, shoe, sheep, fish, wash, push\nGH → Ghana, ghost (silent in many words: night, right, light)\nPH → phone, photo, dolphin, alphabet (sounds like "f")\n\nPractice sentence: The PHONE is on the CHAIR near the CHURCH.',
        note: 'PH sounds like F: "photo" = "foto". This is important for spelling.',
      },
      {
        heading: 'Diphthongs & Consonant Blends',
        body: 'A DIPHTHONG is a vowel sound where your mouth MOVES from one position to another.\n\nOU → out, loud, cloud, found, shout, round, house, count\nOI → oil, coin, soil, point, noise, join, toilet, boil\nAU → because, sauce, cause, caught, taught, daughter\nEA → eat, meat, beach, tea, cream, dream, clean, read\n\nA consonant BLEND is when two or three consonants are blended together. Each consonant is still heard.\nBL → black, blue, blow, blend, block\nBR → bread, bring, brown, bridge, brush\nST → stone, star, stop, stand, street\nTR → tree, train, true, track, trip',
        note: 'Blend vs Digraph: In a blend, you hear BOTH letters (bl, br). In a digraph, the two letters make ONE new sound (ch, sh).',
      },
    ],
    worked: [
      { q: 'Add the correct digraph (ch, sh, gh, ph) to complete each word:\n(a) ___urch  (b) ___oto  (c) ___irt  (d) ni___t', a: '(a) church (ch)  (b) photo (ph)  (c) shirt (sh)  (d) night (gh — silent)' },
      { q: 'Build THREE words using the diphthong OU.', a: 'Any three: out, loud, cloud, found, shout, round, house, count, flour, mouth.' },
      { q: 'Complete these words with the correct consonant blend (bl, br, st, tr):\n(a) ___ack  (b) ___ead  (c) ___one  (d) ___ee', a: '(a) black (bl)  (b) bread (br)  (c) stone (st)  (d) tree (tr)' },
    ],
    questions: [
      { q: 'Build FIVE words using the digraph CH. Write one sentence using any two of your words.', a: 'Any five: church, chair, chicken, cheese, child, chain, chart, choose, chest, chin, chop, lunch, much, such, beach. Sentence should use two correctly.' },
      { q: 'Build FOUR words using the digraph SH. Write one sentence.', a: 'Any four: shirt, shoe, sheep, fish, ship, shop, shelf, she, shut, bush, push, wash, flash, crash.' },
      { q: 'The letters PH make the sound of F. Write THREE words where PH sounds like F.', a: 'Any three: phone, photo, phrase, dolphin, alphabet, phonics, elephant, graph, trophy, Philip.' },
      { q: 'Build FOUR words using the diphthong OI.', a: 'Any four: oil, coin, soil, point, noise, join, toilet, boil, foil, void, moist, hoist.' },
      { q: 'Build FOUR words using the diphthong EA (as in "eat").', a: 'Any four: eat, meat, beach, tea, cream, dream, clean, read, lead, heat, seal, meal, deal, real.' },
      { q: 'Complete these sentences with a word containing a consonant blend:\n(a) The ___ crossed the river. (tr)\n(b) The sky was ___ today. (bl)\n(c) The ___ hurt his foot. (st)', a: '(a) train/truck/traveller crossed the river.\n(b) blue/blank/bleak sky.\n(c) striker/student/stumbler hurt his foot. (Accept any correct blend word.)' },
      { q: 'Write a short paragraph (3–4 sentences) using at least: ONE digraph word, ONE diphthong word and ONE blend word. Underline each one.', a: 'Accept any paragraph with all three types correctly underlined. E.g.: "The [church] was near the [blue] river. I [found] a coin outside. It was a [shiny] and beautiful day."' },
      { q: 'Sort these words into the correct column:\nchair, train, phone, cloud, beach, blue, oil, church, stone, bread\nDIGRAPH | DIPHTHONG | BLEND', a: 'DIGRAPH: chair (ch), phone (ph), church (ch).\nDIPHTHONG: cloud (ou), beach (ea), oil (oi).\nBLEND: train (tr), blue (bl), stone (st), bread (br).' },
      { q: 'Use prefixes (un-, re-, pre-) to make new words from:\n(a) happy  (b) play  (c) school', a: '(a) unhappy  (b) replay  (c) preschool' },
      { q: '[Challenge] The word "enough" contains GH making the sound F. The word "night" contains GH that is silent. Find TWO more words where GH is silent and TWO more where GH sounds like F.', a: 'GH silent: light, right, might, fight, sight, bright, knight, daughter, thought, through.\nGH sounds like F: rough, tough, cough, laugh, draught.\n(Accept any two correct examples from each group.)' },
    ],
  },
  {
    dayNum: 9, subject: 'Mathematics',
    topic: 'Fractions: Halves, Quarters, Thirds & Simple Fractions',
    standard: 'B3.1.5.1',
    objectives: [
      'Understand a fraction as equal parts of a whole',
      'Read and write simple fractions: ½, ¼, ¾, ⅓, ⅔',
      'Compare simple fractions',
      'Find a fraction of a quantity',
    ],
    concepts: [
      {
        heading: 'What is a Fraction?',
        body: 'A fraction is a part of a WHOLE that has been divided into EQUAL parts.\n\nA fraction has two parts:\n• NUMERATOR (top): how many parts you have\n• DENOMINATOR (bottom): how many EQUAL parts the whole is divided into\n\nExample: ¾ means the whole is cut into 4 equal parts and you have 3 of them.\n\nImportant fractions to know:\n½ = one half (2 equal parts, take 1)\n¼ = one quarter (4 equal parts, take 1)\n¾ = three quarters (4 equal parts, take 3)\n⅓ = one third (3 equal parts, take 1)',
        note: 'The denominator shows how many EQUAL parts. If the parts are not equal, it is NOT a fraction.',
      },
      {
        heading: 'Finding a Fraction of a Quantity',
        body: 'To find a fraction of a number:\nDIVIDE by the denominator, then MULTIPLY by the numerator.\n\nExample: Find ¾ of 24.\nStep 1: Divide by denominator: 24 ÷ 4 = 6\nStep 2: Multiply by numerator: 6 × 3 = 18\nAnswer: ¾ of 24 = 18\n\nExample: Find ⅓ of 30.\n30 ÷ 3 = 10. So ⅓ of 30 = 10.',
        note: "'OF' in maths means MULTIPLY. So ¾ of 24 = ¾ × 24.",
      },
    ],
    worked: [
      { q: 'What fraction is shaded?\n(a) A shape cut into 4 equal parts with 1 shaded.\n(b) A shape cut into 6 equal parts with 5 shaded.', a: '(a) ¼ (one quarter)  (b) 5/6 (five sixths)' },
      { q: 'Find: (a) ½ of 48  (b) ¼ of 36  (c) ⅓ of 27', a: '(a) 48÷2=24  (b) 36÷4=9  (c) 27÷3=9' },
      { q: 'In a class of 32 pupils, ¾ are present today. How many pupils are present?', a: '32÷4=8. Then 8×3=24 pupils are present.' },
    ],
    questions: [
      { q: 'Write the fraction for each:\n(a) Three out of five equal parts\n(b) Seven out of eight equal parts\n(c) One out of three equal parts', a: '(a) 3/5  (b) 7/8  (c) ⅓' },
      { q: 'Write these fractions in words:\n(a) ½  (b) ¾  (c) 2/5  (d) 3/8', a: '(a) one half  (b) three quarters  (c) two fifths  (d) three eighths' },
      { q: 'Compare using > or <:\n(a) ½ ___ ¼\n(b) ¾ ___ ⅔\n(c) ⅓ ___ ½', a: '(a) ½ > ¼  (b) ¾ > ⅔  (c) ⅓ < ½' },
      { q: 'Find:\n(a) ½ of 60  (b) ¼ of 48  (c) ⅓ of 45  (d) ¾ of 40', a: '(a) 30  (b) 12  (c) 15  (d) 30' },
      { q: 'There are 24 oranges in a basket. Ivan eats ⅓ of them. How many oranges are left?', a: '⅓ of 24 = 24÷3 = 8 eaten. 24 - 8 = 16 oranges left.' },
      { q: 'A journey is 60 km. After travelling ¾ of the way, how far have you gone? How much is left?', a: '¾ of 60 = 60÷4×3 = 45 km gone. 60 - 45 = 15 km left.' },
      { q: 'Write the fraction that is NOT the same as the others: ½, 4/8, 3/6, 2/6. Explain your answer.', a: '2/6 is NOT the same. ½ = 4/8 = 3/6 (all equal ½). But 2/6 = ⅓, which is different from ½.' },
      { q: 'A chocolate bar is divided into 8 equal pieces. Ama eats 3 pieces and Kofi eats 2 pieces. What fraction of the bar is left?', a: 'Eaten: 3+2=5 pieces. Left: 8-5=3 pieces. Fraction left: 3/8.' },
      { q: 'What fraction of one hour is 20 minutes? Show your working.', a: '1 hour = 60 minutes. 20/60 = ⅓. So 20 minutes is ⅓ of one hour.' },
      { q: '[Challenge] Ivan scored ¾ of his marks in a test. His brother Declyn scored 4/5 of his marks. Who scored a higher FRACTION? Explain how you know.', a: 'Compare ¾ and 4/5. LCD=20: ¾=15/20. 4/5=16/20. 16>15 so 4/5>¾.\nDeclyn scored a higher fraction (4/5 > ¾).' },
    ],
  },
  {
    dayNum: 10, subject: 'Science',
    topic: 'Earth Science: The Sun, Seasons, Precipitation & Water',
    standard: 'B3.2.1.1–B3.2.1.4',
    objectives: [
      'Describe cyclic events: day and night, wet and dry seasons',
      'Explain the importance of the sun to life on Earth',
      'Identify types of precipitation and describe the differences',
      'Explain what makes water impure and why clean water matters',
    ],
    concepts: [
      {
        heading: 'Cyclic Events — Things That Happen Over and Over',
        body: 'A CYCLE is a series of events that repeat in the same order.\n\nExamples of natural cycles:\n• DAY AND NIGHT: the Earth rotates on its axis. One full rotation = 24 hours. Day = side facing the sun. Night = side facing away.\n• WET AND DRY SEASONS: caused by the Earth\'s movement around the Sun. In Ghana: Major rainy season (April–July), dry season (November–March).\n• YEARLY CYCLES: crop planting seasons, school terms, Independence Day (6th March).',
        note: "The Earth does NOT move closer to the Sun in summer — it is the TILT of the Earth that causes seasons.",
      },
      {
        heading: 'The Importance of the Sun & Water',
        body: 'The Sun provides:\n• LIGHT: makes it possible to see during the day\n• HEAT/WARMTH: warms the Earth and allows life to exist\n• ENERGY for plants: powers PHOTOSYNTHESIS (how plants make food)\n• SOLAR ENERGY: used in solar panels to generate electricity\n• Drives the WATER CYCLE: sun\'s heat causes evaporation\n\nPRECIPITATION — water falling from clouds:\n• RAIN: liquid water droplets — most common in Ghana\n• HAIL: balls of ice that fall during storms\n• SNOW: frozen water crystals (cold countries — not Ghana)\n• SLEET: mix of rain and snow\n\nCLEAN WATER: no colour, no bad smell, no solid particles.\nThings that make water IMPURE: flooding, mining chemicals, littering, industrial waste, pesticides.',
        note: 'Drinking impure water causes diseases like cholera, typhoid and diarrhoea.',
      },
    ],
    worked: [
      { q: 'Explain why we have day and night.', a: 'The Earth rotates on its axis once every 24 hours. The side facing the Sun receives sunlight — this is DAY. The side facing away is in darkness — this is NIGHT. As the Earth rotates, day and night alternate.' },
      { q: 'Give THREE ways the Sun is important to people in Ghana.', a: 'Any three: provides light for daily activities; provides heat that warms the Earth; enables plants to photosynthesize and produce food; dries crops, fish and cocoa beans after harvesting; solar panels use sunlight to generate electricity; drives the water cycle.' },
      { q: 'Name the types of precipitation and explain which is most common in Ghana.', a: 'Types: rain, hail, snow, sleet. Rain is most common in Ghana because Ghana is a tropical country with warm temperatures. Snow and sleet require very cold temperatures and do not occur in Ghana.' },
    ],
    questions: [
      { q: 'What is a CYCLIC EVENT? Give THREE examples of natural cyclic events.', a: 'A cyclic event is something that happens repeatedly in the same order. Examples: day and night, wet and dry seasons, the water cycle, tides, yearly crop seasons.' },
      { q: 'Explain the difference between the WET season and the DRY season in Ghana.', a: 'Wet season (April–July): heavy rainfall, high humidity, good for farming, rivers full.\nDry season (November–March): little or no rain, hot and dry, Harmattan wind blows from the Sahara, rivers may shrink.' },
      { q: 'What would happen to life on Earth if the Sun suddenly disappeared? Give THREE effects.', a: 'Any three: all light disappears — darkness everywhere; temperatures drop to -270°C — all life freezes; plants cannot photosynthesize — all plants die; food chains collapse — all animals starve; water freezes solid — no liquid water.' },
      { q: 'What is PRECIPITATION? Name ALL FOUR types and describe each briefly.', a: 'Precipitation is water falling from clouds to the earth\'s surface.\nRain: liquid water droplets — most common.\nHail: balls of ice formed in storm clouds.\nSnow: frozen ice crystals that fall in cold countries.\nSleet: a mix of rain and snow.' },
      { q: 'Describe the properties of CLEAN drinking water.', a: 'Clean drinking water: clear (no colour), no bad or unusual smell, no taste, free from solid particles, free from harmful bacteria and chemicals.' },
      { q: 'Give FOUR things that can pollute a river in Ghana.', a: 'Any four: illegal gold mining (galamsey) chemicals; plastic waste dumped in gutters; industrial waste from factories; agricultural pesticides and fertilisers; sewage/human waste; flooding carrying rubbish.' },
      { q: 'Why is it dangerous to drink water from a river near a mining area?', a: 'Mining releases toxic chemicals (mercury, cyanide) and sediment into rivers. These chemicals cannot be seen, smelled or tasted in the water but cause serious diseases including mercury poisoning, kidney damage and cancer when consumed.' },
      { q: 'How does the Sun drive the WATER CYCLE? Explain each stage briefly.', a: "Sun's heat causes EVAPORATION — water from oceans/rivers turns to vapour and rises. As vapour rises it cools → CONDENSATION into clouds. When droplets join and become heavy → PRECIPITATION falls as rain. Water collects in rivers/ground → COLLECTION. Sun's heat starts the cycle again." },
      { q: 'Design a poster (describe it in words) showing people in your community how to keep water sources clean. Include a title, TWO images and TWO key messages.', a: 'Accept any creative response with: a clear title (e.g. "Keep Our Water Clean"), two relevant images described (e.g. person throwing rubbish away from river; tap with clean water flowing), two clear messages (e.g. "Never dump rubbish in rivers or gutters!" and "Report illegal mining near water sources!").' },
      { q: '[Challenge] Ghana has both a wet season and a dry season. Explain how the water cycle helps farmers during the dry season, and what happens when the water cycle is disrupted by deforestation.', a: 'During the dry season: the water cycle recharges underground water (aquifers) during the wet season; farmers can access this water through wells and boreholes for irrigation. Deforestation disrupts the water cycle because trees contribute to the cycle through transpiration — releasing water vapour that forms clouds and rain. Fewer trees = less transpiration = less water vapour = less rainfall. This makes dry seasons longer and droughts more severe, threatening crops and livestock.' },
    ],
  },
]

async function seedPacks() {
  console.log('🌱 Seeding Ivan Days 1–10 packs...\n')
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
  console.log('\n✅ Ivan Days 1–10 packs seeded!')
  process.exit(0)
}
seedPacks().catch(err => { console.error('❌', err); process.exit(1) })
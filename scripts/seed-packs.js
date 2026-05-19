// scripts/seed-packs.js
// Seeds Days 11–20 pack content into Firestore
// Run: node scripts/seed-packs.js

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
    dayNum: 11,
    subject: 'Mathematics',
    topic: 'Fractions: Multiply & Divide',
    standard: 'B7.1.3.3.1–B7.1.3.3.4',
    objectives: [
      'Multiply a fraction by a whole number and by another fraction',
      'Divide a fraction by a whole number and by another fraction using the reciprocal',
      'Find a fraction of a quantity (money, length, weight)',
      'Solve word problems involving multiplication and division of fractions',
    ],
    concepts: [
      {
        heading: 'Multiplying Fractions',
        body: 'To multiply fraction × fraction: multiply the numerators together and the denominators together, then simplify.\nExample: 2/3 × 3/5 = (2×3)/(3×5) = 6/15 = 2/5\n\nTo find a fraction OF a quantity, multiply:\nExample: 2/3 of GH₵60 = 2/3 × 60 = GH₵40\n\nTo find a percentage of a quantity:\nExample: 28% of 40 = 28/100 × 40 = 11.2',
        note: "'OF' means multiply. So '3/4 of 80' = 3/4 × 80 = 60.",
      },
      {
        heading: 'Dividing Fractions — The Reciprocal Method',
        body: 'To divide by a fraction, multiply by its RECIPROCAL (flip the fraction upside down).\nExample: 3 ÷ 1/4 = 3 × 4/1 = 12\nExample: 5/8 ÷ 1/2 = 5/8 × 2/1 = 10/8 = 5/4 = 1¼\n\nThe reciprocal of 3/5 is 5/3. The reciprocal of 4 is 1/4.',
        note: 'Keep the first fraction. Change ÷ to ×. Flip the second fraction. Then multiply.',
      },
    ],
    worked: [
      { q: 'Find: (a) 3/8 × 480  (b) 2/3 × 3/5 × 5/4  (c) 3½% of GH₵50', a: '(a) 3×480÷8 = 180  (b) (2×3×5)/(3×5×4) = 30/60 = 1/2  (c) 3.5/100 × 50 = GH₵1.75' },
      { q: 'There are 132 learners in a school. 2/3 are girls. How many boys?', a: 'Girls = 2/3 × 132 = 88. Boys = 132 - 88 = 44 boys.' },
      { q: 'A stack of plates weighs 10 kg. Each plate weighs 1/4 kg. How many plates?', a: '10 ÷ 1/4 = 10 × 4 = 40 plates.' },
    ],
    questions: [
      { q: 'Find: (a) 3/5 × 75  (b) 2/3 × 240  (c) 5/8 × 160', a: '(a) 45  (b) 160  (c) 100' },
      { q: 'Find: (a) 2/3 × 3/4  (b) 5/6 × 3/5  (c) 7/8 × 4/7', a: '(a) 1/2  (b) 1/2  (c) 1/2' },
      { q: 'Mrs Armah bought 45.75m of cloth for her 5 children equally. How much does each child get?', a: '45.75 ÷ 5 = 9.15m' },
      { q: 'Divide: (a) 3 ÷ 1/4  (b) 5/8 ÷ 1/2  (c) 6 ÷ 2/3', a: '(a) 12  (b) 5/4 = 1¼  (c) 9' },
      { q: 'A class shares 9½ litres of juice equally among 38 students. How many ml does each student get?', a: '9½ = 19/2. 19/2 ÷ 38 = 1/4 litre = 250ml' },
      { q: 'A salesman earns 35% commission on his sales. How much commission on GH₵700 sales?', a: '35/100 × 700 = GH₵245' },
      { q: 'A phone costs GH₵450. It is on sale at 40% off. How much do you pay?', a: '40% of 450 = 180. 450 - 180 = GH₵270' },
      { q: 'Calculate 8.25% of GH₵62.', a: '8.25/100 × 62 = GH₵5.115' },
      { q: '2/5 of a class are boys. There are 18 boys. How many students are in the class?', a: '2/5=18 → 1/5=9 → 5/5=45 students' },
      { q: '[Challenge] Yaw paid GH₵80 for a shirt after a 20% discount. What was the original price?', a: '80% = GH₵80 → 1% = GH₵1 → 100% = GH₵100' },
    ],
  },
  {
    dayNum: 12,
    subject: 'English',
    topic: 'Reading Comprehension: Finding Meaning in Texts',
    standard: 'B7.2.1.1.1–B7.2.1.1.4',
    objectives: [
      'Read a text carefully and identify the main idea and supporting details',
      'Use prediction strategies to improve understanding before and during reading',
      'Answer comprehension questions using evidence from the text',
      'Summarise a passage in your own words',
    ],
    concepts: [
      {
        heading: 'Strategies for Understanding a Text',
        body: 'Before you read:\n• PREDICT: Look at the title, headings and pictures. What do you think the text is about?\n• PURPOSE: Why are you reading? To find information? To enjoy a story?\n\nWhile you read:\n• VISUALISE: Create a picture in your mind.\n• QUESTION: Ask yourself — Who? What? Where? When? Why? How?\n• MONITOR: If something does not make sense, re-read that section.\n\nAfter you read:\n• SUMMARISE: Retell the main points in your own words.\n• EVALUATE: What did the author want you to think or feel?',
        note: 'Always read the questions FIRST before reading the passage — it helps you know what to look for.',
      },
      {
        heading: 'Main Idea vs Supporting Details',
        body: 'The MAIN IDEA is what the whole text (or paragraph) is mostly about — the central message.\nSUPPORTING DETAILS are the facts, examples and explanations that back up the main idea.\n\nHow to find the main idea:\n1. Read the topic sentence (usually the first sentence of a paragraph)\n2. Ask: "What is most of this paragraph talking about?"\n3. Check if the other sentences support that idea\n\nExample: "Water is essential for all life on Earth. Humans need it to drink, cook and bathe. Plants use water for photosynthesis. Animals depend on it for survival."\nMain idea: Water is essential for all life.',
        note: 'The main idea is rarely stated as "this paragraph is about..." — you must infer it from the content.',
      },
    ],
    worked: [
      {
        q: 'Read this passage: "Ghana is known as the Gateway to Africa. It gained independence on March 6, 1957, becoming the first sub-Saharan African country to achieve independence. Kwame Nkrumah became a symbol of African liberation. Today Ghana is celebrated for its political stability, thriving cocoa industry and vibrant culture."\n\n(a) What is the main idea?  (b) Give TWO supporting details.',
        a: '(a) Ghana is a historically significant and celebrated West African nation.\n(b) Any two: First sub-Saharan country to gain independence (1957). Nkrumah was a symbol of African liberation. Known for political stability and cocoa industry.',
      },
      {
        q: 'Summarise the Ghana passage above in TWO sentences using your own words.',
        a: 'Ghana is a West African country with a proud history, having been the first country south of the Sahara to win independence in 1957 under Kwame Nkrumah. Today it is known for its democratic stability, cocoa farming and rich culture.',
      },
    ],
    questions: [
      { q: 'Read the passage carefully, then answer all questions.\n\nTHE IMPORTANCE OF TREES\nTrees are among the most valuable living things on our planet. They provide oxygen for all animals to breathe, and absorb carbon dioxide — a harmful greenhouse gas — helping to combat climate change. Trees also provide shade, food and shelter for countless animals and insects.\n\nIn Ghana, trees play an especially important role. Cocoa trees support the livelihoods of millions of farming families and are the backbone of Ghana\'s export economy. Neem trees provide traditional medicinal benefits, while shea trees produce shea butter — a valuable product in both local cooking and the international cosmetics industry.\n\nDespite their importance, Ghana\'s forests are under threat from illegal logging, bush burning and the expansion of farmland. Scientists warn that continued deforestation could lead to reduced rainfall, soil erosion and the loss of biodiversity. It is therefore essential that Ghanaians protect and replant trees for the benefit of future generations.\n\nQ1: What is the main idea of the FIRST paragraph?', a: 'Trees are among the most valuable living things on our planet — they provide oxygen, absorb CO₂ and support animal life.' },
      { q: 'Name THREE specific trees mentioned in the passage and state ONE benefit of each.', a: '(a) Cocoa — supports livelihoods and export economy. (b) Neem — medicinal benefits. (c) Shea — produces shea butter for cooking and cosmetics.' },
      { q: 'According to the passage, what are THREE threats to Ghana\'s forests?', a: '(a) Illegal logging  (b) Bush burning  (c) Expansion of farmland' },
      { q: 'What could happen if deforestation continues? Give TWO consequences from the passage.', a: '(a) Reduced rainfall  (b) Soil erosion  (Also accept: loss of biodiversity)' },
      { q: 'What does the word "deforestation" mean as used in the passage?', a: 'The large-scale clearing or removal of trees and forests.' },
      { q: 'The writer says it is "essential that Ghanaians protect AND replant trees". Why does the writer say "replant" and not just "protect"?', a: 'Many trees have already been destroyed — protecting existing trees cannot replace what is lost. New trees must be planted to restore forests.' },
      { q: 'Write a summary of the ENTIRE passage in 3–4 sentences using your own words.', a: '3–4 sentences covering: trees globally (oxygen, CO₂), Ghana\'s specific trees (cocoa, neem, shea), threats (logging, burning, farming), and call to protect and replant.' },
      { q: 'Do you agree that trees should be protected? Write 2–3 sentences giving your own opinion with a reason from the passage AND one reason from your own experience.', a: 'Clear opinion stated + one reason from passage + one personal reason. Accept any well-reasoned response.' },
      { q: 'The passage uses the phrase "backbone of Ghana\'s export economy". What does this phrase mean?', a: 'The central support/most important foundation of Ghana\'s export trade — without cocoa the economy would collapse.' },
      { q: '[Challenge] The writer ends with "...for the benefit of future generations." Who are "future generations" and why does the writer appeal to them at the end of the passage?', a: 'Future generations = people not yet born. The writer appeals to them to create urgency — decisions made today about trees will directly affect what future people inherit. It gives the reader a sense of responsibility beyond themselves.' },
    ],
  },
  {
    dayNum: 13,
    subject: 'Mathematics',
    topic: 'Ratios: Language, Unit Rate & Equivalent Ratios',
    standard: 'B7.1.4.1.1–B7.1.4.1.3',
    objectives: [
      'Write and simplify ratios using the correct language and notation',
      'Calculate unit rates from given information',
      'Find missing values in equivalent ratio tables',
      'Solve sharing problems using ratio',
    ],
    concepts: [
      {
        heading: 'What is a Ratio?',
        body: 'A ratio compares two or more quantities of the same kind. It can be written as: a:b or a/b or "a to b".\n\nExample: In a class of 60 boys and 120 girls:\nRatio of boys to girls = 60:120 = 1:2 (simplify by dividing both by HCF = 60)\n\nIMPORTANT: Order matters. Boys:Girls = 1:2 is NOT the same as Girls:Boys = 2:1.\n\nTo simplify a ratio: divide both parts by their HCF.\nExample: 45:75. HCF = 15. Simplified: 3:5.',
        note: 'A ratio has NO units — convert both quantities to the same unit first before writing the ratio.',
      },
      {
        heading: 'Unit Rate',
        body: 'A unit rate compares a quantity to ONE unit of another quantity.\n\nExample: If 2 litres of cola cost GH₵18:\nUnit rate = GH₵18 ÷ 2 = GH₵9 per litre\n\nUse the unit rate to find other values:\n• Cost of 1.5 litres = 1.5 × 9 = GH₵13.50\n• Cost of 7 litres = 7 × 9 = GH₵63',
        note: null,
      },
      {
        heading: 'Sharing in a Ratio',
        body: 'To share an amount in a given ratio:\nStep 1: Add the ratio parts to find the total number of parts.\nStep 2: Divide the amount by the total parts to find one part.\nStep 3: Multiply each ratio number by one part.\n\nExample: Kofi and Ama share GH₵360 in ratio 3:5.\nTotal parts = 3 + 5 = 8. One part = 360 ÷ 8 = GH₵45.\nKofi = 3 × 45 = GH₵135. Ama = 5 × 45 = GH₵225.',
        note: 'Check: 135 + 225 = 360 ✓. Always verify your answer adds back to the original amount.',
      },
    ],
    worked: [
      { q: 'Write the ratio 1.5 m to 60 cm in its simplest form.', a: 'Convert to same units: 1.5m = 150cm. Ratio = 150:60. HCF = 30. Simplified = 5:2.' },
      { q: 'If 3 kg of meat costs GH₵60, find the cost of 7 kg.', a: 'Unit rate = 60 ÷ 3 = GH₵20/kg. Cost of 7 kg = 7 × 20 = GH₵140.' },
      { q: 'Kafui (36), Adoley (48) and Jantuah (24) share money in ratio of their ages. Jantuah gets GH₵24,000. How much altogether?', a: 'Ratio = 36:48:24 = 3:4:2. Total parts = 9. Jantuah = 2 parts = GH₵24,000. 1 part = GH₵12,000. Total = 9 × 12,000 = GH₵108,000.' },
    ],
    questions: [
      { q: 'Simplify these ratios: (a) 45:75  (b) 56:84  (c) 120:180', a: '(a) 3:5  (b) 2:3  (c) 2:3' },
      { q: 'Express as a ratio in its simplest form: 500g to 2kg.', a: '500g : 2000g = 1:4' },
      { q: 'Find the missing value: (a) 3/10 = ?/30  (b) 6/y = 30/40  (c) 4/5 = 20/?', a: '(a) 9  (b) y=8  (c) 25' },
      { q: 'Aisha polishes 8 square yards of floor every 7 minutes. What is her rate per minute?', a: '8/7 = 1⅐ square yards per minute' },
      { q: '5 kg of tomatoes cost GH₵40. Find the cost of 8 kg.', a: 'Unit rate = 40÷5 = GH₵8/kg. 8×8 = GH₵64' },
      { q: 'Kofi and Ama share GH₵500 in ratio 3:7. How much does each get?', a: 'Total parts = 10. One part = GH₵50. Kofi = 3×50 = GH₵150. Ama = 7×50 = GH₵350.' },
      { q: 'The ratio of Musa\'s age to his father\'s age is 1:3. His father is 45. How old is Musa?', a: '1 part = 45÷3 = 15. Musa is 15 years old.' },
      { q: 'Workers\' field trip breakfast costs GH₵3 per worker. Complete the table for Workers: 1,2,3,4,5,10,40', a: 'Cost: 3, 6, 9, 12, 15, 30, 120. Rule: cost = 3 × workers.' },
      { q: 'A recipe uses 3 cups of flour to 2 cups of sugar. How many cups of flour are needed for 10 cups of sugar?', a: 'Ratio 3:2. For 10 cups sugar: 3/2 = x/10. x = 15 cups flour.' },
      { q: '[Challenge] Three friends share GH₵4,200 in ratio 2:3:7. How much does each person get?', a: 'Total parts = 12. One part = GH₵350. Person A: GH₵700. Person B: GH₵1,050. Person C: GH₵2,450.' },
    ],
  },
  {
    dayNum: 14,
    subject: 'Science',
    topic: 'Life Cycle of the Housefly: Stages, Habits & Health Risks',
    standard: 'B7.2.2.1.1–B7.2.2.1.2',
    objectives: [
      'Describe the complete life cycle of the housefly (egg → larva → pupa → adult)',
      'Explain how the housefly transmits diseases to humans',
      'Identify the housefly as a menace to human health',
      'Describe practices that prevent housefly infestation',
    ],
    concepts: [
      {
        heading: 'The Life Cycle of the Housefly (Complete Metamorphosis)',
        body: 'The housefly undergoes COMPLETE METAMORPHOSIS — four distinct stages:\n\n1. EGG: Female lays 100–150 eggs on decaying matter, rubbish or food waste. Eggs hatch within 8–24 hours.\n\n2. LARVA (Maggot): Legless, white maggot. Feeds on decaying matter. Moults (sheds skin) twice over 4–8 days.\n\n3. PUPA: The larva forms a hard brown case (puparium). Body completely reorganises over 3–6 days. No feeding occurs.\n\n4. ADULT: Emerges, can fly within hours, ready to mate in 2–3 days. Lives 2–4 weeks.\n\nThe entire life cycle can be completed in as little as 7–10 days in warm conditions.',
        note: 'Complete metamorphosis = 4 stages: Egg → Larva → Pupa → Adult. (Incomplete metamorphosis: Egg → Nymph → Adult — 3 stages.)',
      },
      {
        heading: 'How the Housefly is a Menace to Human Health',
        body: 'Houseflies are dangerous because they:\n• Land on FILTH (faeces, garbage, decaying food) and pick up disease-causing pathogens on their legs, body and mouthparts.\n• Then land on HUMAN FOOD and transfer these pathogens, contaminating the food.\n• Regurgitate digestive fluids onto food before eating it — spreading pathogens directly.\n\nDiseases spread by houseflies:\n• Cholera (severe diarrhoea)\n• Typhoid fever (high fever, abdominal pain)\n• Dysentery (blood in stool)\n• Food poisoning (Salmonella, E. coli)\n• Eye infections (trachoma)',
        note: 'One housefly can carry over 1 million bacteria. A fly that lands on your food has almost certainly also landed on something dirty.',
      },
      {
        heading: 'Preventing Housefly Infestation',
        body: '• Cover all food at all times.\n• Dispose of garbage in sealed bins.\n• Keep kitchens and toilets clean and dry.\n• Use fly screens on windows and doors.\n• Use insecticides or fly traps where necessary.\n• Clear stagnant water and decaying matter from around the home.\n• Wash hands thoroughly with soap before handling food.',
        note: null,
      },
    ],
    worked: [
      { q: 'Draw and label the four stages of the housefly life cycle.', a: 'Cycle: EGG (white, laid in clusters on waste) → LARVA/MAGGOT (legless, white, feeds on waste) → PUPA (hard brown case, no feeding) → ADULT FLY (wings, compound eyes, 6 legs) → back to EGG.' },
      { q: 'Explain how a housefly can cause a person to get typhoid fever.', a: 'A housefly lands on faeces containing Salmonella Typhi bacteria. The bacteria stick to the fly\'s legs and mouthparts. The fly lands on food being prepared. When the person eats the food, the bacteria cause typhoid fever — high fever and severe abdominal pain.' },
    ],
    questions: [
      { q: 'Name the FOUR stages of the housefly life cycle in the correct order.', a: 'Egg → Larva (Maggot) → Pupa → Adult' },
      { q: 'At which stage does the housefly NOT eat? Explain why.', a: 'The PUPA stage. The larva is enclosed in a hard case (puparium) while its body completely reorganises into the adult form — no feeding structures are available.' },
      { q: 'Where does the female housefly typically lay its eggs? Why does she choose these places?', a: 'On decaying matter, animal waste, garbage and food waste. These places provide warmth and a food source for the hatching larvae.' },
      { q: 'Give THREE diseases that houseflies can transmit to humans.', a: 'Any three: Cholera, Typhoid fever, Dysentery, Food poisoning (Salmonella/E.coli), Eye infections (trachoma).' },
      { q: 'Explain TWO ways in which a housefly contaminates food.', a: '(1) It lands on filth then walks on food, transferring pathogens from its legs and body. (2) It regurgitates digestive fluids (vomit) onto food before eating it, spreading pathogens directly.' },
      { q: 'Why is it important to cover food even when you are at home and the house appears clean?', a: 'Houseflies can enter through gaps and breed in any organic waste. A fly that appears clean may have landed on waste elsewhere. Disease is transferred invisibly — one landing can contaminate food.' },
      { q: 'Give FOUR practical steps a family in Kumasi can take to reduce housefly infestation in their home.', a: 'Any four: Cover food, seal rubbish bins, install fly screens, clear stagnant water, use fly traps, keep kitchen clean, wash hands before food handling.' },
      { q: 'What is the difference between complete metamorphosis and incomplete metamorphosis?', a: 'Complete = 4 stages: Egg→Larva→Pupa→Adult (e.g. housefly, butterfly). The larva looks nothing like the adult. Incomplete = 3 stages: Egg→Nymph→Adult (e.g. grasshopper, cockroach). The nymph resembles a small adult.' },
      { q: 'Why can housefly populations grow very rapidly in warm weather?', a: 'Warm temperatures speed up development — the life cycle can be completed in as little as 7–10 days. More warmth = faster egg hatching, faster larval growth, faster pupation. A single female can lay hundreds of eggs in her lifetime.' },
      { q: '[Challenge] A student argues: "We should just kill all houseflies with strong insecticide — problem solved." Discuss whether this is a good long-term solution and suggest a better approach.', a: 'NOT a good long-term solution: flies develop resistance to insecticides; insecticides harm other insects (bees), wildlife and humans; breeding sites remain. Better approach: integrated pest management — eliminate breeding sites (cover waste, clean up), use physical barriers (fly screens), targeted traps, combined with selective insecticide use only when necessary.' },
    ],
  },
  {
    dayNum: 15,
    subject: 'Mathematics',
    topic: 'Proportion & Percentage as Rate per 100',
    standard: 'B7.1.4.1.4–B7.1.4.1.5',
    objectives: [
      'Use proportional reasoning to solve missing value problems',
      'Express one quantity as a percentage of another',
      'Find percentage increase and decrease',
      'Calculate simple interest using the formula',
    ],
    concepts: [
      {
        heading: 'Proportional Reasoning',
        body: 'Two quantities are in proportion if their ratio stays the same.\nDirect proportion: as one increases, the other increases by the same factor.\n\nExample: 5 kg costs GH₵40. Find cost of 8 kg.\nUnit rate: 40 ÷ 5 = GH₵8/kg. Cost of 8 kg = 8 × 8 = GH₵64.\n\nCross-multiplication method:\n5/40 = 8/x → 5x = 40 × 8 = 320 → x = 64',
        note: null,
      },
      {
        heading: 'Percentage: Express, Increase & Decrease',
        body: 'Express A as a % of B: (A ÷ B) × 100\nExample: Express 45 as a % of 180: (45 ÷ 180) × 100 = 25%\n\nPERCENTAGE INCREASE:\n% increase = (increase ÷ original) × 100\nExample: Price rises from GH₵80 to GH₵100. Increase = 20. % increase = (20 ÷ 80) × 100 = 25%\n\nPERCENTAGE DECREASE:\n% decrease = (decrease ÷ original) × 100\nExample: Salary drops from GH₵500 to GH₵400. Decrease = 100. % decrease = (100 ÷ 500) × 100 = 20%',
        note: null,
      },
      {
        heading: 'Simple Interest',
        body: 'Simple Interest (SI) = Principal × Rate × Time ÷ 100\nOr: SI = P × R × T / 100\n\nExample: Invest GH₵1,500 at 8% per year for 2 years.\nSI = 1500 × 8 × 2 ÷ 100 = GH₵240\nTotal amount = 1500 + 240 = GH₵1,740\n\nTo find the Principal if given SI, Rate and Time:\nP = SI × 100 ÷ (R × T)',
        note: 'Simple interest is calculated on the ORIGINAL amount (principal) only. It does not compound.',
      },
    ],
    worked: [
      { q: 'A woman saves GH₵520 at 6% interest for 1 year. How much interest does she earn?', a: 'SI = 520 × 6 × 1 ÷ 100 = GH₵31.20' },
      { q: 'A shirt was GH₵120. It is now GH₵150. What is the percentage increase?', a: 'Increase = 30. % increase = (30 ÷ 120) × 100 = 25%' },
      { q: 'Express 75 as a percentage of 300.', a: '(75 ÷ 300) × 100 = 25%' },
    ],
    questions: [
      { q: 'Express: (a) 18 as a % of 90  (b) 35 as a % of 140  (c) 12 as a % of 48', a: '(a) 20%  (b) 25%  (c) 25%' },
      { q: 'Find: (a) 30% of 240  (b) 12.5% of GH₵800  (c) 7.5% of GH₵400', a: '(a) 72  (b) GH₵100  (c) GH₵30' },
      { q: 'A market price rose from GH₵200 to GH₵250. Find the percentage increase.', a: 'Increase = 50. % increase = (50 ÷ 200) × 100 = 25%' },
      { q: 'A phone was GH₵600. Its price fell to GH₵480. Find the percentage decrease.', a: 'Decrease = 120. % decrease = (120 ÷ 600) × 100 = 20%' },
      { q: 'If 4 kg of fish costs GH₵32, find the cost of 11 kg.', a: 'Unit rate = 32÷4 = GH₵8/kg. 11×8 = GH₵88' },
      { q: 'Invest GH₵2,000 at 5% simple interest for 3 years. Find: (a) Total interest  (b) Final amount', a: '(a) SI = 2000×5×3÷100 = GH₵300  (b) 2000+300 = GH₵2,300' },
      { q: 'A salesman\'s commission is 35% of his sales. He earned GH₵245 commission. What were his total sales?', a: '35% = GH₵245 → 1% = 7 → 100% = GH₵700' },
      { q: 'A class of 40 students: 24 are girls. What percentage are boys?', a: 'Boys = 40-24 = 16. % boys = (16÷40)×100 = 40%' },
      { q: 'A school\'s enrolment grew from 850 to 1,020 students. Find the percentage increase.', a: 'Increase = 170. % increase = (170÷850)×100 = 20%' },
      { q: '[Challenge] Abena borrowed GH₵1,200 at 15% simple interest. After a certain period she had paid GH₵540 in interest. For how many years did she borrow?', a: 'T = SI×100÷(P×R) = 540×100÷(1200×15) = 54000÷18000 = 3 years' },
    ],
  },
  {
    dayNum: 16,
    subject: 'English',
    topic: 'Punctuation, Capitalisation & Building Vocabulary',
    standard: 'B7.3.2.1.1 & B7.3.3.1.1',
    objectives: [
      'Use punctuation marks correctly: full stop, comma, question mark, exclamation mark, apostrophe, colon, semicolon',
      'Apply capitalisation rules accurately',
      'Build and apply vocabulary in context',
      'Use proverbs to enrich communication',
    ],
    concepts: [
      {
        heading: 'Punctuation Marks and Their Uses',
        body: 'FULL STOP (.): ends a statement. "She went to school."\nCOMMA (,): separates list items, joins clauses, sets off introductory phrases. "She bought yams, plantains and pepper."\nQUESTION MARK (?): ends a direct question. "Where are you going?"\nEXCLAMATION MARK (!): shows strong feeling. "Well done!"\nAPOSTROPHE (\'):\n  (1) Shows possession: Jezreel\'s book. Ghana\'s capital.\n  (2) Shows omission: don\'t = do not. it\'s = it is.\nCOLON (:): introduces a list or explanation. "You need three things: pen, paper and focus."\nSEMICOLON (;): joins two closely related independent clauses. "She studied hard; she passed."',
        note: 'Never use an apostrophe for plural nouns. "Three boys" is correct. "Three boy\'s" is WRONG.',
      },
      {
        heading: 'Capitalisation Rules',
        body: 'Use CAPITAL LETTERS for:\n• The first word of every sentence\n• All proper nouns: names of people (Jezreel), places (Kumasi, Ghana), organisations (Marist JHS)\n• Days of the week (Monday) and months (April)\n• Titles before a name (Mr. Mensah, Dr. Adu)\n• The pronoun "I" is ALWAYS capitalised\n• First word of a direct quotation: She said, "Come inside."',
        note: 'Do NOT capitalise seasons (harmattan) or compass directions unless part of a name (North Ghana, but "go north").',
      },
      {
        heading: 'Vocabulary in Context & Proverbs',
        body: 'A word\'s CONTEXT is the words and sentences around it that help you understand its meaning.\nStrategy when you meet an unfamiliar word:\n1. Look at the sentence for clues\n2. Think about the word\'s root, prefix or suffix\n3. Replace the word with what you think it means — does the sentence still make sense?\n\nPROVERBS are short, wise sayings:\n• "If you want to go fast, go alone. If you want to go far, go together." — the value of teamwork.\n• "The axe forgets, but the tree remembers." — those who cause harm forget; those who suffer do not.',
        note: 'Proverbs are used in speech and writing to add depth and wisdom. They show cultural knowledge.',
      },
    ],
    worked: [
      { q: 'Punctuate correctly: "jezreel went to kumasi on tuesday to buy school books pens and a calculator"', a: '"Jezreel went to Kumasi on Tuesday to buy school books, pens and a calculator." (Capitals: J, K, T. Comma after books. Full stop at end.)' },
      { q: 'Add the correct apostrophes: (a) The teachers desk was very tidy. (b) Its going to rain today. (c) The childrens bags are in the classroom.', a: '(a) The teacher\'s desk (possession). (b) It\'s going to rain (contraction of it is). (c) The children\'s bags (possession — irregular plural).' },
    ],
    questions: [
      { q: 'Rewrite with correct punctuation and capitalisation:\n(a) "the headmaster said all students must wear their uniform on monday"\n(b) "what time does school close on friday"\n(c) "she bought bread milk eggs and butter at the market"', a: '(a) The headmaster said all students must wear their uniform on Monday.\n(b) What time does school close on Friday?\n(c) She bought bread, milk, eggs and butter at the market.' },
      { q: 'Correct ALL punctuation and capitalisation errors: "mr kofi adjei the science teacher at marist preparatory jhs in kumasi is well known for his passion for teaching he often says science is not difficult its just unfamiliar"', a: 'Mr Kofi Adjei, the Science teacher at Marist Preparatory JHS in Kumasi, is well known for his passion for teaching. He often says, "Science is not difficult; it\'s just unfamiliar."' },
      { q: 'Explain the difference between:\n(a) It\'s and Its\n(b) They\'re, Their and There\n(c) You\'re and Your', a: '(a) It\'s = it is (contraction). Its = belonging to it (possession).\n(b) They\'re = they are. Their = belonging to them. There = that place.\n(c) You\'re = you are. Your = belonging to you.' },
      { q: 'Insert colons or semicolons where appropriate:\n(a) "She has three hobbies reading, football and drawing."\n(b) "He studied for weeks he still failed the exam."\n(c) "The package contained the following a pen, a ruler and an eraser."', a: '(a) She has three hobbies: reading, football and drawing.\n(b) He studied for weeks; he still failed the exam.\n(c) The package contained the following: a pen, a ruler and an eraser.' },
      { q: 'Using context clues, explain the meaning of the underlined words:\n(a) "The ARID landscape had no trees or grass — just cracked, dry earth."\n(b) "She was so TENACIOUS that even after failing three times, she tried again."\n(c) "The new law was CONTROVERSIAL — some people supported it strongly while others were furious."', a: '(a) Arid = extremely dry (no moisture).\n(b) Tenacious = determined, persistent, refusing to give up.\n(c) Controversial = causing strong disagreement; not everyone agrees.' },
      { q: 'Choose the word that fits the context:\n(a) The ___ (eminent/imminent) storm was approaching fast.\n(b) She made a ___ (conscious/conscience) decision to study harder.\n(c) The ___ (affect/effect) of the drought was devastating.', a: '(a) imminent (about to happen soon).\n(b) conscious (deliberate, aware).\n(c) effect (noun — the result).' },
      { q: 'Write TWO sentences using proverbs — one Ghanaian proverb and one general proverb. For each, explain what the proverb means and how it applies to your sentence.', a: 'Accept any two proverbs correctly used with clear explanations of meaning and application.' },
      { q: 'Write a short paragraph (4–5 sentences) about your school. It must contain: at least ONE colon, ONE apostrophe (possessive), ONE semicolon, and correct capitalisation throughout.', a: 'Check for: colon introducing a list/explanation, apostrophe showing possession (school\'s), semicolon joining two related clauses, capitals for proper nouns and sentence starts.' },
      { q: 'Find and correct EIGHT errors in this paragraph: "last tuesday, my friend ivan and i went to the market. we buyed yams, plantains and tomatos. ivans mother paid ghn50 for everything. it was a very productive day"', a: 'Errors: Last (capital), Tuesday (capital), Ivan (capital), I (capital), bought (not buyed), tomatoes (spelling), Ivan\'s (apostrophe), GH₵50 (currency symbol). Corrected: "Last Tuesday, my friend Ivan and I went to the market. We bought yams, plantains and tomatoes. Ivan\'s mother paid GH₵50 for everything. It was a very productive day."' },
      { q: '[Challenge] The word "set" has over 430 definitions in the dictionary — more than any other English word. Write FOUR different sentences using the word "set", each time with a completely different meaning.', a: 'Accept any four sentences where "set" has clearly different meanings. Examples: She set the table (arranged). The sun set at 6pm (went down). He has a set of tools (collection). The concrete has set (hardened).' },
    ],
  },
  {
    dayNum: 17,
    subject: 'Mathematics',
    topic: 'Algebra: Patterns, Sequences & Rules',
    standard: 'B7.2.1.1.1–B7.2.1.1.4',
    objectives: [
      'Identify and extend number and shape patterns',
      'Find the rule for a sequence and express it algebraically',
      'Use input-output tables to find and apply rules',
      'Plot points on a number plane from a table of values',
    ],
    concepts: [
      {
        heading: 'Number Patterns & Rules',
        body: 'A pattern is a sequence where each term follows a RULE.\n\nARITHMETIC SEQUENCE: add or subtract the same number each time.\nExample: 3, 7, 11, 15... → add 4 each time. Rule: 4n - 1\nTerm 1 = 4(1)-1 = 3. Term 10 = 4(10)-1 = 39.\n\nGEOMETRIC SEQUENCE: multiply or divide by the same number each time.\nExample: 2, 6, 18, 54... → multiply by 3 each time.',
        note: 'To find the nth term of an arithmetic sequence: rule is dn + (first term - d), where d = common difference.',
      },
      {
        heading: 'Input-Output Tables & the Number Plane',
        body: 'A mapping rule takes an input (x) and produces an output (y).\nExample: Rule x → 2x + 1\nx: 0, 1, 2, 3, 4\ny: 1, 3, 5, 7, 9\n\nThe number plane has an x-axis (horizontal) and y-axis (vertical).\nEach point is written as (x, y).\n• (3, 5): 3 right, 5 up\n• (-2, 4): 2 left, 4 up\n• (0, -3): on y-axis, 3 down',
        note: 'To find a missing INPUT from a given output: work BACKWARDS. If rule is x→3x+1 and output is 22: 3x+1=22, 3x=21, x=7.',
      },
    ],
    worked: [
      { q: 'Continue the pattern and find the 10th term: 3, 7, 11, 15...', a: 'Common difference = 4. Rule: 4n - 1. Terms continue: 19, 23, 27, 31, 35, 39. 10th term = 4(10)-1 = 39.' },
      { q: 'Find the rule for this table and complete it: Input: 1,2,3,4,5 | Output: 4,7,10,13,?', a: 'Output increases by 3. Rule: 3x + 1. Check: 3(1)+1=4 ✓. Output for x=5: 3(5)+1 = 16.' },
      { q: 'Triangles made of sticks: Pattern 1=3, Pattern 2=5, Pattern 3=7. How many sticks in Pattern 20?', a: 'Common difference = 2. Rule: 2n + 1. Pattern 20: 2(20)+1 = 41 sticks.' },
    ],
    questions: [
      { q: 'Continue these sequences and state the rule:\n(a) 5, 10, 15, 20, __, __, __\n(b) 1, 3, 9, 27, __, __\n(c) 50, 44, 38, 32, __, __', a: '(a) 25, 30, 35. Rule: add 5.\n(b) 81, 243. Rule: multiply by 3.\n(c) 26, 20. Rule: subtract 6.' },
      { q: 'Find the rule and complete the table:\nInput: 1, 2, 3, 4, 5\nOutput: 6, 11, 16, 21, ?', a: 'Output increases by 5. Rule: 5x + 1. Output for 5: 5(5)+1 = 26.' },
      { q: 'Find the rule and complete:\nInput: 1, 2, 3, 4, 5\nOutput: 3, 5, 7, 9, ?', a: 'Output increases by 2. Rule: 2x + 1. Output for 5: 2(5)+1 = 11.' },
      { q: 'Using rule x → 4x - 1, find y when x = 0, 1, 2, 3, 4, 5.', a: 'y values: -1, 3, 7, 11, 15, 19' },
      { q: 'Rule x → -3x + 10 gives output 22. Find x.', a: '-3x + 10 = 22 → -3x = 12 → x = -4' },
      { q: 'What is the 15th term of the sequence 2, 5, 8, 11...?', a: 'Common difference = 3. Rule: 3n - 1. 15th term: 3(15)-1 = 44.' },
      { q: 'Describe the location of these points:\n(a) (4, 0)  (b) (0, -3)  (c) (-2, 5)  (d) (-1, -4)', a: '(a) On the x-axis, 4 units right.\n(b) On the y-axis, 3 units below origin.\n(c) 2 left, 5 up (second quadrant).\n(d) 1 left, 4 down (third quadrant).' },
      { q: 'A shop sells pens at GH₵3 each. Draw a table for 1 to 5 pens. What is the rule? How much for 25 pens?', a: 'Table: 1→3, 2→6, 3→9, 4→12, 5→15. Rule: cost = 3 × number. 25 pens = 25×3 = GH₵75.' },
      { q: 'The sum of the first n odd numbers follows a pattern: 1=1, 1+3=4, 1+3+5=9. What is the pattern? Find the sum of the first 10 odd numbers.', a: 'Pattern: sum of first n odd numbers = n². First 10 odd numbers: 10² = 100.' },
      { q: '[Challenge] A fly sits at (0,0). Each second it moves 3 right and 2 up. Write coordinates after 1,2,3,4,5 seconds. What is the rule for coordinates after n seconds?', a: '(3,2), (6,4), (9,6), (12,8), (15,10). Rule after n seconds: (3n, 2n).' },
    ],
  },
  {
    dayNum: 18,
    subject: 'Science',
    topic: 'Crop Production: Plant Nutrients & Soil Types',
    standard: 'B7.2.3.1.1–B7.2.3.1.2',
    objectives: [
      'Identify and describe the major plant nutrients and their sources',
      'Describe the physical characteristics of different soil types',
      'Explain the relationship between soil type and crop production',
      'Discuss sustainable ways to improve soil fertility',
    ],
    concepts: [
      {
        heading: 'Plant Nutrients — What Plants Need to Grow',
        body: 'Plants need NUTRIENTS (mineral salts) from the soil to grow well.\n\nMACRONUTRIENTS (needed in large amounts):\n• Nitrogen (N): promotes leaf and stem growth; gives plants green colour. Source: animal manure, compost, urea fertiliser.\n• Phosphorus (P): promotes root development and fruit/seed formation. Source: bone meal, phosphate fertilisers.\n• Potassium (K): promotes strong stems, disease resistance and fruit quality. Source: wood ash, potassium fertilisers.\n\nMICRONUTRIENTS (needed in small amounts):\nIron, calcium, magnesium, zinc, manganese.\n\nSIGNS OF DEFICIENCY:\n• Nitrogen: yellowing of older leaves (chlorosis).\n• Phosphorus: purple/reddish leaves, stunted roots.\n• Potassium: brown leaf edges (scorch), weak stems.',
        note: 'Remember NPK — Nitrogen, Phosphorus, Potassium. Found on fertiliser bags as ratios e.g. 15:15:15.',
      },
      {
        heading: 'Soil Types and Their Characteristics',
        body: 'SANDY SOIL:\n• Large particles, gritty, light coloured.\n• Drains water quickly — low water retention.\n• Low fertility — nutrients wash away.\n• Good for: yam, groundnut, carrot.\n\nCLAY SOIL:\n• Very fine particles, smooth and sticky when wet, hard when dry.\n• Retains water very well — may waterlog.\n• High fertility — holds nutrients well.\n• Good for: rice.\n\nLOAM SOIL:\n• Mixture of sand, clay and organic matter.\n• Ideal water retention — drains well but holds enough moisture.\n• High fertility — best for most crops.\n• Good for: maize, cocoa, vegetables.',
        note: 'Loam soil is the IDEAL crop soil — balances drainage, moisture retention and fertility. Ghana\'s cocoa belt has mostly loam soil.',
      },
    ],
    worked: [
      { q: 'A farmer notices his maize plants are turning yellow, starting with older lower leaves. Which nutrient is deficient? What should he add?', a: 'Nitrogen deficiency. Nitrogen gives plants their green colour. When deficient, older leaves yellow first. Solution: Add nitrogen fertiliser (urea), animal manure or compost.' },
      { q: 'A farmer has clay soil. Give TWO advantages and TWO disadvantages of growing crops on it.', a: 'Advantages: (1) High fertility — holds nutrients well. (2) Good water retention — less irrigation needed. Disadvantages: (1) Can waterlog — roots suffocate if too wet. (2) Hard to plough when dry.' },
    ],
    questions: [
      { q: 'Name the THREE major plant macronutrients and state ONE function of each.', a: 'Nitrogen (N) — promotes leaf/stem growth and green colour.\nPhosphorus (P) — promotes root development and fruit formation.\nPotassium (K) — promotes strong stems, disease resistance and fruit quality.' },
      { q: 'What is the difference between macronutrients and micronutrients in plant nutrition?', a: 'Macronutrients are needed in large amounts (N, P, K) and are essential for major plant functions. Micronutrients are needed in small (trace) amounts (iron, calcium, zinc) and support specific processes.' },
      { q: 'Name TWO natural sources of nitrogen for plants.', a: 'Any two: decomposed organic matter (compost), animal manure, rotting leaves, nitrogen-fixing bacteria (legumes).' },
      { q: 'Describe THREE physical characteristics of sandy soil.', a: 'Large particles, gritty texture, light coloured, drains water quickly, low water retention, warms up quickly.' },
      { q: 'Why is loam soil considered the best soil for most crops?', a: 'Loam balances the properties of sand and clay — it drains well enough to prevent waterlogging but retains enough moisture for roots. It is high in organic matter, has good fertility and is easy to work (plough).' },
      { q: 'What type of soil would you recommend for a rice farm? Explain why.', a: 'Clay soil. Rice requires waterlogged or flooded conditions to grow well. Clay\'s high water retention and waterlogging tendency is an advantage for rice.' },
      { q: 'A farmer\'s crop shows stunted root growth and reddish-purple leaves. Which nutrient is deficient? What can the farmer add?', a: 'Phosphorus deficiency. Add bone meal, rock phosphate or phosphate fertiliser.' },
      { q: 'What is soil fertility? Give TWO ways a farmer can improve the fertility of poor soil.', a: 'Soil fertility = the ability of soil to provide nutrients that plants need to grow well.\nImprove it by: adding compost or manure (organic matter), applying NPK fertiliser, crop rotation with legumes, mulching.' },
      { q: 'Explain the water cycle connection to soil fertility. How does rainfall affect nutrients in sandy soil?', a: 'Rainfall carries water through soil (leaching). In sandy soil, water drains very quickly, carrying dissolved nutrients (especially nitrogen and potassium) deep into the ground beyond root reach. This reduces soil fertility over time — sandy soils need regular fertiliser application.' },
      { q: '[Challenge] A farmer wants to improve her sandy soil for vegetables. She has: clay from a riverbank, cow dung, compost, and chemical fertilisers. Explain a strategy using at least THREE of these resources.', a: 'Strategy: (1) Add clay to improve water retention and reduce drainage. (2) Add cow dung/compost to increase organic matter, improve structure and add nutrients naturally. (3) Use chemical fertiliser (NPK) for immediate nutrient boost while organic matter builds up. This creates a loam-like mixture over time — improved drainage balance, fertility and structure.' },
    ],
  },
  {
    dayNum: 19,
    subject: 'Mathematics',
    topic: 'Algebraic Expressions: Form, Simplify & Evaluate',
    standard: 'B7.2.2.1.1–B7.2.2.1.4',
    objectives: [
      'Translate word statements into algebraic expressions',
      'Simplify algebraic expressions by collecting like terms',
      'Evaluate expressions by substituting given values',
      'Write expressions for perimeter and area problems',
    ],
    concepts: [
      {
        heading: 'Writing Algebraic Expressions',
        body: 'An algebraic expression uses letters to represent unknown numbers.\n\nTranslating words into algebra:\n• "5 more than x" → x + 5\n• "3 less than x" → x - 3\n• "4 times x" → 4x\n• "half of x" → x/2\n• "2 more than 5 times x" → 5x + 2\n• "x squared minus 3" → x² - 3\n\nReal-life example: Afrako is 3 years older than Maako. Maako is x years old. Afrako\'s age = x + 3.',
        note: 'Always define what your variable represents. "Let x = the unknown number" or "Let x = Maako\'s age".',
      },
      {
        heading: 'Simplifying: Collecting Like Terms',
        body: 'LIKE TERMS have the same variable and power — they can be added or subtracted.\nUNLIKE TERMS have different variables — they CANNOT be combined.\n\nExamples:\n• 4x + 3x = 7x ✓ (like terms)\n• 4x + 3y = 4x + 3y ✗ (unlike — cannot simplify)\n• 5x + 4 - 2x - 4 = 3x\n• 7xy + 5x - 4x + 2xy - 3 = 9xy + x - 3\n\nProcess: Group like terms first, then combine.',
        note: 'xy and yx are the same term. 2xy + 3yx = 5xy.',
      },
      {
        heading: 'Evaluating Expressions',
        body: 'To EVALUATE: substitute the given values in place of the variables and calculate.\n\nExample: Evaluate 3xy + 2x - y when x = 2, y = 3.\n= 3(2)(3) + 2(2) - 3\n= 18 + 4 - 3\n= 19\n\nAlways follow BODMAS: Brackets, Orders/powers, Division, Multiplication, Addition, Subtraction.',
        note: 'When substituting negative numbers, use brackets to avoid sign errors: if x = -2, then x² = (-2)² = 4 (NOT -4).',
      },
    ],
    worked: [
      { q: 'Write as an expression: "When 8 times x is subtracted from 5, the result is multiplied by 2."', a: '2(5 - 8x)' },
      { q: 'Simplify: 5x + 4 - 9y + 3x + 2y - 7', a: 'x terms: 5x+3x=8x. y terms: -9y+2y=-7y. Constants: 4-7=-3. Answer: 8x - 7y - 3' },
      { q: 'Evaluate 3xy × 5y when x = 2, y = 4.', a: '= 3(2)(4) × 5(4) = 24 × 20 = 480' },
    ],
    questions: [
      { q: 'Write as algebraic expressions:\n(a) "10 more than a number x"\n(b) "3 less than twice a number x"\n(c) "the product of x and y, decreased by 5"\n(d) "x divided by 4, plus 7"', a: '(a) x + 10\n(b) 2x - 3\n(c) xy - 5\n(d) x/4 + 7' },
      { q: 'Simplify:\n(a) x + x + x + x\n(b) 4x + 3x + x\n(c) 6a - 2a + 3a\n(d) 5p - 3p + 2q - q', a: '(a) 4x  (b) 8x  (c) 7a  (d) 2p + q' },
      { q: 'Simplify:\n(a) 5x + 4 - 2x - 4\n(b) 7xy + 5x - 4x + 2xy - 3\n(c) 2p - 3q + 3p + 5q', a: '(a) 3x  (b) 9xy + x - 3  (c) 5p + 2q' },
      { q: 'If x = 3, y = 5, find:\n(a) 2x + y  (b) xy - x  (c) 4x - 2y + 1  (d) x² + y', a: '(a) 11  (b) 12  (c) 3  (d) 14' },
      { q: 'If p = 3, z = -1, evaluate:\n(a) 4p + 2z  (b) p² - z  (c) 4p × 8z²', a: '(a) 10  (b) 10  (c) 96' },
      { q: 'Agbolosu and Tetteh share GH₵400. Tetteh has GH₵35 more than Agbolosu. Let Agbolosu\'s share = x. Write an expression for Tetteh\'s share. Then find both shares.', a: 'Tetteh = x + 35. x + (x+35) = 400 → 2x = 365 → x = 182.50. Agbolosu = GH₵182.50. Tetteh = GH₵217.50.' },
      { q: 'Write an expression for the perimeter of a rectangle with length (2x + 3) cm and width x cm.', a: 'P = 2(2x+3) + 2x = 4x+6+2x = 6x + 6 cm' },
      { q: 'Write an expression for the area of a rectangle with length (2x + 1) and width 3.', a: 'Area = 3(2x+1) = 6x + 3' },
      { q: 'Simplify then evaluate 7xy + 5x - 4x + 2xy - 3 when x = 1, y = 2.', a: 'Simplified: 9xy + x - 3. Evaluate: 9(1)(2) + 1 - 3 = 18 + 1 - 3 = 16.' },
      { q: '[Challenge] The expression 2(3x + 4) - (x - 2) is simplified by a student as 5x + 6. Is this correct? Show the correct working.', a: 'NOT correct. Correct: 2(3x+4) - (x-2) = 6x+8 - x+2 = 5x+10. The student forgot that -(x-2) = -x+2 (not -x-2).' },
    ],
  },
  {
    dayNum: 20,
    subject: 'English',
    topic: 'Writing: Informal & Formal Letters',
    standard: 'B7.4.2.2.1–B7.4.2.2.2',
    objectives: [
      'Identify the differences between informal and formal letters',
      'Use the correct format and conventions for both letter types',
      'Write a complete informal letter to a friend or family member',
      'Write a complete formal letter (application or request) using appropriate language',
    ],
    concepts: [
      {
        heading: 'Informal Letters — Writing to Someone You Know',
        body: 'An informal letter is written to a FRIEND, FAMILY MEMBER or someone you know well.\n\nFORMAT:\n1. Your address (top right)\n2. Date (below your address)\n3. Salutation: "Dear [Name]," (use first name)\n4. Body: friendly, conversational language. Can use contractions (I\'m, you\'re, it\'s).\n5. Closing: "Your friend," / "With love," / "Yours truly,"\n6. Your first name (or nickname)\n\nNote: You do NOT need to include the recipient\'s address.',
        note: 'Paragraphs in the body: 1st = greeting/opening. 2nd-3rd = main content. Last = closing remarks.',
      },
      {
        heading: 'Formal Letters — Writing to an Organisation or Official',
        body: 'A formal letter is written to a HEADMASTER, EMPLOYER, ORGANISATION or OFFICIAL.\n\nFORMAT:\n1. Your address (top right)\n2. Date (below your address)\n3. Recipient\'s name and address (top left, below date)\n4. Subject line: "Re: Application for..." (optional but recommended)\n5. Salutation: "Dear Sir/Madam," or "Dear Mr/Mrs [Surname],"\n6. Body: formal, polite, clear and precise. No contractions.\n7. Closing:\n   • If you used "Dear Sir/Madam" → "Yours faithfully,"\n   • If you used a name (Dear Mr Mensah) → "Yours sincerely,"\n8. Full name (printed below signature)',
        note: 'The closing rule is CRITICAL: "Faithfully" when you don\'t know the name. "Sincerely" when you do.',
      },
    ],
    worked: [
      {
        q: 'Write a complete informal letter to your cousin Ama in Accra, telling her about your new self-study programme.',
        a: 'P.O. Box 12, Kumasi\n21st May, 2026\n\nDear Ama,\n\nI hope this letter finds you in good health and high spirits. I\'ve been meaning to write to you for a while now.\n\nI wanted to tell you about something exciting that\'s happening with my studies. My dad has set up a special daily self-study programme for me, covering Mathematics, Science and English. Every day I receive a learning pack and work through it on my own and send my answers to Dad on WhatsApp. It\'s challenging but I\'m learning a lot! Mathematics is my favourite so far.\n\nHow are your studies going? I do hope we can visit each other soon. Please greet Uncle Kwame and Auntie Efua for me.\n\nYour cousin,\nJezreel',
      },
    ],
    questions: [
      { q: 'What are THREE differences between an informal letter and a formal letter?', a: 'Any three: Informal uses first name salutation; formal uses Sir/Madam or surname. Informal allows contractions; formal does not. Informal has no recipient\'s address; formal includes it. Informal closes with Your friend/With love; formal closes with Yours faithfully/sincerely. Informal uses casual language; formal uses precise, professional language.' },
      { q: 'When do you use "Yours faithfully" and when do you use "Yours sincerely"? Explain the rule.', a: '"Yours faithfully" — when you opened with "Dear Sir/Madam" (you do NOT know the recipient\'s name). "Yours sincerely" — when you opened with a specific name (e.g. "Dear Mr Mensah").' },
      { q: 'Identify FIVE errors in this letter opening and rewrite it correctly:\n"dear mr mensah i am writing to apply for the position of class prefect. i am a student in jhs 1b and i believe i have the qualities needed. i would be grateful if you considered my application. yours faithfully jezreel"', a: 'Errors: dear (capital D), mr mensah (capital M), no comma after salutation, i (capital I throughout), jezreel (capital J + full name). Corrected: "Dear Mr Mensah, / I am writing to apply for the position of class prefect. I am a student in JHS 1B and I believe I have the qualities needed. I would be grateful if you considered my application. / Yours sincerely, / Jezreel [Surname]" (Note: should be Yours sincerely since name is known.)' },
      { q: 'Write the correct salutation and closing for each situation:\n(a) Writing to a headmaster whose name you do not know.\n(b) Writing to Mrs Abena Asante, the school librarian.\n(c) Writing to your friend Kofi.\n(d) Writing to a company whose contact person is unknown.', a: '(a) Dear Sir/Madam, ... Yours faithfully,\n(b) Dear Mrs Asante, ... Yours sincerely,\n(c) Dear Kofi, ... Your friend, / Yours truly,\n(d) Dear Sir/Madam, ... Yours faithfully,' },
      { q: 'Write a complete INFORMAL letter to your father, telling him: what you have been studying this week, which subject you find most challenging and why, and one question you have about your work.', a: 'Check for: your address (top right), date, "Dear Dad," salutation, body with three content points, friendly closing, first name. Accept any well-structured informal letter.' },
      { q: 'Write a complete FORMAL letter to the headmaster of Marist Preparatory JHS requesting permission to organise a Mathematics quiz for JHS 1 students. Include: a clear purpose, details of the proposed quiz, why it will benefit students.', a: 'Check for: your address, date, headmaster\'s address, subject line, Dear Sir, formal body with three required elements, Yours faithfully, full name.' },
      { q: 'A formal letter has a SUBJECT LINE (e.g. "Re: Application for Scholarship"). Why is a subject line useful in a formal letter?', a: 'A subject line immediately tells the reader the purpose of the letter before they read the body. It saves time, helps in filing and reference, and ensures the letter reaches the right person/department.' },
      { q: 'Rewrite this informal message as a formal letter: "Hi sir, i need to leave school early on friday cos my dad is coming from the USA. can u please give me permission? thanks, Jezreel"', a: 'Formal version should include: your address, date, headmaster\'s address, Dear Sir, formal body explaining the reason professionally (no slang, no contractions, no "cos" or "u"), Yours faithfully, full name.' },
      { q: '[Challenge] A letter can sometimes be SEMI-FORMAL. Can you think of a situation where you would write a semi-formal letter? Describe the situation, the recipient, and give TWO features of language that would make it semi-formal.', a: 'Example situation: writing to a teacher you know well to request a reference. Semi-formal features: you might use their first name but still use formal structure; you might avoid slang but allow a warmer, less stiff tone; you could use contractions sparingly. Accept any well-reasoned example.' },
    ],
  },
]

async function seedPacks() {
  console.log('🌱 Seeding pack content for Days 11–20...\n')
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
  console.log('\n✅ All packs seeded successfully!')
  console.log('Students can now click any day and see full content, worked examples and questions.')
  process.exit(0)
}

seedPacks().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
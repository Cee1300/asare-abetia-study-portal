// scripts/seed-ivan-full.js
// Builds all 20 Ivan packs at correct B3 level
// Days 1,3,5,7,9 (Maths) already enriched — this script updates Science and English packs
// and builds Days 11-20 from scratch
// Run: node scripts/seed-ivan-full.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

// B3 language guidelines:
// - Max 12 words per sentence
// - No technical jargon without a simple explanation in brackets
// - Ghanaian everyday examples (market, kitchen, compound, river, school)
// - Concepts explained through familiar objects FIRST, then introduce the name
// - Short questions with clear single answers

const PACKS = {

  // ─── DAY 2 — SCIENCE: Living and Non-Living Things ─────────────────────
  ivan_day2: {
    studentId: 'ivan',
    dayNum: 2,
    subject: 'Science',
    topic: 'Living and Non-Living Things',
    standard: 'B3.5.1.1',
    objectives: [
      'Tell the difference between living and non-living things',
      'Name the signs that show something is alive',
      'Sort things into living and non-living groups',
      'Give examples of living and non-living things around you',
    ],
    concepts: [
      {
        heading: 'What Makes Something Alive?',
        body: 'Living things are things that are ALIVE.\n\nHow do we know something is alive? Living things do these things:\n\n1. They GROW — they get bigger over time.\nExample: A seed grows into a big mango tree.\n\n2. They EAT — they need food to live.\nExample: A goat eats grass. A child eats kenkey and fish.\n\n3. They BREATHE — they take in air.\nExample: You breathe in and out. A fish breathes through its gills.\n\n4. They MOVE — they can move by themselves.\nExample: A cat walks. A plant turns toward sunlight.\n\n5. They HAVE BABIES — they make more of themselves.\nExample: A hen lays eggs. Eggs hatch into chicks.\n\n6. They FEEL things — they know what is happening around them.\nExample: A dog runs away when you shout at it.\n\nLiving things do ALL of these six things.',
        note: 'Easy way to remember: Does it grow? Does it eat? Does it breathe? Does it move? Does it have babies? If YES to all — it is ALIVE.',
      },
      {
        heading: 'Non-Living Things',
        body: 'Non-living things are NOT alive. They do NONE of the six things.\n\nNon-living things do NOT grow.\nNon-living things do NOT eat.\nNon-living things do NOT breathe.\nNon-living things do NOT move by themselves.\nNon-living things do NOT have babies.\n\nExamples of non-living things:\nStone, chair, water, pencil, book, table, phone, cup, soil.\n\nBe careful — some things can MOVE but are still not alive:\nA ball rolls when you kick it — but it cannot move by itself.\nA river flows — but it does not breathe or have babies.\n\nSome things were once alive but are NOW dead:\nA dry leaf was once alive on a tree.\nA piece of wood was once part of a living tree.\nDead things are NOT living things.',
        note: 'A stone was NEVER alive. A dead leaf WAS alive. Both are now non-living — but they are different kinds of non-living things.',
      },
      {
        heading: 'Plants and Animals',
        body: 'All living things belong to one of two big groups:\n\nPLANTS:\nPlants make their own food using sunlight.\nPlants stay in one place — their roots hold them in the ground.\nExamples: mango tree, cocoa, maize, grass, cassava, pawpaw.\n\nANIMALS:\nAnimals cannot make their own food.\nAnimals eat plants or other animals to get food.\nAnimals can move from place to place.\nExamples: goat, fish, chicken, butterfly, lizard, human being.\n\nHuman beings are animals too!\nWe eat, breathe, grow, move and have babies.\n\nPlants and animals are BOTH living things.\nThey are different because plants make their own food but animals cannot.',
        note: 'Remember: PLANTS make food. ANIMALS eat food. Both are living things.',
      },
    ],
    worked: [
      {
        q: 'Is a dog a living thing? Give THREE reasons.',
        a: 'Yes, a dog is a living thing because:\n1. It GROWS — puppies grow into big dogs.\n2. It EATS — it needs food every day.\n3. It BREATHES — you can see its chest moving.',
      },
      {
        q: 'Is a stone a living thing? Give TWO reasons.',
        a: 'No, a stone is NOT a living thing because:\n1. It does not grow — it stays the same size.\n2. It does not eat, breathe or have babies.',
      },
      {
        q: 'Sort these into LIVING and NON-LIVING:\ngoat, stone, mango tree, pencil, butterfly, water',
        a: 'LIVING: goat, mango tree, butterfly.\nNON-LIVING: stone, pencil, water.',
      },
    ],
    questions: [
      { q: 'Name THREE things that show something is alive.', a: 'Any three: it grows, it eats/needs food, it breathes, it moves by itself, it has babies, it feels things around it.' },
      { q: 'Is a chicken a living thing? Write YES or NO and give ONE reason.', a: 'YES. A chicken is a living thing because it grows, eats, breathes, moves and has chicks.' },
      { q: 'Is a book a living thing? Write YES or NO and give ONE reason.', a: 'NO. A book is not a living thing because it does not grow, eat, breathe or have babies.' },
      { q: 'Sort these into two groups — LIVING and NON-LIVING:\ncocoa tree, cup, lizard, soil, maize, plastic bottle, earthworm, chair', a: 'LIVING: cocoa tree, lizard, maize, earthworm.\nNON-LIVING: cup, soil, plastic bottle, chair.' },
      { q: 'Give TWO differences between a plant and an animal.', a: '1. A plant makes its own food using sunlight. An animal eats food.\n2. A plant stays in one place. An animal can move from place to place.' },
      { q: 'Name FOUR living things you can find in your school compound.', a: 'Accept any correct answers: trees, grass, children, birds, insects, lizards, etc.' },
      { q: 'A dead leaf fell from a tree. Is it living or non-living? Explain.', a: 'A dead leaf is NON-LIVING. It was once alive on the tree, but now it does not grow, eat or breathe. It is dead.' },
      { q: 'Give THREE examples of plants and THREE examples of animals found in Ghana.', a: 'Plants: any three from — mango, cocoa, cassava, maize, plantain, pawpaw, grass.\nAnimals: any three from — goat, tilapia, chicken, lizard, grasshopper, butterfly.' },
      { q: 'Can a river move? Does that make it a living thing? Explain your answer.', a: 'Yes, a river moves. But it is NOT a living thing. It moves because of gravity, not by itself. A river does not eat, breathe, grow or have babies. So it is non-living.' },
      { q: '[Challenge] Your friend says "Fire is alive because it moves and grows." Do you agree? Explain why or why not.', a: 'No, I do not agree. Fire is NOT alive. It moves and gets bigger, but it does not eat food, breathe air, have babies or feel things. To be alive, something must do ALL the things that living things do. Fire does not do all of them.' },
    ],
  },

  // ─── DAY 4 — ENGLISH: Oral Language ────────────────────────────────────
  ivan_day4: {
    studentId: 'ivan',
    dayNum: 4,
    subject: 'English',
    topic: 'Listening and Speaking: Stories, Songs and Conversations',
    standard: 'B3.3.1.1',
    objectives: [
      'Listen carefully and answer questions about a story',
      'Sing a song and talk about what it means',
      'Hold a short conversation using good manners',
      'Use please, thank you, sorry and excuse me correctly',
    ],
    concepts: [
      {
        heading: 'Listening Well',
        body: 'When someone is talking, good listeners do these things:\n\n1. Look at the person who is speaking.\n2. Do not talk while they are speaking.\n3. Think about what they are saying.\n4. Ask questions after they finish.\n\nAfter listening to a story, you should be able to answer:\n• WHO is in the story? (characters)\n• WHERE does the story happen? (setting)\n• WHAT happens in the story? (events)\n• HOW does the story end? (ending)\n\nWhen you listen to a song:\n• What is the song about?\n• How does the song make you feel?\n• What is the message of the song?',
        note: 'Good listeners make good friends. People like talking to someone who listens well.',
      },
      {
        heading: 'Speaking Politely',
        body: 'These are words we use to be POLITE:\n\nPLEASE — use this when you are asking for something.\n"Please pass me the book."\n"Can I have water, please?"\n\nTHANK YOU — use this when someone helps you or gives you something.\n"Thank you for helping me."\n"Thank you, teacher."\n\nSORRY — use this when you have done something wrong.\n"Sorry, I did not mean to push you."\n"I am sorry I was late."\n\nEXCUSE ME — use this when you need to pass or interrupt.\n"Excuse me, may I come in?"\n"Excuse me, can you help me?"\n\nGood conversation:\n• Take turns — do not talk over people.\n• Use the other person\'s name.\n• Ask questions to show you are interested.',
        note: 'Using polite words costs nothing but means everything. They show respect.',
      },
    ],
    worked: [
      {
        q: 'Read this short story and answer the questions.\n\nAma went to the market with her mother. She wanted to buy a mango. The mango seller was busy. Ama said, "Excuse me, please. How much is one mango?" The seller said, "Twenty pesewas." Ama paid and said, "Thank you." The seller smiled.\n\n(a) Where did Ama go?\n(b) What did Ama want to buy?\n(c) What polite words did Ama use?',
        a: '(a) Ama went to the market.\n(b) She wanted to buy a mango.\n(c) She used "Excuse me, please" and "Thank you."',
      },
      {
        q: 'Write the correct polite word for each situation:\n(a) Your friend gives you a birthday gift.\n(b) You bump into someone by accident.\n(c) You want someone to help you.\n(d) You need to walk past someone.',
        a: '(a) Thank you.\n(b) Sorry.\n(c) Please.\n(d) Excuse me.',
      },
    ],
    questions: [
      { q: 'What are FOUR things a good listener does?', a: '1. Looks at the speaker. 2. Does not talk while the other person speaks. 3. Thinks about what is being said. 4. Asks questions after the person finishes.' },
      { q: 'Which polite word do you use when you want something? Use it in a sentence.', a: 'PLEASE. Example: "Please give me a pencil."' },
      { q: 'Which polite word do you use when someone helps you? Use it in a sentence.', a: 'THANK YOU. Example: "Thank you for carrying my bag."' },
      { q: 'Write a short conversation (4 lines) between two friends. Use at least TWO polite words.', a: 'Accept any appropriate conversation using please/thank you/sorry/excuse me correctly.' },
      { q: 'After listening to a story, what FOUR questions can you ask to understand it?', a: 'WHO is in the story? WHERE does it happen? WHAT happens? HOW does it end?' },
      { q: 'Your teacher is explaining something. Your friend starts talking to you. What do you do?', a: 'I politely ask my friend to wait. I listen to the teacher. I can talk to my friend after the teacher finishes.' },
      { q: 'Write a sentence using SORRY correctly.', a: 'Accept any correct sentence, e.g. "Sorry, I stepped on your foot."' },
      { q: 'Write a sentence using EXCUSE ME correctly.', a: 'Accept any correct sentence, e.g. "Excuse me, may I borrow your ruler?"' },
      { q: 'Read this conversation and say what is wrong with it.\nKofi: "Give me your pencil."\nAma: "Why should I?"\nKofi: "Because I said so."', a: 'Kofi did not use polite words. He should say "Please can I borrow your pencil?" Being rude makes people not want to help you.' },
      { q: '[Challenge] Write a short story (4-5 sentences) about a child who uses good manners at school. Include at least THREE polite words.', a: 'Accept any creative story that correctly uses three or more of: please, thank you, sorry, excuse me, in appropriate contexts.' },
    ],
  },

  // ─── DAY 6 — SCIENCE: Materials and Their Uses ─────────────────────────
  ivan_day6: {
    studentId: 'ivan',
    dayNum: 6,
    subject: 'Science',
    topic: 'Materials Around Us: What Things Are Made Of',
    standard: 'B3.5.2.1',
    objectives: [
      'Name common materials like wood, metal, plastic, cloth and glass',
      'Say why each material is used for different things',
      'Tell whether things are hard, soft, rough, smooth, heavy or light',
      'Group objects by what they are made of',
    ],
    concepts: [
      {
        heading: 'What Are Materials?',
        body: 'Everything around us is made of something. The things objects are made of are called MATERIALS.\n\nHere are the common materials you see every day:\n\nWOOD\nWhere it comes from: trees.\nWhat it looks like: brown, can be rough or smooth.\nWe use it for: chairs, tables, doors, cooking sticks.\n\nMETAL\nWhat it looks like: shiny and hard.\nWe use it for: pots, spoons, nails, roofing sheets.\nMetal gets HOT quickly near fire.\n\nPLASTIC\nWhat it looks like: smooth, comes in many colours.\nWe use it for: buckets, bottles, bags, cups.\nPlastic does NOT break easily.\n\nCLOTH (FABRIC)\nWhat it is: woven threads.\nWe use it for: clothes, school uniforms, curtains.\nCloth is soft and keeps us warm or cool.\n\nGLASS\nWhat it looks like: clear, you can see through it.\nWe use it for: windows, cups, bottles.\nGlass BREAKS easily.',
        note: 'Ask yourself: What is this object made of? Wood? Metal? Plastic? Cloth? Glass? This is the MATERIAL.',
      },
      {
        heading: 'Properties of Materials — How They Feel and Act',
        body: 'A PROPERTY is what a material is like. Properties help us choose the right material.\n\nHARD — difficult to bend or squash.\nExample: metal, stone, wood.\n\nSOFT — easy to squash or bend.\nExample: cloth, sponge, rubber.\n\nSMOOTH — flat and even surface.\nExample: glass, plastic, polished wood.\n\nROUGH — bumpy, not even.\nExample: sandpaper, tree bark, stone wall.\n\nHEAVY — has a lot of weight.\nExample: metal pot, stone, bag of rice.\n\nLIGHT — does not weigh much.\nExample: feather, plastic bag, paper.\n\nWhy does this matter?\nWe choose materials based on what we need them to do.\nA pot needs to be HARD and able to take HEAT → we use metal.\nA school uniform needs to be SOFT and COMFORTABLE → we use cloth.\nA window needs to let light through → we use GLASS.',
        note: 'The RIGHT material for the RIGHT job. That is the big idea.',
      },
      {
        heading: 'Solid, Liquid and Gas — The Three States',
        body: 'Everything around us is in one of THREE states:\n\nSOLID:\nA solid keeps its shape.\nYou can hold a solid in your hand.\nExamples: stone, wood, metal pot, bread, mango.\n\nLIQUID:\nA liquid does NOT keep its shape.\nIt takes the shape of whatever you pour it into.\nYou can pour a liquid.\nExamples: water, palm oil, milk, kerosene.\n\nGAS:\nA gas has no shape at all.\nIt spreads out to fill the whole space.\nYou usually cannot see a gas.\nExamples: air, the smell of food cooking, steam from hot water.\n\nWater is special — it can be all THREE:\nICE = solid (very cold water).\nWATER = liquid (normal temperature).\nSTEAM = gas (very hot water).\n\nHeat changes the state:\nHeat makes things go from solid → liquid → gas.\nCooling makes things go from gas → liquid → solid.',
        note: 'Think of water: ice cube (solid) → melts to water (liquid) → boils to steam (gas). Heat makes it change.',
      },
    ],
    worked: [
      {
        q: 'What material is each object made of?\n(a) a cooking pot\n(b) a school uniform\n(c) a window\n(d) a wooden chair',
        a: '(a) Metal.\n(b) Cloth.\n(c) Glass.\n(d) Wood.',
      },
      {
        q: 'Give ONE reason why we use metal to make cooking pots and NOT plastic.',
        a: 'We use metal because metal can stand very high heat without melting. Plastic would melt on a fire.',
      },
      {
        q: 'Is water a solid, liquid or gas? How do you know?',
        a: 'Water is a LIQUID. I know because it pours and takes the shape of whatever container it is in.',
      },
    ],
    questions: [
      { q: 'Name FIVE common materials. For each one, give ONE thing it is used for.', a: 'Wood → chairs. Metal → pots. Plastic → buckets. Cloth → uniforms. Glass → windows. Accept any correct answers.' },
      { q: 'Why is glass used for windows and NOT metal?', a: 'Glass is used because it is see-through (transparent). You can see outside through glass. Metal is not transparent — you cannot see through it.' },
      { q: 'Name the THREE states of matter.', a: 'Solid, liquid, gas.' },
      { q: 'Give TWO examples of each state:\n(a) solid  (b) liquid  (c) gas', a: '(a) Stone, wood (or any solid).\n(b) Water, palm oil (or any liquid).\n(c) Air, steam (or any gas).' },
      { q: 'Is milk a solid, liquid or gas? How do you know?', a: 'Milk is a LIQUID. It pours and takes the shape of its container.' },
      { q: 'What happens to ice when you leave it in the sun? What is this change called?', a: 'Ice MELTS. It changes from solid to liquid. This change is called MELTING.' },
      { q: 'Give ONE property for each material:\n(a) metal  (b) cloth  (c) glass', a: '(a) Metal is hard and heavy.\n(b) Cloth is soft.\n(c) Glass is smooth and see-through (transparent).' },
      { q: 'Why do we use cloth for school uniforms and NOT metal?', a: 'Cloth is soft and comfortable to wear. Metal is hard and heavy — it would be very uncomfortable to wear.' },
      { q: 'Sort these into SOLID, LIQUID, GAS:\nstone, cooking gas, palm oil, steam, wooden table, water, iron nail, air', a: 'SOLID: stone, wooden table, iron nail.\nLIQUID: palm oil, water.\nGAS: cooking gas, steam, air.' },
      { q: '[Challenge] Your friend says "Steam and ice are completely different things." Do you agree? Explain.', a: 'No, I do not fully agree. Steam and ice are both WATER — just in different states. Ice is water that has been cooled until it becomes solid. Steam is water that has been heated until it becomes gas. They look very different but they are the same material in different forms.' },
    ],
  },

  // ─── DAY 8 — ENGLISH: Reading and Writing ──────────────────────────────
  ivan_day8: {
    studentId: 'ivan',
    dayNum: 8,
    subject: 'English',
    topic: 'Reading: Understanding a Short Story',
    standard: 'B3.3.2.1',
    objectives: [
      'Read a short story and understand what happens',
      'Answer questions about a story using full sentences',
      'Find the meaning of new words using clues in the story',
      'Retell a story in your own words',
    ],
    concepts: [
      {
        heading: 'Parts of a Story',
        body: 'Every story has these parts:\n\nCHARACTERS — the people or animals in the story.\nExample: Kofi, his dog Bingo, the market woman.\n\nSETTING — where and when the story happens.\nExample: In the market. On a Tuesday morning.\n\nPROBLEM — something goes wrong or someone wants something.\nExample: Kofi lost his money.\n\nEVENTS — what happens in the story, in order.\nExample: First... Then... Next... After that... Finally...\n\nSOLUTION/ENDING — how the problem is solved or how things end.\nExample: The market woman helped Kofi find his money.\n\nWhen you read a story, look for ALL these parts.',
        note: 'Use these words to retell a story in the right order: FIRST, THEN, NEXT, AFTER THAT, FINALLY.',
      },
      {
        heading: 'Answering Questions in Full Sentences',
        body: 'When you answer a question about a story, use a FULL SENTENCE.\n\nA full sentence has:\n• A subject (who or what)\n• A verb (what they do)\n• It makes complete sense on its own.\n\nQUESTION: Where did Ama go?\nWRONG ANSWER: The market. (not a full sentence)\nCORRECT ANSWER: Ama went to the market.\n\nQUESTION: What did Kofi find?\nWRONG ANSWER: His book. (not a full sentence)\nCORRECT ANSWER: Kofi found his book under the table.\n\nTIP: Use the words from the question to start your answer.\n"Where did Ama go?" → "Ama went to..."\n"What did Kofi find?" → "Kofi found..."',
        note: 'Full sentences score more marks in exams. Always write in full sentences when answering questions about a story.',
      },
    ],
    worked: [
      {
        q: 'Read this story.\n\nKwame was walking to school. He saw a small dog sitting by the road. The dog looked sad and hungry. Kwame had a piece of bread in his bag. He gave it to the dog. The dog wagged its tail and followed Kwame to school.\n\nAnswer these questions in full sentences:\n(a) Where was Kwame going?\n(b) What did Kwame see?\n(c) What did Kwame do to help the dog?',
        a: '(a) Kwame was going to school.\n(b) Kwame saw a small dog sitting by the road.\n(c) Kwame gave the dog a piece of bread from his bag.',
      },
      {
        q: 'Retell the Kwame story in your own words. Use: First, Then, Finally.',
        a: 'First, Kwame was walking to school. Then he saw a sad and hungry dog by the road. He gave the dog some bread. Finally, the happy dog followed Kwame to school.',
      },
    ],
    questions: [
      { q: 'What are the FIVE parts of a story?', a: 'Characters, setting, problem, events, solution/ending.' },
      { q: 'Read: "Abena ran quickly to the river. She filled her bucket with clean water and carried it home on her head."\nWho is in this story?', a: 'Abena is in this story.' },
      { q: 'Using the same story above — where did Abena go?', a: 'Abena went to the river.' },
      { q: 'What is a CHARACTER in a story?', a: 'A character is a person or animal in the story.' },
      { q: 'What is the SETTING of a story?', a: 'The setting is where and when the story happens.' },
      { q: 'Write a full sentence answer: "What did Abena carry on her head?"\n(Story: Abena carried a bucket of water on her head.)', a: 'Abena carried a bucket of water on her head.' },
      { q: 'Put these story events in the right order:\n(c) Yaa found her way home.\n(a) Yaa went to the farm.\n(b) Yaa got lost in the forest.', a: 'First (a): Yaa went to the farm. Then (b): Yaa got lost in the forest. Finally (c): Yaa found her way home.' },
      { q: 'Write TWO sentences about what you did this morning. Use full sentences.', a: 'Accept any two correct full sentences describing morning activities.' },
      { q: 'Read: "The boy ran fast. He was tired but he did not stop."\nWhat does TIRED mean in this sentence? Use clues from the story.', a: 'Tired means he had no more energy and wanted to rest. We know this because even though he was tired, he had to force himself not to stop.' },
      { q: '[Challenge] Write a short story (5 sentences) about a child helping someone in their community. Include: a character, a setting, a problem and a solution.', a: 'Accept any creative story with all four elements: named character, clear setting, a problem that arises, and how it is resolved.' },
    ],
  },

  // ─── DAY 10 — SCIENCE: Our Environment ─────────────────────────────────
  ivan_day10: {
    studentId: 'ivan',
    dayNum: 10,
    subject: 'Science',
    topic: 'Our Environment: The Sun, Weather and Water',
    standard: 'B3.5.3.1',
    objectives: [
      'Say what the sun does for us every day',
      'Describe the weather using simple words',
      'Explain where rain comes from',
      'Say why clean water is important',
    ],
    concepts: [
      {
        heading: 'The Sun — Why We Need It',
        body: 'The SUN is the big bright ball of light in the sky.\n\nThe sun gives us LIGHT.\nDuring the day, the sun makes it bright outside.\nWe can see things because of the sun\'s light.\n\nThe sun gives us HEAT.\nThe sun keeps the Earth warm.\nWithout the sun, everything would be too cold to live.\n\nThe sun helps PLANTS grow.\nPlants use sunlight to make their own food.\nWithout the sun, no plants would grow.\nWithout plants, animals and people would have no food.\n\nThe sun dries things.\nFarmers dry their cocoa, fish and cassava in the sun.\nClothes dry faster in the sun.\n\nDAY and NIGHT:\nDuring the DAY — the part of Earth where you live faces the sun. It is bright.\nDuring NIGHT — your part of Earth has turned away from the sun. It is dark.',
        note: 'Without the sun — no light, no heat, no plants, no food, no life. The sun is THAT important.',
      },
      {
        heading: 'Weather and Rain',
        body: 'WEATHER is what the sky and air are like outside right now.\n\nTypes of weather:\nSUNNY — the sun is shining. It is bright and warm.\nCLOUDY — clouds are covering the sun. It is darker.\nRAINY — water falls from the sky.\nWINDY — the air is moving fast.\nHOT — the temperature is high.\nCOOL/COLD — the temperature is low.\n\nWhere does RAIN come from?\nThe sun heats water in rivers, lakes and the sea.\nThe water turns into tiny drops that go up into the air — like steam from a hot pot.\nThese tiny drops join together high up and make CLOUDS.\nWhen the clouds get very heavy with water, the water falls as RAIN.\n\nIn Ghana, we have two main seasons:\nRAINY SEASON — lots of rain, good for farming.\nDRY SEASON — very little rain, can be very hot.',
        note: 'Rain starts with the sun heating water. No sun = no rain = no crops = problems for everyone.',
      },
      {
        heading: 'Clean Water is Important',
        body: 'We use water every single day:\nFor drinking. For cooking. For bathing. For washing clothes.\n\nCLEAN water:\n• Has no colour — it is clear.\n• Has no bad smell.\n• Has nothing floating in it.\n• Is safe to drink.\n\nDIRTY water:\n• May look brown or green.\n• May smell bad.\n• May have things floating in it.\n• Is NOT safe to drink.\n\nWhat makes water dirty?\n• Rubbish thrown into rivers.\n• Mining (digging for gold near rivers).\n• Sewage (dirty water from toilets) going into rivers.\n\nWhy is dirty water dangerous?\nDrinking dirty water can make you very sick.\nIt can cause stomach pain, diarrhoea and vomiting.\n\nHow to keep water clean:\n• Cover water containers.\n• Do not throw rubbish into rivers.\n• Boil drinking water if you are not sure it is clean.',
        note: 'Clean water keeps us healthy. Dirty water makes us sick. Always drink clean water.',
      },
    ],
    worked: [
      {
        q: 'Give THREE ways the sun helps people in Ghana.',
        a: '1. The sun gives us light so we can see during the day.\n2. The sun helps plants grow so we have food to eat.\n3. The sun dries our cocoa, fish and cassava after harvesting.',
      },
      {
        q: 'Describe the weather in TWO different ways using simple words.',
        a: 'Example 1: Today it is sunny and hot. The sky is clear and blue.\nExample 2: Today it is cloudy and windy. The sky looks dark grey.',
      },
      {
        q: 'How do you know water is clean? Give THREE signs.',
        a: '1. Clean water is clear — no colour.\n2. Clean water has no bad smell.\n3. Clean water has nothing floating in it.',
      },
    ],
    questions: [
      { q: 'Give TWO things the sun does for us.', a: 'Any two: gives light, gives heat, helps plants grow, dries things, drives the water cycle.' },
      { q: 'What is WEATHER?', a: 'Weather is what the sky and air are like outside — whether it is sunny, cloudy, rainy, windy, hot or cold.' },
      { q: 'Name FOUR types of weather.', a: 'Any four: sunny, cloudy, rainy, windy, hot, cool, cold, stormy.' },
      { q: 'Explain in simple words where rain comes from.', a: 'The sun heats water in rivers and the sea. The water goes up into the air. It forms clouds. When the clouds are very heavy, the water falls as rain.' },
      { q: 'Name the TWO seasons in Ghana.', a: 'Rainy season and dry season.' },
      { q: 'Give THREE signs that water is NOT clean.', a: 'Any three: it has colour (brown, green), it has a bad smell, things are floating in it, it looks cloudy or muddy.' },
      { q: 'Why is it dangerous to drink dirty water?', a: 'Dirty water can make you very sick. It can cause stomach pain, diarrhoea and vomiting.' },
      { q: 'Give TWO ways to keep water clean.', a: 'Any two: cover water containers, do not throw rubbish into rivers, boil drinking water before drinking it.' },
      { q: 'Why do farmers need the rainy season?', a: 'Farmers need rain to water their crops. Without rain, crops cannot grow and there will be no food.' },
      { q: '[Challenge] What would happen in Ghana if we had no rainy season for one whole year? Write THREE effects.', a: 'Any three sensible effects: crops would not grow — food shortage; rivers and dams would dry up — no water; animals would die from lack of food and water; prices of food would rise; people would go hungry.' },
    ],
  },

  // ─── DAY 11 — MATHEMATICS: Fractions ───────────────────────────────────
  ivan_day11: {
    studentId: 'ivan',
    dayNum: 11,
    subject: 'Mathematics',
    topic: 'Fractions: Halves, Quarters and Thirds',
    standard: 'B3.1.5.1',
    objectives: [
      'Understand that a fraction is an equal part of a whole',
      'Read and write ½, ¼, ¾ and ⅓',
      'Find a fraction of a number or an object',
      'Compare simple fractions',
    ],
    concepts: [
      {
        heading: 'What is a Fraction?',
        body: 'A FRACTION is a part of something that has been cut into EQUAL pieces.\n\nThe EQUAL part is very important.\nIf the pieces are NOT equal, it is not a proper fraction.\n\nThe TOP number (NUMERATOR) — tells you how many pieces you have.\nThe BOTTOM number (DENOMINATOR) — tells you how many equal pieces the whole was cut into.\n\nExample: ¾\nThe whole was cut into 4 equal pieces. (denominator = 4)\nYou have 3 of those pieces. (numerator = 3)\n\nFractions you must know:\n½ = ONE HALF. Cut into 2 equal pieces. You have 1.\n¼ = ONE QUARTER. Cut into 4 equal pieces. You have 1.\n¾ = THREE QUARTERS. Cut into 4 equal pieces. You have 3.\n⅓ = ONE THIRD. Cut into 3 equal pieces. You have 1.\n⅔ = TWO THIRDS. Cut into 3 equal pieces. You have 2.',
        note: 'DENOMINATOR = how many pieces total. NUMERATOR = how many pieces you have. Bottom tells you the size, top tells you how many.',
      },
      {
        heading: 'Finding a Fraction of a Number',
        body: 'To find a fraction of a number:\nDIVIDE by the bottom number.\nThen MULTIPLY by the top number.\n\nExample: Find ¾ of 12.\nStep 1: Divide by bottom (4): 12 ÷ 4 = 3.\nStep 2: Multiply by top (3): 3 × 3 = 9.\nAnswer: ¾ of 12 = 9.\n\nExample: Find ⅓ of 15.\nStep 1: 15 ÷ 3 = 5.\nStep 2: 5 × 1 = 5.\nAnswer: ⅓ of 15 = 5.\n\nExample: Find ½ of 20.\nStep 1: 20 ÷ 2 = 10.\nStep 2: 10 × 1 = 10.\nAnswer: ½ of 20 = 10.\n\nShortcut: To find ONE HALF, just divide by 2.\nTo find ONE QUARTER, just divide by 4.\nTo find ONE THIRD, just divide by 3.',
        note: 'Divide by the BOTTOM, multiply by the TOP. Say it out loud every time.',
      },
    ],
    worked: [
      {
        q: 'What fraction of this shape is shaded?\n(A rectangle cut into 4 equal parts with 1 part shaded.)',
        a: 'One part out of 4 equal parts = ¼ (one quarter).',
      },
      {
        q: 'Find ¾ of 16.',
        a: 'Step 1: Divide by 4: 16 ÷ 4 = 4.\nStep 2: Multiply by 3: 4 × 3 = 12.\nAnswer: ¾ of 16 = 12.',
      },
      {
        q: 'There are 18 mangoes. Kofi eats ⅓ of them. How many does he eat?',
        a: '⅓ of 18: 18 ÷ 3 = 6.\nKofi eats 6 mangoes.',
      },
    ],
    questions: [
      { q: 'In the fraction ¾, what does the 4 mean? What does the 3 mean?', a: 'The 4 (denominator) means the whole was cut into 4 equal pieces. The 3 (numerator) means you have 3 of those pieces.' },
      { q: 'Find: (a) ½ of 10  (b) ¼ of 8  (c) ⅓ of 9', a: '(a) 10 ÷ 2 = 5. (b) 8 ÷ 4 = 2. (c) 9 ÷ 3 = 3.' },
      { q: 'Find ¾ of 20.', a: '20 ÷ 4 = 5. Then 5 × 3 = 15. Answer: 15.' },
      { q: 'Find ⅔ of 18.', a: '18 ÷ 3 = 6. Then 6 × 2 = 12. Answer: 12.' },
      { q: 'Ama has 24 biscuits. She gives ¼ to her friend. How many does she give away?', a: '24 ÷ 4 = 6. Ama gives away 6 biscuits.' },
      { q: 'Which is more — ½ of 20 or ¼ of 20?', a: '½ of 20 = 10. ¼ of 20 = 5. So ½ of 20 is MORE.' },
      { q: 'A piece of string is 12 cm long. Yaw cuts off ⅓ of it. How long is the piece he cuts off?', a: '12 ÷ 3 = 4 cm.' },
      { q: 'Shade ¾ of a shape that has 8 equal parts. How many parts do you shade?', a: '8 ÷ 4 = 2. Then 2 × 3 = 6. Shade 6 parts.' },
      { q: 'There are 30 children in a class. ⅔ are girls. How many girls are there?', a: '30 ÷ 3 = 10. Then 10 × 2 = 20. There are 20 girls.' },
      { q: '[Challenge] A farmer has 24 cows. He sells ¼ on Monday and ⅓ on Tuesday. How many cows does he have left?', a: 'Monday: ¼ of 24 = 24÷4 = 6 sold.\nTuesday: ⅓ of 24 = 24÷3 = 8 sold.\nTotal sold: 6 + 8 = 14.\nLeft: 24 - 14 = 10 cows.' },
    ],
  },

  // ─── DAY 12 — ENGLISH: Writing ──────────────────────────────────────────
  ivan_day12: {
    studentId: 'ivan',
    dayNum: 12,
    subject: 'English',
    topic: 'Writing: Sentences and Simple Paragraphs',
    standard: 'B3.3.3.1',
    objectives: [
      'Write a correct sentence with a capital letter and full stop',
      'Join two sentences using "and", "but" or "because"',
      'Write a short paragraph of 3-4 sentences',
      'Use describing words (adjectives) in sentences',
    ],
    concepts: [
      {
        heading: 'Writing a Good Sentence',
        body: 'A sentence is a complete thought. It makes sense on its own.\n\nEvery sentence must have:\n• A CAPITAL LETTER at the start.\n• A FULL STOP (.), QUESTION MARK (?) or EXCLAMATION MARK (!) at the end.\n• A subject (who or what) and a verb (what they do).\n\nEXAMPLES OF CORRECT SENTENCES:\nThe dog ran fast.\nKofi ate his food.\nIs it raining today?\nWatch out!\n\nEXAMPLES OF WRONG SENTENCES:\nthe dog ran fast. (no capital letter)\nKofi ate his food (no full stop)\nRan fast. (who ran? no subject)\n\nDESCRIBING WORDS (ADJECTIVES):\nAdjectives tell us MORE about a noun.\nExample: The dog → The BIG, BLACK dog.\nExample: She ate food → She ate DELICIOUS, HOT food.',
        note: 'Every sentence: Capital letter → words → full stop. This is the rule. Never forget it.',
      },
      {
        heading: 'Joining Sentences and Writing Paragraphs',
        body: 'We can JOIN two short sentences into one longer sentence.\n\nUse AND to add information:\n"Kofi went to the market. He bought a mango."\n→ "Kofi went to the market and he bought a mango."\n\nUse BUT to show a difference:\n"Ama wanted to play. It was raining."\n→ "Ama wanted to play but it was raining."\n\nUse BECAUSE to give a reason:\n"Ivan was happy. He passed his test."\n→ "Ivan was happy because he passed his test."\n\nA PARAGRAPH is a group of sentences about the SAME topic.\nA paragraph usually has 3-4 sentences.\n\nExample paragraph:\nMy school is very nice. It has many classrooms and a big playground. My favourite place is the library. I love reading books there.',
        note: 'AND adds. BUT contrasts. BECAUSE explains. Use these three words to write longer, better sentences.',
      },
    ],
    worked: [
      {
        q: 'Fix these sentences. Add capital letters and full stops:\n(a) the cat sat on the mat\n(b) ama went to school',
        a: '(a) The cat sat on the mat.\n(b) Ama went to school.',
      },
      {
        q: 'Join these sentences using the word in brackets:\n(a) Kofi was hungry. He ate his kenkey. (and)\n(b) It was hot. Yaa did not drink water. (but)',
        a: '(a) Kofi was hungry and he ate his kenkey.\n(b) It was hot but Yaa did not drink water.',
      },
      {
        q: 'Add TWO describing words to make this sentence better:\n"The girl ate the food."',
        a: 'Example: The SMALL, HUNGRY girl ate the HOT, DELICIOUS food.\nAccept any appropriate adjectives.',
      },
    ],
    questions: [
      { q: 'Write THREE correct sentences about your school. Remember: capital letters and full stops.', a: 'Accept any three correct sentences with capital letters and full stops.' },
      { q: 'Fix this sentence: "ivan likes playing football with his friends"', a: 'Ivan likes playing football with his friends.' },
      { q: 'Join these sentences using BECAUSE:\n"The boy cried. He fell down."', a: 'The boy cried because he fell down.' },
      { q: 'Join these sentences using AND:\n"Abena cooked rice. She made stew."', a: 'Abena cooked rice and she made stew.' },
      { q: 'Add TWO adjectives to make this better: "A man walked down the road."', a: 'Example: A tall, old man walked down the dusty road. Accept any correct adjectives.' },
      { q: 'Write a paragraph (3-4 sentences) about your home.', a: 'Accept any paragraph of 3-4 correct sentences about the student\'s home.' },
      { q: 'Is this a correct sentence? Why or why not?\n"ran to the market quickly"', a: 'No, it is not correct. It has no subject (who ran?). It should be: "Kofi ran to the market quickly."' },
      { q: 'Write TWO sentences joined with BUT about the weather today.', a: 'Example: It was sunny this morning but it rained in the afternoon. Accept any correct sentence.' },
      { q: 'Write a sentence using BECAUSE to explain why you like your favourite food.', a: 'Accept any correct sentence, e.g. "I love kenkey because it fills me up and gives me energy."' },
      { q: '[Challenge] Write a short paragraph (4-5 sentences) about a market in Ghana. Use at least THREE adjectives and TWO joining words.', a: 'Accept any creative paragraph with correct sentences, at least 3 adjectives and 2 joining words (and/but/because).' },
    ],
  },

  // ─── DAY 13 — MATHEMATICS: Measurement ─────────────────────────────────
  ivan_day13: {
    studentId: 'ivan',
    dayNum: 13,
    subject: 'Mathematics',
    topic: 'Measurement: Length, Weight and Capacity',
    standard: 'B3.4.1.1',
    objectives: [
      'Measure length using centimetres and metres',
      'Weigh things using kilograms and grams',
      'Measure liquids using litres and millilitres',
      'Choose the right unit for measuring different things',
    ],
    concepts: [
      {
        heading: 'Measuring Length',
        body: 'LENGTH tells us how long, tall or wide something is.\n\nWe measure length using:\nCENTIMETRES (cm) — for small things.\nMETRES (m) — for bigger things.\n\n100 centimetres = 1 metre\n\nExamples:\nYour pencil is about 15 cm long.\nA classroom door is about 2 m tall.\nA football pitch is about 90 m long.\n\nHOW TO MEASURE:\nPlace the ruler at the START of the object (at 0).\nRead the number where the object ENDS.\nThat number is the length.\n\nTo convert metres to centimetres: MULTIPLY by 100.\n3 m = 3 × 100 = 300 cm.\n\nTo convert centimetres to metres: DIVIDE by 100.\n500 cm = 500 ÷ 100 = 5 m.',
        note: '100 cm = 1 m. Always remember this. If someone says they are 150 cm tall, that is 1 m 50 cm (one and a half metres).',
      },
      {
        heading: 'Measuring Weight and Capacity',
        body: 'WEIGHT tells us how heavy something is.\n\nWe measure weight using:\nGRAMS (g) — for light things.\nKILOGRAMS (kg) — for heavier things.\n\n1,000 grams = 1 kilogram\n\nExamples:\nAn egg weighs about 60 g.\nA bag of rice is 5 kg.\nA baby weighs about 3 kg at birth.\n\nCAPACITY tells us how much liquid fits in a container.\n\nWe measure capacity using:\nMILLILITRES (ml) — for small amounts.\nLITRES (L) — for bigger amounts.\n\n1,000 ml = 1 litre\n\nExamples:\nA sachet of water is 500 ml.\nA big bottle of water is 1.5 L.\nA bucket holds about 10 L.\n\nCHOOSING THE RIGHT UNIT:\nLength of a book → cm\nHeight of a building → m\nWeight of a mango → g\nWeight of a person → kg\nAmount in a sachet → ml\nAmount in a bucket → L',
        note: '1 kg = 1,000 g. 1 L = 1,000 ml. These are the two most important conversions.',
      },
    ],
    worked: [
      {
        q: 'Convert:\n(a) 3 m to cm\n(b) 400 cm to m\n(c) 2 kg to g',
        a: '(a) 3 × 100 = 300 cm.\n(b) 400 ÷ 100 = 4 m.\n(c) 2 × 1,000 = 2,000 g.',
      },
      {
        q: 'Choose the right unit (cm, m, g, kg, ml, L):\n(a) Length of your finger\n(b) Weight of a school bag\n(c) Water in a bucket',
        a: '(a) cm.\n(b) kg.\n(c) L.',
      },
      {
        q: 'Kofi has a rope 5 m long. He cuts off 150 cm. How much rope is left in cm?',
        a: '5 m = 500 cm. 500 - 150 = 350 cm.',
      },
    ],
    questions: [
      { q: 'How many centimetres are in 1 metre?', a: '100 centimetres.' },
      { q: 'How many grams are in 1 kilogram?', a: '1,000 grams.' },
      { q: 'How many millilitres are in 1 litre?', a: '1,000 millilitres.' },
      { q: 'Convert: (a) 5 m to cm  (b) 3 kg to g  (c) 2 L to ml', a: '(a) 500 cm. (b) 3,000 g. (c) 2,000 ml.' },
      { q: 'Convert: (a) 200 cm to m  (b) 4,000 g to kg  (c) 500 ml to L', a: '(a) 2 m. (b) 4 kg. (c) 0.5 L (or ½ L).' },
      { q: 'Choose the right unit: length of a football pitch.', a: 'Metres (m).' },
      { q: 'Choose the right unit: weight of a mango.', a: 'Grams (g).' },
      { q: 'A bottle holds 750 ml. How many ml more to make 1 litre?', a: '1,000 - 750 = 250 ml.' },
      { q: 'Ama is 120 cm tall. Her mother is 1 m 65 cm tall. How much taller is the mother?', a: 'Mother = 165 cm. 165 - 120 = 45 cm taller.' },
      { q: '[Challenge] A farmer has 3 bags of maize. Each bag weighs 25 kg. He sells ⅓ of all the maize. How many kg does he sell?', a: 'Total = 3 × 25 = 75 kg. ⅓ of 75 = 75 ÷ 3 = 25 kg sold.' },
    ],
  },

  // ─── DAY 14 — ENGLISH: Grammar ──────────────────────────────────────────
  ivan_day14: {
    studentId: 'ivan',
    dayNum: 14,
    subject: 'English',
    topic: 'Grammar: Nouns, Verbs and Adjectives',
    standard: 'B3.3.4.1',
    objectives: [
      'Identify nouns (people, places and things) in sentences',
      'Identify verbs (doing and being words) in sentences',
      'Identify adjectives (describing words) in sentences',
      'Use nouns, verbs and adjectives to write better sentences',
    ],
    concepts: [
      {
        heading: 'Nouns — People, Places and Things',
        body: 'A NOUN is a naming word. Nouns name:\n\nPEOPLE: teacher, mother, Kofi, girl, farmer.\nPLACES: school, market, Kumasi, river, home.\nTHINGS: mango, book, chair, water, phone.\nANIMALS: dog, fish, goat, butterfly.\n\nHow to find a noun in a sentence:\nAsk: "Is this a person, place, thing or animal?" If yes, it is a noun.\n\nExample: "The girl walked to the market."\nGirl = person → NOUN.\nMarket = place → NOUN.\n\nPROPER NOUNS: names of specific people and places.\nAlways start with a CAPITAL LETTER.\nExamples: Kofi, Ghana, Kumasi, Monday, River Pra.\n\nCOMMON NOUNS: general names.\nStart with a small letter.\nExamples: boy, town, river, day.',
        note: 'Nouns are NAMING words. If you can put "the" or "a" in front of a word, it is probably a noun. "The book", "a teacher", "the market" — all nouns.',
      },
      {
        heading: 'Verbs and Adjectives',
        body: 'A VERB is a DOING or BEING word.\nIt tells us what the noun is doing or being.\n\nDOING verbs: run, eat, jump, write, laugh, cook, play.\nBEING verbs: is, am, are, was, were.\n\nExample: "Ama runs to school every day."\nRuns = doing word = VERB.\n\nExample: "The boy is tall."\nIs = being word = VERB.\n\nAn ADJECTIVE is a DESCRIBING word.\nIt tells us more about a noun.\nIt answers: What kind? How many? What colour?\n\nExamples:\nThe BIG dog. (big describes the dog)\nTWO mangoes. (two tells us how many)\nThe RED cloth. (red tells us the colour)\nThe HAPPY girl. (happy describes the girl)\n\nIn a sentence:\n"Three tall boys ran quickly."\nThree = adjective (how many)\nTall = adjective (what kind)\nBoys = noun\nRan = verb',
        note: 'Noun = NAME. Verb = DO or BE. Adjective = DESCRIBE. These three are the building blocks of every sentence.',
      },
    ],
    worked: [
      {
        q: 'Find all the NOUNS in this sentence:\n"The young farmer took his goats to the river."',
        a: 'Farmer (person), goats (animals), river (place). Note: "young" is an adjective, not a noun.',
      },
      {
        q: 'Find the VERB and the ADJECTIVE in:\n"The small bird sang a beautiful song."',
        a: 'Verb: sang (doing word).\nAdjectives: small (describes bird), beautiful (describes song).',
      },
      {
        q: 'Add a NOUN, VERB and ADJECTIVE to complete:\n"The _____ (adjective) _____ (noun) _____ (verb) in the garden."',
        a: 'Example: The colourful butterfly flew in the garden.\n(colourful = adjective, butterfly = noun, flew = verb)',
      },
    ],
    questions: [
      { q: 'What is a NOUN? Give THREE examples.', a: 'A noun is a naming word — a person, place, thing or animal. Examples: teacher, Ghana, mango (accept any correct nouns).' },
      { q: 'Find TWO nouns in: "The children played football in the park."', a: 'Children (people), football (thing), park (place). Any two correct answers accepted.' },
      { q: 'What is a VERB? Give TWO examples.', a: 'A verb is a doing or being word. Examples: run, eat, is, jump (accept any correct verbs).' },
      { q: 'Find the verb in: "Kofi drank a cup of water."', a: 'Drank (doing word = verb).' },
      { q: 'What is an ADJECTIVE? Give TWO examples.', a: 'An adjective is a describing word. Examples: big, red, happy, cold (accept any correct adjectives).' },
      { q: 'Add TWO adjectives to: "The boy climbed the tree."', a: 'Example: The brave, young boy climbed the tall tree. Accept any correct adjectives.' },
      { q: 'Is "Ghana" a proper noun or a common noun? Why?', a: 'Ghana is a PROPER NOUN. It is the specific name of a country and starts with a capital letter.' },
      { q: 'Sort these words into NOUN, VERB, ADJECTIVE:\nrun, school, happy, teacher, jump, cold, eat, river', a: 'Nouns: school, teacher, river.\nVerbs: run, jump, eat.\nAdjectives: happy, cold.' },
      { q: 'Write a sentence using ONE noun, ONE verb and ONE adjective. Underline each one.', a: 'Accept any correct sentence with all three identified correctly.' },
      { q: '[Challenge] Write THREE sentences about a Ghanaian market. In each sentence, underline the noun in one line, the verb in two lines and the adjective with a circle.', a: 'Accept any three correct sentences with nouns, verbs and adjectives correctly identified.' },
    ],
  },

  // ─── DAY 15 — MATHEMATICS: Time ─────────────────────────────────────────
  ivan_day15: {
    studentId: 'ivan',
    dayNum: 15,
    subject: 'Mathematics',
    topic: 'Time: Reading the Clock and Using a Calendar',
    standard: 'B3.4.2.1',
    objectives: [
      'Tell the time to the hour and half hour on a clock',
      'Use a.m. and p.m. correctly',
      'Read a simple calendar',
      'Solve simple problems about time',
    ],
    concepts: [
      {
        heading: 'Reading a Clock',
        body: 'A clock has TWO hands:\nSHORT hand — points to the HOUR.\nLONG hand — points to the MINUTES.\n\nWhen the long hand points to 12, it is exactly on the hour.\n"3 o\'clock" — short hand at 3, long hand at 12.\n"7 o\'clock" — short hand at 7, long hand at 12.\n\nWhen the long hand points to 6, it is HALF PAST.\n"Half past 3" — short hand between 3 and 4, long hand at 6.\n"Half past 9" — short hand between 9 and 10, long hand at 6.\n\nHalf past = 30 minutes past the hour.\n3 o\'clock = 3:00\nHalf past 3 = 3:30\n\nA.M. and P.M.:\nA.M. = morning (from midnight to midday, 12:00)\nP.M. = afternoon and evening (from midday to midnight)\n\nExamples:\n7:00 a.m. = 7 o\'clock in the morning (getting ready for school)\n3:00 p.m. = 3 o\'clock in the afternoon (coming home from school)\n8:30 p.m. = half past 8 in the evening (going to bed)',
        note: 'SHORT hand = HOUR. LONG hand = MINUTES. Remember: the SHORT hand is for the SHORT time (hours). The LONG hand moves more and is for minutes.',
      },
      {
        heading: 'Using a Calendar',
        body: 'A CALENDAR shows all the days, weeks and months of the year.\n\nThere are 12 MONTHS in a year:\nJanuary, February, March, April, May, June,\nJuly, August, September, October, November, December.\n\nThere are 7 DAYS in a week:\nMonday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\n\nDays in each month:\nMost months have 30 or 31 days.\nFebruary has 28 days (or 29 in a leap year).\n\nGhana National Holidays:\n1st January — New Year\'s Day.\n6th March — Independence Day.\n25th December — Christmas Day.\n\nSOLVING TIME PROBLEMS:\nHow many days from Monday to Friday? Mon→Tue→Wed→Thu→Fri = 4 days.\nHow many months from January to April? Jan→Feb→Mar→Apr = 3 months.',
        note: '12 months in a year. 7 days in a week. 24 hours in a day. 60 minutes in an hour. These four facts solve almost all time problems.',
      },
    ],
    worked: [
      {
        q: 'Write the time shown:\n(a) Short hand at 5, long hand at 12.\n(b) Short hand between 8 and 9, long hand at 6.',
        a: '(a) 5 o\'clock (5:00).\n(b) Half past 8 (8:30).',
      },
      {
        q: 'School starts at 7:30 a.m. and ends at 3:00 p.m. How many hours is that?',
        a: 'From 7:30 a.m. to 3:00 p.m.\n7:30 to 8:30 = 1 hour.\n8:30 to 3:00 = 6½ hours.\nTotal = 7½ hours (7 hours 30 minutes).',
      },
      {
        q: 'What day comes TWO days after Wednesday?',
        a: 'Wednesday → Thursday → Friday. Two days after Wednesday is FRIDAY.',
      },
    ],
    questions: [
      { q: 'What does the SHORT hand on a clock show?', a: 'The short hand shows the HOUR.' },
      { q: 'What time is it when the short hand is at 9 and the long hand is at 12?', a: '9 o\'clock (9:00).' },
      { q: 'What time is it when the short hand is between 4 and 5 and the long hand is at 6?', a: 'Half past 4 (4:30).' },
      { q: 'Write these times using numbers:\n(a) Half past 6\n(b) 11 o\'clock', a: '(a) 6:30. (b) 11:00.' },
      { q: 'Is 7:00 a.m. in the morning or afternoon?', a: 'Morning.' },
      { q: 'How many months are in a year?', a: '12 months.' },
      { q: 'How many days are in a week? Name them in order.', a: '7 days. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.' },
      { q: 'What day comes 3 days after Monday?', a: 'Monday → Tuesday → Wednesday → Thursday. Thursday.' },
      { q: 'Ivan goes to sleep at 9:00 p.m. and wakes up at 6:00 a.m. How many hours did he sleep?', a: '9:00 p.m. to 6:00 a.m. = 9 hours.' },
      { q: '[Challenge] A film starts at 4:30 p.m. and lasts 2 hours. What time does it end?', a: '4:30 + 2 hours = 6:30 p.m.' },
    ],
  },

  // ─── DAY 16 — ENGLISH: Writing Stories ──────────────────────────────────
  ivan_day16: {
    studentId: 'ivan',
    dayNum: 16,
    subject: 'English',
    topic: 'Creative Writing: Writing a Short Story',
    standard: 'B3.3.5.1',
    objectives: [
      'Plan a short story using the five story parts',
      'Write a story with a clear beginning, middle and end',
      'Use describing words to make the story interesting',
      'Check your story for capital letters and full stops',
    ],
    concepts: [
      {
        heading: 'Planning Your Story',
        body: 'Before you write, PLAN your story. A good plan makes writing easier.\n\nAnswer these five questions before you start:\n\n1. WHO is in the story? (characters)\nExample: A boy called Kwame and his little sister Adwoa.\n\n2. WHERE does the story happen? (setting)\nExample: In a village near a big river.\n\n3. WHAT is the problem? (problem)\nExample: Adwoa got lost in the forest.\n\n4. WHAT happens? (events)\nExample: Kwame looked everywhere. He called her name. He asked an old woman for help.\n\n5. HOW does it end? (ending)\nExample: Kwame found Adwoa sitting under a mango tree. They went home together.\n\nOnce you have your plan, writing the story is easy. Just follow your plan.',
        note: 'Never start writing without a plan. Five minutes of planning saves ten minutes of confusion later.',
      },
      {
        heading: 'Making Your Story Interesting',
        body: 'A story is interesting when you can SEE it in your mind.\n\nUse DESCRIBING WORDS:\nInstead of: "The dog barked."\nWrite: "The big, brown dog barked loudly."\n\nUse FEELINGS:\nInstead of: "Kwame was afraid."\nWrite: "Kwame\'s heart was beating very fast. He was very afraid."\n\nUse the RIGHT ORDER:\nBeginning — introduce characters and setting.\nMiddle — the problem happens.\nEnd — the problem is solved.\n\nUse CONNECTIVE WORDS to link your ideas:\nFirst... Then... Next... After that... Finally...\nSuddenly... Later... In the end...\n\nShort example story:\nOne morning, Ama saw a baby bird on the ground. It had fallen from its nest. Ama was worried. She carefully picked up the bird. She climbed the tree and placed it back in its nest. The mother bird sang happily.',
        note: 'Read your story out loud when you finish. If it sounds good when you hear it, it will sound good to the reader too.',
      },
    ],
    worked: [
      {
        q: 'Use this plan to write a story (5-6 sentences):\nCharacter: A girl called Efua.\nSetting: A busy market.\nProblem: Efua lost her mother\'s money.\nEvents: She looked everywhere. She asked people for help.\nEnding: A kind trader found the money and gave it back.',
        a: 'One day, Efua went to the market to buy tomatoes for her mother. She put the money carefully in her pocket. But when she reached the tomato seller, the money was gone! Efua looked everywhere — on the ground, between the stalls, in her bag. She asked the sellers for help. Finally, a kind old trader tapped her shoulder. "Little girl, is this yours?" He was holding the money. Efua thanked him and went straight to buy the tomatoes.',
      },
    ],
    questions: [
      { q: 'What are the FIVE parts of a story?', a: 'Characters, setting, problem, events, ending.' },
      { q: 'What is a SETTING in a story?', a: 'The setting is where and when the story happens.' },
      { q: 'Write a sentence describing a character. Use TWO adjectives.', a: 'Example: Kofi was a tall, quiet boy who loved reading. Accept any correct sentence with two adjectives.' },
      { q: 'Write the BEGINNING of a story (2 sentences). Include a character and a setting.', a: 'Accept any two correct sentences introducing a character and place.' },
      { q: 'Write the ENDING of a story where the problem is solved (2 sentences).', a: 'Accept any two correct sentences with a clear resolution.' },
      { q: 'Use THEN and FINALLY to link these ideas:\nThe boy found a mango tree. He picked mangoes. He shared them with friends.', a: 'The boy found a mango tree. Then he picked mangoes. Finally, he shared them with his friends.' },
      { q: 'Make this sentence more interesting by adding describing words:\n"A woman walked to the well."', a: 'Example: A tall, tired woman walked slowly to the old stone well. Accept any sentence with added describing words.' },
      { q: 'Write a plan for a short story. Include all five story parts.', a: 'Accept any complete plan with: character(s), setting, problem, events, ending.' },
      { q: 'Write a story about finding something valuable. Use your plan from Q8. Aim for 5-6 sentences.', a: 'Accept any creative story based on the plan, written in correct sentences with capital letters and full stops.' },
      { q: '[Challenge] Write a story about a child who does something brave. Your story must have: at least two characters, a clear problem, describing words, and connecting words (first, then, finally).', a: 'Accept any creative story meeting all four requirements with correct sentences.' },
    ],
  },

  // ─── DAY 17 — MATHEMATICS: Shape and Space ──────────────────────────────
  ivan_day17: {
    studentId: 'ivan',
    dayNum: 17,
    subject: 'Mathematics',
    topic: 'Shapes: 2D and 3D Shapes Around Us',
    standard: 'B3.3.1.1',
    objectives: [
      'Name and describe 2D shapes: square, rectangle, triangle, circle',
      'Name and describe 3D shapes: cube, cuboid, sphere, cylinder, cone',
      'Count the sides and corners of 2D shapes',
      'Find shapes in objects around you',
    ],
    concepts: [
      {
        heading: '2D Shapes — Flat Shapes',
        body: 'A 2D shape is FLAT. You can draw it on paper.\n\nSQUARE:\n4 equal sides. 4 corners.\nExample: a floor tile.\n\nRECTANGLE:\n4 sides (2 long, 2 short). 4 corners.\nLong sides are equal. Short sides are equal.\nExample: a door, an exercise book.\n\nTRIANGLE:\n3 sides. 3 corners.\nSides can be different lengths.\nExample: a slice of watermelon, a tent.\n\nCIRCLE:\n1 curved side. 0 corners.\nAll points on the edge are the same distance from the middle.\nExample: a coin, the sun, a wheel.\n\nNow let us count:\nSquare: 4 sides, 4 corners.\nRectangle: 4 sides, 4 corners.\nTriangle: 3 sides, 3 corners.\nCircle: 1 curved edge, 0 corners.',
        note: 'Sides are STRAIGHT lines. Corners are where two sides MEET. A circle has no straight sides and no corners.',
      },
      {
        heading: '3D Shapes — Solid Shapes',
        body: 'A 3D shape is SOLID. You can hold it in your hands.\n\nCUBE:\nLike a square box — all 6 faces are squares.\nExample: a dice, a wooden block.\n6 faces, 12 edges, 8 corners.\n\nCUBOID:\nLike a rectangular box — faces are rectangles.\nExample: a brick, a matchbox, a book.\n6 faces, 12 edges, 8 corners.\n\nSPHERE:\nPerfectly round. Like a ball.\nExample: a football, an orange.\n1 curved face, 0 edges, 0 corners.\n\nCYLINDER:\nRound in the middle, flat circles on top and bottom.\nExample: a tin of tomatoes, a candle, a cup.\n2 flat circular faces, 1 curved face.\n\nCONE:\nPointy at the top, flat circle at the bottom.\nExample: an ice cream cone, a party hat, a dunce cap.\n1 flat face, 1 curved face, 1 pointed corner (apex).\n\nFINDING SHAPES AROUND YOU:\nCube → dice, Milo tin cap.\nCuboid → exercise book, brick.\nSphere → football, orange.\nCylinder → Milo tin, candle.\nCone → funnel, wafer cone.',
        note: 'FACE = flat or curved surface. EDGE = where two faces meet. CORNER (VERTEX) = where edges meet. A cube has 6 faces, 12 edges and 8 corners.',
      },
    ],
    worked: [
      {
        q: 'How many sides and corners does each shape have?\n(a) Triangle\n(b) Square\n(c) Rectangle\n(d) Circle',
        a: '(a) Triangle: 3 sides, 3 corners.\n(b) Square: 4 sides, 4 corners.\n(c) Rectangle: 4 sides, 4 corners.\n(d) Circle: 1 curved edge, 0 corners.',
      },
      {
        q: 'Name the 3D shape for each object:\n(a) A football\n(b) A tin of tomatoes\n(c) A dice\n(d) An ice cream cone',
        a: '(a) Sphere.\n(b) Cylinder.\n(c) Cube.\n(d) Cone.',
      },
      {
        q: 'Name TWO objects in your classroom that are shaped like rectangles.',
        a: 'Accept any two correct answers: exercise book, window, door, blackboard, table top, ruler, etc.',
      },
    ],
    questions: [
      { q: 'How many sides does a triangle have?', a: '3 sides.' },
      { q: 'How many corners does a square have?', a: '4 corners.' },
      { q: 'Name a 2D shape with NO corners.', a: 'Circle.' },
      { q: 'What is the difference between a square and a rectangle?', a: 'A square has 4 EQUAL sides. A rectangle has 2 long sides and 2 short sides (opposite sides are equal).' },
      { q: 'Name the 3D shape that looks like a ball.', a: 'Sphere.' },
      { q: 'Name TWO things in your home shaped like a cylinder.', a: 'Accept any two: tin of tomatoes, candle, cup, water pipe, Milo tin, etc.' },
      { q: 'How many faces does a cube have?', a: '6 faces.' },
      { q: 'Name the 2D shape for each: (a) a coin  (b) a book cover  (c) a slice of watermelon', a: '(a) Circle. (b) Rectangle. (c) Triangle.' },
      { q: 'Name the 3D shape for each: (a) a brick  (b) an orange  (c) a party hat', a: '(a) Cuboid. (b) Sphere. (c) Cone.' },
      { q: '[Challenge] A cube and a cuboid both have 6 faces and 12 edges. What is the difference between them?', a: 'A cube has ALL faces as equal squares. A cuboid has rectangular faces — some longer and some shorter. On a cube, all edges are the same length. On a cuboid, edges have different lengths.' },
    ],
  },

  // ─── DAY 18 — SCIENCE: Plants ───────────────────────────────────────────
  ivan_day18: {
    studentId: 'ivan',
    dayNum: 18,
    subject: 'Science',
    topic: 'Plants: Parts of a Plant and What They Do',
    standard: 'B3.5.4.1',
    objectives: [
      'Name the main parts of a plant',
      'Say what each part of a plant does',
      'Explain why plants are important to us',
      'Give examples of plants that are useful in Ghana',
    ],
    concepts: [
      {
        heading: 'Parts of a Plant',
        body: 'A plant has these main parts:\n\nROOTS\nRoots grow DOWN into the ground.\nRoots hold the plant in the soil so it does not fall over.\nRoots take in water and food from the soil.\n\nSTEM (TRUNK)\nThe stem holds the plant UP.\nThe stem carries water from the roots to the leaves.\nA tree\'s stem is called a TRUNK.\n\nLEAVES\nLeaves are usually flat and green.\nLeaves make food for the plant using SUNLIGHT and AIR.\nLeaves give out water and air.\n\nFLOWERS\nFlowers are the colourful parts of some plants.\nFlowers make SEEDS.\nBees and butterflies visit flowers to collect nectar.\n\nFRUITS\nFruits grow from flowers.\nFruits hold SEEDS inside them.\nFruits protect the seeds.\nWe eat many fruits: mango, orange, pawpaw, watermelon.\n\nSEEDS\nSeeds are inside fruits.\nSeeds can grow into new plants.\nExample: a mango seed can grow into a mango tree.',
        note: 'Every part of a plant has a JOB. Roots = hold and drink. Stem = support and carry water. Leaves = make food. Flowers = make seeds. Fruits = protect seeds.',
      },
      {
        heading: 'Why Plants Are Important',
        body: 'Plants are very important for everyone.\n\nPLANTS GIVE US FOOD:\nWe eat fruits: mango, orange, pawpaw, banana.\nWe eat vegetables: tomato, pepper, garden egg, kontomire.\nWe eat seeds: maize, rice, beans, groundnuts.\nWe eat roots: cassava, yam, cocoyam, carrots.\n\nPLANTS GIVE US MEDICINE:\nNeem leaves are used to treat malaria and skin problems.\nAloe vera is used for burns and skin care.\n\nPLANTS GIVE US AIR:\nPlants take in a gas called carbon dioxide.\nPlants give out OXYGEN — the air we breathe.\nMore plants = cleaner air.\n\nPLANTS GIVE US SHADE:\nBig trees give us shade from the hot sun.\nFarming communities plant trees near their homes.\n\nPLANTS GIVE US WOOD:\nWood is used for building houses, furniture and cooking fuel.',
        note: 'We cannot live without plants. They give us food, air, medicine, shade and wood. Cutting down too many trees is very dangerous for everyone.',
      },
    ],
    worked: [
      {
        q: 'Name the part of the plant that does each job:\n(a) Holds the plant in the soil.\n(b) Makes food using sunlight.\n(c) Carries water to the leaves.\n(d) Makes seeds.',
        a: '(a) Roots.\n(b) Leaves.\n(c) Stem.\n(d) Flowers.',
      },
      {
        q: 'Give THREE ways plants are useful to people in Ghana.',
        a: 'Any three: food (maize, cassava, mango), medicine (neem, aloe vera), wood (building, furniture), clean air, shade, cooking fuel.',
      },
      {
        q: 'Name TWO plants we eat the ROOTS of, and TWO plants we eat the FRUITS of.',
        a: 'Roots: cassava, yam (or cocoyam, carrot).\nFruits: mango, orange (or pawpaw, watermelon, tomato).',
      },
    ],
    questions: [
      { q: 'Name FIVE parts of a plant.', a: 'Roots, stem, leaves, flowers, fruits (and seeds).' },
      { q: 'What do ROOTS do? Give TWO jobs.', a: '1. Roots hold the plant in the soil. 2. Roots take in water and food from the soil.' },
      { q: 'What do LEAVES do?', a: 'Leaves make food for the plant using sunlight and air.' },
      { q: 'What do FLOWERS do?', a: 'Flowers make seeds. They are also visited by bees and butterflies.' },
      { q: 'Name THREE fruits we eat in Ghana.', a: 'Any three: mango, orange, pawpaw, banana, watermelon, pineapple, avocado.' },
      { q: 'Name THREE vegetables we eat in Ghana.', a: 'Any three: tomato, pepper, garden egg, kontomire, okra, onion.' },
      { q: 'Why do plants give us CLEAN AIR?', a: 'Plants take in carbon dioxide (a gas we breathe out) and give out oxygen (the gas we breathe in). More plants mean more oxygen and cleaner air.' },
      { q: 'Name ONE plant used as MEDICINE in Ghana and say what it treats.', a: 'Neem — treats malaria and skin problems. Or aloe vera — treats burns. Accept any correct Ghanaian medicinal plant.' },
      { q: 'What would happen if all the trees in a forest were cut down? Give TWO effects.', a: 'Any two: animals would lose their homes; the air would become less clean; there would be no shade; the soil would wash away; rainfall might decrease.' },
      { q: '[Challenge] A mango tree gives fruits, shade, wood AND oxygen. Explain how cutting it down affects FOUR different things.', a: 'Fruits — people lose a source of food. Shade — the area becomes hotter. Wood — one less source of timber. Oxygen — less air being cleaned. Accept any four well-explained effects.' },
    ],
  },

  // ─── DAY 19 — MATHEMATICS: Money ────────────────────────────────────────
  ivan_day19: {
    studentId: 'ivan',
    dayNum: 19,
    subject: 'Mathematics',
    topic: 'Money: Buying, Selling and Giving Change',
    standard: 'B3.1.6.1',
    objectives: [
      'Recognise Ghana cedis and pesewas',
      'Add and subtract amounts of money',
      'Calculate change when buying something',
      'Solve word problems about buying and selling',
    ],
    concepts: [
      {
        heading: 'Ghana Cedis and Pesewas',
        body: 'In Ghana we use CEDIS (GH₵) and PESEWAS (Gp).\n\n100 pesewas = 1 cedi.\n\nCOINS: 1Gp, 5Gp, 10Gp, 20Gp, 50Gp, 1GH₵, 2GH₵.\nNOTES: 5GH₵, 10GH₵, 20GH₵, 50GH₵, 100GH₵, 200GH₵.\n\nWriting amounts:\nGH₵5.50 means 5 cedis and 50 pesewas.\nGH₵0.75 means 75 pesewas (less than 1 cedi).\n\nADDING MONEY:\nLine up the decimal points, then add normally.\nGH₵3.50 + GH₵2.25 = GH₵5.75\n\nSUBTRACTING MONEY:\nGH₵10.00 - GH₵6.50 = GH₵3.50',
        note: '100 pesewas = 1 cedi. Just like 100 cents = 1 dollar. Or 100 kobo = 1 naira. The decimal point separates cedis from pesewas.',
      },
      {
        heading: 'Giving Change',
        body: 'CHANGE is the money you get back when you pay MORE than the price.\n\nTo find change:\nCHANGE = AMOUNT PAID - PRICE\n\nExample:\nA mango costs GH₵2.50.\nYou pay with a GH₵5.00 note.\nChange = GH₵5.00 - GH₵2.50 = GH₵2.50\n\nExample:\nA bag of sachet water costs GH₵3.00.\nYou pay GH₵10.00.\nChange = GH₵10.00 - GH₵3.00 = GH₵7.00\n\nCHECKING YOUR CHANGE:\nAlways check: Price + Change = Amount you paid.\nGH₵2.50 + GH₵2.50 = GH₵5.00 ✓\n\nIF YOU BUY MORE THAN ONE THING:\nFirst add up all the prices.\nThen subtract from the amount you paid.\n\nExample:\nBanana = GH₵1.00. Bread = GH₵4.50. Total = GH₵5.50.\nYou pay GH₵10.00. Change = GH₵10.00 - GH₵5.50 = GH₵4.50.',
        note: 'Change = Money given - Money spent. Always check by adding the change back to the price. You should get the amount you paid.',
      },
    ],
    worked: [
      {
        q: 'Add: GH₵4.50 + GH₵3.25',
        a: 'GH₵4.50 + GH₵3.25 = GH₵7.75',
      },
      {
        q: 'A pencil costs GH₵1.50. You pay GH₵5.00. What is the change?',
        a: 'Change = GH₵5.00 - GH₵1.50 = GH₵3.50.\nCheck: GH₵1.50 + GH₵3.50 = GH₵5.00 ✓',
      },
      {
        q: 'Ama buys rice for GH₵8.00 and fish for GH₵5.50. She pays with GH₵20.00. What change does she get?',
        a: 'Total = GH₵8.00 + GH₵5.50 = GH₵13.50.\nChange = GH₵20.00 - GH₵13.50 = GH₵6.50.',
      },
    ],
    questions: [
      { q: 'How many pesewas are in 1 cedi?', a: '100 pesewas.' },
      { q: 'Add: GH₵2.50 + GH₵1.75', a: 'GH₵4.25' },
      { q: 'Subtract: GH₵10.00 - GH₵4.50', a: 'GH₵5.50' },
      { q: 'A biscuit costs GH₵0.50. You pay GH₵1.00. What is the change?', a: 'GH₵1.00 - GH₵0.50 = GH₵0.50' },
      { q: 'A notebook costs GH₵3.00. You pay GH₵10.00. What is the change?', a: 'GH₵10.00 - GH₵3.00 = GH₵7.00' },
      { q: 'Ivan buys a pen for GH₵2.00 and a rubber for GH₵1.50. How much does he spend altogether?', a: 'GH₵2.00 + GH₵1.50 = GH₵3.50' },
      { q: 'Kofi has GH₵15.00. He spends GH₵8.50 at the market. How much does he have left?', a: 'GH₵15.00 - GH₵8.50 = GH₵6.50' },
      { q: 'A mango is GH₵1.50, a banana is GH₵0.50, and a orange is GH₵2.00. What is the total cost?', a: 'GH₵1.50 + GH₵0.50 + GH₵2.00 = GH₵4.00' },
      { q: 'Ama pays GH₵20.00 for items costing GH₵14.75. What change does she receive?', a: 'GH₵20.00 - GH₵14.75 = GH₵5.25' },
      { q: '[Challenge] Yaw has GH₵50.00. He buys 3 bags of rice at GH₵12.00 each. How much change does he get?', a: '3 × GH₵12.00 = GH₵36.00. Change = GH₵50.00 - GH₵36.00 = GH₵14.00.' },
    ],
  },

  // ─── DAY 20 — ENGLISH: Reading Comprehension ────────────────────────────
  ivan_day20: {
    studentId: 'ivan',
    dayNum: 20,
    subject: 'English',
    topic: 'Reading Comprehension: Understanding What You Read',
    standard: 'B3.3.6.1',
    objectives: [
      'Read a passage and understand its main idea',
      'Answer questions about a passage in full sentences',
      'Find the meaning of words using clues in the text',
      'Give your own opinion about what you read',
    ],
    concepts: [
      {
        heading: 'How to Read for Understanding',
        body: 'When you read a passage (a piece of writing), follow these steps:\n\nSTEP 1: Read the WHOLE passage once.\nDo not stop at words you do not know. Keep reading.\n\nSTEP 2: Read it AGAIN slowly.\nThis time, think about what each part means.\n\nSTEP 3: Look at the QUESTIONS.\nNow you know what to look for.\n\nSTEP 4: Go back to the passage.\nFind the answers. Use the words in the passage to help you.\n\nSTEP 5: Write your answers in FULL SENTENCES.\n\nTHE MAIN IDEA:\nEvery passage has ONE main idea — what the whole passage is about.\nTo find it, ask: "What is this passage mostly about?"\nThe main idea is NOT a small detail. It is the BIG topic.\n\nExample:\nPassage about farmers in Ghana using new tools to grow more food.\nMain idea: Ghanaian farmers are using modern tools to improve farming.',
        note: 'Read TWICE before answering. First time — understand. Second time — find answers. This simple habit will improve your marks.',
      },
      {
        heading: 'Finding Word Meanings from Context',
        body: 'When you see a word you do not know, DO NOT GIVE UP.\nUse CLUES from the sentence and the passage.\n\nExample:\n"The farmer was exhausted after working in the hot sun all day. He sat down and closed his eyes."\n\nWhat does EXHAUSTED mean?\nClue: He worked all day in hot sun. Then he sat and closed his eyes.\nExhausted must mean VERY TIRED.\n\nTHREE strategies for unknown words:\n\n1. LOOK AT WHAT COMES BEFORE AND AFTER the word.\nClues are usually nearby.\n\n2. LOOK FOR A SIMILAR WORD you already know.\n"Enormous" looks like "more" — it probably means very big.\n\n3. RE-READ THE SENTENCE using your guess.\nDoes it make sense? If yes, your guess is probably right.',
        note: 'You do not need to know every word to understand a passage. Context clues (clues from around the word) are your best tool.',
      },
    ],
    worked: [
      {
        q: 'Read this passage and answer the questions.\n\nThe market in Kumasi is one of the biggest markets in West Africa. Every day, thousands of people come to buy and sell things. You can find food, clothes, pots, and many other things. The market is very noisy and busy. Traders call out to people walking by, saying "Come and buy! Best price!"\n\n(a) Where is the market?\n(b) What is the main idea of the passage?\n(c) Give TWO things you can buy at the market.\n(d) What does the word "traders" mean in this passage?',
        a: '(a) The market is in Kumasi.\n(b) The main idea is that the Kumasi market is a very large and busy place where people come to buy and sell things.\n(c) Any two: food, clothes, pots.\n(d) Traders are people who sell things at the market.',
      },
    ],
    questions: [
      { q: 'What is the MAIN IDEA of a passage?', a: 'The main idea is what the whole passage is mostly about — the big topic, not a small detail.' },
      { q: 'How many times should you read a passage before answering questions?', a: 'At least TWICE. First to understand, second to find answers.' },
      { q: 'Read: "The old woman shuffled slowly down the path, leaning on her stick."\nWhat does SHUFFLED probably mean?', a: 'Shuffled probably means walked slowly and with difficulty. Clues: she is old, she is leaning on a stick.' },
      { q: 'Read: "Kwame was famished. He had not eaten since morning."\nWhat does FAMISHED mean?', a: 'Famished means very hungry. Clue: he had not eaten since morning.' },
      { q: 'Why is it important to write answers in FULL SENTENCES?', a: 'Full sentences earn more marks in exams. They show you understood the question properly.' },
      { q: 'Read this passage:\n"Ghana is famous for its cocoa. Ghana is one of the biggest producers of cocoa in the world. Cocoa is used to make chocolate. Many farmers in Ghana depend on cocoa for their income."\n\nWhat is the main idea?', a: 'The main idea is that cocoa is very important to Ghana and its farmers.' },
      { q: 'Using the cocoa passage above — give TWO facts about cocoa.', a: 'Any two: Ghana is one of the biggest cocoa producers in the world; cocoa is used to make chocolate; many Ghanaian farmers earn money from cocoa.' },
      { q: 'Using the cocoa passage — what does INCOME mean? Use clues from the passage.', a: 'Income means money you earn from work. Clue: farmers DEPEND on cocoa for their income — it is how they get paid.' },
      { q: 'Write your OWN opinion: Do you think cocoa farming is a good job? Give ONE reason.', a: 'Accept any clearly expressed opinion with a reason, e.g. "Yes, because cocoa is in high demand around the world" or "It can be difficult because it depends on the weather."' },
      { q: '[Challenge] Write a short passage (4-5 sentences) about something important in your community. Then write ONE question about your passage and answer it.', a: 'Accept any creative passage with a clear topic, followed by a relevant question and correct answer.' },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Building Ivan\'s full 20-pack programme...\n')
  let count = 0

  for (const [docId, pack] of Object.entries(PACKS)) {
    const answerKey = pack.questions.map(q => q.a)
    await db.collection('packs').doc(docId).set({
      ...pack,
      answerKey,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    console.log(`✅ ${docId}: ${pack.topic}`)
    count++
  }

  console.log(`\n✅ Done — ${count} packs seeded!`)
  console.log('\nAll packs written at B3 level:')
  console.log('  • Simple sentences (max 12 words)')
  console.log('  • No technical jargon without explanation')
  console.log('  • Ghanaian context throughout')
  console.log('  • Science rewritten from scratch at B3 level')
  console.log('\nNote: Days 1,3,5,7,9 (Maths) already enriched — not overwritten.')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌', err)
  process.exit(1)
})

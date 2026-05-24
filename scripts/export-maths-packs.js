import admin from 'firebase-admin'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const MATHS_DAYS = {
  jezreel: [1,3,5,7,9,11,13,15,17,19],
  declyn:  [1,3,5,7,9],
  ivan:    [1,3,5,7,9],
}

const result = {}
for (const [student, days] of Object.entries(MATHS_DAYS)) {
  result[student] = {}
  for (const day of days) {
    const snap = await db.collection('packs').doc(`${student}_day${day}`).get()
    if (snap.exists) {
      const d = snap.data()
      result[student][`day${day}`] = {
        topic: d.topic,
        standard: d.standard,
        objectives: d.objectives,
        concepts: d.concepts,
        worked: d.worked,
      }
      console.log(`✅ ${student} Day ${day}: ${d.topic}`)
    } else {
      console.log(`❌ ${student} Day ${day}: NOT FOUND`)
    }
  }
}

writeFileSync('scripts/maths-packs-export.json', JSON.stringify(result, null, 2))
console.log('\nExported to scripts/maths-packs-export.json')
process.exit(0)

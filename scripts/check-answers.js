import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

// Check Jezreel days 11 and 15 questions vs answers
for (const day of [11, 13, 15, 17, 19]) {
  const snap = await db.collection('packs').doc(`jezreel_day${day}`).get()
  if (!snap.exists) { console.log(`jezreel_day${day}: NOT FOUND`); continue }
  const d = snap.data()
  console.log(`\n=== jezreel_day${day}: ${d.topic} ===`)
  d.questions?.slice(0,3).forEach((q, i) => {
    console.log(`Q${i+1} question: ${q.q?.substring(0,60)}`)
    console.log(`Q${i+1} answer:   ${q.a?.substring(0,60)}`)
    console.log()
  })
}
process.exit(0)

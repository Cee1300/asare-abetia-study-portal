import admin from 'firebase-admin'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const SCIENCE_DAYS = [2, 6, 10]
const result = {}

for (const day of SCIENCE_DAYS) {
  const snap = await db.collection('packs').doc(`ivan_day${day}`).get()
  if (snap.exists) {
    result[`day${day}`] = snap.data()
    console.log(`✅ ivan_day${day}: ${snap.data().topic}`)
  }
}

writeFileSync('scripts/ivan-science-export.json', JSON.stringify(result, null, 2))
console.log('\nExported to scripts/ivan-science-export.json')
process.exit(0)

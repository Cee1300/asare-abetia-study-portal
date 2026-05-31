import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const snap = await db.collection('packs').get()
snap.forEach(d => {
  if (d.id.includes('recap') || d.id.includes('quiz')) {
    const data = d.data()
    console.log(`${d.id}: topic="${data.topic}" isRecap=${data.isRecap} recapNum=${data.recapNum}`)
  }
})
process.exit(0)

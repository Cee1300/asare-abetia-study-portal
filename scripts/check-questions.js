import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const snap = await db.collection('questions').limit(5).get()
console.log(`Questions in Firestore: ${snap.size}`)
snap.forEach(d => {
  const data = d.data()
  console.log(`- ${data.studentName}: "${data.question?.substring(0, 50)}"`)
})

// Also check Firestore rules by trying to list collections
console.log('\nChecking if questions collection exists...')
process.exit(0)

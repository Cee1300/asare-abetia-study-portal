// scripts/reset-ivan-science.js
// Deletes Ivan's Day 2 and Day 6 submissions so he can redo them
// The new B3-level science packs are already in Firestore
// Run: node scripts/reset-ivan-science.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const DOCS_TO_DELETE = ['ivan_day2', 'ivan_day6']

for (const docId of DOCS_TO_DELETE) {
  const ref = db.collection('submissions').doc(docId)
  const snap = await ref.get()
  if (snap.exists) {
    await ref.delete()
    console.log(`✅ Deleted submission: ${docId}`)
  } else {
    console.log(`⚠️  Not found: ${docId}`)
  }
}

console.log('\n✅ Done — Ivan can now redo Days 2 and 6 with the new science packs.')
console.log('Note: Any points awarded for those sessions remain — they are in the points collection.')
process.exit(0)

// scripts/fix-newlines.js
// Fixes literal \n strings in Firestore packs — replaces with real newlines
// Run: node scripts/fix-newlines.js

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

// Replace literal \n with real newline in all string values recursively
function fixNewlines(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/\\n/g, '\n')
  }
  if (Array.isArray(obj)) {
    return obj.map(fixNewlines)
  }
  if (obj && typeof obj === 'object') {
    const fixed = {}
    for (const [key, value] of Object.entries(obj)) {
      fixed[key] = fixNewlines(value)
    }
    return fixed
  }
  return obj
}

async function migrate() {
  console.log('🔧 Fixing newlines in all packs...\n')

  const snap = await db.collection('packs').get()
  let count = 0

  for (const docSnap of snap.docs) {
    const data = docSnap.data()
    const fixed = fixNewlines(data)

    // Check if anything actually changed
    if (JSON.stringify(data) !== JSON.stringify(fixed)) {
      await db.collection('packs').doc(docSnap.id).set(fixed)
      console.log(`✅ Fixed: ${docSnap.id}`)
      count++
    } else {
      console.log(`⏭️  Skipped (no literal \\n found): ${docSnap.id}`)
    }
  }

  console.log(`\n✅ Done — fixed ${count} packs`)
  process.exit(0)
}

migrate().catch(err => {
  console.error('❌', err)
  process.exit(1)
})

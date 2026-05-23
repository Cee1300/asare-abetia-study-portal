import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const doc = await db.collection('packs').doc('jezreel_recap3').get()
if (!doc.exists) {
  console.log('❌ Document does not exist!')
} else {
  const data = doc.data()
  console.log('✅ Document exists')
  console.log('Fields:', Object.keys(data).join(', '))
  console.log('questions count:', data.questions?.length || 0)
  console.log('concepts count:', data.concepts?.length || 0)
  console.log('First question:', JSON.stringify(data.questions?.[0]?.q?.substring(0, 50)))
}
process.exit(0)

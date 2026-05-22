import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sa = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(sa) })
const db = admin.firestore()

const doc = await db.collection('packs').doc('declyn_day3').get()
const data = doc.data()
const body = data.concepts[1].body

console.log('LENGTH:', body.length)
console.log('RAW JSON:', JSON.stringify(body.substring(0, 300)))
console.log('\nCHAR BY CHAR (first 150):')
for (let i = 0; i < Math.min(150, body.length); i++) {
  const code = body.charCodeAt(i)
  if (code === 10) process.stdout.write('[NL]')
  else if (code === 13) process.stdout.write('[CR]')
  else if (code === 92) process.stdout.write('[BS]')
  else process.stdout.write(body[i])
}
console.log()
process.exit(0)

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const PASSWORDS = [
  { email: 'declyn@aasp.edu.gh', password: 'Declyn@10' },
  { email: 'ivan@aasp.edu.gh',   password: 'Ivan@8' },
]

const users = await admin.auth().listUsers()
for (const { email, password } of PASSWORDS) {
  const user = users.users.find(u => u.email === email)
  if (user) {
    await admin.auth().updateUser(user.uid, { password })
    console.log(`✅ Password reset: ${email}`)
  }
}
process.exit(0)
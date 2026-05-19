// scripts/seed-firebase.js
// Run once to set up Firebase with the three student accounts
// Usage: node scripts/seed-firebase.js
//
// BEFORE RUNNING:
// 1. Install: npm install firebase-admin
// 2. Download service account key from Firebase Console
//    Project Settings → Service Accounts → Generate new private key
// 3. Save as scripts/serviceAccountKey.json
// 4. Update the email/password values below

import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccountKey.json')))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const auth = admin.auth()
const db = admin.firestore()

// ─── USER ACCOUNTS ────────────────────────────────────────────
// CHANGE THESE before running
const USERS = [
  {
    email: 'jezreel@aasp.edu.gh',
    password: 'Jezreel@12',   // Change this
    displayName: 'Jezreel Nolan',
    role: 'student',
    studentId: 'jezreel',
    name: 'Jezreel',
    fullName: 'Jezreel Nolan Asare-Abetia',
    class: 'JHS 1B',
    level: 'B7',
  },
  {
    email: 'declyn@aasp.edu.gh',
    password: 'Declyn@10',    // Change this
    displayName: 'Declyn Bota',
    role: 'student',
    studentId: 'declyn',
    name: 'Declyn',
    fullName: 'Declyn Bota Asare-Abetia',
    class: 'BS 5D',
    level: 'B5',
  },
  {
    email: 'ivan@aasp.edu.gh',
    password: 'Ivan@8',      // Change this
    displayName: 'Ivan Liam',
    role: 'student',
    studentId: 'ivan',
    name: 'Ivan',
    fullName: 'Ivan Liam Asare-Abetia',
    class: 'BS 3A',
    level: 'B3',
  },
  {
    email: 'francis@aasp.edu.gh',
    password: '0r@ngeES',     // Change this — your admin password
    displayName: 'Francis Abetia',
    role: 'admin',
    name: 'Francis',
  },
]

async function seed() {
  console.log('🌱 Seeding Firebase...\n')

  for (const user of USERS) {
    try {
      // Create auth user
      const { email, password, displayName, role, studentId, ...profileData } = user
      const authUser = await auth.createUser({ email, password, displayName })
      console.log(`✅ Created auth: ${email} (${authUser.uid})`)

      // Create Firestore profile
      await db.collection('users').doc(authUser.uid).set({
        uid: authUser.uid,
        email,
        role,
        studentId: studentId || null,
        ...profileData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      console.log(`✅ Created profile: ${displayName}\n`)

    } catch (err) {
      if (err.code === 'auth/email-already-exists') {
        console.log(`⚠️  User already exists: ${user.email}`)
      } else {
        console.error(`❌ Error creating ${user.email}:`, err.message)
      }
    }
  }

  console.log('\n✅ Seed complete!')
  console.log('\n📋 NEXT STEPS:')
  console.log('1. Set CLAUDE_API_KEY in Netlify environment variables')
  console.log('2. Add pack content to Firestore (packs collection)')
  console.log('3. Upload dad.jpg to Firebase Storage → /public/dad.jpg')
  console.log('4. Update firebase.js with your actual config values')
  console.log('5. Deploy to Netlify: netlify deploy --prod')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})

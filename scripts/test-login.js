import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Paste your firebase config values here
const firebaseConfig = {
  apiKey: "AIzaSyBv7l7jgF_LE_nIoU984-A_-RetBVd8_cM",
  authDomain: "asare-abetia-study-protal.firebaseapp.com",
  projectId: "asare-abetia-study-protal",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

try {
  const cred = await signInWithEmailAndPassword(auth, 'declyn@aasp.edu.gh', 'Declyn2026')
  console.log('✅ Login successful:', cred.user.email)
} catch (err) {
  console.log('❌ Login failed:', err.code, err.message)
}
process.exit(0)
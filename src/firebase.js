// src/firebase.js
// ─────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project: "asare-abetia-study-portal"
// 3. Add a Web App, copy the config values below
// 4. Enable: Authentication (Email/Password), Firestore, Storage
// 5. Replace all placeholder values with your actual config
// ─────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBv7l7jgF_LE_nIoU984-A_-RetBVd8_cM",
  authDomain: "asare-abetia-study-protal.firebaseapp.com",
  projectId: "asare-abetia-study-protal",
  storageBucket: "asare-abetia-study-protal.firebasestorage.app",
  messagingSenderId: "596154822867",
  appId: "1:596154822867:web:a0c52cd3a0b1e1dd6ba426"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app

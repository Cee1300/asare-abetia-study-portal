# Asare-Abetia Study Portal (AASP)

LMS for Jezreel, Declyn and Ivan — Marist Preparatory JHS, Kumasi.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Hosting**: Netlify
- **AI Marking**: Anthropic Claude API (via Netlify Function — key never exposed to browser)

---

## Setup Steps

### 1. Firebase Project
1. Go to https://console.firebase.google.com
2. Create project: `asare-abetia-study-portal`
3. Add Web App → copy config values
4. Enable:
   - **Authentication** → Email/Password
   - **Firestore Database** → Start in production mode
   - **Storage** → Start in production mode

### 2. Update Firebase Config
Edit `src/firebase.js` and replace all `YOUR_*` values with your actual Firebase config.

### 3. Deploy Firestore Rules
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
# Copy firestore.rules content when prompted
firebase deploy --only firestore:rules
```

### 4. Create User Accounts
```bash
# Download service account key from Firebase Console
# Project Settings → Service Accounts → Generate new private key
# Save as scripts/serviceAccountKey.json

npm install firebase-admin
node scripts/seed-firebase.js
```

**Default accounts created:**
| User | Email | Password |
|------|-------|----------|
| Jezreel (student) | jezreel@aasp.edu.gh | Jezreel2026! |
| Declyn (student) | declyn@aasp.edu.gh | Declyn2026! |
| Ivan (student) | ivan@aasp.edu.gh | Ivan2026! |
| Francis (admin) | francis@aasp.edu.gh | Admin2026! |

⚠️ Change all passwords in `scripts/seed-firebase.js` before running!

### 5. Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Create site and deploy
netlify init
netlify deploy --prod
```

### 6. Set Environment Variable
In Netlify dashboard:
- Site Settings → Environment Variables
- Add: `CLAUDE_API_KEY` = your Anthropic API key

### 7. Add Dad's Photo
- Upload your photo as `dad.jpg` to Firebase Storage at `/public/dad.jpg`
- OR place it in the `public/` folder of the project before building

### 8. Upload Pack Content
Pack content goes in Firestore `packs` collection.
Document ID format: `{studentId}_day{N}` e.g. `jezreel_day1`

Pack document structure:
```json
{
  "studentId": "jezreel",
  "dayNum": 1,
  "subject": "Mathematics",
  "topic": "Numbers & Place Value",
  "standard": "B7.1.1.1",
  "objectives": ["Learn X", "Practice Y"],
  "concepts": [
    {
      "heading": "Concept heading",
      "body": "Concept explanation...",
      "note": "Optional tip"
    }
  ],
  "worked": [
    { "q": "Question text", "a": "Answer text" }
  ],
  "questions": [
    { "q": "Question text", "a": "Answer key" }
  ]
}
```

---

## Firestore Collections

| Collection | Purpose |
|------------|---------|
| `users` | User profiles (role, studentId etc.) |
| `packs` | Daily pack content (questions, concepts) |
| `submissions` | Student answer submissions |
| `points` | Points transaction log |
| `dadMessages` | Daily messages from Francis to each student |

---

## Points System

| Action | Points |
|--------|--------|
| Submit on time | +10 |
| Score 7+ | +20 |
| Score 9+ | +35 |
| Corrections submitted | +10 |
| Challenge attempted | +5 |
| Challenge correct | +15 |
| 5-day streak | +25 bonus |
| Improvement on same topic | +20 |

---

## Student Accounts

| Student | Class | Level | Status |
|---------|-------|-------|--------|
| Jezreel | JHS 1B | B7 | Active — Day 11 |
| Declyn | BS 5D | B5 | On hold — awaiting computer |
| Ivan | BS 3A | B3 | On hold — awaiting computer |

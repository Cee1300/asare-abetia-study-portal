// src/utils/students.js
// Central data store for all three students

export const STUDENTS = {
  jezreel: {
    id: 'jezreel',
    name: 'Jezreel',
    fullName: 'Jezreel Nolan Asare-Abetia',
    class: 'JHS 1B',
    level: 'B7',
    totalStudents: 53,
    colour: '#2563EB',
    accentLight: '#DBEAFE',
    emoji: '📚',
    programmeStart: '2026-04-29',
  },
  declyn: {
    id: 'declyn',
    name: 'Declyn',
    fullName: 'Declyn Bota Asare-Abetia',
    class: 'BS 5D',
    level: 'B5',
    totalStudents: 44,
    colour: '#EA580C',
    accentLight: '#FFEDD5',
    emoji: '🔬',
    programmeStart: '2026-04-29',
    prioritySubject: 'Science',
  },
  ivan: {
    id: 'ivan',
    name: 'Ivan',
    fullName: 'Ivan Liam Asare-Abetia',
    class: 'BS 3A',
    level: 'B3',
    totalStudents: 39,
    colour: '#0F766E',
    accentLight: '#CCFBF1',
    emoji: '⭐',
    programmeStart: '2026-04-29',
  },
}

// Timetable — maps day number to subject and topic
// Day 1 = April 29 2026 (Wednesday)
export const TIMETABLE = {
  jezreel: [
    { day: 1,  date: '2026-04-29', subject: 'Mathematics', topic: 'Numbers & Place Value to 1,000,000', standard: 'B7.1.1.1' },
    { day: 2,  date: '2026-04-30', subject: 'Science',     topic: 'States of Matter & Particle Theory', standard: 'B7.1.2.1' },
    { day: 3,  date: '2026-05-01', subject: 'Mathematics', topic: 'Rounding: Decimal Places & Sig Figs', standard: 'B7.1.1.1.3' },
    { day: 4,  date: '2026-05-03', subject: 'English',     topic: 'Nouns, Pronouns & Adjectives', standard: 'B7.3.1.1.1' },
    { day: 5,  date: '2026-05-05', subject: 'Mathematics', topic: 'Mental Maths & Multiplication', standard: 'B7.1.2.1' },
    { day: 6,  date: '2026-05-06', subject: 'Science',     topic: 'Cells: Structure & Function', standard: 'B7.1.2.2' },
    { day: 7,  date: '2026-05-07', subject: 'Mathematics', topic: 'HCF, LCM & Indices', standard: 'B7.1.1.2' },
    { day: 8,  date: '2026-05-08', subject: 'English',     topic: 'Verbs, Tense & Subject-Verb Agreement', standard: 'B7.3.1.1.4' },
    { day: 9,  date: '2026-05-09', subject: 'Mathematics', topic: 'Fractions, Decimals & Percentages', standard: 'B7.1.3.1' },
    { day: 10, date: '2026-05-10', subject: 'Science',     topic: 'The Water Cycle & Earth Science', standard: 'B7.3.1.1' },
    { day: 11, date: '2026-05-12', subject: 'Mathematics', topic: 'Measurement: Perimeter, Area & Volume', standard: 'B7.2.1.1' },
    { day: 12, date: '2026-05-13', subject: 'English',     topic: 'Reading Comprehension & Inference', standard: 'B7.2.7.1' },
    { day: 13, date: '2026-05-14', subject: 'Mathematics', topic: 'Algebra: Patterns, Variables & Equations', standard: 'B7.4.1.1' },
    { day: 14, date: '2026-05-15', subject: 'Science',     topic: 'Ecosystems & Food Chains', standard: 'B7.2.1.1' },
    { day: 15, date: '2026-05-16', subject: 'Mathematics', topic: 'Geometry: Angles, Triangles & Polygons', standard: 'B7.3.1.1' },
    { day: 16, date: '2026-05-17', subject: 'English',     topic: 'Writing: Essays, Letters & Compositions', standard: 'B7.4.2.1' },
    { day: 17, date: '2026-05-19', subject: 'Mathematics', topic: 'Data: Mean, Median, Mode & Range', standard: 'B7.5.1.1' },
    { day: 18, date: '2026-05-20', subject: 'Science',     topic: 'Human Body: Nutrition & Digestion', standard: 'B7.3.2.1' },
    { day: 19, date: '2026-05-21', subject: 'Mathematics', topic: 'Probability & Statistics', standard: 'B7.5.2.1' },
    { day: 20, date: '2026-05-22', subject: 'English',     topic: 'Vocabulary, Idioms & Figurative Language', standard: 'B7.5.1.1' },
  ],
  declyn: [
    { day: 1,  date: '2026-05-19', subject: 'Mathematics', topic: 'Numbers to 1,000,000', standard: 'B5.1.1.1' },
    { day: 2,  date: '2026-05-20', subject: 'Science',     topic: 'Living Things: Classification', standard: 'B5.1.1.1' },
    { day: 3,  date: '2026-05-21', subject: 'Mathematics', topic: 'Multiply & Divide Large Numbers', standard: 'B5.1.2.1' },
    { day: 4,  date: '2026-05-22', subject: 'English',     topic: 'Oral Language & Communication', standard: 'B5.1.1.1' },
    { day: 5,  date: '2026-05-23', subject: 'Mathematics', topic: 'Fractions: Equivalence & Ordering', standard: 'B5.1.3.1' },
    { day: 6,  date: '2026-05-24', subject: 'Science',     topic: 'Materials & Mixtures', standard: 'B5.1.2.1' },
    { day: 7,  date: '2026-05-26', subject: 'Mathematics', topic: 'Fractions: All Four Operations', standard: 'B5.1.3.2' },
    { day: 8,  date: '2026-05-27', subject: 'English',     topic: 'Reading Comprehension', standard: 'B5.2.7.1' },
    { day: 9,  date: '2026-05-28', subject: 'Mathematics', topic: 'Decimals & Percentages', standard: 'B5.1.3.3' },
    { day: 10, date: '2026-05-29', subject: 'Science',     topic: 'Human Body: Digestive & Circulatory', standard: 'B5.3.1.1' },
  ],
  ivan: [
    { day: 1,  date: '2026-05-20', subject: 'Mathematics', topic: 'Place Value to 1,000', standard: 'B3.1.1.1' },
    { day: 2,  date: '2026-05-21', subject: 'Science',     topic: 'Living & Non-Living Things', standard: 'B3.1.1.1.1' },
    { day: 3,  date: '2026-05-22', subject: 'Mathematics', topic: 'Addition & Subtraction', standard: 'B3.1.2.1' },
    { day: 4,  date: '2026-05-23', subject: 'English',     topic: 'Stories, Songs & Conversation', standard: 'B3.1.1.1' },
    { day: 5,  date: '2026-05-24', subject: 'Mathematics', topic: 'Multiplication Tables', standard: 'B3.1.3.1' },
    { day: 6,  date: '2026-05-26', subject: 'Science',     topic: 'Materials & States of Matter', standard: 'B3.1.2.1' },
    { day: 7,  date: '2026-05-27', subject: 'Mathematics', topic: 'Division: Sharing Equally', standard: 'B3.1.4.1' },
    { day: 8,  date: '2026-05-28', subject: 'English',     topic: 'Phonics, Digraphs & Word Families', standard: 'B3.2.2.1' },
    { day: 9,  date: '2026-05-29', subject: 'Mathematics', topic: 'Fractions: Halves, Quarters & Thirds', standard: 'B3.1.5.1' },
    { day: 10, date: '2026-05-30', subject: 'Science',     topic: 'Earth Science: Sun, Seasons & Water', standard: 'B3.2.1.1' },
  ],
}

export const SUBJECT_COLOURS = {
  Mathematics: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', hex: '#3b82f6' },
  Science:     { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hex: '#10b981' },
  English:     { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', hex: '#a855f7' },
}

export const POINTS = {
  submitOnTime:        10,
  score7plus:          20,
  score9plus:          35,
  correctionsSubmit:   10,
  challengeAttempt:    5,
  challengeCorrect:    15,
  fiveDayStreak:       25,
  improvement:         20,
  lateSubmit:          -5,
  correctionsMissed:   -10,
}

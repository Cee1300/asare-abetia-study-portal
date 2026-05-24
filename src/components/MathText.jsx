// src/components/MathText.jsx
// Renders text with proper fraction formatting
// Converts patterns like 19/5 → stacked fraction, 3⅔ → mixed number

// Fraction component — renders as stacked fraction
function Frac({ num, den }) {
  return (
    <span style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      verticalAlign: 'middle',
      fontSize: '0.85em',
      lineHeight: 1.1,
      margin: '0 2px',
    }}>
      <span style={{ borderBottom: '1px solid currentColor', paddingBottom: 1, lineHeight: 1 }}>{num}</span>
      <span style={{ lineHeight: 1 }}>{den}</span>
    </span>
  )
}

// Unicode vulgar fractions map
const VULGAR = {
  '½': [1,2], '⅓': [1,3], '⅔': [2,3], '¼': [1,4], '¾': [3,4],
  '⅕': [1,5], '⅖': [2,5], '⅗': [3,5], '⅘': [4,5],
  '⅙': [1,6], '⅚': [5,6], '⅛': [1,8], '⅜': [3,8], '⅝': [5,8], '⅞': [7,8],
}

// Parse a string into segments: plain text, fractions, mixed numbers
function parseSegments(text) {
  const segments = []
  // Match: optional whole number + unicode vulgar, or whole/denom fraction
  // Pattern: (digit+)(vulgar) for mixed like 3⅔
  //          (digit+)/(digit+) for inline like 19/5
  const regex = /(\d+)(½|⅓|⅔|¼|¾|⅕|⅖|⅗|⅘|⅙|⅚|⅛|⅜|⅝|⅞)|(\d+)\/(\d+)/g
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add plain text before this match
    if (match.index > last) {
      segments.push({ type: 'text', value: text.slice(last, match.index) })
    }

    if (match[1] && match[2]) {
      // Mixed number like 3⅔
      const [num, den] = VULGAR[match[2]]
      segments.push({ type: 'mixed', whole: match[1], num, den })
    } else if (match[3] && match[4]) {
      // Inline fraction like 19/5
      segments.push({ type: 'frac', num: match[3], den: match[4] })
    }

    last = match.index + match[0].length
  }

  // Remaining text
  if (last < text.length) {
    segments.push({ type: 'text', value: text.slice(last) })
  }

  return segments
}

// Render a single line with fraction formatting
function MathLine({ text }) {
  const segments = parseSegments(text)
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === 'text') return <span key={i}>{seg.value}</span>
        if (seg.type === 'frac') return <Frac key={i} num={seg.num} den={seg.den} />
        if (seg.type === 'mixed') return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <span>{seg.whole}</span>
            <Frac num={seg.num} den={seg.den} />
          </span>
        )
        return null
      })}
    </>
  )
}

// Main component — renders multiline text with fraction support
export default function MathText({ text, className }) {
  if (!text) return null
  const lines = text.split('\n')
  return (
    <div style={{ display: 'block' }}>
      {lines.map((line, i) =>
        line.trim()
          ? <p key={i} className={className} style={{ display: 'block', marginBottom: 4 }}>
              <MathLine text={line} />
            </p>
          : <div key={i} style={{ height: 8 }} />
      )}
    </div>
  )
}

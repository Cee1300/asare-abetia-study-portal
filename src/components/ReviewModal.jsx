// src/components/ReviewModal.jsx
// Forces students to pause and check work before submitting

export default function ReviewModal({ onConfirm, onCancel, answeredCount, totalCount }) {
  const checklist = [
    'I have read every question carefully',
    'I have shown my working where required',
    'I have checked my arithmetic',
    'I have not left any blanks I could attempt',
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full animate-fade-up">

        {/* Dad photo */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
            <img src="/dad.jpg" alt="Dad" className="w-full h-full object-cover"
              onError={e => e.target.style.display='none'} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Before you submit...</p>
            <p className="text-slate-400 text-xs">Dad wants you to check your work first</p>
          </div>
        </div>

        {/* Answer count */}
        <div className={`rounded-xl px-4 py-3 mb-5 ${answeredCount === totalCount ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
          <p className={`text-sm font-medium ${answeredCount === totalCount ? 'text-emerald-400' : 'text-amber-400'}`}>
            {answeredCount === totalCount
              ? `✅ All ${totalCount} questions answered`
              : `⚠️ ${answeredCount} of ${totalCount} questions answered — ${totalCount - answeredCount} blank`
            }
          </p>
        </div>

        {/* Checklist */}
        <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
          Confirm before submitting:
        </p>
        <div className="space-y-2 mb-6">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded border border-amber-500/50 bg-amber-500/10 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <span className="text-amber-400 text-[10px]">✓</span>
              </div>
              <p className="text-slate-300 text-sm">{item}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-medium hover:bg-slate-800 transition-all">
            ← Go back
          </button>
          <button onClick={onConfirm}
            className="flex-1 btn-gold py-3 text-sm">
            Yes, submit ✓
          </button>
        </div>
      </div>
    </div>
  )
}

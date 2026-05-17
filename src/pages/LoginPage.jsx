import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Wrong email or password. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize:'60px 60px'}} />
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Dad's photo welcome card */}
        <div className="card mb-6 overflow-hidden animate-fade-up">
          <div className="relative h-44 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-amber-500/60 overflow-hidden bg-slate-600 flex items-center justify-center shadow-xl">
                <img
                  src="/dad.jpg"
                  alt="Dad"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-4xl">
                  👨🏾
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-800" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>

          <div className="px-6 py-5 text-center">
            <p className="text-lg text-white leading-tight"
              style={{fontFamily: 'Playfair Display, Georgia, serif'}}>
              "I am watching from New York.
            </p>
            <p className="text-lg text-amber-400 leading-tight"
              style={{fontFamily: 'Playfair Display, Georgia, serif'}}>
              Make me proud."
            </p>
            <p className="text-slate-400 text-sm mt-2">— Dad 🇬🇭</p>
          </div>
        </div>

        {/* Login form */}
        <div className="card p-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-lg text-white font-semibold leading-tight">AASP Study Portal</h1>
              <p className="text-slate-400 text-xs">Asare-Abetia Study Portal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm mb-1.5 block font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-slate-300 text-sm mb-1.5 block font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-11"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-4">
          Asare-Abetia Study Portal (AASP) © 2026
        </p>
      </div>
    </div>
  )
}
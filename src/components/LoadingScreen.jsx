export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-navy-700 rounded-full" />
        <div className="absolute inset-0 w-12 h-12 border-2 border-t-gold-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
      </div>
      <p className="text-navy-400 text-sm font-body">Loading...</p>
    </div>
  )
}

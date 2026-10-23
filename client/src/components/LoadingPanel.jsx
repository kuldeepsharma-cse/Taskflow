import { LoaderCircle } from 'lucide-react'

function LoadingPanel({ label }) {
  return (
    <div
      role="status"
      className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
    >
      <LoaderCircle className="mx-auto h-5 w-5 animate-spin text-indigo-600" />
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  )
}

export default LoadingPanel

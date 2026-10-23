import FormAlert from './FormAlert.jsx'

function ErrorPanel({ message, onRetry, label }) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
      <FormAlert message={message} />
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
      >
        {label}
      </button>
    </div>
  )
}

export default ErrorPanel

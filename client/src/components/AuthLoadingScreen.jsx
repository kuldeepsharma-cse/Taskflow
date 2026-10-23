import { LoaderCircle } from 'lucide-react'

function AuthLoadingScreen({ error, onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
      >
        <p className="text-lg font-semibold text-slate-900">
          Task<span className="text-indigo-600">Flow</span>
        </p>

        {error ? (
          <>
            <p className="mt-4 text-sm font-medium text-slate-900">
              We couldn&apos;t verify your session
            </p>
            <p className="mt-1.5 text-sm text-slate-600">
              {error.message || 'Please try again.'}
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <LoaderCircle
              className="mx-auto mt-4 h-6 w-6 animate-spin text-indigo-600"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm text-slate-600">Checking your session…</p>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthLoadingScreen

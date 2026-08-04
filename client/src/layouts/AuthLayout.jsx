import { Link } from 'react-router'

function AuthLayout({ title, children }) {
  return (
    // Centered auth shell on the app background; px-4 keeps the card safe on small screens
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo lockup (same as the Navbar) - clicking returns to the landing page */}
        <Link
          to="/"
          className="flex items-center justify-center text-lg font-semibold text-slate-900"
        >
          Task<span className="text-indigo-600">Flow</span>
        </Link>

        {/* White card per the design system (§14) */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
          {/* Page content (the form) fills the card */}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

import { useState } from 'react'

function Navbar() {
  // State that controls whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Sticky header: stays at the top of the page when scrolling */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Temporary text logo - the final logo mark comes later in Phase 5 */}
          <a href="#" className="text-lg font-semibold text-slate-900">
            Task<span className="text-indigo-600">Flow</span>
          </a>

          {/* Desktop navigation links - hidden on small screens */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a
              href="#features"
              className="rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
            >
              How It Works
            </a>
          </nav>

          {/* Desktop action buttons - hidden on small screens */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
            >
              Login
            </a>
            <a
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
            >
              Get Started
            </a>
          </div>

          {/* Hamburger button - visible only on small screens, toggles the mobile menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25 md:hidden"
          >
            {/* Simple hamburger icon drawn with SVG - no icon package needed yet */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu - shown only when the hamburger button is clicked */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                How It Works
              </a>
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
              >
                Login
              </a>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar

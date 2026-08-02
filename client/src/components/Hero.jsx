import AppWindow from './AppWindow.jsx'

function Hero() {
  return (
    // Hero section: tall white area with badge, headline, buttons, and mockup
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-7xl flex-col items-center">
        {/* Small pill badge above the headline */}
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          ✨ Modern Project Management
        </span>

        {/* Headline */}
        <h1 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Manage your projects with clarity and speed.
        </h1>

        {/* Short supporting description */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 sm:text-lg">
          TaskFlow is a lightweight project management app that helps you create
          workspaces, organize projects, and move tasks from to-do to done —
          without the complexity of enterprise tools.
        </p>

        {/* Hero action buttons - identical size and perfect alignment */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-5 text-base font-medium text-white transition-colors duration-200 hover:bg-indigo-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
          >
            Get Started
          </a>
          <a
            href="#"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
          >
            Learn More →
          </a>
        </div>

        {/* Compact realistic app window - the product UI, not a placeholder */}
        <div className="mt-10 w-full">
          <AppWindow />
        </div>
      </div>
    </section>
  )
}

export default Hero

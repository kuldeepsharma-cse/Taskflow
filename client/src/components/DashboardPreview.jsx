import AppWindow from './AppWindow.jsx'

function DashboardPreview() {
  return (
    // Dashboard preview section - shows the same app window as the Hero,
    // in full detail (browser header, status cards, activity panel)
    <section id="dashboard-preview" className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            Product Preview
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Everything your team needs in one workspace.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            A peek at what awaits: projects, Kanban boards, and activity — all
            in one clean, focused workspace.
          </p>
        </div>

        {/* Detailed app window mockup - pure visual, no real functionality */}
        <div className="mt-8">
          <AppWindow detailed />
        </div>
      </div>
    </section>
  )
}

export default DashboardPreview

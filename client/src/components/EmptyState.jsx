// Reusable empty state - the design system §14 dashed placeholder token.
// Used whenever a list has nothing to show yet (future-proof for real data).
function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 text-base font-medium text-slate-900">{title}</p>
      <p className="mt-1.5 text-sm text-slate-500">{description}</p>
    </div>
  )
}

export default EmptyState

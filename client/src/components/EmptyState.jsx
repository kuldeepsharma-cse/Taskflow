// Reusable empty state - the design system §14 dashed placeholder token.
// Used whenever a list has nothing to show yet (future-proof for real data).
// The default is sized for full pages; the opt-in compact variant fits
// narrow containers like Kanban lanes (same recipe as AppWindow's detailed
// prop - one component, additive options, zero duplication).
function EmptyState({ icon: Icon, title, description, compact = false }) {
  const containerClass = compact
    ? 'mx-auto w-full rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center'
    : 'mx-auto w-full max-w-2xl rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12'
  const tileClass = compact
    ? 'mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400'
    : 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400'
  const iconClass = compact ? 'h-5 w-5' : 'h-6 w-6'
  const titleClass = compact
    ? 'mt-3 text-sm font-medium text-slate-900'
    : 'mt-4 text-base font-medium text-slate-900'
  const descriptionClass = compact
    ? 'mt-1.5 text-xs text-slate-500'
    : 'mt-1.5 text-sm text-slate-500'

  return (
    <div className={containerClass}>
      <div className={tileClass}>
        <Icon className={iconClass} />
      </div>
      <p className={titleClass}>{title}</p>
      <p className={descriptionClass}>{description}</p>
    </div>
  )
}

export default EmptyState

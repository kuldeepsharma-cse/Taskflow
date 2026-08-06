// Reusable statistics card - one card per stat, driven entirely by props.
// The icon prop receives a lucide-react component (rendered as <Icon />).
function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="cursor-default rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:border-slate-300 hover:shadow-md">
      {/* Icon tile - neutral slate per design system §15 */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  )
}

export default StatCard

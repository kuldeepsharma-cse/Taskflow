function StepCard({ number, icon, title, description }) {
  return (
    // Reusable step card - gets its content from props
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:border-slate-300 hover:shadow-md">
      {/* Step number */}
      <span className="text-xs font-semibold text-indigo-600">
        Step {number}
      </span>

      {/* Icon container */}
      <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-xl">
        {icon}
      </div>

      {/* Card title */}
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>

      {/* Card description */}
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  )
}

export default StepCard

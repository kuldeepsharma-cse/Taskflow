function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-20 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 ring-2 ring-red-500/25 focus:border-red-500 focus:ring-red-500/25'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/25'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default Textarea

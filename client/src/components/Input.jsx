function Input({ label, type = 'text', id, name, value, onChange, placeholder, autoComplete, error }) {
  return (
    <div>
      {/* Label sits above the field, per the design system (§13) */}
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {/* Controlled input: value + onChange are provided by the page */}
      {/* Error state: red border + red focus ring + helper text below (§13) */}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 transition-colors duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 ring-2 ring-red-500/25 focus:border-red-500 focus:ring-red-500/25'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/25'
        }`}
      />
      {/* Inline error message shown only when this field has an error */}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input

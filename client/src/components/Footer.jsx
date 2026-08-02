// Product links - point to real sections on the landing page
const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Dashboard Preview', href: '#dashboard-preview' },
]

// Social placeholder links
const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'X (Twitter)', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

function Footer() {
  return (
    // Footer - clean light bar separated by a top border
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          {/* Brand block */}
          <div className="max-w-sm">
            <span className="text-lg font-semibold text-slate-900">
              Task<span className="text-indigo-600">Flow</span>
            </span>
            <p className="mt-3 text-sm text-slate-600">
              A lightweight project management app for students, freelancers,
              and small teams — simple to use, easy to grow with.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Product</h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social placeholder links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Connect</h3>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and legal links */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

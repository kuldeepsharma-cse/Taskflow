import { Link } from 'react-router'

function CTA() {
  return (
    // CTA section - an indigo panel for stronger visual emphasis
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-xl bg-indigo-600 px-6 py-12 text-center shadow-md">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white">
            Get Started
          </span>

          {/* Heading */}
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Ready to organize your workflow?
          </h2>

          {/* Short supporting description */}
          <p className="mx-auto mt-4 max-w-2xl text-base text-indigo-100">
            Join students, freelancers, and small teams who keep their projects
            clear, simple, and on track with TaskFlow.
          </p>

          {/* CTA buttons - white primary pops on the indigo panel */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-base font-medium text-indigo-600 transition-colors duration-200 hover:bg-indigo-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25"
            >
              Start Building Free
            </Link>
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-5 text-base font-medium text-white transition-colors duration-200 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

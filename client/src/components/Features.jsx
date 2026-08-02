import FeatureCard from './FeatureCard.jsx'

// Features data - each card is rendered from one item in this array
const features = [
  {
    icon: '✅',
    title: 'Task Management',
    description:
      'Create, edit, and track tasks with clear status and priority.',
  },
  {
    icon: '📋',
    title: 'Kanban Boards',
    description:
      'Visualize your workflow and move tasks from to-do to done.',
  },
  {
    icon: '🏢',
    title: 'Workspaces',
    description:
      'Keep projects organized in dedicated workspaces.',
  },
  {
    icon: '📅',
    title: 'Due Dates',
    description:
      'Never miss a deadline with simple due dates on every task.',
  },
  {
    icon: '⚡',
    title: 'Fast & Simple',
    description:
      'A clean, beginner-friendly UI that stays out of your way.',
  },
  {
    icon: '📊',
    title: 'Project Dashboard',
    description:
      'See progress and task statistics at a glance.',
  },
]

function Features() {
  return (
    // Features section - white cards on the slate-50 page background
    <section id="features" className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            Core Features
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Everything you need to manage your work.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            TaskFlow gives you the essential tools to plan, track, and finish
            projects — without the complexity of enterprise tools.
          </p>
        </div>

        {/* Responsive grid: 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

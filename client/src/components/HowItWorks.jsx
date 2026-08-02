import { Fragment } from 'react'
import StepCard from './StepCard.jsx'

// How It Works data - each step is rendered from one item in this array
const steps = [
  {
    icon: '🏢',
    title: 'Create Workspace',
    description: 'Create a workspace to organize your projects.',
  },
  {
    icon: '📋',
    title: 'Add Projects & Tasks',
    description: 'Create projects and break them into manageable tasks.',
  },
  {
    icon: '📈',
    title: 'Track Progress',
    description:
      'Move tasks across your Kanban board and monitor progress.',
  },
]

function HowItWorks() {
  return (
    // How It Works section - steps connect vertically on mobile,
    // horizontally on desktop
    <section id="how-it-works" className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            How It Works
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Get started in three simple steps.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            From idea to organized workflow in minutes — no setup headaches.
          </p>
        </div>

        {/* Steps with connectors between them */}
        <div className="mt-8 flex w-full flex-col items-center lg:flex-row">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <div className="w-full lg:flex-1">
                <StepCard
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </div>

              {/* Connector: vertical line on mobile, horizontal on desktop */}
              {index < steps.length - 1 && (
                <div className="h-10 w-px shrink-0 bg-slate-200 lg:h-px lg:w-10" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

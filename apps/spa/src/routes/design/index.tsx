import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/design/")({
  component: DesignOverview,
})

function DesignOverview() {
  return (
    <div className="max-w-5xl">
      <div className="mb-12">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-gray-900">Design System</h1>
        <p className="text-xl leading-relaxed text-gray-600">
          A collection of thoughtfully designed components, patterns, and guidelines that form the foundation of our
          product experience.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200/60 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h3 className="mb-4 text-xl font-medium text-gray-900">Components</h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            Reusable interface elements designed with precision and attention to detail.
          </p>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Button — Primary, secondary, and outline variants
            </div>
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Tooltip — Contextual information overlays
            </div>
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-300"></div>
              More components in development
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200/60 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h3 className="mb-4 text-xl font-medium text-gray-900">Philosophy</h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            Built with modern development practices and a focus on consistency and usability.
          </p>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Type-safe with full TypeScript support
            </div>
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Consistent design language
            </div>
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Accessible by design
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200/60 bg-gray-50/50 p-8">
        <h2 className="mb-6 text-2xl font-medium tracking-tight text-gray-900">Getting Started</h2>
        <div className="rounded-lg bg-gray-900 p-6 shadow-sm">
          <pre className="text-sm leading-relaxed text-gray-300">
            <code>{`// Import components from our design system
import { Button } from './components/ui/button'
import { Tooltip } from './components/ui/tooltip'

// Use them in your React components
function MyApp() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Tooltip content="Helpful information">
        <span>Hover over me</span>
      </Tooltip>
    </div>
  )
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

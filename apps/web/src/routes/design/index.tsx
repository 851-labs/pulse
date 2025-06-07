import { createFileRoute } from "@tanstack/react-router"
import { CodeBlock } from "~/components/ui/code-block"

export const Route = createFileRoute("/design/")({
  component: DesignOverview,
})

function DesignOverview() {
  const exampleCode = `// Import components from our design system
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
}`

  return (
    <div className="container mx-auto space-y-12 px-4 py-8">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Design System</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          A comprehensive collection of reusable components built with React, TypeScript, and Tailwind CSS. Designed for
          consistency, accessibility, and developer experience.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="shadow-xs rounded-xl border border-gray-200/60 bg-white p-8 transition-shadow duration-200 hover:shadow-md">
          <h3 className="mb-4 text-xl font-medium text-gray-900">Features</h3>
          <p className="mb-6 leading-relaxed text-gray-600">
            Modern components built with the latest web standards and best practices.
          </p>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Built with Base UI primitives
            </div>
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Fully responsive and mobile-first
            </div>
            <div className="flex items-center">
              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              Dark mode support ready
            </div>
          </div>
        </div>

        <div className="shadow-xs rounded-xl border border-gray-200/60 bg-white p-8 transition-shadow duration-200 hover:shadow-md">
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
        <CodeBlock code={exampleCode} language="tsx" className="shadow-xs rounded-lg" />
      </div>
    </div>
  )
}

import React from "react"
import { Collapsible } from "@base-ui-components/react/collapsible"

// Chevron icon component for the collapsible trigger
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// -------------------------------------------------------------------------------------------------------------------

interface DesignExampleSectionProps {
  title: string
  children: React.ReactNode
  code?: string
  demoClassName?: string
  description?: string
}

function DesignExampleImplementation({ title, children, code, demoClassName, description }: DesignExampleSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className={`${demoClassName || "flex justify-center"} ${code ? "mb-4" : ""}`}>{children}</div>
        {code && (
          <Collapsible.Root>
            <Collapsible.Trigger className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900">
              <ChevronIcon className="transition-all ease-out group-data-[panel-open]:rotate-90" />
              Show code
            </Collapsible.Trigger>
            <Collapsible.Panel className="h-[var(--collapsible-panel-height)] overflow-hidden transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
              <div className="mt-4 rounded-lg bg-gray-900 p-4">
                <pre className="text-sm text-green-400">
                  <code>{code}</code>
                </pre>
              </div>
            </Collapsible.Panel>
          </Collapsible.Root>
        )}
      </div>
    </section>
  )
}

// -------------------------------------------------------------------------------------------------------------------

// Simple component that takes JSX and shows both the rendered output and code
interface DesignExampleProps {
  title: string
  code: string
  demoClassName?: string
  description?: string
  children: React.ReactNode
}

function DesignExampleSection({ title, code, demoClassName, description, children }: DesignExampleProps) {
  return (
    <DesignExampleImplementation
      title={title}
      code={code.trim()}
      demoClassName={demoClassName}
      description={description}
    >
      {children}
    </DesignExampleImplementation>
  )
}

// -------------------------------------------------------------------------------------------------------------------

export { DesignExampleSection }

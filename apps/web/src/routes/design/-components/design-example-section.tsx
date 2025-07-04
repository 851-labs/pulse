import { Tabs } from "@base-ui-components/react/tabs"
import React from "react"
import { CodeBlock } from "~/components/ui/code-block"

// -------------------------------------------------------------------------------------------------------------------

interface DesignExampleSectionProps {
  title: string
  children: React.ReactNode
  code?: string
  demoClassName?: string
  description?: string
  language?: string
}

function DesignExampleImplementation({
  title,
  children,
  code,
  demoClassName,
  description,
  language = "tsx",
}: DesignExampleSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {code ? (
          <Tabs.Root defaultValue="preview">
            <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
              <Tabs.List className="relative z-0 flex gap-1">
                <Tabs.Tab
                  value="preview"
                  className="outline-hidden before:rounded-xs focus-visible:before:outline-solid data-selected:text-gray-900 flex h-8 select-none items-center justify-center border-0 px-3 text-sm font-medium text-gray-600 before:inset-x-0 before:inset-y-1 before:-outline-offset-1 before:outline-blue-800 hover:text-gray-900 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline-2"
                >
                  Preview
                </Tabs.Tab>
                <Tabs.Tab
                  value="code"
                  className="outline-hidden before:rounded-xs focus-visible:before:outline-solid data-selected:text-gray-900 flex h-8 select-none items-center justify-center border-0 px-3 text-sm font-medium text-gray-600 before:inset-x-0 before:inset-y-1 before:-outline-offset-1 before:outline-blue-800 hover:text-gray-900 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline-2"
                >
                  Code
                </Tabs.Tab>
                <Tabs.Indicator className="w-(--active-tab-width) translate-x-(--active-tab-left) absolute left-0 top-1/2 z-[-1] h-7 -translate-y-1/2 rounded-md bg-gray-100 transition-all duration-200 ease-in-out" />
              </Tabs.List>
            </div>

            <Tabs.Panel value="preview" className="p-6">
              <div className={demoClassName || "flex justify-center"}>{children}</div>
            </Tabs.Panel>

            <Tabs.Panel value="code" className="p-0">
              <CodeBlock code={code} language={language} className="rounded-none" />
            </Tabs.Panel>
          </Tabs.Root>
        ) : (
          <div className="p-6">
            <div className={demoClassName || "flex justify-center"}>{children}</div>
          </div>
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
  language?: string
  children: React.ReactNode
}

function DesignExampleSection({ title, code, demoClassName, description, language, children }: DesignExampleProps) {
  return (
    <DesignExampleImplementation
      title={title}
      code={code.trim()}
      demoClassName={demoClassName}
      description={description}
      language={language}
    >
      {children}
    </DesignExampleImplementation>
  )
}

// -------------------------------------------------------------------------------------------------------------------

export { DesignExampleSection }

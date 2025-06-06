import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { DesignExampleSection } from "./-components/design-example-section"
import { DesignPageHeader } from "./-components/design-page-header"

export const Route = createFileRoute("/design/button")({
  component: ButtonShowcase,
})

function ButtonShowcase() {
  const [loading, setLoading] = useState(false)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <DesignPageHeader
          title="Button"
          description="A versatile button component with multiple variants, sizes, and states."
        />
      </div>

      {/* Variants Section */}
      <DesignExampleSection
        title="Variants"
        demoClassName="flex flex-wrap gap-4"
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </DesignExampleSection>

      {/* Sizes Section */}
      <DesignExampleSection
        title="Sizes"
        demoClassName="flex flex-wrap items-center gap-4"
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </DesignExampleSection>

      {/* States Section */}
      <DesignExampleSection
        title="States"
        demoClassName="flex flex-wrap gap-4"
        code={`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading={isLoading}>Loading Button</Button>`}
      >
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading={loading} onClick={handleLoadingDemo}>
          {loading ? "Loading..." : "Click for Loading"}
        </Button>
      </DesignExampleSection>

      {/* Props Documentation */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Props</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Prop</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Default
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">variant</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  "primary" | "secondary" | "outline" | "destructive"
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">"primary"</td>
                <td className="px-6 py-4 text-sm text-gray-500">Visual style of the button</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">size</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">"sm" | "md" | "lg"</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">"md"</td>
                <td className="px-6 py-4 text-sm text-gray-500">Size of the button</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">loading</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">false</td>
                <td className="px-6 py-4 text-sm text-gray-500">Shows loading spinner and disables the button</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">disabled</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">false</td>
                <td className="px-6 py-4 text-sm text-gray-500">Disables the button interaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

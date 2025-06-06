import { createFileRoute } from "@tanstack/react-router"
import { Button } from "../components/ui/button"
import { useState } from "react"

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
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Button</h1>
        <p className="text-lg text-gray-600">A versatile button component with multiple variants, sizes, and states.</p>
      </div>

      {/* Variants Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Variants</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="rounded-lg bg-gray-900 p-4">
            <pre className="text-sm text-green-400">
              <code>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Sizes</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="rounded-lg bg-gray-900 p-4">
            <pre className="text-sm text-green-400">
              <code>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">States</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onClick={handleLoadingDemo}>
              {loading ? "Loading..." : "Click for Loading"}
            </Button>
          </div>
          <div className="rounded-lg bg-gray-900 p-4">
            <pre className="text-sm text-green-400">
              <code>{`<Button>Normal</Button>
<Button disabled>Disabled</Button>
<Button loading={isLoading}>Loading Button</Button>`}</code>
            </pre>
          </div>
        </div>
      </section>

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

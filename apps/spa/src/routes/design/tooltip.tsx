import { createFileRoute } from "@tanstack/react-router"
import { InfoIcon, EditIcon, TrashIcon, Share2Icon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Tooltip } from "../../components/ui/tooltip"
import { DesignExampleSection } from "./-components/design-example-section"
import { DesignPageHeader } from "./-components/design-page-header"

export const Route = createFileRoute("/design/tooltip")({
  component: TooltipShowcase,
})

function TooltipShowcase() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <DesignPageHeader
          title="Tooltip"
          description="An informational overlay component that appears on hover, with flexible positioning options."
        />
      </div>

      {/* Basic Usage Section */}
      <DesignExampleSection
        title="Basic Usage"
        code={`<Tooltip>
  <Tooltip.Trigger>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>This is a helpful tooltip</Tooltip.Content>
</Tooltip>`}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <Button>Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>This is a helpful tooltip</Tooltip.Content>
        </Tooltip>
      </DesignExampleSection>

      {/* Positioning Section */}
      <DesignExampleSection
        title="Positioning"
        demoClassName=""
        code={`<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Top</Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="top">Top tooltip</Tooltip.Content>
</Tooltip>

<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Bottom</Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="bottom">Bottom tooltip</Tooltip.Content>
</Tooltip>

<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Left</Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="left">Left tooltip</Tooltip.Content>
</Tooltip>

<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Right</Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="right">Right tooltip</Tooltip.Content>
</Tooltip>`}
      >
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <Tooltip>
              <Tooltip.Trigger>
                <Button variant="outline">Top</Button>
              </Tooltip.Trigger>
              <Tooltip.Content side="top">Top tooltip</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger>
                <Button variant="outline">Bottom</Button>
              </Tooltip.Trigger>
              <Tooltip.Content side="bottom">Bottom tooltip</Tooltip.Content>
            </Tooltip>
          </div>
          <div className="flex items-center justify-center space-x-8">
            <Tooltip>
              <Tooltip.Trigger>
                <Button variant="outline">Left</Button>
              </Tooltip.Trigger>
              <Tooltip.Content side="left">Left tooltip</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger>
                <Button variant="outline">Right</Button>
              </Tooltip.Trigger>
              <Tooltip.Content side="right">Right tooltip</Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </DesignExampleSection>

      {/* Different Content Types */}
      <DesignExampleSection
        title="Different Content Types"
        demoClassName="flex flex-wrap gap-4"
        code={`<Tooltip>
  <Tooltip.Trigger>
    <span className="cursor-help rounded bg-gray-100 px-3 py-2">Simple Text</span>
  </Tooltip.Trigger>
  <Tooltip.Content>Simple text tooltip</Tooltip.Content>
</Tooltip>

<Tooltip>
  <Tooltip.Trigger>
    <span className="cursor-help rounded bg-blue-100 px-3 py-2">Long Text</span>
  </Tooltip.Trigger>
  <Tooltip.Content>This is a much longer tooltip that contains more detailed information</Tooltip.Content>
</Tooltip>

<Tooltip>
  <Tooltip.Trigger>
    <span className="cursor-help rounded bg-green-100 px-3 py-2">With Emoji</span>
  </Tooltip.Trigger>
  <Tooltip.Content>🎉 Emojis work too!</Tooltip.Content>
</Tooltip>`}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <span className="cursor-help rounded bg-gray-100 px-3 py-2">Simple Text</span>
          </Tooltip.Trigger>
          <Tooltip.Content>Simple text tooltip</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <span className="cursor-help rounded bg-blue-100 px-3 py-2">Long Text</span>
          </Tooltip.Trigger>
          <Tooltip.Content>This is a much longer tooltip that contains more detailed information</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <span className="cursor-help rounded bg-green-100 px-3 py-2">With Emoji</span>
          </Tooltip.Trigger>
          <Tooltip.Content>🎉 Emojis work too!</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <div className="cursor-help rounded bg-purple-100 p-2">
              <InfoIcon className="h-5 w-5 text-purple-600" />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip on an icon</Tooltip.Content>
        </Tooltip>
      </DesignExampleSection>

      {/* Interactive Examples */}
      <DesignExampleSection
        title="Interactive Examples"
        demoClassName="space-y-4"
        code={`<Tooltip>
  <Tooltip.Trigger>
    <Button size="sm" variant="outline">
      <EditIcon />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Edit this item</Tooltip.Content>
</Tooltip>`}
      >
        <div className="flex items-center space-x-4">
          <Tooltip>
            <Tooltip.Trigger>
              <Button size="sm" variant="outline">
                <EditIcon className="h-4 w-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Edit this item</Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger>
              <Button size="sm" variant="destructive">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Delete this item</Tooltip.Content>
          </Tooltip>

          <Tooltip>
            <Tooltip.Trigger>
              <Button size="sm" variant="secondary">
                <Share2Icon className="h-4 w-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Share this item</Tooltip.Content>
          </Tooltip>
        </div>
      </DesignExampleSection>

      {/* API Documentation */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">API Reference</h2>

        {/* Tooltip.Content Props */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Tooltip.Content Props</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Prop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Type
                  </th>
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
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">side</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    "top" | "bottom" | "left" | "right"
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">"top"</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Position of the tooltip relative to the trigger element
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">sideOffset</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">number</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">4</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Distance from the trigger element</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">children</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">React.ReactNode</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">The content to display in the tooltip</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">className</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">string</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Additional CSS classes for the tooltip</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Note */}
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Compound Pattern:</strong> The Tooltip component uses a compound pattern with separate Trigger
                and Content components for maximum flexibility and accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

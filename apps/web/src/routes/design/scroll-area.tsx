import { createFileRoute } from "@tanstack/react-router"
import { ScrollArea } from "../../components/ui/scroll-area"
import { DesignExampleSection } from "./-components/design-example-section"
import { DesignPageHeader } from "./-components/design-page-header"

export const Route = createFileRoute("/design/scroll-area")({
  component: ScrollAreaPage,
})

function ScrollAreaPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <DesignPageHeader
        title="Scroll Area"
        description="A custom scroll container with native scrollbars."
        componentName="scroll-area"
      />

      <div className="space-y-6">
        <DesignExampleSection
          title="Basic Example"
          demoClassName=""
          code={`<ScrollArea className="h-72 w-full">
  <ScrollArea.Viewport>
    <ScrollArea.Content className="p-4">
      <div className="max-w-none space-y-4">
        <h3 className="text-lg font-medium">Vernacular Architecture</h3>
        <p className="text-sm leading-relaxed text-gray-700">
          Vernacular architecture is building done outside any academic tradition...
        </p>
        {/* More content */}
      </div>
    </ScrollArea.Content>
  </ScrollArea.Viewport>
</ScrollArea>`}
        >
          <div className="rounded-lg border border-gray-200">
            <ScrollArea className="h-72 w-full">
              <ScrollArea.Viewport>
                <ScrollArea.Content className="p-4">
                  <div className="max-w-none space-y-4">
                    <h3 className="text-lg font-medium">Vernacular Architecture</h3>
                    <p className="break-words text-sm leading-relaxed text-gray-700">
                      Vernacular architecture is building done outside any academic tradition, and without professional
                      guidance. It is not a particular architectural movement or style, but rather a broad category,
                      encompassing a wide range and variety of building types, with differing methods of construction,
                      from around the world, both historical and extant and classical and modern. Vernacular
                      architecture constitutes 95% of the world's built environment, as estimated in 1995 by Amos
                      Rapoport, as measured against the small percentage of new buildings every year designed by
                      architects and built by engineers.
                    </p>
                    <p className="break-words text-sm leading-relaxed text-gray-700">
                      This type of architecture usually serves immediate, local needs, is constrained by the materials
                      available in its particular region and reflects local traditions and cultural practices. The study
                      of vernacular architecture does not examine formally schooled architects, but instead that of the
                      design skills and tradition of local builders, who were rarely given any attribution for the work.
                      More recently, vernacular architecture has been examined by designers and the building industry in
                      an effort to be more energy conscious with contemporary design and construction—part of a broader
                      interest in sustainable design.
                    </p>
                    <p className="break-words text-sm leading-relaxed text-gray-700">
                      The term vernacular architecture was first used by Rudolf Arnheim in 1943, although the idea of
                      studying buildings in their cultural context had been developing since the late 19th century. The
                      field of vernacular architecture studies was formalized in the 1960s with the establishment of the
                      Vernacular Architecture Group (VAG) in the United Kingdom and similar organizations in other
                      countries.
                    </p>
                    <p className="break-words text-sm leading-relaxed text-gray-700">
                      Vernacular buildings are typically adapted to suit the local climate, availability of construction
                      materials and local traditions. For example, in areas with high rainfall, buildings might have
                      steep roofs to shed water quickly, while in arid regions, thick walls might be used for thermal
                      mass to keep interiors cool.
                    </p>
                  </div>
                </ScrollArea.Content>
              </ScrollArea.Viewport>
            </ScrollArea>
          </div>
        </DesignExampleSection>

        <DesignExampleSection
          title="Horizontal Scroll"
          demoClassName=""
          code={`<ScrollArea className="h-24 w-full" orientation="horizontal">
  <ScrollArea.Viewport>
    <ScrollArea.Content>
      <div className="flex space-x-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md bg-gray-100 text-sm font-medium"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea.Content>
  </ScrollArea.Viewport>
</ScrollArea>`}
        >
          <div className="rounded-lg border border-gray-200">
            <ScrollArea className="h-24 w-full" orientation="horizontal">
              <ScrollArea.Viewport>
                <ScrollArea.Content>
                  <div className="flex space-x-4 p-4">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div
                        key={i}
                        className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md bg-gray-100 text-sm font-medium"
                      >
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                </ScrollArea.Content>
              </ScrollArea.Viewport>
            </ScrollArea>
          </div>
        </DesignExampleSection>
      </div>
    </div>
  )
}

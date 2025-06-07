import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/feeds/")({
  component: FeedsIndexComponent,
})

function FeedsIndexComponent() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Select a feed</h2>
        <p className="text-gray-500">Choose a feed from the sidebar to view its articles.</p>
      </div>
    </div>
  )
}

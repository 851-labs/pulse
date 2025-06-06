import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { ScrollArea } from "~/components/ui/scroll-area"

export const Route = createFileRoute("/design")({
  component: DesignLayout,
})

function DesignLayout() {
  return (
    <div className="flex h-full w-full flex-row flex-nowrap bg-white">
      {/* Sidebar Navigation */}
      <div className="w-60 border-r border-gray-200/60 bg-gray-100">
        <div className="px-4 py-6">
          <h2 className="mb-6 px-2 text-sm font-semibold tracking-tight text-gray-900">Design System</h2>
          <nav className="space-y-0.5">
            <Link
              to="/design"
              activeProps={{
                className: "bg-blue-500 text-white",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:bg-gray-100/80",
              }}
              activeOptions={{ exact: true }}
              className="flex h-7 items-center rounded-md px-2 text-xs font-medium"
            >
              Overview
            </Link>
            <Link
              to="/design/button"
              activeProps={{
                className: "bg-blue-500 text-white",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:bg-gray-100/80",
              }}
              className="flex h-7 items-center rounded-md px-2 text-xs font-medium"
            >
              Button
            </Link>
            <Link
              to="/design/tooltip"
              activeProps={{
                className: "bg-blue-500 text-white",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:bg-gray-100/80",
              }}
              className="flex h-7 items-center rounded-md px-2 text-xs font-medium"
            >
              Tooltip
            </Link>
            <Link
              to="/design/scroll-area"
              activeProps={{
                className: "bg-blue-500 text-white",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:bg-gray-100/80",
              }}
              className="flex h-7 items-center rounded-md px-2 text-xs font-medium"
            >
              Scroll Area
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <ScrollArea.Viewport>
          <ScrollArea.Content className="p-12">
            <Outlet />
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea>
    </div>
  )
}

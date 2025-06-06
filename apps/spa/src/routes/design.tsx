import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { ScrollArea } from "~/components/ui/scroll-area"

export const Route = createFileRoute("/design")({
  component: DesignLayout,
})

function DesignLayout() {
  return (
    <div className="flex h-full w-full flex-row flex-nowrap bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-60 bg-gray-100">
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
              className="flex h-7 items-center rounded-md px-2 text-[13px] font-medium"
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
              className="flex h-7 items-center rounded-md px-2 text-[13px] font-medium"
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
              className="flex h-7 items-center rounded-md px-2 text-[13px] font-medium"
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
              className="flex h-7 items-center rounded-md px-2 text-[13px] font-medium"
            >
              Scroll Area
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-0 flex-1 flex-col flex-nowrap p-2 pl-0">
        <ScrollArea className="flex min-h-0 flex-1 flex-col flex-nowrap rounded-md border bg-white">
          <ScrollArea.Viewport>
            <ScrollArea.Content className="p-12">
              <Outlet />
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea>
      </div>
    </div>
  )
}

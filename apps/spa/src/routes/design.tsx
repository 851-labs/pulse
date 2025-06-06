import { Link, Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/design")({
  component: DesignLayout,
})

function DesignLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Navigation */}
      <div className="w-72 border-r border-gray-200/80 bg-gray-50/50">
        <div className="p-8">
          <h2 className="mb-8 text-lg font-medium tracking-tight text-gray-900">Design System</h2>
          <nav className="space-y-1">
            <Link
              to="/design"
              activeProps={{
                className: "bg-gray-900 text-white shadow-sm",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:text-gray-900 hover:bg-gray-100/60",
              }}
              activeOptions={{ exact: true }}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
            >
              Overview
            </Link>
            <Link
              to="/design/button"
              activeProps={{
                className: "bg-gray-900 text-white shadow-sm",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:text-gray-900 hover:bg-gray-100/60",
              }}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
            >
              Button
            </Link>
            <Link
              to="/design/tooltip"
              activeProps={{
                className: "bg-gray-900 text-white shadow-sm",
              }}
              inactiveProps={{
                className: "text-gray-700 hover:text-gray-900 hover:bg-gray-100/60",
              }}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
            >
              Tooltip
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <Outlet />
      </div>
    </div>
  )
}

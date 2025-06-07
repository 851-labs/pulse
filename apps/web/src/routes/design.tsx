import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { AppShell } from "~/components/app-shell"

export const Route = createFileRoute("/design")({
  component: DesignLayout,
})

function DesignLayout() {
  return (
    <AppShell>
      <AppShell.Sidebar>
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
      </AppShell.Sidebar>
      <AppShell.Content>
        <Outlet />
      </AppShell.Content>
    </AppShell>
  )
}

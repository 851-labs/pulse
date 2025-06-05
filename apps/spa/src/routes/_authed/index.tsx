import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/")({
  component: DashboardComponent,
})

function DashboardComponent() {
  return (
    <div className="p-6">
      <div className="max-w-6xl">
        <h1 className="mb-6 text-3xl font-semibold text-[#1d1d1f]">Dashboard</h1>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#d2d2d7] bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-[0.06em] text-[#6e6e73]">Total Messages</h3>
              <span className="text-2xl">📥</span>
            </div>
            <p className="text-2xl font-semibold text-[#1d1d1f]">357</p>
            <p className="mt-1 text-sm text-[#8e8e93]">+12 from yesterday</p>
          </div>

          <div className="rounded-lg border border-[#d2d2d7] bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-[0.06em] text-[#6e6e73]">Unread</h3>
              <span className="text-2xl">🔵</span>
            </div>
            <p className="text-2xl font-semibold text-[#1d1d1f]">9</p>
            <p className="mt-1 text-sm text-[#8e8e93]">3 important</p>
          </div>

          <div className="rounded-lg border border-[#d2d2d7] bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-[0.06em] text-[#6e6e73]">Flagged</h3>
              <span className="text-2xl">🚩</span>
            </div>
            <p className="text-2xl font-semibold text-[#1d1d1f]">40</p>
            <p className="mt-1 text-sm text-[#8e8e93]">5 due today</p>
          </div>
        </div>

        <div className="rounded-lg border border-[#d2d2d7] bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#1d1d1f]">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-[#d2d2d7] pb-3">
              <div className="h-2 w-2 rounded-full bg-[#007AFF]"></div>
              <p className="text-sm text-[#1d1d1f]">New message from John Doe in Personal</p>
              <span className="ml-auto text-sm text-[#8e8e93]">2 min ago</span>
            </div>
            <div className="flex items-center gap-3 border-b border-[#d2d2d7] pb-3">
              <div className="h-2 w-2 rounded-full bg-[#34C759]"></div>
              <p className="text-sm text-[#1d1d1f]">Task completed: Review project proposal</p>
              <span className="ml-auto text-sm text-[#8e8e93]">1 hour ago</span>
            </div>
            <div className="flex items-center gap-3 border-b border-[#d2d2d7] pb-3">
              <div className="h-2 w-2 rounded-full bg-[#FF3B30]"></div>
              <p className="text-sm text-[#1d1d1f]">Reminder: Meeting at 3 PM</p>
              <span className="ml-auto text-sm text-[#8e8e93]">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

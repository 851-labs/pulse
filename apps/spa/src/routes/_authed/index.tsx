import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/')({
  component: DashboardComponent,
})

function DashboardComponent() {
  return (
    <div className="p-6">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-semibold text-[#1d1d1f] mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#d2d2d7] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6e6e73] uppercase tracking-[0.06em]">Total Messages</h3>
              <span className="text-2xl">📥</span>
            </div>
            <p className="text-2xl font-semibold text-[#1d1d1f]">357</p>
            <p className="text-sm text-[#8e8e93] mt-1">+12 from yesterday</p>
          </div>

          <div className="bg-white border border-[#d2d2d7] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6e6e73] uppercase tracking-[0.06em]">Unread</h3>
              <span className="text-2xl">🔵</span>
            </div>
            <p className="text-2xl font-semibold text-[#1d1d1f]">9</p>
            <p className="text-sm text-[#8e8e93] mt-1">3 important</p>
          </div>

          <div className="bg-white border border-[#d2d2d7] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6e6e73] uppercase tracking-[0.06em]">Flagged</h3>
              <span className="text-2xl">🚩</span>
            </div>
            <p className="text-2xl font-semibold text-[#1d1d1f]">40</p>
            <p className="text-sm text-[#8e8e93] mt-1">5 due today</p>
          </div>
        </div>

        <div className="bg-white border border-[#d2d2d7] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#d2d2d7]">
              <div className="w-2 h-2 bg-[#007AFF] rounded-full"></div>
              <p className="text-sm text-[#1d1d1f]">New message from John Doe in Personal</p>
              <span className="text-sm text-[#8e8e93] ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-[#d2d2d7]">
              <div className="w-2 h-2 bg-[#34C759] rounded-full"></div>
              <p className="text-sm text-[#1d1d1f]">Task completed: Review project proposal</p>
              <span className="text-sm text-[#8e8e93] ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-[#d2d2d7]">
              <div className="w-2 h-2 bg-[#FF3B30] rounded-full"></div>
              <p className="text-sm text-[#1d1d1f]">Reminder: Meeting at 3 PM</p>
              <span className="text-sm text-[#8e8e93] ml-auto">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/inbox')({
  component: InboxComponent,
})

function InboxComponent() {
  return (
    <div className="p-6">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Inbox</h1>
        <div className="space-y-3">
          {/* Sample email items */}
          <div className="bg-white border border-[#d2d2d7] rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-medium text-[#1d1d1f]">John Doe</h3>
                  <span className="text-sm text-[#8e8e93]">2:34 PM</span>
                </div>
                <p className="text-sm text-[#1d1d1f] font-medium mb-1">Meeting Tomorrow</p>
                <p className="text-sm text-[#6e6e73] line-clamp-2">
                  Hi, I wanted to confirm our meeting tomorrow at 3 PM. I've prepared the agenda and sent it to everyone...
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#d2d2d7] rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#34C759] flex items-center justify-center text-white font-medium">
                AS
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-medium text-[#1d1d1f]">Alice Smith</h3>
                  <span className="text-sm text-[#8e8e93]">11:23 AM</span>
                </div>
                <p className="text-sm text-[#1d1d1f] font-medium mb-1">Project Update</p>
                <p className="text-sm text-[#6e6e73] line-clamp-2">
                  The latest build is ready for review. I've fixed all the issues we discussed in the last meeting...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
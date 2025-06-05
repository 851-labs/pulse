import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/inbox")({
  component: InboxComponent,
})

function InboxComponent() {
  return (
    <div className="p-6">
      <div className="max-w-4xl">
        <h1 className="mb-4 text-2xl font-semibold text-[#1d1d1f]">Inbox</h1>
        <div className="space-y-3">
          {/* Sample email items */}
          <div className="cursor-pointer rounded-lg border border-[#d2d2d7] bg-white p-4 transition-shadow hover:shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007AFF] font-medium text-white">
                JD
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-baseline justify-between">
                  <h3 className="font-medium text-[#1d1d1f]">John Doe</h3>
                  <span className="text-sm text-[#8e8e93]">2:34 PM</span>
                </div>
                <p className="mb-1 text-sm font-medium text-[#1d1d1f]">Meeting Tomorrow</p>
                <p className="line-clamp-2 text-sm text-[#6e6e73]">
                  Hi, I wanted to confirm our meeting tomorrow at 3 PM. I've prepared the agenda and sent it to
                  everyone...
                </p>
              </div>
            </div>
          </div>

          <div className="cursor-pointer rounded-lg border border-[#d2d2d7] bg-white p-4 transition-shadow hover:shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#34C759] font-medium text-white">
                AS
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-baseline justify-between">
                  <h3 className="font-medium text-[#1d1d1f]">Alice Smith</h3>
                  <span className="text-sm text-[#8e8e93]">11:23 AM</span>
                </div>
                <p className="mb-1 text-sm font-medium text-[#1d1d1f]">Project Update</p>
                <p className="line-clamp-2 text-sm text-[#6e6e73]">
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

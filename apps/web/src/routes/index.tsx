import { useZero } from "@851-labs/zero/use-zero"
import { useQuery } from "@rocicorp/zero/react"
import { createFileRoute } from "@tanstack/react-router"
import { ExternalLinkIcon, RssIcon } from "lucide-react"
import { AppShell } from "~/components/app-shell"
import { ScrollArea } from "~/components/ui/scroll-area"

export const Route = createFileRoute("/")({
  component: Home,
  ssr: false,
})

function Home() {
  const z = useZero()

  // Query for feeds ordered by title
  const [feeds] = useQuery(z.query.feeds.orderBy("title", "asc"))

  return (
    <AppShell>
      <AppShell.Sidebar>
        <div className="px-4 py-6">
          <h2 className="mb-6 px-2 text-sm font-semibold tracking-tight text-gray-900">Your Feeds</h2>

          <ScrollArea className="h-[calc(100vh-120px)]">
            <ScrollArea.Viewport>
              <ScrollArea.Content className="space-y-1">
                {/* Feeds Section */}
                <div className="mb-6">
                  <h3 className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-gray-600">RSS Feeds</h3>
                  <div className="space-y-0.5">
                    {feeds.map((feed) => (
                      <div
                        key={feed.id}
                        className="group flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm hover:bg-gray-200/60"
                      >
                        <RssIcon className="mr-2 h-4 w-4 text-orange-500" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-gray-900">{feed.title || "Untitled Feed"}</div>
                          <div className="truncate text-xs text-gray-500">{feed.url}</div>
                        </div>
                        <ExternalLinkIcon className="h-3 w-3 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
          </ScrollArea>
        </div>
      </AppShell.Sidebar>
      <AppShell.Content>
        <div className="max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold text-gray-900">Welcome to Pulse</h1>
          <p className="mb-8 text-lg text-gray-600">
            Your personalized feed reader powered by Zero's real-time sync technology.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <div className="mb-4 flex items-center">
                <RssIcon className="mr-3 h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">RSS Feeds</h3>
              </div>
              <p className="text-sm text-blue-700">{feeds.length} active feeds syncing in real-time</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Getting Started</h2>
            <div className="rounded-lg border bg-gray-50 p-6">
              <p className="mb-4 text-gray-600">
                This sidebar shows your feeds and recent content, all powered by ZQL (Zero Query Language). The data
                syncs automatically and updates in real-time as new content becomes available.
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                <li>Browse your RSS feeds in the sidebar</li>
                <li>View recent articles and podcasts</li>
                <li>Click on any item to view details</li>
                <li>Everything syncs in real-time with Zero</li>
              </ul>
            </div>
          </div>
        </div>
      </AppShell.Content>
    </AppShell>
  )
}

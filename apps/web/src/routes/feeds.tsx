import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { useZero } from "@851-labs/zero/use-zero"
import { useQuery } from "@rocicorp/zero/react"
import { RssIcon, ExternalLinkIcon } from "lucide-react"
import { AppShell } from "~/components/app-shell"

export const Route = createFileRoute("/feeds")({
  component: FeedsComponent,
  ssr: false,
})

function FeedsComponent() {
  const z = useZero()
  const [feeds] = useQuery(z.query.feeds.orderBy("title", "asc"))

  return (
    <AppShell>
      <AppShell.Sidebar>
        <div className="px-4 py-6">
          <h2 className="mb-6 px-2 text-sm font-semibold tracking-tight text-gray-900">Your Feeds</h2>

          <div className="space-y-0.5">
            {feeds
              .filter((feed) => feed.id)
              .map((feed) => (
                <Link
                  key={feed.id}
                  to="/feeds/$feedId"
                  params={{ feedId: feed.id! }}
                  className="group flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm hover:bg-gray-200/60"
                  activeProps={{ className: "bg-blue-50 border-l-2 border-blue-500" }}
                >
                  <RssIcon className="mr-2 h-4 w-4 text-orange-500" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-gray-900">{feed.title || "Untitled Feed"}</div>
                    <div className="truncate text-xs text-gray-500">{feed.url}</div>
                  </div>
                  <ExternalLinkIcon className="h-3 w-3 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
          </div>

          {feeds.length === 0 && (
            <div className="px-2 py-4 text-sm text-gray-500">No feeds yet. Add your first RSS feed to get started.</div>
          )}
        </div>
      </AppShell.Sidebar>
      <AppShell.Content>
        <Outlet />
      </AppShell.Content>
    </AppShell>
  )
}

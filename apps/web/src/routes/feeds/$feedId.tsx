import { createFileRoute } from "@tanstack/react-router"
import { useZero } from "@851-labs/zero/use-zero"
import { useQuery } from "@rocicorp/zero/react"
import { RssIcon, ExternalLinkIcon, CalendarIcon } from "lucide-react"

export const Route = createFileRoute("/feeds/$feedId")({
  component: FeedComponent,
  ssr: false,
})

function FeedComponent() {
  const { feedId } = Route.useParams()
  const z = useZero()

  // Query for the specific feed
  const [feeds] = useQuery(z.query.feeds.where("id", feedId))
  const feed = feeds[0]

  // Query for RSS feed details (includes description)
  const [rssFeeds] = useQuery(z.query.rssFeeds.where("feedId", feedId))
  const rssFeed = rssFeeds[0]

  // Query for RSS articles from this feed
  const [articles] = useQuery(z.query.rssArticles.where("rssFeedId", rssFeed?.id || "").orderBy("pubDate", "desc"))

  if (!feed) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Feed not found</h2>
          <p className="text-gray-500">The requested feed could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Feed Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <RssIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">{feed.title || "Untitled Feed"}</h1>
            {rssFeed?.description && <p className="mb-3 text-gray-600">{rssFeed.description}</p>}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ExternalLinkIcon className="h-4 w-4" />
                <a href={feed.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                  {feed.url}
                </a>
              </div>
              {feed.lastFetchedAt && (
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Updated {new Date(feed.lastFetchedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Articles</h2>

        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="rounded-lg border p-4 hover:bg-gray-50">
                <h3 className="mb-2 font-medium text-gray-900">
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {article.title}
                  </a>
                </h3>
                {(article.summary || article.content) && (
                  <p className="mb-2 line-clamp-3 text-sm text-gray-600">
                    {article.summary || (article.content && article.content.substring(0, 200) + "...")}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {article.author && <span>By {article.author}</span>}
                  {article.pubDate && <span>{new Date(article.pubDate).toLocaleDateString()}</span>}
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    <ExternalLinkIcon className="h-3 w-3" />
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <RssIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No articles yet</h3>
            <p className="text-gray-500">This feed hasn't been fetched yet or contains no articles.</p>
          </div>
        )}
      </div>
    </div>
  )
}

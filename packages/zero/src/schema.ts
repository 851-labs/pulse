import { ANYONE_CAN_DO_ANYTHING, type Row, definePermissions } from "@rocicorp/zero"
import { schema, type Schema } from "./schema.gen"

type FeedItemRow = Row<typeof schema.tables.feedItems>
type FeedRow = Row<typeof schema.tables.feeds>
type RssFeedRow = Row<typeof schema.tables.rssFeeds>
type RssArticleRow = Row<typeof schema.tables.rssArticles>
type RssPodcastRow = Row<typeof schema.tables.rssPodcasts>

const permissions = definePermissions<{}, Schema>(schema, () => {
  return {
    feedItems: ANYONE_CAN_DO_ANYTHING,
    feeds: ANYONE_CAN_DO_ANYTHING,
    rssFeeds: ANYONE_CAN_DO_ANYTHING,
    rssArticles: ANYONE_CAN_DO_ANYTHING,
    rssPodcasts: ANYONE_CAN_DO_ANYTHING,
  }
})

export { schema, type Schema }
export type { FeedItemRow, FeedRow, RssFeedRow, RssArticleRow, RssPodcastRow }
export { permissions }

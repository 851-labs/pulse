import { index, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

const feedKindEnum = pgEnum("feed_kind", ["rss", "youtube", "x_timeline", "github_repo"])

const feeds = pgTable(
  "feeds",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    kind: feedKindEnum("kind").notNull(),
    url: text("url").notNull().unique(),
    title: text("title"),
    lastFetchedAt: timestamp("last_fetched_at"),
    lastFetchError: text("last_fetch_error"),
  },
  (table) => [index("feeds_last_fetched_at_idx").on(table.lastFetchedAt), index("feeds_kind_idx").on(table.kind)],
)

const rssFeeds = pgTable(
  "rss_feeds",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    feedId: uuid("feed_id")
      .references(() => feeds.id)
      .unique(),
    siteUrl: text("site_url"),
    description: text("description"),
    imageUrl: text("image_url"),
    language: text("language"),
    metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  },
  (table) => [
    // For sorting feeds by creation date
    index("rss_feeds_created_at_idx").on(table.createdAt),
    // For filtering by language
    index("rss_feeds_language_idx").on(table.language),
  ],
)

const feedItemKindEnum = pgEnum("feed_item_kind", ["rss_article", "rss_podcast"])

// Polymorphic root table
const feedItems = pgTable(
  "feed_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    kind: feedItemKindEnum("kind").notNull(),
    feedSourceId: uuid("feed_source_id").references(() => feeds.id),
  },
  (table) => [
    index("feed_items_feed_source_id_idx").on(table.feedSourceId),
    index("feed_items_kind_idx").on(table.kind),
    index("feed_items_created_at_idx").on(table.createdAt),
  ],
)

// RSS Article subtype
const rssArticles = pgTable(
  "rss_articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    rssFeedId: uuid("rss_feed_id").references(() => rssFeeds.feedId),
    feedItemId: uuid("feed_item_id")
      .references(() => feedItems.id)
      .unique(),
    title: text("title").notNull(),
    link: text("link").notNull(),
    content: text("content"),
    summary: text("summary"),
    pubDate: timestamp("pub_date"),
    author: text("author"),
    metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  },
  (table) => [
    // Critical for duplicate checking during seeding
    index("rss_articles_link_idx").on(table.link),
    // For querying articles by feed
    index("rss_articles_rss_feed_id_idx").on(table.rssFeedId),
    // For chronological ordering
    index("rss_articles_pub_date_idx").on(table.pubDate),
    // For recent articles queries
    index("rss_articles_created_at_idx").on(table.createdAt),
    // Composite index for feed + date queries
    index("rss_articles_rss_feed_id_pub_date_idx").on(table.rssFeedId, table.pubDate),
  ],
)

// RSS Podcast subtype
const rssPodcasts = pgTable(
  "rss_podcasts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    rssFeedId: uuid("rss_feed_id").references(() => rssFeeds.feedId),
    feedItemId: uuid("feed_item_id")
      .references(() => feedItems.id)
      .unique(),
    title: text("title").notNull(),
    link: text("link").notNull(),
    audioUrl: text("audio_url").notNull(),
    duration: text("duration"),
    pubDate: timestamp("pub_date"),
    showNotes: text("show_notes"),
    guest: text("guest"),
    metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  },
  (table) => [
    // For duplicate checking during podcast seeding
    index("rss_podcasts_link_idx").on(table.link),
    // For querying podcasts by feed
    index("rss_podcasts_rss_feed_id_idx").on(table.rssFeedId),
    // For chronological ordering
    index("rss_podcasts_pub_date_idx").on(table.pubDate),
    // For recent podcasts queries
    index("rss_podcasts_created_at_idx").on(table.createdAt),
    // Composite index for feed + date queries
    index("rss_podcasts_rss_feed_id_pub_date_idx").on(table.rssFeedId, table.pubDate),
  ],
)

export { user, session, account, verification } from "./schema-auth.gen"
export { feeds, rssFeeds, feedItems, rssArticles, rssPodcasts }

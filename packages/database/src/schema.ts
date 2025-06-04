import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

const feedKindEnum = pgEnum("feed_kind", ["rss", "youtube", "x_timeline", "github_repo"])

const feeds = pgTable("feeds", {
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
})

const rssFeeds = pgTable("rss_feeds", {
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
})

const feedItemKindEnum = pgEnum("feed_item_kind", ["rss_article", "rss_podcast"])

// Polymorphic root table
const feedItems = pgTable("feed_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  kind: feedItemKindEnum("kind").notNull(),
  feedSourceId: uuid("feed_source_id").references(() => feeds.id),
})

// RSS Article subtype
const rssArticles = pgTable("rss_articles", {
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
})

// RSS Podcast subtype
const rssPodcasts = pgTable("rss_podcasts", {
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
})

export { user, session, account, verification } from "./schema-auth.gen"
export { feeds, rssFeeds, feedItems, rssArticles, rssPodcasts }

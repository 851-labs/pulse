import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
// import { authUsers } from "drizzle-orm/supabase"

export const feedKindEnum = pgEnum("feed_kind", ["rss", "youtube", "x_timeline", "github_repo"])

export const feeds = pgTable("feeds", {
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

export const rssFeeds = pgTable("rss_feeds", {
  feedId: uuid("feed_id")
    .primaryKey()
    .references(() => feeds.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  siteUrl: text("site_url"),
  description: text("description"),
  imageUrl: text("image_url"),
  language: text("language"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
})

export const feedItemKindEnum = pgEnum("feed_item_kind", ["rss_article", "rss_podcast"])

// Polymorphic root table
export const feedItems = pgTable("feed_items", {
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
export const rssArticles = pgTable("rss_articles", {
  feedItemId: uuid("feed_item_id")
    .primaryKey()
    .references(() => feedItems.id),
  rssFeedId: uuid("rss_feed_id").references(() => rssFeeds.feedId),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
  link: text("link").notNull(),
  content: text("content"),
  summary: text("summary"),
  pubDate: timestamp("pub_date"),
  author: text("author"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
})

// RSS Podcast subtype
export const rssPodcasts = pgTable("rss_podcasts", {
  feedItemId: uuid("feed_item_id")
    .primaryKey()
    .references(() => feedItems.id),
  rssFeedId: uuid("rss_feed_id").references(() => rssFeeds.feedId),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
  link: text("link").notNull(),
  audioUrl: text("audio_url").notNull(),
  duration: text("duration"),
  pubDate: timestamp("pub_date"),
  showNotes: text("show_notes"),
  guest: text("guest"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
})

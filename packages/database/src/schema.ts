import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
// import { authUsers } from "drizzle-orm/supabase"

export const feedItemKindEnum = pgEnum("feed_item_kind", ["rss_article", "rss_podcast"])

// Polymorphic root table
export const feedItems = pgTable("feed_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: feedItemKindEnum("kind").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// RSS Article subtype
export const rssArticles = pgTable("rss_articles", {
  feedItemId: uuid("feed_item_id")
    .primaryKey()
    .references(() => feedItems.id),
  title: text("title").notNull(),
  link: text("link").notNull(),
  content: text("content"),
  summary: text("summary"),
  pubDate: timestamp("pub_date", { withTimezone: true }),
  author: text("author"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
})

// RSS Podcast subtype
export const rssPodcasts = pgTable("rss_podcasts", {
  feedItemId: uuid("feed_item_id")
    .primaryKey()
    .references(() => feedItems.id),
  title: text("title").notNull(),
  link: text("link").notNull(),
  audioUrl: text("audio_url").notNull(),
  duration: text("duration"),
  pubDate: timestamp("pub_date", { withTimezone: true }),
  showNotes: text("show_notes"),
  guest: text("guest"),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
})

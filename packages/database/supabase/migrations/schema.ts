import { pgTable, text, timestamp, unique, boolean, foreignKey, uuid, jsonb, pgEnum } from "drizzle-orm/pg-core"

export const feedItemKind = pgEnum("feed_item_kind", ["rss_article", "rss_podcast"])
export const feedKind = pgEnum("feed_kind", ["rss", "youtube", "x_timeline", "github_repo"])

export const verification = pgTable("verification", {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }),
})

export const user = pgTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").notNull(),
    image: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [unique("user_email_unique").on(table.email)],
)

export const account = pgTable(
  "account",
  {
    id: text().primaryKey().notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: "string" }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: "string" }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "account_user_id_user_id_fk",
    }).onDelete("cascade"),
  ],
)

export const feeds = pgTable(
  "feeds",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
    kind: feedKind().notNull(),
    url: text().notNull(),
    title: text(),
    lastFetchedAt: timestamp("last_fetched_at", { mode: "string" }),
    lastFetchError: text("last_fetch_error"),
  },
  (table) => [unique("feeds_url_unique").on(table.url)],
)

export const feedItems = pgTable(
  "feed_items",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
    kind: feedItemKind().notNull(),
    feedSourceId: uuid("feed_source_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.feedSourceId],
      foreignColumns: [feeds.id],
      name: "feed_items_feed_source_id_feeds_id_fk",
    }),
  ],
)

export const rssFeeds = pgTable(
  "rss_feeds",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
    feedId: uuid("feed_id"),
    siteUrl: text("site_url"),
    description: text(),
    imageUrl: text("image_url"),
    language: text(),
    metadata: jsonb().default({}),
  },
  (table) => [
    foreignKey({
      columns: [table.feedId],
      foreignColumns: [feeds.id],
      name: "rss_feeds_feed_id_feeds_id_fk",
    }),
    unique("rss_feeds_feed_id_unique").on(table.feedId),
  ],
)

export const rssArticles = pgTable(
  "rss_articles",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
    rssFeedId: uuid("rss_feed_id"),
    feedItemId: uuid("feed_item_id"),
    title: text().notNull(),
    link: text().notNull(),
    content: text(),
    summary: text(),
    pubDate: timestamp("pub_date", { mode: "string" }),
    author: text(),
    metadata: jsonb().default({}),
  },
  (table) => [
    foreignKey({
      columns: [table.feedItemId],
      foreignColumns: [feedItems.id],
      name: "rss_articles_feed_item_id_feed_items_id_fk",
    }),
    foreignKey({
      columns: [table.rssFeedId],
      foreignColumns: [rssFeeds.feedId],
      name: "rss_articles_rss_feed_id_rss_feeds_feed_id_fk",
    }),
    unique("rss_articles_feed_item_id_unique").on(table.feedItemId),
  ],
)

export const rssPodcasts = pgTable(
  "rss_podcasts",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
    rssFeedId: uuid("rss_feed_id"),
    feedItemId: uuid("feed_item_id"),
    title: text().notNull(),
    link: text().notNull(),
    audioUrl: text("audio_url").notNull(),
    duration: text(),
    pubDate: timestamp("pub_date", { mode: "string" }),
    showNotes: text("show_notes"),
    guest: text(),
    metadata: jsonb().default({}),
  },
  (table) => [
    foreignKey({
      columns: [table.feedItemId],
      foreignColumns: [feedItems.id],
      name: "rss_podcasts_feed_item_id_feed_items_id_fk",
    }),
    foreignKey({
      columns: [table.rssFeedId],
      foreignColumns: [rssFeeds.feedId],
      name: "rss_podcasts_rss_feed_id_rss_feeds_feed_id_fk",
    }),
    unique("rss_podcasts_feed_item_id_unique").on(table.feedItemId),
  ],
)

export const session = pgTable(
  "session",
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    token: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "session_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("session_token_unique").on(table.token),
  ],
)

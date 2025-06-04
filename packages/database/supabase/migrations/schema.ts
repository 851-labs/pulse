import { pgTable, unique, uuid, timestamp, text, foreignKey, jsonb, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const feedItemKind = pgEnum("feed_item_kind", ['rss_article', 'rss_podcast'])
export const feedKind = pgEnum("feed_kind", ['rss', 'youtube', 'x_timeline', 'github_repo'])


export const feeds = pgTable("feeds", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	kind: feedKind().notNull(),
	url: text().notNull(),
	title: text(),
	lastFetchedAt: timestamp("last_fetched_at", { mode: 'string' }),
	lastFetchError: text("last_fetch_error"),
}, (table) => [
	unique("feeds_url_unique").on(table.url),
]);

export const rssArticles = pgTable("rss_articles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	rssFeedId: uuid("rss_feed_id"),
	feedItemId: uuid("feed_item_id"),
	title: text().notNull(),
	link: text().notNull(),
	content: text(),
	summary: text(),
	pubDate: timestamp("pub_date", { mode: 'string' }),
	author: text(),
	metadata: jsonb().default({}),
}, (table) => [
	foreignKey({
			columns: [table.feedItemId],
			foreignColumns: [feedItems.id],
			name: "rss_articles_feed_item_id_feed_items_id_fk"
		}),
	foreignKey({
			columns: [table.rssFeedId],
			foreignColumns: [rssFeeds.feedId],
			name: "rss_articles_rss_feed_id_rss_feeds_feed_id_fk"
		}),
	unique("rss_articles_feed_item_id_unique").on(table.feedItemId),
]);

export const feedItems = pgTable("feed_items", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	kind: feedItemKind().notNull(),
	feedSourceId: uuid("feed_source_id"),
}, (table) => [
	foreignKey({
			columns: [table.feedSourceId],
			foreignColumns: [feeds.id],
			name: "feed_items_feed_source_id_feeds_id_fk"
		}),
]);

export const rssFeeds = pgTable("rss_feeds", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	feedId: uuid("feed_id"),
	siteUrl: text("site_url"),
	description: text(),
	imageUrl: text("image_url"),
	language: text(),
	metadata: jsonb().default({}),
}, (table) => [
	foreignKey({
			columns: [table.feedId],
			foreignColumns: [feeds.id],
			name: "rss_feeds_feed_id_feeds_id_fk"
		}),
	unique("rss_feeds_feed_id_unique").on(table.feedId),
]);

export const rssPodcasts = pgTable("rss_podcasts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	rssFeedId: uuid("rss_feed_id"),
	feedItemId: uuid("feed_item_id"),
	title: text().notNull(),
	link: text().notNull(),
	audioUrl: text("audio_url").notNull(),
	duration: text(),
	pubDate: timestamp("pub_date", { mode: 'string' }),
	showNotes: text("show_notes"),
	guest: text(),
	metadata: jsonb().default({}),
}, (table) => [
	foreignKey({
			columns: [table.feedItemId],
			foreignColumns: [feedItems.id],
			name: "rss_podcasts_feed_item_id_feed_items_id_fk"
		}),
	foreignKey({
			columns: [table.rssFeedId],
			foreignColumns: [rssFeeds.feedId],
			name: "rss_podcasts_rss_feed_id_rss_feeds_feed_id_fk"
		}),
	unique("rss_podcasts_feed_item_id_unique").on(table.feedItemId),
]);

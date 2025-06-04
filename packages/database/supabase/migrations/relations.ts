import { relations } from "drizzle-orm/relations";
import { feedItems, rssArticles, rssFeeds, feeds, rssPodcasts } from "./schema";

export const rssArticlesRelations = relations(rssArticles, ({one}) => ({
	feedItem: one(feedItems, {
		fields: [rssArticles.feedItemId],
		references: [feedItems.id]
	}),
	rssFeed: one(rssFeeds, {
		fields: [rssArticles.rssFeedId],
		references: [rssFeeds.feedId]
	}),
}));

export const feedItemsRelations = relations(feedItems, ({one, many}) => ({
	rssArticles: many(rssArticles),
	feed: one(feeds, {
		fields: [feedItems.feedSourceId],
		references: [feeds.id]
	}),
	rssPodcasts: many(rssPodcasts),
}));

export const rssFeedsRelations = relations(rssFeeds, ({one, many}) => ({
	rssArticles: many(rssArticles),
	feed: one(feeds, {
		fields: [rssFeeds.feedId],
		references: [feeds.id]
	}),
	rssPodcasts: many(rssPodcasts),
}));

export const feedsRelations = relations(feeds, ({many}) => ({
	feedItems: many(feedItems),
	rssFeeds: many(rssFeeds),
}));

export const rssPodcastsRelations = relations(rssPodcasts, ({one}) => ({
	feedItem: one(feedItems, {
		fields: [rssPodcasts.feedItemId],
		references: [feedItems.id]
	}),
	rssFeed: one(rssFeeds, {
		fields: [rssPodcasts.rssFeedId],
		references: [rssFeeds.feedId]
	}),
}));
import { relations } from "drizzle-orm/relations";
import { user, account, feeds, feedItems, rssFeeds, rssArticles, rssPodcasts, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const feedItemsRelations = relations(feedItems, ({one, many}) => ({
	feed: one(feeds, {
		fields: [feedItems.feedSourceId],
		references: [feeds.id]
	}),
	rssArticles: many(rssArticles),
	rssPodcasts: many(rssPodcasts),
}));

export const feedsRelations = relations(feeds, ({many}) => ({
	feedItems: many(feedItems),
	rssFeeds: many(rssFeeds),
}));

export const rssFeedsRelations = relations(rssFeeds, ({one, many}) => ({
	feed: one(feeds, {
		fields: [rssFeeds.feedId],
		references: [feeds.id]
	}),
	rssArticles: many(rssArticles),
	rssPodcasts: many(rssPodcasts),
}));

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

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));
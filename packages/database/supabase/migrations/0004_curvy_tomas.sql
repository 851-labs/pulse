ALTER TABLE "rss_articles" DROP CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_feed_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_podcasts" DROP CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_feed_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "feed_items" DROP CONSTRAINT "feed_items_feed_source_id_feeds_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_articles" DROP CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_articles" DROP CONSTRAINT "rss_articles_feed_item_id_feed_items_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_feeds" DROP CONSTRAINT "rss_feeds_feed_id_feeds_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_podcasts" DROP CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_id_fk";
--> statement-breakpoint
ALTER TABLE "rss_podcasts" DROP CONSTRAINT "rss_podcasts_feed_item_id_feed_items_id_fk";
--> statement-breakpoint
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_feed_source_id_feeds_id_fk" FOREIGN KEY ("feed_source_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_feed_item_id_feed_items_id_fk" FOREIGN KEY ("feed_item_id") REFERENCES "public"."feed_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_feeds" ADD CONSTRAINT "rss_feeds_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_feed_item_id_feed_items_id_fk" FOREIGN KEY ("feed_item_id") REFERENCES "public"."feed_items"("id") ON DELETE cascade ON UPDATE no action;
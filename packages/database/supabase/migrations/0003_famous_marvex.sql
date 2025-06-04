ALTER TABLE "rss_articles" ADD COLUMN "rss_feed_id" uuid;--> statement-breakpoint
ALTER TABLE "rss_feeds" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_feeds" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD COLUMN "rss_feed_id" uuid;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_feed_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("feed_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_feed_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("feed_id") ON DELETE no action ON UPDATE no action;
CREATE INDEX "feed_items_feed_source_id_idx" ON "feed_items" USING btree ("feed_source_id");--> statement-breakpoint
CREATE INDEX "feed_items_kind_idx" ON "feed_items" USING btree ("kind");--> statement-breakpoint
CREATE INDEX "feed_items_created_at_idx" ON "feed_items" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "feeds_last_fetched_at_idx" ON "feeds" USING btree ("last_fetched_at");--> statement-breakpoint
CREATE INDEX "feeds_kind_idx" ON "feeds" USING btree ("kind");--> statement-breakpoint
CREATE INDEX "rss_articles_link_idx" ON "rss_articles" USING btree ("link");--> statement-breakpoint
CREATE INDEX "rss_articles_rss_feed_id_idx" ON "rss_articles" USING btree ("rss_feed_id");--> statement-breakpoint
CREATE INDEX "rss_articles_pub_date_idx" ON "rss_articles" USING btree ("pub_date");--> statement-breakpoint
CREATE INDEX "rss_articles_created_at_idx" ON "rss_articles" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "rss_articles_rss_feed_id_pub_date_idx" ON "rss_articles" USING btree ("rss_feed_id","pub_date");--> statement-breakpoint
CREATE INDEX "rss_feeds_created_at_idx" ON "rss_feeds" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "rss_feeds_language_idx" ON "rss_feeds" USING btree ("language");--> statement-breakpoint
CREATE INDEX "rss_podcasts_link_idx" ON "rss_podcasts" USING btree ("link");--> statement-breakpoint
CREATE INDEX "rss_podcasts_rss_feed_id_idx" ON "rss_podcasts" USING btree ("rss_feed_id");--> statement-breakpoint
CREATE INDEX "rss_podcasts_pub_date_idx" ON "rss_podcasts" USING btree ("pub_date");--> statement-breakpoint
CREATE INDEX "rss_podcasts_created_at_idx" ON "rss_podcasts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "rss_podcasts_rss_feed_id_pub_date_idx" ON "rss_podcasts" USING btree ("rss_feed_id","pub_date");
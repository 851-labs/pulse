-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."feed_item_kind" AS ENUM('rss_article', 'rss_podcast');--> statement-breakpoint
CREATE TYPE "public"."feed_kind" AS ENUM('rss', 'youtube', 'x_timeline', 'github_repo');--> statement-breakpoint
CREATE TABLE "feeds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"kind" "feed_kind" NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"last_fetched_at" timestamp,
	"last_fetch_error" text,
	CONSTRAINT "feeds_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "rss_articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"rss_feed_id" uuid,
	"feed_item_id" uuid,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"content" text,
	"summary" text,
	"pub_date" timestamp,
	"author" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	CONSTRAINT "rss_articles_feed_item_id_unique" UNIQUE("feed_item_id")
);
--> statement-breakpoint
CREATE TABLE "feed_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"kind" "feed_item_kind" NOT NULL,
	"feed_source_id" uuid
);
--> statement-breakpoint
CREATE TABLE "rss_feeds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"feed_id" uuid,
	"site_url" text,
	"description" text,
	"image_url" text,
	"language" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	CONSTRAINT "rss_feeds_feed_id_unique" UNIQUE("feed_id")
);
--> statement-breakpoint
CREATE TABLE "rss_podcasts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"rss_feed_id" uuid,
	"feed_item_id" uuid,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"audio_url" text NOT NULL,
	"duration" text,
	"pub_date" timestamp,
	"show_notes" text,
	"guest" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	CONSTRAINT "rss_podcasts_feed_item_id_unique" UNIQUE("feed_item_id")
);
--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_feed_item_id_feed_items_id_fk" FOREIGN KEY ("feed_item_id") REFERENCES "public"."feed_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_feed_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("feed_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_feed_source_id_feeds_id_fk" FOREIGN KEY ("feed_source_id") REFERENCES "public"."feeds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_feeds" ADD CONSTRAINT "rss_feeds_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_feed_item_id_feed_items_id_fk" FOREIGN KEY ("feed_item_id") REFERENCES "public"."feed_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_feed_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("feed_id") ON DELETE no action ON UPDATE no action;
*/
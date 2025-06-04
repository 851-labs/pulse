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
CREATE TABLE "rss_feeds" (
	"feed_id" uuid PRIMARY KEY NOT NULL,
	"site_url" text,
	"description" text,
	"image_url" text,
	"language" text,
	"metadata" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
ALTER TABLE "feed_items" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "feed_items" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "feed_items" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "feed_items" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "feed_items" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "feed_items" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_articles" ALTER COLUMN "pub_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ALTER COLUMN "pub_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "feed_items" ADD COLUMN "feed_source_id" uuid;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "rss_feeds" ADD CONSTRAINT "rss_feeds_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_feed_source_id_feeds_id_fk" FOREIGN KEY ("feed_source_id") REFERENCES "public"."feeds"("id") ON DELETE no action ON UPDATE no action;
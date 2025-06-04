CREATE TYPE "public"."feed_item_kind" AS ENUM('rss_article', 'rss_podcast');--> statement-breakpoint
CREATE TYPE "public"."feed_kind" AS ENUM('rss', 'youtube', 'x_timeline', 'github_repo');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
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
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_items" ADD CONSTRAINT "feed_items_feed_source_id_feeds_id_fk" FOREIGN KEY ("feed_source_id") REFERENCES "public"."feeds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_rss_feed_id_rss_feeds_feed_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("feed_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_articles" ADD CONSTRAINT "rss_articles_feed_item_id_feed_items_id_fk" FOREIGN KEY ("feed_item_id") REFERENCES "public"."feed_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_feeds" ADD CONSTRAINT "rss_feeds_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_rss_feed_id_rss_feeds_feed_id_fk" FOREIGN KEY ("rss_feed_id") REFERENCES "public"."rss_feeds"("feed_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rss_podcasts" ADD CONSTRAINT "rss_podcasts_feed_item_id_feed_items_id_fk" FOREIGN KEY ("feed_item_id") REFERENCES "public"."feed_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
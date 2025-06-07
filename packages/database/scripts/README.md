# RSS Feed Seeding Scripts

This directory contains scripts for seeding your database with RSS feed data.

## Scripts

### `seed-rss-feeds.ts`

The basic RSS feed seeding script that fetches RSS feeds and populates the database with articles. Gets only the latest posts from each feed.

### `seed-rss-feeds-paginated.ts`

Enhanced RSS seeding script with pagination support and historical data retrieval. Can fetch multiple pages of historical content.

### `example-rss-usage.ts`

Basic example script showing how to use the RSS seeding functionality programmatically.

### `example-paginated-usage.ts`

Advanced examples demonstrating pagination features and different strategies for historical data retrieval.

## Usage

### 1. Command Line Usage

You can provide RSS feed URLs as command line arguments:

```bash
# From the database package directory
pnpm db:seed-rss https://feeds.feedburner.com/oreilly/radar https://blog.golang.org/feed.atom

# Or using tsx directly
tsx scripts/seed-rss-feeds.ts https://example.com/feed.rss https://another.com/rss.xml
```

### 2. Using Example Feeds

If you don't provide any URLs, the script will use a set of example feeds:

```bash
pnpm db:seed-rss
```

### 3. Programmatic Usage

You can also use the seeding function in your own scripts:

```typescript
import { seedRSSFeeds } from "./scripts/seed-rss-feeds"

const myFeeds = [
  {
    url: "https://example.com/feed.rss",
    title: "Example Feed",
  },
  {
    url: "https://another.com/rss.xml",
    // title is optional - will use feed title if not provided
  },
]

await seedRSSFeeds(myFeeds)
```

## Pagination & Historical Data

### Problem

Many RSS feeds only return the latest 10-20 posts. For example, CSS-Tricks feed only shows the most recent 10 articles, but when setting up a new feed, you might want to capture historical content.

### Solution: `seed-rss-feeds-paginated.ts`

The paginated script implements multiple strategies to fetch historical data:

1. **Pagination Strategies** - Tries common URL patterns:

   - `?page=2`, `?paged=2`, `?offset=10`
   - WordPress-style: `/feed/page/2/`

2. **Site-Specific Patterns** - Known archive URLs for popular sites
3. **Smart Deduplication** - Stops when it finds overlapping content
4. **Respectful Crawling** - Adds delays between requests

### Usage Examples

```bash
# Full historical scan with pagination
pnpm db:seed-rss-full https://css-tricks.com/feed/

# Using the example script with different strategies
tsx scripts/example-paginated-usage.ts css-tricks
tsx scripts/example-paginated-usage.ts mixed
```

### Programmatic Usage with Pagination

```typescript
import { seedRSSFeeds } from "./scripts/seed-rss-feeds-paginated"

const feedsWithPagination = [
  {
    url: "https://css-tricks.com/feed/",
    title: "CSS-Tricks",
    fullScan: true, // Enable historical scan
    maxPages: 20, // Try up to 20 pages
  },
  {
    url: "https://feeds.simplecast.com/54nAGcIl",
    title: "Podcast Feed",
    fullScan: false, // Just get latest episodes
  },
]

await seedRSSFeeds(feedsWithPagination)
```

## Features

### Basic Features (both scripts)

- ✅ Fetches and parses RSS feeds
- ✅ Stores feed metadata (title, description, language, etc.)
- ✅ Extracts and stores articles with full content
- ✅ Handles feed updates (won't duplicate existing articles)
- ✅ Error handling and logging
- ✅ Supports custom feed titles
- ✅ Stores rich metadata for both feeds and articles

### Advanced Features (paginated script)

- ✅ **Multiple pagination strategies** - Automatically tries different URL patterns
- ✅ **Historical data retrieval** - Can fetch 100s of articles instead of just latest 10-20
- ✅ **Smart deduplication** - Stops when finding overlapping content
- ✅ **Site-specific patterns** - Pre-configured for popular platforms
- ✅ **Respectful crawling** - Rate limiting and delays between requests
- ✅ **Flexible configuration** - Choose between full scan or latest-only per feed

## Database Schema

The script populates the following tables:

- `feeds` - Main feed information
- `rss_feeds` - RSS-specific metadata
- `feed_items` - Polymorphic feed item records
- `rss_articles` - Article-specific data

## Requirements

- Environment variable `DATABASE_URL` must be set
- Database must be migrated with the latest schema
- Internet connection to fetch RSS feeds

## Error Handling

The script includes comprehensive error handling:

- Failed feed fetches are logged and stored in the database
- Individual article processing errors don't stop the entire process
- Network timeouts and parsing errors are gracefully handled

## Example Output

```
🌱 Starting RSS feed seeding for 3 feeds...

📡 Fetching RSS feed: https://blog.golang.org/feed.atom
📰 Found 15 articles in feed: The Go Blog
✨ Creating new feed record...
📝 Processing 15 articles...
   📄 [6.67%] Processing article 1/15: "Go's New Secure Random Number Generator"
     ✨ Created in 245ms
   📄 [13.33%] Processing article 2/15: "Better Error Handling in Go"
     ✅ Updated in 156ms
   📄 [20.00%] Processing article 3/15: "Concurrency Patterns in Go"
     ✨ Created in 189ms
   ...
✅ Processed feed "The Go Blog" in 12s:
   📝 8 new articles
   🔄 7 updated articles
   ⏱️  Average: 1.25 articles/second

🎉 RSS feed seeding completed! Total time: 45s
```

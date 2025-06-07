import { config } from "dotenv"
import Parser from "rss-parser"
import { eq } from "drizzle-orm"
import { db } from "../src/client"
import { feeds, rssFeeds, feedItems, rssArticles } from "../src/schema"

config({ path: ".env" })

interface RSSFeedInput {
  url: string
  title?: string
}

// RSS parser instance
const parser = new Parser({
  customFields: {
    feed: [
      "image",
      "description",
      "language",
      "generator",
      "lastBuildDate",
      "copyright",
      "managingEditor",
      "webMaster",
    ],
    item: ["content:encoded", "contentSnippet", "author", "comments"],
  },
})

async function seedRSSFeeds(feedsToSeed: RSSFeedInput[]): Promise<void> {
  console.log(`🌱 Starting RSS feed seeding for ${feedsToSeed.length} feeds...`)
  const overallStartTime = Date.now()

  for (let i = 0; i < feedsToSeed.length; i++) {
    const feedInput = feedsToSeed[i]
    if (feedsToSeed.length > 1) {
      console.log(`\n🔄 [${i + 1}/${feedsToSeed.length}] Processing feed: ${feedInput.url}`)
    }
    try {
      console.log(`\n📡 Fetching RSS feed: ${feedInput.url}`)

      // Fetch and parse the RSS feed
      const rssFeed = await parser.parseURL(feedInput.url)

      console.log(`📰 Found ${rssFeed.items.length} articles in feed: ${rssFeed.title}`)

      // Check if feed already exists
      const existingFeed = await db.select().from(feeds).where(eq(feeds.url, feedInput.url)).limit(1)

      let feedId: string

      if (existingFeed.length > 0) {
        console.log(`⚠️  Feed already exists, updating...`)
        feedId = existingFeed[0].id

        // Update the feed record
        await db
          .update(feeds)
          .set({
            title: feedInput.title || rssFeed.title || null,
            lastFetchedAt: new Date(),
            lastFetchError: null,
            updatedAt: new Date(),
          })
          .where(eq(feeds.id, feedId))
      } else {
        console.log(`✨ Creating new feed record...`)

        // Insert new feed record
        const newFeed = await db
          .insert(feeds)
          .values({
            kind: "rss",
            url: feedInput.url,
            title: feedInput.title || rssFeed.title || null,
            lastFetchedAt: new Date(),
            lastFetchError: null,
          })
          .returning({ id: feeds.id })

        feedId = newFeed[0].id
      }

      // Check if RSS feed metadata already exists
      const existingRSSFeed = await db.select().from(rssFeeds).where(eq(rssFeeds.feedId, feedId)).limit(1)

      if (existingRSSFeed.length === 0) {
        // Insert RSS feed metadata
        await db.insert(rssFeeds).values({
          feedId: feedId,
          siteUrl: rssFeed.link || null,
          description: rssFeed.description || null,
          imageUrl: rssFeed.image?.url || null,
          language: rssFeed.language || null,
          metadata: {
            generator: rssFeed.generator || null,
            lastBuildDate: rssFeed.lastBuildDate || null,
            copyright: rssFeed.copyright || null,
            managingEditor: rssFeed.managingEditor || null,
            webMaster: rssFeed.webMaster || null,
          },
        })
      } else {
        // Update existing RSS feed metadata
        await db
          .update(rssFeeds)
          .set({
            siteUrl: rssFeed.link || null,
            description: rssFeed.description || null,
            imageUrl: rssFeed.image?.url || null,
            language: rssFeed.language || null,
            metadata: {
              generator: rssFeed.generator || null,
              lastBuildDate: rssFeed.lastBuildDate || null,
              copyright: rssFeed.copyright || null,
              managingEditor: rssFeed.managingEditor || null,
              webMaster: rssFeed.webMaster || null,
            },
            updatedAt: new Date(),
          })
          .where(eq(rssFeeds.feedId, feedId))
      }

      // Process articles
      let newArticleCount = 0
      let updatedArticleCount = 0
      let processedArticleCount = 0

      console.log(`📝 Processing ${rssFeed.items.length} articles...`)
      const startTime = Date.now()

      for (const item of rssFeed.items) {
        if (!item.link) {
          console.log(`⚠️  Skipping article without link: ${item.title}`)
          continue
        }

        processedArticleCount++
        const articleStartTime = Date.now()

        // Log start of article processing
        const progress = ((processedArticleCount / rssFeed.items.length) * 100).toFixed(2)
        const articleTitle = item.title?.substring(0, 50) || "Untitled"
        const truncated = (item.title?.length || 0) > 50 ? "..." : ""
        console.log(
          `   📄 [${progress}%] Processing article ${processedArticleCount}/${rssFeed.items.length}: "${articleTitle}${truncated}"`,
        )

        // Check if article already exists
        const existingArticle = await db.select().from(rssArticles).where(eq(rssArticles.link, item.link)).limit(1)

        if (existingArticle.length > 0) {
          // Update existing article
          await db
            .update(rssArticles)
            .set({
              title: item.title || "Untitled",
              content: item.content || item["content:encoded"] || null,
              summary: item.contentSnippet || item.summary || null,
              pubDate: item.pubDate ? new Date(item.pubDate) : null,
              author: item.creator || item.author || null,
              metadata: {
                guid: item.guid,
                categories: item.categories,
                enclosure: item.enclosure,
                comments: item.comments,
              },
              updatedAt: new Date(),
            })
            .where(eq(rssArticles.id, existingArticle[0].id))

          updatedArticleCount++
          const articleTime = Date.now() - articleStartTime
          console.log(`     ✅ Updated in ${articleTime}ms`)
        } else {
          // Create new feed item first
          const newFeedItem = await db
            .insert(feedItems)
            .values({
              kind: "rss_article",
              feedSourceId: feedId,
            })
            .returning({ id: feedItems.id })

          const feedItemId = newFeedItem[0].id

          // Create new RSS article
          await db.insert(rssArticles).values({
            rssFeedId: feedId,
            feedItemId: feedItemId,
            title: item.title || "Untitled",
            link: item.link,
            content: item.content || item["content:encoded"] || null,
            summary: item.contentSnippet || item.summary || null,
            pubDate: item.pubDate ? new Date(item.pubDate) : null,
            author: item.creator || item.author || null,
            metadata: {
              guid: item.guid,
              categories: item.categories,
              enclosure: item.enclosure,
              comments: item.comments,
            },
          })

          newArticleCount++
          const articleTime = Date.now() - articleStartTime
          console.log(`     ✨ Created in ${articleTime}ms`)
        }
      }

      const processingTime = Math.round((Date.now() - startTime) / 1000)
      console.log(`✅ Processed feed "${rssFeed.title}" in ${processingTime}s:`)
      console.log(`   📝 ${newArticleCount} new articles`)
      console.log(`   🔄 ${updatedArticleCount} updated articles`)
      console.log(
        `   ⏱️  Average: ${processingTime > 0 ? Math.round((rssFeed.items.length / processingTime) * 100) / 100 : 0} articles/second`,
      )
    } catch (error) {
      console.error(`❌ Error processing feed ${feedInput.url}:`, error)

      // Try to update the feed with the error
      try {
        await db
          .update(feeds)
          .set({
            lastFetchError: error instanceof Error ? error.message : "Unknown error",
            lastFetchedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(feeds.url, feedInput.url))
      } catch (updateError) {
        console.error(`❌ Failed to update feed error status:`, updateError)
      }
    }
  }

  const overallElapsed = Math.round((Date.now() - overallStartTime) / 1000)
  console.log(`\n🎉 RSS feed seeding completed! Total time: ${overallElapsed}s`)
}

// Example usage function
async function main() {
  const exampleFeeds: RSSFeedInput[] = [
    {
      url: "https://blog.golang.org/feed.atom",
      title: "The Go Blog",
    },
    {
      url: "https://css-tricks.com/feed/",
      title: "CSS-Tricks",
    },
    {
      url: "https://linear.app/rss/blog.xml",
      title: "Linear Blog",
    },
    {
      url: "https://linear.app/rss/changelog.xml",
      title: "Linear Changelog",
    },
  ]

  // Get feeds from command line arguments or use examples
  const feedUrls = process.argv.slice(2)

  if (feedUrls.length > 0) {
    // Use provided URLs
    const feedsToProcess = feedUrls.map((url) => ({ url }))
    await seedRSSFeeds(feedsToProcess)
  } else {
    console.log("ℹ️  No feed URLs provided as arguments, using example feeds...")
    console.log("ℹ️  Usage: tsx scripts/seed-rss-feeds.ts <url1> <url2> ...")
    await seedRSSFeeds(exampleFeeds)
  }
}

// Export the main function for programmatic use
export { seedRSSFeeds }

// Run if called directly (ES module compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

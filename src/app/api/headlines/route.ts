import { NextResponse } from "next/server";

import type { HeadlineArticle } from "@/lib/headlines";

const FEEDS: readonly { url: string; source: string }[] = [
  { url: "https://feeds.bbci.co.uk/news/rss.xml", source: "BBC News" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World" },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    source: "The New York Times",
  },
];

function decodeXmlEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtml(value: string): string {
  return decodeXmlEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tagValue(block: string, tag: string): string {
  const cdata = block.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "i")
  );
  if (cdata?.[1]) return cdata[1].trim();
  const plain = block.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i")
  );
  return plain?.[1]?.trim() ?? "";
}

function parseRssItems(xml: string, source: string): HeadlineArticle[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  return items
    .map((match) => {
      const block = match[1] ?? "";
      const title = stripHtml(tagValue(block, "title"));
      const description = stripHtml(tagValue(block, "description"));
      const url = stripHtml(tagValue(block, "link")).split("?")[0] ?? "";
      const author =
        stripHtml(tagValue(block, "dc:creator")) ||
        stripHtml(tagValue(block, "author")) ||
        source;
      if (!title || !url) return null;
      return { title, description, url, author };
    })
    .filter((item): item is HeadlineArticle => item != null);
}

async function fetchFeed(
  feed: (typeof FEEDS)[number]
): Promise<HeadlineArticle[]> {
  try {
    const response = await fetch(feed.url, {
      next: { revalidate: 300 },
      headers: {
        "User-Agent": "jlwebsite-headlines-demo/1.0",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseRssItems(xml, feed.source).slice(0, 12);
  } catch {
    return [];
  }
}

export async function GET() {
  const batches = await Promise.all(FEEDS.map(fetchFeed));
  const seen = new Set<string>();
  const articles: HeadlineArticle[] = [];

  for (const batch of batches) {
    for (const article of batch) {
      const key = article.title.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      articles.push(article);
    }
  }

  if (articles.length === 0) {
    return NextResponse.json(
      { error: "Unable to load headlines right now.", articles: [] },
      { status: 502 }
    );
  }

  return NextResponse.json({
    articles: articles.slice(0, 24),
    fetchedAt: new Date().toISOString(),
  });
}

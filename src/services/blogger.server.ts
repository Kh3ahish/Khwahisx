/**
 * Server-side Blogger Service
 * Handles fetching from both Public Atom Feed and Blogger API v3.
 * Unified logic for environment variable reading and response normalization.
 */

const CACHE_DURATION = 120000; // 2 minutes cache
let cachedData: any = null;
let lastFetchTime = 0;

/**
 * Decodes HTML entities commonly found in Blogger XML/Atom and API outputs.
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/**
 * High-Definition Image URL Transformer:
 * Replaces resolution tokens (s72-c, s320, s1600, w1200-h800) with /s2560/ for maximum fidelity.
 * Avoids `-rw` flag which causes broken images / 404s on non-compatible Google/Blogger CDNs.
 */
export function optimizeBloggerUrl(url: string): string {
  if (!url) return "";
  try {
    let cleanUrl = url.trim().replace(/^["']|["']$/g, "");
    // Replace resolution tokens like /s72-c/, /s320/, /s1600/, /w1200-h800/ with /s2560/
    let hdUrl = cleanUrl.replace(/\/(s\d+(-[a-z0-9]+)?|w\d+-h\d+[a-z0-9\-]*)\//gi, "/s2560/");
    hdUrl = hdUrl.replace(/=(s\d+(-[a-z0-9]+)?|w\d+-h\d+[a-z0-9\-]*)/gi, "=s2560");
    return hdUrl;
  } catch {
    return url;
  }
}

/**
 * Comprehensive image extractor from Blogger post HTML or text content.
 * Extracts images from <img> tags, <a> links pointing to image assets, srcset, markdown, and raw URLs.
 */
export function extractAllImagesFromContent(content: string): string[] {
  if (!content) return [];
  const decoded = decodeHtmlEntities(content);
  const images: string[] = [];
  const seen = new Set<string>();

  const add = (rawUrl?: string) => {
    if (!rawUrl) return;
    const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");
    if (!cleanUrl || cleanUrl.startsWith("data:") || cleanUrl.length < 5) return;
    const opt = optimizeBloggerUrl(cleanUrl);
    if (opt && !seen.has(opt)) {
      seen.add(opt);
      images.push(opt);
    }
  };

  // 1. All <img> tags: src, data-original-src, data-src, data-url
  const imgTagRegex = /<img\b[^>]*>/gi;
  let match;
  while ((match = imgTagRegex.exec(decoded)) !== null) {
    const tag = match[0];
    const srcMatch = tag.match(/(?:src|data-original-src|data-src|data-url)=["']?([^"'\s>]+)["']?/i);
    if (srcMatch && srcMatch[1]) {
      add(srcMatch[1]);
    }
  }

  // 2. All <a> tags linking directly to images or Google photos/blogger storage:
  // e.g., <a href="https://blogger.googleusercontent.com/img/b/..." or ending in image extension
  const aTagRegex = /<a\b[^>]*href=["']?([^"'\s>]+)["']?[^>]*>/gi;
  while ((match = aTagRegex.exec(decoded)) !== null) {
    const href = match[1];
    if (
      href &&
      (
        /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(href) ||
        href.includes("blogger.googleusercontent.com/img/") ||
        href.includes("bp.blogspot.com/") ||
        href.includes("googleusercontent.com/")
      )
    ) {
      add(href);
    }
  }

  // 3. Markdown images: ![alt](url)
  const mdRegex = /!\[.*?\]\((https?:\/\/[^\s\)]+)\)/gi;
  while ((match = mdRegex.exec(decoded)) !== null) {
    if (match[1]) add(match[1]);
  }

  // 4. Raw image URLs appearing in text
  const rawUrlRegex = /https?:\/\/[^\s"'<>]+\.(?:png|jpe?g|webp)(\?[^\s"'<>]*)?/gi;
  while ((match = rawUrlRegex.exec(decoded)) !== null) {
    add(match[0]);
  }

  return images;
}

export interface BloggerConfig {
  blogId: string;
  apiKey?: string;
  projectId?: string;
  clientSecret?: string;
}

export async function fetchBloggerData(config: BloggerConfig) {
  const { blogId, apiKey } = config;

  if (!blogId) {
    throw new Error("BLOGGER_BLOG_ID is missing");
  }

  // Return cached data if within window
  if (cachedData && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  let items: any[] = [];
  let error: string | null = null;
  let diagnostics: any = {
    blogIdConfigured: true,
    apiKeyConfigured: Boolean(apiKey),
    strategy: "NONE"
  };

  // Strategy 1: Public Atom Feed (Blog ID only)
  try {
    const feedUrl = `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=50`;
    const feedRes = await fetch(feedUrl);

    if (feedRes.ok) {
      const feedData = await feedRes.json();
      const entries = feedData?.feed?.entry || [];

      items = entries.map((e: any) => {
        const rawId = e.id?.$t || "";
        const id = rawId.split(".post-")[1] || rawId;
        const rawTitle = e.title?.$t?.trim() || "";
        const content = e.content?.$t || e.summary?.$t || "";
        
        // Extract all images sequentially from content
        const extractedUrls = extractAllImagesFromContent(content);
        const images: Array<{ url: string }> = extractedUrls.map((url) => ({ url }));

        // Check media$thumbnail as fallback or primary
        if (e.media$thumbnail?.url) {
          const optThumb = optimizeBloggerUrl(e.media$thumbnail.url);
          if (!images.some((img) => img.url === optThumb)) {
            if (images.length === 0) {
              images.push({ url: optThumb });
            }
          }
        }

        // Check e.link for image enclosures
        if (Array.isArray(e.link)) {
          for (const link of e.link) {
            if (link.rel === "enclosure" && link.type?.startsWith("image/")) {
              const opt = optimizeBloggerUrl(link.href);
              if (!images.some((img) => img.url === opt)) {
                images.push({ url: opt });
              }
            }
          }
        }

        return {
          id,
          title: rawTitle,
          content,
          published: e.published?.$t || "",
          updated: e.updated?.$t || "",
          url: (e.link || []).find((l: any) => l.rel === "alternate")?.href || "",
          labels: (e.category || []).map((c: any) => c.term),
          images,
        };
      }).filter((item: any) => {
        const t = (item.title || "").toLowerCase();
        return item.title && !["hello", "test", "gh", "jh"].includes(t) && item.images.length > 0;
      });

      if (items.length > 0) {
        diagnostics.strategy = "PUBLIC_FEED";
        cachedData = { kind: "blogger#postList", items, diagnostics };
        lastFetchTime = Date.now();
        return cachedData;
      }
    }
  } catch (feedErr) {
    console.warn("[Blogger Service] Public feed failed:", feedErr);
  }

  // Strategy 2: Official Blogger API v3 (Uses API Key)
  if (apiKey) {
    try {
      const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=50`;
      const apiRes = await fetch(apiUrl);
      if (apiRes.ok) {
        const data = await apiRes.json();
        
        // Blogger API v3 natively only includes the first thumbnail in item.images.
        // We extract all images from post content for full case study showcase!
        const processedItems = (data.items || []).map((item: any) => {
          const content = item.content || "";
          const extractedUrls = extractAllImagesFromContent(content);
          const images: Array<{ url: string }> = extractedUrls.map((url) => ({ url }));

          // Include existing item.images if not already captured
          if (Array.isArray(item.images)) {
            for (const img of item.images) {
              if (img?.url) {
                const opt = optimizeBloggerUrl(img.url);
                if (!images.some((i) => i.url === opt)) {
                  if (images.length === 0) images.push({ url: opt });
                }
              }
            }
          }

          return {
            ...item,
            images,
          };
        }).filter((item: any) => {
          const t = (item.title || "").toLowerCase();
          return item.title && !["hello", "test", "gh", "jh"].includes(t) && item.images.length > 0;
        });

        diagnostics.strategy = "API_V3";
        cachedData = { ...data, items: processedItems, diagnostics };
        lastFetchTime = Date.now();
        return cachedData;
      } else {
        const apiError = await apiRes.json().catch(() => ({ error: { message: "Unknown API error" } }));
        error = apiError.error?.message || "Blogger API v3 failed";
        diagnostics.apiStatus = apiRes.status;
      }
    } catch (apiErr) {
      console.error("[Blogger Service] API v3 exception:", apiErr);
      error = "Exception during API v3 fetch";
    }
  }

  if (items.length === 0) {
    return {
      error: error || "Failed to fetch content from both feed and API",
      items: [],
      diagnostics: { ...diagnostics, feedFailed: true }
    };
  }

  return { items, diagnostics };
}

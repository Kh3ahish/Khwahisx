import { useState, useEffect } from "react"

export interface BloggerApiItem {
  id: string
  title: string
  content?: string
  url?: string
  published?: string
  updated?: string
  labels?: string[]
  images?: Array<{ url: string }>
  author?: {
    displayName?: string
    image?: { url: string }
  }
}

export interface BloggerApiResponse {
  kind?: string
  items?: BloggerApiItem[]
  error?: {
    code: number
    message: string
  }
}

export interface BloggerProject {
  id: string
  title: string
  image: string
  thumbnail: string
  images: string[]
  category: string
  platform: string
  tags: string[]
  published: string
  url: string
  prototypeLink?: string
  liveUrl?: string
  rank: number
  desc: string
  bio: string
  subtitle: string
  content?: string
  htmlContent?: string
  description?: string
  slug?: string
}

export interface BloggerCertificate {
  id: string
  title: string
  org: string
  issuer: string
  date: string
  year: string
  tags: string[]
  skills: string[]
  certificateLink?: string
  image: string
  published: string
  url: string
  content?: string
  timestamp: number
}

export interface BloggerRecommendation {
  id: string
  title: string
  name: string
  role: string
  desig: string
  company: string
  contact: string
  comment: string
  quote: string
  previewImage: string
  fullDocumentUrl: string
  type: "letter" | "linkedin"
  published: string
  url: string
}

/**
 * Decodes HTML entities commonly found in Blogger XML/Atom and API outputs.
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return ""
  return str
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

/**
 * High-Definition Image URL Transformer:
 * Replaces resolution tokens (s72-c, s320, s1600, w1200-h800) with /s2560/ for maximum fidelity.
 * Avoids `-rw` flag which causes broken images / 404s on non-compatible Google/Blogger CDNs.
 */
export function getHDImageUrl(url: string): string {
  if (!url) return ""
  try {
    const cleanUrl = url.trim().replace(/^["']|["']$/g, "")
    let hdUrl = cleanUrl.replace(/\/(s\d+(-[a-z0-9]+)?|w\d+-h\d+[a-z0-9\-]*)\//gi, "/s2560/")
    hdUrl = hdUrl.replace(/=(s\d+(-[a-z0-9]+)?|w\d+-h\d+[a-z0-9\-]*)/gi, "=s2560")
    return hdUrl
  } catch {
    return url
  }
}

/**
 * Backwards-compatible alias for getHDImageUrl
 */
export function optimizeBloggerImageUrl(url: string): string {
  return getHDImageUrl(url)
}

/**
 * Comprehensive image extractor from Blogger post HTML or text content.
 * Extracts images from <img> tags, <a> links pointing to image assets, srcset, markdown, and raw URLs.
 */
export function extractAllImagesFromContent(content: string): string[] {
  if (!content) return []
  const decoded = decodeHtmlEntities(content)
  const images: string[] = []
  const seen = new Set<string>()

  const add = (rawUrl?: string) => {
    if (!rawUrl) return
    const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "")
    if (!cleanUrl || cleanUrl.startsWith("data:") || cleanUrl.length < 5) return
    const opt = getHDImageUrl(cleanUrl)
    if (opt && !seen.has(opt)) {
      seen.add(opt)
      images.push(opt)
    }
  }

  // 1. All <img> tags: src, data-original-src, data-src, data-url
  const imgTagRegex = /<img\b[^>]*>/gi
  let match
  while ((match = imgTagRegex.exec(decoded)) !== null) {
    const tag = match[0]
    const srcMatch = tag.match(/(?:src|data-original-src|data-src|data-url)=["']?([^"'\s>]+)["']?/i)
    if (srcMatch && srcMatch[1]) {
      add(srcMatch[1])
    }
  }

  // 2. All <a> tags linking directly to images or Google photos/blogger storage:
  // e.g., <a href="https://blogger.googleusercontent.com/img/b/..." or ending in image extension
  const aTagRegex = /<a\b[^>]*href=["']?([^"'\s>]+)["']?[^>]*>/gi
  while ((match = aTagRegex.exec(decoded)) !== null) {
    const href = match[1]
    if (
      href &&
      (
        /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(href) ||
        href.includes("blogger.googleusercontent.com/img/") ||
        href.includes("bp.blogspot.com/") ||
        href.includes("googleusercontent.com/")
      )
    ) {
      add(href)
    }
  }

  // 3. Markdown images: ![alt](url)
  const mdRegex = /!\[.*?\]\((https?:\/\/[^\s\)]+)\)/gi
  while ((match = mdRegex.exec(decoded)) !== null) {
    if (match[1]) add(match[1])
  }

  // 4. Raw image URLs appearing in text
  const rawUrlRegex = /https?:\/\/[^\s"'<>]+\.(?:png|jpe?g|webp)(\?[^\s"'<>]*)?/gi
  while ((match = rawUrlRegex.exec(decoded)) !== null) {
    add(match[0])
  }

  return images
}

/**
 * Extracts the primary image for a Blogger post:
 * 1. From the explicit `images` array.
 * 2. Or parses first <img> tag src from post HTML content.
 */
export function extractMainImage(item: BloggerApiItem): string {
  if (item.images && item.images.length > 0 && item.images[0]?.url) {
    return getHDImageUrl(item.images[0].url)
  }

  if (item.content) {
    const fromContent = extractAllImagesFromContent(item.content)
    if (fromContent.length > 0) {
      return fromContent[0]
    }
  }

  return ""
}

/**
 * Extracts all project showcase images from a Blogger post in chronological/reading order.
 * Ensures crisp high-definition resolutions via getHDImageUrl and deduplicates identical images.
 */
export function extractAllImages(item: BloggerApiItem): string[] {
  const urls: string[] = []
  const seen = new Set<string>()

  const add = (rawUrl?: string) => {
    if (!rawUrl) return
    const hd = getHDImageUrl(rawUrl)
    if (hd && !seen.has(hd)) {
      seen.add(hd)
      urls.push(hd)
    }
  }

  // 1. From explicit item.images array
  if (item.images && Array.isArray(item.images)) {
    for (const img of item.images) {
      if (img?.url) {
        add(img.url)
      }
    }
  }

  // 2. From HTML content images in sequential DOM order
  if (item.content) {
    const fromContent = extractAllImagesFromContent(item.content)
    for (const imgUrl of fromContent) {
      add(imgUrl)
    }
  }

  // Fallback: If no images found yet, try extractMainImage
  if (urls.length === 0) {
    const main = extractMainImage(item)
    if (main) add(main)
  }

  return urls
}

/**
 * Helper to extract delimited markers from post content
 * e.g., :marker=value until next delimiter or a major HTML break.
 */
export function extractMarkerValue(content: string, marker: string): string | undefined {
  if (!content) return undefined
  
  // Clean up non-breaking spaces
  const clean = content.replace(/&nbsp;/gi, " ")
  
  // Look for :marker= then capture everything until the next :marker= or a significant HTML tag like <div>, 🚀, etc.
  // We use a non-greedy capture that respects boundaries.
  const regex = new RegExp(`:${marker}=\\s*([\\s\\S]*?)(?=\\s*:[a-z]+=|<div|<p|$)`, "i")
  const match = clean.match(regex)
  
  if (match && match[1]) {
    // Strip HTML from the value for simple text fields
    const val = match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    return val || undefined
  }
  return undefined
}

/**
 * Helper to extract link from delimiter or anchor tag
 */
export function extractDelimitedLink(content: string, marker: string): string | undefined {
  if (!content) return undefined
  const anchorRegex = new RegExp(`:${marker}=\\s*(?:<[^>]+>)*\\s*<a[^>]+href=["']([^"']+)["']`, "i")
  const anchorMatch = content.match(anchorRegex)
  if (anchorMatch && anchorMatch[1]) {
    return anchorMatch[1].trim()
  }

  const plainRegex = new RegExp(`:${marker}=\\s*(?:<[^>]+>)*\\s*([a-zA-Z0-9_\\-\\.:\\/\\?&=#%]+)`, "i")
  const plainMatch = content.match(plainRegex)
  if (plainMatch && plainMatch[1]) {
    return plainMatch[1].trim()
  }

  return undefined
}

/**
 * Detects platform category based on Blogger post labels & content:
 * e.g., Mobile Design, Enterprise SaaS, Web Platform, UX/UI Design.
 */
export function detectCategory(labels?: string[], content?: string): { category: string; platform: string } {
  const cleanLabels = (labels || []).filter((l) => !l.startsWith(":") && !l.startsWith("prototype:"))
  const combined = (cleanLabels.join(" ") + " " + (content ? content.slice(0, 500) : "")).toLowerCase()

  if (
    combined.includes("mobile") ||
    combined.includes("ios") ||
    combined.includes("android") ||
    combined.includes("phone") ||
    combined.includes("app")
  ) {
    const primary = cleanLabels.find((l) => /mobile|ios|android/i.test(l)) || "Mobile Design"
    return {
      category: primary,
      platform: "Mobile UI",
    }
  }

  if (
    combined.includes("enterprise") ||
    combined.includes("saas") ||
    combined.includes("crm") ||
    combined.includes("hrms") ||
    combined.includes("fintech")
  ) {
    return {
      category: "Enterprise SaaS",
      platform: "PC Web UI",
    }
  }

  if (
    combined.includes("web") ||
    combined.includes("portal") ||
    combined.includes("dashboard") ||
    combined.includes("desktop")
  ) {
    return {
      category: "Web Platform",
      platform: "PC Web UI",
    }
  }

  return {
    category: cleanLabels[0] || "UX/UI Design",
    platform: combined.includes("web") ? "PC Web UI" : "Mobile UI",
  }
}

/**
 * Extracts interactive prototype URLs (Figma, Vercel, live demos).
 */
export function extractPrototypeLink(labels?: string[], content?: string): string {
  if (content) {
    const markerLink = extractDelimitedLink(content, "prototype")
    if (markerLink) return markerLink

    const figmaMatch = content.match(/href=["'](https:\/\/(?:www\.)?figma\.com\/proto\/[^"']+)["']/i)
    if (figmaMatch && figmaMatch[1]) return figmaMatch[1]
  }

  if (labels) {
    for (const label of labels) {
      if (label.startsWith(":prototype=")) {
        return label.replace(":prototype=", "").trim()
      }
      if (label.startsWith("prototype:")) {
        return label.replace("prototype:", "").trim()
      }
    }
  }

  return ""
}

/**
 * Chronological Sorting Algorithm for Certificates.
 */
export function parseCertificateDate(dateStr?: string, fallbackIso?: string): number {
  if (!dateStr && !fallbackIso) return 0
  const clean = (dateStr || "").replace(/issued|completed|awarded|date|on|in/gi, "").replace(/[:.,]/g, " ").trim()
  const direct = Date.parse(clean)
  if (!isNaN(direct)) return direct
  const myMatch = clean.match(/^([a-zA-Z]+)\s+(\d{4})$/)
  if (myMatch) return Date.parse(`${myMatch[1]} 1, ${myMatch[2]}`)
  const yMatch = clean.match(/\b(19\d\d|20\d\d)\b/)
  if (yMatch) return new Date(parseInt(yMatch[1], 10), 0, 1).getTime()
  return fallbackIso ? Date.parse(fallbackIso) : 0
}

/**
 * Parses raw Blogger API post items into structured BloggerProject objects,
 * identifying projects by `:prototype=` or `:project`.
 */
export function parseBloggerPosts(items: BloggerApiItem[]): BloggerProject[] {
  if (!Array.isArray(items)) return []

  const projects: BloggerProject[] = []

  for (const item of items) {
    if (!item) continue

    const content = item.content || ""
    const title = item.title || ""
    const labels = item.labels || []
    
    // Explicitly exclude certificates and recommendations from projects
    const isCert = content.includes(":certificate") || content.includes(":org") || labels.includes("Certificate") || /certificate|diploma|achievement/i.test(title)
    const isRec = content.includes(":recommend") || labels.includes("Recommendation") || /recommendation/i.test(title)
    if (isCert || isRec) continue

    // If explicitly marked as blog post without project marker, skip
    const isExplicitBlog = (content.includes(":blog") || labels.includes("Blog")) && !content.includes(":project") && !content.includes(":prototype")
    if (isExplicitBlog) continue

    const allImages = extractAllImages(item)
    const image = allImages[0] || extractMainImage(item)
    if (!image) continue

    const { category, platform } = detectCategory(item.labels, content)
    const prototypeLink = extractPrototypeLink(item.labels, content)

    // Extract rank (default 999)
    const rankMatch = content.match(/:rank=\s*(\d+)/i)
    const rank = rankMatch ? parseInt(rankMatch[1], 10) : 999

    // Extract Bio/Description
    const bioMatch = content.match(/:bio=\s*([^:]+?)(?=(?:<p>\s*)?:(?:tag|rank|featured|prototype|project)|<div|$)/i)
    let bio = bioMatch ? bioMatch[1].replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim() : ""
    
    // Fallback: first 140 chars of stripped text
    if (!bio) {
      const stripped = content.replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim()
      bio = stripped.slice(0, 140) + (stripped.length > 140 ? "..." : "")
    }

    // Extract tags
    const tagMarker = extractMarkerValue(content, "tag")
    let tags: string[] = []
    if (tagMarker) {
      tags = tagMarker.split(/[,/]/).map((t) => t.trim()).filter(Boolean)
    } else if (item.labels && item.labels.length > 0) {
      tags = item.labels.filter((l) => !l.startsWith(":") && !l.startsWith("prototype:"))
    }
    if (tags.length === 0) {
      tags = ["UX Design", "Figma"]
    }

    projects.push({
      id: item.id || `blogger-${Math.random().toString(36).substring(2, 9)}`,
      title: item.title || "Untitled Project",
      image,
      thumbnail: image,
      images: allImages,
      category,
      platform,
      tags,
      published: item.published || new Date().toISOString(),
      url: item.url || "",
      prototypeLink: prototypeLink || undefined,
      liveUrl: prototypeLink || undefined,
      rank,
      desc: bio,
      bio,
      subtitle: bio,
      description: bio,
      content,
      htmlContent: content,
      slug: `/projects/${item.id}`,
    })
  }

  // Sort ascending by rank, then newest first
  projects.sort((a, b) => {
    if (a.rank !== b.rank) {
      return a.rank - b.rank
    }
    return new Date(b.published).getTime() - new Date(a.published).getTime()
  })

  return projects
}

/**
 * Parses raw Blogger API post items into structured BloggerCertificate objects,
 * identifying certificates by `:certificate=`, `:org=`, or title matching certificate/diploma/achievement.
 */
export function parseBloggerCertificates(items: BloggerApiItem[]): BloggerCertificate[] {
  if (!Array.isArray(items)) return []

  const certificates: BloggerCertificate[] = []

  for (const item of items) {
    if (!item) continue

    const content = item.content || ""
    const title = item.title || ""
    const isCert =
      content.includes(":certificate") ||
      content.includes(":org") ||
      /certificate|diploma|achievement/i.test(title)

    if (!isCert) continue

    const image = extractMainImage(item)
    const org = extractMarkerValue(content, "org") || "Verified Institution"
    
    // Extract year/date
    const rawDate = extractMarkerValue(content, "cerdate")
    const fallbackYear = item.published ? new Date(item.published).getFullYear().toString() : "2024"
    const date = rawDate || fallbackYear
    const year = date.match(/\b(19\d\d|20\d\d)\b/)?.[0] || fallbackYear
    const timestamp = parseCertificateDate(rawDate, item.published)

    // Extract tags
    const rawTags = extractMarkerValue(content, "certags")
    let tags: string[] = []
    if (rawTags) {
      tags = rawTags.split(/[,/]/).map((t) => t.trim()).filter(Boolean)
    } else if (item.labels && item.labels.length > 0) {
      tags = item.labels.filter((l) => !l.startsWith(":"))
    }
    if (tags.length === 0) {
      tags = ["UX Design", "Research"]
    }

    // Extract verification link
    let certificateLink = extractDelimitedLink(content, "certificatelink")
    if (!certificateLink) {
      const linkMatch = content.match(/https?:\/\/(?:www\.)?(?:coursera\.org|credential\.net|credly\.com)[^\s"<>]+/i)
      if (linkMatch) {
        certificateLink = linkMatch[0]
      }
    }

    certificates.push({
      id: item.id || `cert-${Math.random().toString(36).substring(2, 9)}`,
      title,
      org,
      issuer: org,
      date,
      year,
      tags,
      skills: tags,
      certificateLink,
      image,
      published: item.published || new Date().toISOString(),
      url: item.url || "",
      content,
      timestamp,
    })
  }

  // Sort chronologically (newest first)
  certificates.sort((a, b) => b.timestamp - a.timestamp)

  return certificates
}

/**
 * Parses raw Blogger API post items into structured BloggerRecommendation objects,
 * identifying recommendations by `:recommend` or title containing recommendation.
 */
export function parseBloggerRecommendations(items: BloggerApiItem[]): BloggerRecommendation[] {
  if (!Array.isArray(items)) return []

  const recommendations: BloggerRecommendation[] = []

  for (const item of items) {
    if (!item) continue

    const content = item.content || ""
    const title = item.title || ""
    const isRec = content.includes(":recommend") || /recommendation/i.test(title)
    if (!isRec) continue

    const image = extractMainImage(item)
    const name = extractMarkerValue(content, "name") || "Verified Colleague"
    const desig = extractMarkerValue(content, "desig") || "Senior UX Colleague"
    const company = extractMarkerValue(content, "company") || "Design Partner"
    const contact = extractMarkerValue(content, "contact") || ""

    // Extract comment / quote
    let comment = extractMarkerValue(content, "comment") || ""
    if (!comment) {
      const stripped = content.replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim()
      comment = stripped.slice(0, 240) + (stripped.length > 240 ? "..." : "")
    }

    recommendations.push({
      id: item.id || `rec-${Math.random().toString(36).substring(2, 9)}`,
      title,
      name,
      role: desig,
      desig,
      company,
      contact,
      comment,
      quote: comment,
      previewImage: image,
      fullDocumentUrl: image,
      type: "letter",
      published: item.published || new Date().toISOString(),
      url: item.url || "",
    })
  }

  return recommendations
}

// In-memory cache for raw items
let rawItemsCache: BloggerApiItem[] | null = null

/**
 * Fetches raw Blogger items from server proxy.
 */
export async function fetchBloggerRawItems(): Promise<BloggerApiItem[]> {
  if (rawItemsCache && rawItemsCache.length > 0) {
    return rawItemsCache
  }

  try {
    const res = await fetch("/api/blogger")
    if (res.ok) {
      const data: BloggerApiResponse = await res.json()
      if (data && Array.isArray(data.items)) {
        if (data.items.length > 0) {
          rawItemsCache = data.items
          return data.items
        } else {
          console.warn("[Blogger API] Server returned 0 items. Check Blog ID and post markers (:project).")
        }
      } else {
        console.error("[Blogger API] Server returned malformed data:", data)
      }
    } else {
      const errorText = await res.text()
      console.error(`[Blogger API] Server returned error ${res.status}: ${errorText}`)
      
      // Try to parse error JSON if available
      try {
        const errJson = JSON.parse(errorText)
        if (errJson.error) {
          throw new Error(errJson.error)
        }
      } catch (e) {
        // Not JSON or no error field
      }
      throw new Error(`Server error ${res.status}`)
    }
  } catch (err) {
    console.error("[Blogger API Proxy] Fetch failed:", err)
    throw err // Re-throw so hooks can capture the error
  }

  return []
}

/**
 * Fetches real projects from Blogger.
 */
export async function fetchBloggerProjects(): Promise<BloggerProject[]> {
  return [];
}

/**
 * Fetches real certificates from Blogger.
 */
export async function fetchBloggerCertificates(): Promise<BloggerCertificate[]> {
  const items = await fetchBloggerRawItems()
  return parseBloggerCertificates(items)
}

/**
 * Fetches real recommendations from Blogger.
 */
export async function fetchBloggerRecommendations(): Promise<BloggerRecommendation[]> {
  const items = await fetchBloggerRawItems()
  return parseBloggerRecommendations(items)
}

/**
 * React hook for consuming live Blogger projects.
 */
export function useBloggerProjects() {
  const [projects, setProjects] = useState<BloggerProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchBloggerProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load Blogger projects")
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  return { projects, loading, error }
}

/**
 * React hook for consuming live Blogger certificates.
 */
export function useBloggerCertificates() {
  const [certificates, setCertificates] = useState<BloggerCertificate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchBloggerCertificates()
      .then((data) => {
        if (isMounted) {
          setCertificates(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load Blogger certificates")
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  return { certificates, loading, error }
}

/**
 * React hook for consuming live Blogger recommendations.
 */
export function useBloggerRecommendations() {
  const [recommendations, setRecommendations] = useState<BloggerRecommendation[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchBloggerRecommendations()
      .then((data) => {
        if (isMounted) {
          setRecommendations(data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load Blogger recommendations")
          setLoading(false)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  return { recommendations, loading, error }
}

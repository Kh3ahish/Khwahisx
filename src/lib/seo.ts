/**
 * Lightweight, zero-dependency utility for managing document metadata,
 * OpenGraph, Twitter Cards, and canonical URLs on client-side route transitions.
 */

export interface MetaConfig {
  title: string
  description: string
  canonical: string
  ogType?: string
  image?: string
  keywords?: string
}

const DEFAULT_TITLE = "Khwahish Kushwah | Product Designer & UX Engineer — Berlin"
const DEFAULT_DESC =
  "Khwahish Kushwah is a Berlin-based Product Designer and UX Engineer bridging behavioral research, accessible design systems (WCAG 2.2 AA), and frontend engineering in React & TypeScript."
const DEFAULT_URL = "https://khwahix.com/"
const DEFAULT_IMAGE = "https://khwahix.com/kk-black-logo.png"

function setMetaAttribute(selector: string, attr: string, value: string, createTag = "meta") {
  if (typeof document === "undefined") return
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement(createTag)
    if (selector.includes('[name="')) {
      const name = selector.match(/\[name="([^"]+)"\]/)?.[1]
      if (name) el.setAttribute("name", name)
    } else if (selector.includes('[property="')) {
      const prop = selector.match(/\[property="([^"]+)"\]/)?.[1]
      if (prop) el.setAttribute("property", prop)
    } else if (selector.includes('[rel="')) {
      const rel = selector.match(/\[rel="([^"]+)"\]/)?.[1]
      if (rel) el.setAttribute("rel", rel)
    }
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function updateMetaTags(config: MetaConfig): () => void {
  if (typeof document === "undefined") return () => {}

  // 1. Page Title
  document.title = config.title

  // 2. Meta description & keywords
  setMetaAttribute('meta[name="description"]', "content", config.description)
  if (config.keywords) {
    setMetaAttribute('meta[name="keywords"]', "content", config.keywords)
  }

  // 3. Canonical Link
  setMetaAttribute('link[rel="canonical"]', "href", config.canonical, "link")

  // 4. OpenGraph tags
  setMetaAttribute('meta[property="og:title"]', "content", config.title)
  setMetaAttribute('meta[property="og:description"]', "content", config.description)
  setMetaAttribute('meta[property="og:url"]', "content", config.canonical)
  setMetaAttribute('meta[property="og:type"]', "content", config.ogType || "website")
  if (config.image) {
    setMetaAttribute('meta[property="og:image"]', "content", config.image)
  }

  // 5. Twitter / X Cards
  setMetaAttribute('meta[name="twitter:title"]', "content", config.title)
  setMetaAttribute('meta[name="twitter:description"]', "content", config.description)
  if (config.image) {
    setMetaAttribute('meta[name="twitter:image"]', "content", config.image)
  }

  // Return cleanup function to restore defaults on unmount
  return () => {
    document.title = DEFAULT_TITLE
    setMetaAttribute('meta[name="description"]', "content", DEFAULT_DESC)
    setMetaAttribute('link[rel="canonical"]', "href", DEFAULT_URL, "link")
    setMetaAttribute('meta[property="og:title"]', "content", DEFAULT_TITLE)
    setMetaAttribute('meta[property="og:description"]', "content", DEFAULT_DESC)
    setMetaAttribute('meta[property="og:url"]', "content", DEFAULT_URL)
    setMetaAttribute('meta[property="og:type"]', "content", "profile")
    setMetaAttribute('meta[property="og:image"]', "content", DEFAULT_IMAGE)
    setMetaAttribute('meta[name="twitter:title"]', "content", DEFAULT_TITLE)
    setMetaAttribute('meta[name="twitter:description"]', "content", DEFAULT_DESC)
    setMetaAttribute('meta[name="twitter:image"]', "content", DEFAULT_IMAGE)
  }
}

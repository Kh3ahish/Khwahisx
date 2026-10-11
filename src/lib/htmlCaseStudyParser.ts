/**
 * Smart HTML Case Study Parser
 * Extracts metadata, roles, problem/scope, categories, tags, images,
 * and thumbnails from arbitrary raw HTML case study code.
 */

export interface ParsedHtmlCaseStudy {
  title: string;
  slug: string;
  description: string;
  category: string;
  role: string;
  client: string;
  year: string;
  tags: string[];
  thumbnail: string;
  detectedImages: string[];
  htmlContent: string;
}

export function parseHtmlCaseStudy(rawHtml: string): ParsedHtmlCaseStudy {
  if (!rawHtml || typeof rawHtml !== 'string') {
    return {
      title: '',
      slug: '',
      description: '',
      category: 'Digital Product',
      role: 'Lead Designer',
      client: '',
      year: new Date().getFullYear().toString(),
      tags: [],
      thumbnail: '',
      detectedImages: [],
      htmlContent: ''
    };
  }

  // Use browser's native DOMParser for robust parsing
  let doc: Document;
  try {
    const parser = new DOMParser();
    doc = parser.parseFromString(rawHtml, 'text/html');
  } catch (err) {
    console.error('DOMParser error:', err);
    doc = document.implementation.createHTMLDocument('');
  }

  // 1. Title Extraction
  let title = '';
  const titleEl = doc.querySelector('title');
  if (titleEl && titleEl.textContent) {
    title = titleEl.textContent.trim();
    // Strip common suffixes: "· UX Case Study", " | Case Study", "- UX Portfolio", etc.
    title = title
      .replace(/\s*([·|\-—–:]|by)\s*(UX\s*)?(Case Study|Portfolio|Project|Concept).*$/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  if (!title) {
    const h1El = doc.querySelector('h1');
    if (h1El && h1El.textContent) {
      title = h1El.textContent.replace(/\s+/g, ' ').trim();
    }
  }
  if (!title) {
    const brandEl = doc.querySelector('.brand, .logo-text');
    if (brandEl && brandEl.textContent) {
      title = brandEl.textContent.replace(/\s+/g, ' ').trim();
    }
  }
  if (!title) title = 'Untitled Case Study';

  // 2. Slug Generation
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // 3. Description Extraction
  let description = '';
  const metaDesc = doc.querySelector('meta[name="description"], meta[content][name="description"]');
  if (metaDesc) {
    description = metaDesc.getAttribute('content') || '';
  }
  if (!description) {
    const heroCopy = doc.querySelector('.hero-copy, .description, .summary, .intro, p');
    if (heroCopy && heroCopy.textContent) {
      description = heroCopy.textContent.replace(/\s+/g, ' ').trim();
    }
  }

  // 4. Role Extraction
  let role = '';
  const metaCards = doc.querySelectorAll('.meta-card, .meta-item, .meta, [class*="meta"]');
  metaCards.forEach(card => {
    const label = card.querySelector('small, span, .label, h4, b')?.textContent?.toLowerCase() || '';
    if (label.includes('role') || label.includes('responsibility')) {
      const val = card.querySelector('strong, p, .val, .value, div')?.textContent?.replace(/\s+/g, ' ').trim();
      if (val && !role) role = val;
    }
  });
  if (!role) {
    const roleRegex = /<small[^>]*>\s*Role\s*<\/small>\s*<strong[^>]*>([\s\S]*?)<\/strong>/i;
    const match = rawHtml.match(roleRegex);
    if (match) {
      role = match[1]
        .replace(/<br\s*\/?>/gi, ' · ')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
  }
  if (!role) role = 'UX / UI Designer';

  // 5. Client / Scope Extraction
  let client = '';
  metaCards.forEach(card => {
    const label = card.querySelector('small, span, .label, h4, b')?.textContent?.toLowerCase() || '';
    if (label.includes('scope') || label.includes('client') || label.includes('company') || label.includes('context')) {
      const val = card.querySelector('strong, p, .val, .value, div')?.textContent?.replace(/\s+/g, ' ').trim();
      if (val && !client) client = val;
    }
  });
  if (!client) {
    if (rawHtml.toLowerCase().includes('independent concept')) {
      client = 'Independent Concept';
    } else if (rawHtml.toLowerCase().includes('concept')) {
      client = 'Concept';
    }
  }

  // 6. Year Extraction
  let year = new Date().getFullYear().toString();
  // Look for 4 digit year 2018-2029
  const yearMatches = rawHtml.match(/\b(202[0-9]|201[8-9])\b/g);
  if (yearMatches && yearMatches.length > 0) {
    // Pick the most recent sensible year found
    year = yearMatches[yearMatches.length - 1];
  }

  // 7. Category Detection
  let category = 'Digital Product';
  const kicker = doc.querySelector('.kicker, .tagline, .subtitle, .badge, .concept-badge');
  const contextText = `${kicker?.textContent || ''} ${title} ${description}`.toLowerCase();

  if (
    contextText.includes('identity') || 
    contextText.includes('brand') || 
    contextText.includes('logo') || 
    contextText.includes('mark')
  ) {
    category = 'Brand Identity';
  } else if (contextText.includes('fintech') || contextText.includes('bank') || contextText.includes('crm') || contextText.includes('crypto')) {
    category = 'Fintech';
  } else if (contextText.includes('mobile') || contextText.includes('app') || contextText.includes('ios') || contextText.includes('android')) {
    category = 'Mobile App';
  } else if (contextText.includes('research') || contextText.includes('usability') || contextText.includes('cognitive')) {
    category = 'UX Research';
  } else if (contextText.includes('web') || contextText.includes('website') || contextText.includes('platform') || contextText.includes('saas')) {
    category = 'Web Design';
  }

  // 8. Tags Synthesis
  const tagsSet = new Set<string>();
  const lowerHtml = rawHtml.toLowerCase();

  if (lowerHtml.includes('brand') || lowerHtml.includes('logo') || lowerHtml.includes('identity')) {
    tagsSet.add('Branding');
    tagsSet.add('Identity');
    tagsSet.add('Logo Design');
  }
  if (lowerHtml.includes('ux') || lowerHtml.includes('user experience')) {
    tagsSet.add('UX Design');
  }
  if (lowerHtml.includes('ui') || lowerHtml.includes('interface')) {
    tagsSet.add('UI Design');
  }
  if (lowerHtml.includes('research')) {
    tagsSet.add('UX Research');
  }
  if (lowerHtml.includes('system') || lowerHtml.includes('palette') || lowerHtml.includes('spec')) {
    tagsSet.add('Design System');
  }
  if (lowerHtml.includes('mobile') || lowerHtml.includes('app')) {
    tagsSet.add('Mobile App');
  }
  if (lowerHtml.includes('web') || lowerHtml.includes('responsive')) {
    tagsSet.add('Responsive Web');
  }
  if (lowerHtml.includes('prototype') || lowerHtml.includes('figma')) {
    tagsSet.add('Prototyping');
  }
  if (tagsSet.size === 0) {
    tagsSet.add('Case Study');
    tagsSet.add('Product Design');
  }

  // 9. Detected Images & Thumbnail Selection
  const detectedImages: string[] = [];
  const imgEls = doc.querySelectorAll('img[src]');
  imgEls.forEach(img => {
    const src = img.getAttribute('src');
    if (src && !detectedImages.includes(src) && !src.startsWith('data:image/svg+xml;base64,PHN2Zy')) {
      detectedImages.push(src);
    }
  });

  // Candidate thumbnail:
  // 1. Look for .hero-mark img, .hero img, .concept-badge + img, .cover img
  let thumbnail = '';
  const heroImg = doc.querySelector('.hero-mark img, .hero img, .cover img, .featured img, header + main img');
  if (heroImg && heroImg.getAttribute('src')) {
    thumbnail = heroImg.getAttribute('src') || '';
  } else if (detectedImages.length > 0) {
    thumbnail = detectedImages[0];
  }

  return {
    title,
    slug,
    description,
    category,
    role,
    client,
    year,
    tags: Array.from(tagsSet),
    thumbnail,
    detectedImages,
    htmlContent: rawHtml
  };
}

import type { MetaDescriptor, RouteLinkEntry } from '@tanstack/react-router'

type SeoInput = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  locale?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  noIndex?: boolean
  jsonLd?: Record<string, unknown>
}

export const SITE_NAME = 'Eduardo Quive'
export const SITE_DESCRIPTION =
  'Jornalista e escritor moçambicano. Ensaios, crónicas e livros que exploram memória, identidade e cultura.'
export const SITE_LOCALE = 'pt_PT'
export const DEFAULT_OG_IMAGE = '/hero_image.webp'

function getSiteUrl(): string {
  const envUrl = import.meta.env.VITE_SITE_URL
  if (typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.replace(/\/+$/, '')
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return 'https://eduardoquive.net'
}

export function toAbsoluteUrl(path?: string): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  const base = getSiteUrl()
  if (!base) return path

  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function formatTitle(title?: string): string {
  if (!title) return SITE_NAME
  if (title.toLowerCase() === SITE_NAME.toLowerCase()) return SITE_NAME
  return `${title} — ${SITE_NAME}`
}

export function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncate(text: string, maxLength = 160): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}…`
}

export function buildSeo({
  title,
  description,
  image,
  url,
  type = 'website',
  locale = SITE_LOCALE,
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  noIndex = false,
  jsonLd,
}: SeoInput) {
  const resolvedTitle = formatTitle(title)
  const resolvedDescription = description || SITE_DESCRIPTION
  const canonicalUrl = url ? toAbsoluteUrl(url) : ''
  const resolvedImage = toAbsoluteUrl(image || DEFAULT_OG_IMAGE)

  const meta: MetaDescriptor[] = [
    { title: resolvedTitle },
    { name: 'description', content: resolvedDescription },
    { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' },
    { name: 'author', content: author || SITE_NAME },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: resolvedTitle },
    { property: 'og:description', content: resolvedDescription },
    { property: 'og:type', content: type },
    { property: 'og:locale', content: locale },
    ...(canonicalUrl ? [{ property: 'og:url', content: canonicalUrl }] : []),
    ...(resolvedImage ? [{ property: 'og:image', content: resolvedImage }] : []),
    { name: 'twitter:card', content: resolvedImage ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: resolvedTitle },
    { name: 'twitter:description', content: resolvedDescription },
    ...(resolvedImage ? [{ name: 'twitter:image', content: resolvedImage }] : []),
  ]

  if (type === 'article') {
    if (publishedTime) meta.push({ property: 'article:published_time', content: publishedTime })
    if (modifiedTime) meta.push({ property: 'article:modified_time', content: modifiedTime })
    if (author) meta.push({ property: 'article:author', content: author })
    tags.forEach((tag) => meta.push({ property: 'article:tag', content: tag }))
  }

  if (jsonLd) {
    meta.push({ 'script:ld+json': jsonLd })
  }

  const links: RouteLinkEntry[] = canonicalUrl ? [{ rel: 'canonical', href: canonicalUrl }] : []

  return { meta, links }
}

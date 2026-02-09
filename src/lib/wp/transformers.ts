import type { WPPost, WPMedia, WPUser } from './types'
import type { WPArticle, WPBook, WPEvent, WPPress, WPBiography } from './types'

function stripHtml(html: string): string {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function calculateReadTime(content: string): string {
  const text = stripHtml(content)
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min leitura`
}

function getImageUrl(post: WPPost, size: 'medium' | 'large' | 'full' = 'large'): string {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url
  }
  return ''
}

function getFirstImageFromHtml(html: string): string {
  if (!html) return ''
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const img = doc.querySelector('img')
    return img?.getAttribute('src') || ''
  }

  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1] || ''
}

function getAuthorName(post: WPPost): string {
  if (post._embedded?.author?.[0]?.name) {
    return post._embedded.author[0].name
  }
  return 'Eduardo Quive'
}

function getCategoryName(post: WPPost): string {
  if (post._embedded?.['wp:term']?.[0]?.[0]?.name) {
    return post._embedded['wp:term'][0][0].name
  }
  return 'Artigo'
}

const BOOK_IMAGE_ACF_KEYS = [
  'image',
  'imagem',
  'capa',
  'cover',
  'book_cover',
  'book_image',
  'imagem_capa',
  'cover_image',
]

function getAcfString(acf: Record<string, any>, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = acf[key]
    if (typeof value === 'string' && value.trim()) return value
  }
  return fallback
}

function normalizeBuyingInfo(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim()
        if (item && typeof item === 'object') {
          const record = item as Record<string, unknown>
          const candidates = [
            record.link_label,
            record.label,
            record.text,
            record.name,
            record.local,
            record.value,
          ]
          for (const candidate of candidates) {
            if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
          }
        }
        return ''
      })
      .filter((item): item is string => item.length > 0)
  }

  if (typeof value === 'string' && value.trim()) return [value.trim()]
  return []
}

function resolveAcfImageValue(
  value: unknown,
  wpPost: WPPost,
  mediaById?: Record<number, string>
): string {
  if (!value) return ''

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return ''
    if (/^\d+$/.test(trimmed)) {
      const id = Number.parseInt(trimmed, 10)
      return mediaById?.[id] || (id === wpPost.featured_media ? getImageUrl(wpPost, 'full') : '')
    }
    return trimmed
  }

  if (typeof value === 'number') {
    if (value <= 0) return ''
    return mediaById?.[value] || (value === wpPost.featured_media ? getImageUrl(wpPost, 'full') : '')
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const resolved = resolveAcfImageValue(entry, wpPost, mediaById)
      if (resolved) return resolved
    }
    return ''
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    const urlCandidates = [
      record.url,
      record.source_url,
      (record.sizes as Record<string, unknown> | undefined)?.large,
      (record.sizes as Record<string, unknown> | undefined)?.full,
      (record.sizes as Record<string, unknown> | undefined)?.medium,
    ]

    for (const candidate of urlCandidates) {
      if (typeof candidate === 'string' && candidate.trim()) return candidate.trim()
    }

    const candidateId = record.id ?? record.ID
    if (typeof candidateId === 'number' && candidateId > 0) {
      return mediaById?.[candidateId] || (candidateId === wpPost.featured_media ? getImageUrl(wpPost, 'full') : '')
    }
    if (typeof candidateId === 'string' && /^\d+$/.test(candidateId)) {
      const parsed = Number.parseInt(candidateId, 10)
      return mediaById?.[parsed] || (parsed === wpPost.featured_media ? getImageUrl(wpPost, 'full') : '')
    }
  }

  return ''
}

function getAcfImageUrl(
  acf: Record<string, any>,
  wpPost: WPPost,
  mediaById?: Record<number, string>
): string {
  for (const key of BOOK_IMAGE_ACF_KEYS) {
    const resolved = resolveAcfImageValue(acf[key], wpPost, mediaById)
    if (resolved) return resolved
  }
  return ''
}

export function transformArticle(wpPost: WPPost, mediaById?: Record<number, string>): WPArticle {
  const imageFromMedia = mediaById?.[wpPost.featured_media] || getImageUrl(wpPost, 'large')
  const image = imageFromMedia || getFirstImageFromHtml(wpPost.content?.rendered || '')

  return {
    id: wpPost.id,
    title: stripHtml(wpPost.title.rendered),
    slug: wpPost.slug,
    image,
    author: getAuthorName(wpPost),
    date: formatDate(wpPost.date),
    readTime: calculateReadTime(wpPost.content.rendered),
    category: getCategoryName(wpPost),
    content: wpPost.content.rendered
  }
}

export function transformArticles(wpPosts: WPPost[], mediaById?: Record<number, string>): WPArticle[] {
  return wpPosts.map((post) => transformArticle(post, mediaById))
}

export function transformBook(wpPost: WPPost, mediaById?: Record<number, string>): WPBook {
  const acf = wpPost.acf || {}
  const title = stripHtml(wpPost.title.rendered)
  const excerptFallback = stripHtml(wpPost.excerpt.rendered)
  const acfImage = getAcfImageUrl(acf, wpPost, mediaById)
  const featuredImage = mediaById?.[wpPost.featured_media] || getImageUrl(wpPost, 'full')
  const image = acfImage || featuredImage

  return {
    id: wpPost.id,
    title,
    fullTitle: getAcfString(acf, ['full_title', 'titulo_completo'], title),
    slug: wpPost.slug,
    image,
    year: getAcfString(acf, ['year', 'ano']),
    author: getAcfString(acf, ['author', 'autor'], 'Eduardo Quive'),
    genre: getAcfString(acf, ['genre', 'genero'], 'Literatura'),
    publisher: getAcfString(acf, ['publisher', 'editora']),
    description: getAcfString(acf, ['description', 'descricao'], excerptFallback),
    availability: getAcfString(acf, ['availability', 'disponibilidade']),
    buyingInfo: normalizeBuyingInfo(acf.buying_info ?? acf.informacoes_de_compra ?? acf.informacoes_compra)
  }
}

export function transformBooks(wpPosts: WPPost[], mediaById?: Record<number, string>): WPBook[] {
  return wpPosts.map((post) => transformBook(post, mediaById))
}

export function transformEvent(wpPost: WPPost): WPEvent {
  const acf = wpPost.acf || {}

  const eventDate = new Date(acf.date || wpPost.date)
  const now = new Date()
  const isPast = eventDate < now

  return {
    id: wpPost.id,
    title: stripHtml(wpPost.title.rendered),
    slug: wpPost.slug,
    location: acf.location || '',
    date: acf.date || wpPost.date,
    description: acf.description || stripHtml(wpPost.excerpt.rendered),
    type: isPast ? 'past' : 'upcoming'
  }
}

export function transformEvents(wpPosts: WPPost[]): WPEvent[] {
  return wpPosts.map(transformEvent)
}

export function transformPress(wpPost: WPPost): WPPress {
  const acf = wpPost.acf || {}

  return {
    id: wpPost.id,
    title: stripHtml(wpPost.title.rendered),
    slug: wpPost.slug,
    publication: acf.publication || 'Imprensa',
    date: formatDate(wpPost.date),
    excerpt: stripHtml(wpPost.excerpt.rendered),
    url: acf.url || '#'
  }
}

export function transformPressItems(wpPosts: WPPost[]): WPPress[] {
  return wpPosts.map(transformPress)
}

export function transformBiography(wpPost: WPPost): WPBiography {
  const acf = wpPost.acf || {}

  return {
    id: wpPost.id,
    title: stripHtml(wpPost.title.rendered),
    slug: wpPost.slug,
    careerSection: acf.career_section || '',
    publicationsSection: acf.publications_section || '',
    residenciesSection: acf.residencies_section || '',
    videos: acf.videos || []
  }
}

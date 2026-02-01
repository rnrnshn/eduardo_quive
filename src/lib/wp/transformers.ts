import type { WPPost, WPMedia, WPUser } from './types'
import type { WPArticle, WPBook, WPEvent, WPPress, WPBiography } from './types'

function stripHtml(html: string): string {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
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

export function transformArticle(wpPost: WPPost): WPArticle {
  return {
    id: wpPost.id,
    title: stripHtml(wpPost.title.rendered),
    slug: wpPost.slug,
    image: getImageUrl(wpPost, 'large'),
    author: getAuthorName(wpPost),
    date: formatDate(wpPost.date),
    readTime: calculateReadTime(wpPost.content.rendered),
    category: getCategoryName(wpPost),
    content: wpPost.content.rendered
  }
}

export function transformArticles(wpPosts: WPPost[]): WPArticle[] {
  return wpPosts.map(transformArticle)
}

export function transformBook(wpPost: WPPost): WPBook {
  const acf = wpPost.acf || {}

  return {
    id: wpPost.id,
    title: stripHtml(wpPost.title.rendered),
    fullTitle: acf.full_title || stripHtml(wpPost.title.rendered),
    slug: wpPost.slug,
    image: getImageUrl(wpPost, 'full'),
    year: acf.year || '',
    author: acf.author || 'Eduardo Quive',
    genre: acf.genre || 'Literatura',
    publisher: acf.publisher || '',
    description: acf.description || stripHtml(wpPost.excerpt.rendered),
    availability: acf.availability || '',
    buyingInfo: acf.buying_info || []
  }
}

export function transformBooks(wpPosts: WPPost[]): WPBook[] {
  return wpPosts.map(transformBook)
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

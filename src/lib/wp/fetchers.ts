import { wpFetch, wpFetchWithHeaders } from './client'
import { ENDPOINTS } from './endpoints'
import { transformArticle, transformArticles, transformBooks, transformEvents, transformPressItems, transformBiography } from './transformers'
import type { WPArticle, WPBook, WPEvent, WPPress, WPBiography, WPPost, WPMedia } from './types'
type WordPressErrorLike = {
  name?: string
  code?: string
  statusCode?: number
}

const FAIL_SOFT = import.meta.env.DEV || import.meta.env.VITE_WP_FAIL_SOFT === 'true'

function isWordPressErrorLike(error: unknown): error is WordPressErrorLike {
  return typeof error === 'object' && error !== null && ('code' in error || 'statusCode' in error || 'name' in error)
}

function isMissingRoute(error: WordPressErrorLike): boolean {
  return error.statusCode === 404 || error.code === 'rest_no_route'
}

function isNetworkError(error: WordPressErrorLike): boolean {
  return error.code === 'network_error'
}

function shouldFallback(error: WordPressErrorLike): boolean {
  return isMissingRoute(error) || (FAIL_SOFT && isNetworkError(error))
}

function getEmbeddedMediaUrl(post: WPPost): string | null {
  const url = (post as any)?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  return typeof url === 'string' && url.length > 0 ? url : null
}

const invalidMediaIds = new Set<number>()

async function resolveFeaturedMedia(posts: WPPost[]): Promise<Record<number, string>> {
  const ids = posts
    .map((post) => post.featured_media)
    .filter((id) => typeof id === 'number' && id > 0)
    .filter((id) => !invalidMediaIds.has(id))
    .filter((id, index, list) => list.indexOf(id) === index)
    .filter((id) => !posts.some((post) => post.featured_media === id && getEmbeddedMediaUrl(post)))

  if (ids.length === 0) return {}

  const entries = await Promise.all(ids.map(async (id) => {
    try {
      const media = await wpFetch<WPMedia>(ENDPOINTS.media.byId(id))
      return [id, media.source_url || ''] as const
    } catch (error) {
      if (isWordPressErrorLike(error) && (error.code === 'rest_post_invalid_id' || error.statusCode === 404)) {
        invalidMediaIds.add(id)
        return [id, ''] as const
      }
      console.error('Error fetching media:', error)
      return [id, ''] as const
    }
  }))

  return entries.reduce<Record<number, string>>((acc, [id, url]) => {
    if (url) acc[id] = url
    return acc
  }, {})
}

export async function fetchArticles(params?: Record<string, string | number>): Promise<WPArticle[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.posts.list(params))
    const mediaById = await resolveFeaturedMedia(wpPosts)
    return transformArticles(wpPosts, mediaById)
  } catch (error) {
    console.error('Error fetching articles:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return []
    throw error
  }
}

export async function fetchArticlesWithPagination(params?: Record<string, string | number>): Promise<{ articles: WPArticle[]; total: number; totalPages: number }> {
  try {
    const { data, headers } = await wpFetchWithHeaders<WPPost[]>(ENDPOINTS.posts.list(params))
    const mediaById = await resolveFeaturedMedia(data)
    const total = Number(headers.get('X-WP-Total') || 0)
    const totalPages = Number(headers.get('X-WP-TotalPages') || 1)
    return { articles: transformArticles(data, mediaById), total, totalPages }
  } catch (error) {
    console.error('Error fetching articles:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return { articles: [], total: 0, totalPages: 1 }
    throw error
  }
}

export async function fetchArticle(idOrSlug: number | string): Promise<WPArticle | null> {
  try {
    const endpoint = typeof idOrSlug === 'number'
      ? ENDPOINTS.posts.byId(idOrSlug)
      : ENDPOINTS.posts.bySlug(idOrSlug)

    const wpPosts: WPPost[] = await wpFetch(endpoint)
    const postsArray = Array.isArray(wpPosts) ? wpPosts : [wpPosts as WPPost]
    const mediaById = await resolveFeaturedMedia(postsArray)

    if (Array.isArray(wpPosts)) {
      return wpPosts.length > 0 ? transformArticle(wpPosts[0], mediaById) : null
    }

    return transformArticle(wpPosts as WPPost, mediaById)
  } catch (error) {
    console.error('Error fetching article:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return null
    throw error
  }
}

export async function fetchBooks(params?: Record<string, string | number>): Promise<WPBook[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.books.list(params))
    const mediaById = await resolveFeaturedMedia(wpPosts)
    return transformBooks(wpPosts, mediaById)
  } catch (error) {
    console.error('Error fetching books:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return []
    throw error
  }
}

export async function fetchBook(idOrSlug: number | string): Promise<WPBook | null> {
  try {
    const endpoint = typeof idOrSlug === 'number'
      ? ENDPOINTS.books.byId(idOrSlug)
      : ENDPOINTS.books.bySlug(idOrSlug)

    const wpPosts: WPPost[] = await wpFetch(endpoint)
    const postsArray = Array.isArray(wpPosts) ? wpPosts : [wpPosts as WPPost]
    const mediaById = await resolveFeaturedMedia(postsArray)

    if (Array.isArray(wpPosts)) {
      return wpPosts.length > 0 ? transformBooks(wpPosts, mediaById)[0] : null
    }

    return transformBooks([wpPosts as WPPost], mediaById)[0]
  } catch (error) {
    console.error('Error fetching book:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return null
    throw error
  }
}

export async function fetchEvents(params?: Record<string, string | number>): Promise<WPEvent[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.events.list(params))
    const events = transformEvents(wpPosts)

    const upcoming = events
      .filter(e => e.type === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const past = events
      .filter(e => e.type === 'past')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return [...upcoming, ...past]
  } catch (error) {
    console.error('Error fetching events:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return []
    throw error
  }
}

export async function fetchEvent(idOrSlug: number | string): Promise<WPEvent | null> {
  try {
    const endpoint = typeof idOrSlug === 'number'
      ? ENDPOINTS.events.byId(idOrSlug)
      : ENDPOINTS.events.bySlug(idOrSlug)

    const wpPosts: WPPost[] = await wpFetch(endpoint)

    if (Array.isArray(wpPosts)) {
      return wpPosts.length > 0 ? transformEvents(wpPosts)[0] : null
    }

    return transformEvents([wpPosts as WPPost])[0]
  } catch (error) {
    console.error('Error fetching event:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return null
    throw error
  }
}

export async function fetchPress(params?: Record<string, string | number>): Promise<WPPress[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.press.list(params))
    return transformPressItems(wpPosts)
  } catch (error) {
    console.error('Error fetching press items:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return []
    throw error
  }
}

export async function fetchPressItem(idOrSlug: number | string): Promise<WPPress | null> {
  try {
    const endpoint = typeof idOrSlug === 'number'
      ? ENDPOINTS.press.byId(idOrSlug)
      : ENDPOINTS.press.bySlug(idOrSlug)

    const wpPosts: WPPost[] = await wpFetch(endpoint)

    if (Array.isArray(wpPosts)) {
      return wpPosts.length > 0 ? transformPressItems(wpPosts)[0] : null
    }

    return transformPressItems([wpPosts as WPPost])[0]
  } catch (error) {
    console.error('Error fetching press item:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return null
    throw error
  }
}

export async function fetchBiography(): Promise<WPBiography | null> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.pages.bySlug('biografia'))

    if (Array.isArray(wpPosts) && wpPosts.length > 0) {
      return transformBiography(wpPosts[0])
    }

    return null
  } catch (error) {
    console.error('Error fetching biography:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return null
    throw error
  }
}

export async function fetchPage(slug: string): Promise<WPPost | null> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.pages.bySlug(slug))

    if (Array.isArray(wpPosts) && wpPosts.length > 0) {
      return wpPosts[0]
    }

    return null
  } catch (error) {
    console.error('Error fetching page:', error)
    if (isWordPressErrorLike(error) && shouldFallback(error)) return null
    throw error
  }
}

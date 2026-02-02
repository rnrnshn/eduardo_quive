import { wpFetch, wpFetchWithHeaders } from './client'
import { ENDPOINTS } from './endpoints'
import { transformArticle, transformArticles, transformBooks, transformEvents, transformPressItems, transformBiography } from './transformers'
import type { WPArticle, WPBook, WPEvent, WPPress, WPBiography, WPPost } from './types'
import type { WordPressError } from './client'

export async function fetchArticles(params?: Record<string, string | number>): Promise<WPArticle[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.posts.list(params))
    return transformArticles(wpPosts)
  } catch (error) {
    console.error('Error fetching articles:', error)
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return []
      }
    }
    throw error
  }
}

export async function fetchArticlesWithPagination(params?: Record<string, string | number>): Promise<{ articles: WPArticle[]; total: number; totalPages: number }> {
  try {
    const { data, headers } = await wpFetchWithHeaders<WPPost[]>(ENDPOINTS.posts.list(params))
    const total = Number(headers.get('X-WP-Total') || 0)
    const totalPages = Number(headers.get('X-WP-TotalPages') || 1)
    return { articles: transformArticles(data), total, totalPages }
  } catch (error) {
    console.error('Error fetching articles:', error)
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return { articles: [], total: 0, totalPages: 1 }
      }
    }
    throw error
  }
}

export async function fetchArticle(idOrSlug: number | string): Promise<WPArticle | null> {
  try {
    const endpoint = typeof idOrSlug === 'number'
      ? ENDPOINTS.posts.byId(idOrSlug)
      : ENDPOINTS.posts.bySlug(idOrSlug)

    const wpPosts: WPPost[] = await wpFetch(endpoint)

    if (Array.isArray(wpPosts)) {
      return wpPosts.length > 0 ? transformArticle(wpPosts[0]) : null
    }

    return transformArticle(wpPosts as WPPost)
  } catch (error) {
    console.error('Error fetching article:', error)
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return null
      }
    }
    throw error
  }
}

export async function fetchBooks(params?: Record<string, string | number>): Promise<WPBook[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.books.list(params))
    return transformBooks(wpPosts)
  } catch (error) {
    console.error('Error fetching books:', error)
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return []
      }
    }
    throw error
  }
}

export async function fetchBook(idOrSlug: number | string): Promise<WPBook | null> {
  try {
    const endpoint = typeof idOrSlug === 'number'
      ? ENDPOINTS.books.byId(idOrSlug)
      : ENDPOINTS.books.bySlug(idOrSlug)

    const wpPosts: WPPost[] = await wpFetch(endpoint)

    if (Array.isArray(wpPosts)) {
      return wpPosts.length > 0 ? transformBooks(wpPosts)[0] : null
    }

    return transformBooks([wpPosts as WPPost])[0]
  } catch (error) {
    console.error('Error fetching book:', error)
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return null
      }
    }
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
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return []
      }
    }
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
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return null
      }
    }
    throw error
  }
}

export async function fetchPress(params?: Record<string, string | number>): Promise<WPPress[]> {
  try {
    const wpPosts: WPPost[] = await wpFetch(ENDPOINTS.press.list(params))
    return transformPressItems(wpPosts)
  } catch (error) {
    console.error('Error fetching press items:', error)
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return []
      }
    }
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
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return null
      }
    }
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
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return null
      }
    }
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
    if (error instanceof Error && error.name === 'WordPressError') {
      const wpError = error as WordPressError
      if (wpError.statusCode === 404) {
        return null
      }
    }
    throw error
  }
}

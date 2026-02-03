import type { WPApiError } from './types'
import { WordPressError } from './errors'
import { getWpApiUrl, getWpAuthHeader } from './config'
import { wpServerFetch, wpServerFetchWithHeaders } from './serverFns'

const WP_API_URL = getWpApiUrl()

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

type CachedResponse<T> = {
  expiresAt: number
  data: T
}

type CachedResponseWithHeaders<T> = {
  expiresAt: number
  data: T
  headers: Record<string, string>
}

const DEFAULT_CACHE_TTL_MS = Number.parseInt(import.meta.env.VITE_WP_CACHE_TTL_MS || '', 10) || 60_000
const responseCache = new Map<string, CachedResponse<unknown>>()
const responseWithHeadersCache = new Map<string, CachedResponseWithHeaders<unknown>>()
const inFlight = new Map<string, Promise<unknown>>()
const inFlightWithHeaders = new Map<string, Promise<{ data: unknown; headers: Headers }>>()

function getCacheKey(url: string, authHeader: string | null): string {
  return authHeader ? `${url}::${authHeader}` : url
}

function getCachedResponse<T>(key: string): T | null {
  const cached = responseCache.get(key)
  if (!cached) return null
  if (cached.expiresAt < Date.now()) {
    responseCache.delete(key)
    return null
  }
  return cached.data as T
}

function getCachedResponseWithHeaders<T>(key: string): { data: T; headers: Headers } | null {
  const cached = responseWithHeadersCache.get(key)
  if (!cached) return null
  if (cached.expiresAt < Date.now()) {
    responseWithHeadersCache.delete(key)
    return null
  }
  return { data: cached.data as T, headers: new Headers(cached.headers) }
}

export async function wpFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`
  const authHeader = getWpAuthHeader()
  const method = options.method || 'GET'
  const cacheKey = getCacheKey(url, authHeader)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authHeader ? { Authorization: authHeader } : {}),
    ...options.headers,
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (options.body && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(options.body)
  }

  try {
    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      const cached = getCachedResponse<T>(cacheKey)
      if (cached) return cached

      const existing = inFlight.get(cacheKey)
      if (existing) return await (existing as Promise<T>)
    }

    if (method === 'GET' && typeof window !== 'undefined') {
      const data = await wpServerFetch({ data: { endpoint } })
      if (DEFAULT_CACHE_TTL_MS > 0) {
        responseCache.set(cacheKey, { data, expiresAt: Date.now() + DEFAULT_CACHE_TTL_MS })
      }
      return data as T
    }

    const requestPromise = fetch(url, config)
      .then(async (response) => {
        if (!response.ok) {
          let errorData: WPApiError | null = null

          try {
            errorData = await response.json()
          } catch {
            throw new WordPressError(
              `WordPress API error: ${response.statusText}`,
              'unknown',
              response.status
            )
          }

          throw new WordPressError(
            errorData?.message || 'Unknown WordPress API error',
            errorData?.code || 'unknown',
            response.status
          )
        }

        return await response.json()
      })

    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      inFlight.set(cacheKey, requestPromise)
    }

    const data = await requestPromise

    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      responseCache.set(cacheKey, { data, expiresAt: Date.now() + DEFAULT_CACHE_TTL_MS })
      inFlight.delete(cacheKey)
    }

    return data
  } catch (error) {
    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      inFlight.delete(cacheKey)
    }

    if (error instanceof WordPressError) {
      throw error
    }

    throw new WordPressError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'network_error',
      0
    )
  }
}

export async function wpFetchWithHeaders<T>(endpoint: string, options: FetchOptions = {}): Promise<{ data: T; headers: Headers }> {
  const url = `${WP_API_URL}${endpoint}`
  const authHeader = getWpAuthHeader()
  const method = options.method || 'GET'
  const cacheKey = getCacheKey(url, authHeader)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authHeader ? { Authorization: authHeader } : {}),
    ...options.headers,
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (options.body && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(options.body)
  }

  try {
    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      const cached = getCachedResponseWithHeaders<T>(cacheKey)
      if (cached) return cached

      const existing = inFlightWithHeaders.get(cacheKey)
      if (existing) return await (existing as Promise<{ data: T; headers: Headers }>)
    }

    if (method === 'GET' && typeof window !== 'undefined') {
      const result = await wpServerFetchWithHeaders({ data: { endpoint } })
      const headers = new Headers(result.headers || {})
      if (DEFAULT_CACHE_TTL_MS > 0) {
        responseWithHeadersCache.set(cacheKey, {
          data: result.data,
          headers: Object.fromEntries(headers.entries()),
          expiresAt: Date.now() + DEFAULT_CACHE_TTL_MS,
        })
      }
      return { data: result.data as T, headers }
    }

    const requestPromise = fetch(url, config)
      .then(async (response) => {
        if (!response.ok) {
          let errorData: WPApiError | null = null

          try {
            errorData = await response.json()
          } catch {
            throw new WordPressError(
              `WordPress API error: ${response.statusText}`,
              'unknown',
              response.status
            )
          }

          throw new WordPressError(
            errorData?.message || 'Unknown WordPress API error',
            errorData?.code || 'unknown',
            response.status
          )
        }

        const data = await response.json()
        return { data, headers: response.headers }
      })

    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      inFlightWithHeaders.set(cacheKey, requestPromise)
    }

    const { data, headers: responseHeaders } = await requestPromise

    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      responseWithHeadersCache.set(cacheKey, {
        data,
        headers: Object.fromEntries(responseHeaders.entries()),
        expiresAt: Date.now() + DEFAULT_CACHE_TTL_MS,
      })
      inFlightWithHeaders.delete(cacheKey)
    }

    return { data, headers: responseHeaders }
  } catch (error) {
    if (method === 'GET' && DEFAULT_CACHE_TTL_MS > 0) {
      inFlightWithHeaders.delete(cacheKey)
    }

    if (error instanceof WordPressError) {
      throw error
    }

    throw new WordPressError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      'network_error',
      0
    )
  }
}

export function getWPAvatarUrl(userId: number, size: 96 = 96): string {
  return `${WP_API_URL}/users/${userId}/avatar?size=${size}`
}

export function getWPImageUrl(mediaId: number, size: 'medium' | 'large' | 'full' = 'large'): string {
  return `${WP_API_URL}/media/${mediaId}?context=embed&_fields=source_url,media_details`
}

import type { WPApiError } from './types'

const WP_API_URL = import.meta.env.VITE_WP_API_URL || 'https://your-wordpress.com/wp-json/wp/v2'
const WP_SITE_URL = import.meta.env.VITE_WP_SITE_URL || 'https://your-wordpress.com'

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

export class WordPressError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message)
    this.name = 'WordPressError'
  }
}

export async function wpFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
  }

  if (options.body && (options.method === 'POST' || options.method === 'PUT')) {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, config)

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
  } catch (error) {
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

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
  }

  if (options.body && (options.method === 'POST' || options.method === 'PUT')) {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, config)

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
  } catch (error) {
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

export function getWPSiteUrl(): string {
  return WP_SITE_URL
}

export function getWPAvatarUrl(userId: number, size: 96 = 96): string {
  return `${WP_API_URL}/users/${userId}/avatar?size=${size}`
}

export function getWPImageUrl(mediaId: number, size: 'medium' | 'large' | 'full' = 'large'): string {
  return `${WP_API_URL}/media/${mediaId}?context=embed&_fields=source_url,media_details`
}

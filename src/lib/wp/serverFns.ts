import { createServerFn } from '@tanstack/react-start'
import type { WPApiError } from './types'
import { WordPressError } from './errors'
import { getWpApiUrl, getWpAuthHeader } from './config'

type ProxyInput = {
  endpoint: string
}

type ProxyResponse<T> = {
  data: T
  headers: Record<string, string>
}

function buildUrl(endpoint: string): string {
  return `${getWpApiUrl()}${endpoint}`
}

function buildHeaders(): HeadersInit {
  const authHeader = getWpAuthHeader()
  return {
    'Content-Type': 'application/json',
    ...(authHeader ? { Authorization: authHeader } : {}),
  }
}

export const wpServerFetch = createServerFn({ method: 'GET' })
  .inputValidator((input: ProxyInput) => input)
  .handler(async ({ data }) => {
    const response = await fetch(buildUrl(data.endpoint), {
      method: 'GET',
      headers: buildHeaders(),
    })

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

export const wpServerFetchWithHeaders = createServerFn({ method: 'GET' })
  .inputValidator((input: ProxyInput) => input)
  .handler(async ({ data }) => {
    const response = await fetch(buildUrl(data.endpoint), {
      method: 'GET',
      headers: buildHeaders(),
    })

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

    const responseHeaders = Object.fromEntries(response.headers.entries())
    const dataJson = await response.json()

    return {
      data: dataJson,
      headers: responseHeaders,
    } satisfies ProxyResponse<unknown>
  })

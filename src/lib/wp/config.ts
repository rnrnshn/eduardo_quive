function normalizeWpApiUrl(value: string): string {
  const trimmed = value.replace(/\/+$/, '')
  if (trimmed.includes('/wp-json/')) {
    return trimmed
  }

  return `${trimmed}/wp-json/wp/v2`
}

export function getWpApiUrl(): string {
  const rawUrl = import.meta.env.VITE_WP_URL || import.meta.env.VITE_WP_API_URL || 'https://your-wordpress.com'
  return normalizeWpApiUrl(rawUrl)
}

export function getWpAuthHeader(): string | null {
  const user = import.meta.env.VITE_WP_USER || import.meta.env.VITE_WP_AUTH_USER || ''
  const appPassword = import.meta.env.VITE_WP_APP_PASSWORD || import.meta.env.VITE_WP_AUTH_APP_PASSWORD || ''

  if (!user || !appPassword) {
    return null
  }

  const sanitizedPassword = appPassword.replace(/\s+/g, '')
  const token = typeof btoa === 'function'
    ? btoa(`${user}:${sanitizedPassword}`)
    : Buffer.from(`${user}:${sanitizedPassword}`, 'utf-8').toString('base64')

  return `Basic ${token}`
}

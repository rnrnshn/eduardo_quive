const NAMED_HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  quot: '"',
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeHtmlEntitiesOnce(value: string): string {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = value
    return textarea.value
  }

  return value
    .replace(/&#(\d+);/g, (match, decimal) => {
      const codePoint = Number.parseInt(decimal, 10)
      if (!Number.isFinite(codePoint)) return match
      try {
        return String.fromCodePoint(codePoint)
      } catch {
        return match
      }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hexadecimal) => {
      const codePoint = Number.parseInt(hexadecimal, 16)
      if (!Number.isFinite(codePoint)) return match
      try {
        return String.fromCodePoint(codePoint)
      } catch {
        return match
      }
    })
    .replace(/&([a-zA-Z][a-zA-Z0-9]+);/g, (match, name) => {
      return NAMED_HTML_ENTITIES[name] ?? match
    })
}

export function decodeHtmlEntities(value: string): string {
  if (!value) return ''

  let decoded = value
  for (let i = 0; i < 2; i += 1) {
    const next = decodeHtmlEntitiesOnce(decoded)
    if (next === decoded) break
    decoded = next
  }

  return decoded
}

export function stripHtml(html: string): string {
  if (!html) return ''

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return normalizeWhitespace(tmp.textContent || tmp.innerText || '')
  }

  const withoutTags = html.replace(/<[^>]*>/g, ' ')
  return normalizeWhitespace(decodeHtmlEntities(withoutTags))
}

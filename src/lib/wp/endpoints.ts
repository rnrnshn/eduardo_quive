export const ENDPOINTS = {
  posts: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:term,wp:featuredmedia,author',
        per_page: String(params?.per_page || 10),
        page: String(params?.page || 1),
        ...params
      })
      return `/posts?${searchParams}`
    },
    byId: (id: number) => `/posts/${id}?_embed=wp:term,wp:featuredmedia,author`,
    bySlug: (slug: string) => `/posts?slug=${slug}&_embed=wp:term,wp:featuredmedia,author`,
  },
  books: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 100),
        order: 'asc',
        ...params
      })
      return `/livro?${searchParams}`
    },
    byId: (id: number) => `/livro/${id}?_embed=wp:featuredmedia`,
    bySlug: (slug: string) => `/livro?slug=${slug}&_embed=wp:featuredmedia`,
  },
  events: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 100),
        ...params
      })
      return `/evento?${searchParams}`
    },
    byId: (id: number) => `/evento/${id}?_embed=wp:featuredmedia`,
    bySlug: (slug: string) => `/evento?slug=${slug}&_embed=wp:featuredmedia`,
    upcoming: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 50),
        event_type: 'upcoming',
        ...params
      })
      return `/evento?${searchParams}`
    },
    past: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 100),
        event_type: 'past',
        ...params
      })
      return `/evento?${searchParams}`
    },
  },
  press: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        per_page: String(params?.per_page || 100),
        order: 'desc',
        orderby: 'date',
        ...params
      })
      return `/imprensa?${searchParams}`
    },
    byId: (id: number) => `/imprensa/${id}`,
    bySlug: (slug: string) => `/imprensa?slug=${slug}`,
  },
  pages: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 100),
        ...params
      })
      return `/pages?${searchParams}`
    },
    byId: (id: number) => `/pages/${id}?_embed=wp:featuredmedia`,
    bySlug: (slug: string) => `/pages?slug=${slug}&_embed=wp:featuredmedia`,
  },
  media: {
    byId: (id: number) => `/media/${id}?context=embed&_fields=source_url,media_details`,
  },
  categories: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        per_page: String(params?.per_page || 100),
        ...params
      })
      return `/categories?${searchParams}`
    },
  },
  tags: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        per_page: String(params?.per_page || 100),
        ...params
      })
      return `/tags?${searchParams}`
    },
  },
}

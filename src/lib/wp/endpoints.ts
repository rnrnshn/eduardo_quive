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
        orderby: 'year',
        ...params
      })
      return `/books?${searchParams}`
    },
    byId: (id: number) => `/books/${id}?_embed=wp:featuredmedia`,
    bySlug: (slug: string) => `/books?slug=${slug}&_embed=wp:featuredmedia`,
  },
  events: {
    list: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 100),
        ...params
      })
      return `/events?${searchParams}`
    },
    byId: (id: number) => `/events/${id}?_embed=wp:featuredmedia`,
    bySlug: (slug: string) => `/events?slug=${slug}&_embed=wp:featuredmedia`,
    upcoming: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 50),
        event_type: 'upcoming',
        ...params
      })
      return `/events?${searchParams}`
    },
    past: (params?: Record<string, string | number>) => {
      const searchParams = new URLSearchParams({
        _embed: 'wp:featuredmedia',
        per_page: String(params?.per_page || 100),
        event_type: 'past',
        ...params
      })
      return `/events?${searchParams}`
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
      return `/press?${searchParams}`
    },
    byId: (id: number) => `/press/${id}`,
    bySlug: (slug: string) => `/press?slug=${slug}`,
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

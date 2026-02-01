export interface WPPost {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: Record<string, any>
  categories: number[]
  tags: number[]
  acf?: Record<string, any>
  _links: any
}

export interface WPMedia {
  id: number
  date: string
  link: string
  slug: string
  title: {
    rendered: string
  }
  author: number
  comment_status: string
  ping_status: string
  alt_text: string
  caption: {
    rendered: string
  }
  alt_text?: string
  media_type: string
  mime_type: string
  media_details: {
    width: number
    height: number
    file: string
    sizes: {
      medium?: {
        file: string
        width: number
        height: number
        mime_type: string
        source_url: string
      }
      large?: {
        file: string
        width: number
        height: number
        mime_type: string
        source_url: string
      }
      full?: {
        file: string
        width: number
        height: number
        mime_type: string
        source_url: string
      }
    }
  }
  source_url: string
  _links: any
}

export interface WPTerm {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
  meta: any[]
  _links: any
}

export interface WPUser {
  id: number
  name: string
  url: string
  description: string
  link: string
  slug: string
  avatar_urls: {
    '24': string
    '48': string
    '96': string
  }
  meta: any[]
  _links: any
}

export interface WPArticle {
  id: number
  title: string
  slug: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  content: string
}

export interface WPBook {
  id: number
  title: string
  fullTitle?: string
  slug: string
  image: string
  year: string
  author?: string
  genre: string
  publisher?: string
  description: string
  availability?: string
  buyingInfo?: string[]
}

export interface WPEvent {
  id: number
  title: string
  slug: string
  location: string
  date: string
  description: string
  type: 'upcoming' | 'past'
}

export interface WPPress {
  id: number
  title: string
  slug: string
  publication: string
  date: string
  excerpt: string
  url: string
}

export interface WPBiography {
  id: number
  title: string
  slug: string
  careerSection: string
  publicationsSection: string
  residenciesSection: string
  videos: {
    youtube_id: string
    title: string
  }[]
}

export interface WPApiError {
  code: string
  message: string
  data: {
    status: number
  }
}

export interface WPApiResponse<T> {
  data?: T
  error?: WPApiError
}

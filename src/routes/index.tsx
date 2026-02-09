import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/home/Hero'
import LiteratureReveal from '@/components/home/LiteratureReveal'
import BooksGrid from '@/components/home/BooksGrid'
import BlogGrid from '@/components/home/BlogGrid'
import EventsTimeline from '@/components/home/EventsTimeline'
import PressList from '@/components/home/PressList'
import { fetchArticles, fetchBooks, fetchEvents, fetchPress } from '@/lib/wp/fetchers'
import { buildSeo, SITE_DESCRIPTION, SITE_NAME, toAbsoluteUrl } from '@/lib/seo'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [articles, books, events, press] = await Promise.all([
      fetchArticles({ per_page: 6 }),
      fetchBooks(),
      fetchEvents(),
      fetchPress(),
    ])

    return { articles, books, events, press, biography: null }
  },
  head: ({ location }) => {
    const pathname = location?.pathname || '/'
    const seo = buildSeo({
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: pathname,
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: toAbsoluteUrl('/'),
          },
          {
            '@type': 'Person',
            name: SITE_NAME,
            jobTitle: 'Jornalista e escritor',
            url: toAbsoluteUrl(pathname),
          },
        ],
      },
    })

    return {
      meta: seo.meta,
    }
  },
  component: App,
})

function App() {
  return (
    <>
      <Hero />
      <LiteratureReveal />
      <BlogGrid />
      <BooksGrid />
      <EventsTimeline />
      <PressList />
    </>
  )
}

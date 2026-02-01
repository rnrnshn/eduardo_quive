import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/home/Hero'
import LiteratureReveal from '@/components/home/LiteratureReveal'
import BooksGrid from '@/components/home/BooksGrid'
import BlogGrid from '@/components/home/BlogGrid'
import EventsTimeline from '@/components/home/EventsTimeline'
import PressList from '@/components/home/PressList'
import { fetchArticles, fetchBooks, fetchEvents, fetchPress, fetchBiography } from '@/lib/wp/fetchers'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [articles, books, events, press, biography] = await Promise.all([
      fetchArticles({ per_page: 6 }),
      fetchBooks(),
      fetchEvents(),
      fetchPress(),
      fetchBiography(),
    ])

    return { articles, books, events, press, biography }
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



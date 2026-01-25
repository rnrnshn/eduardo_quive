import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/home/Hero'
import LiteratureReveal from '@/components/home/LiteratureReveal'
import BooksGrid from '@/components/home/BooksGrid'
import BlogGrid from '@/components/home/BlogGrid'
import EventsTimeline from '@/components/home/EventsTimeline'
import PressList from '@/components/home/PressList'

export const Route = createFileRoute('/')({ component: App })

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



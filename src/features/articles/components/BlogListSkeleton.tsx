export default function BlogListSkeleton() {
  return (
    <main className="bg-off-white min-h-screen">
      <section className="w-full py-32 px-6" data-theme="light">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-40 bg-gray-200 mb-8 animate-pulse" />
          <div className="h-16 md:h-20 lg:h-24 w-2/3 bg-gray-200 mb-6 animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse" />
        </div>
      </section>

      <section className="py-16 px-6" data-theme="light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="animate-pulse">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-200" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-24 bg-gray-200" />
                    <div className="w-8 h-px bg-gray-200" />
                    <div className="h-3 w-16 bg-gray-200" />
                  </div>
                  <div className="h-6 w-5/6 bg-gray-200" />
                  <div className="h-4 w-24 bg-gray-200" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

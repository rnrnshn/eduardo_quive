export default function BlogPostSkeleton() {
  return (
    <main className="bg-off-white min-h-screen">
      <section className="relative h-[75vh] w-full overflow-hidden" data-theme="dark">
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-24">
          <div className="max-w-5xl space-y-6">
            <div className="h-4 w-48 bg-gray-700" />
            <div className="h-12 md:h-16 w-5/6 bg-gray-700" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6" data-theme="light">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="space-y-3">
              <div className="h-3 w-20 bg-gray-200" />
              <div className="h-5 w-40 bg-gray-200" />
            </div>
            <div className="space-y-3 text-right">
              <div className="h-3 w-16 bg-gray-200" />
              <div className="h-5 w-32 bg-gray-200" />
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-5 w-full bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

import { useLocation } from '@tanstack/react-router'
import { toAbsoluteUrl } from '@/lib/seo'

export default function CanonicalLink() {
  const location = useLocation()
  const pathname = location?.pathname || '/'
  const href = toAbsoluteUrl(pathname)

  return <link rel="canonical" href={href} />
}

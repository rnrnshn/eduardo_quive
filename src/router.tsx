import { createRouter } from '@tanstack/react-router'
import RoutePending from './components/RoutePending'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadDelay: 50,
    defaultPreloadIntentProximity: 50,
    defaultStaleTime: 30_000,
    defaultGcTime: 5 * 60_000,
    defaultPreloadStaleTime: 60_000,
    defaultPreloadGcTime: 10 * 60_000,
    defaultPendingMs: 200,
    defaultPendingMinMs: 300,
    defaultPendingComponent: RoutePending,
  })

  return router
}

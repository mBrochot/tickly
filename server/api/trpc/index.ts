import { router } from '@/server/api/trpc'
import { ticklyRouter } from './routers/tickly'

export const appRouter = router({
  tickly: ticklyRouter,
  // autres routers…
})

export type AppRouter = typeof appRouter

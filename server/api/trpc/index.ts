import { t } from './trpc'
import { ticklyRouter } from './routers/tickly'

export const appRouter = t.router({
  tickly: ticklyRouter,
})

export type AppRouter = typeof appRouter


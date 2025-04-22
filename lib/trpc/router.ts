import { ticklyRouter } from '@/server/api/trpc/routers/tickly' 
import { initTRPC } from '@trpc/server'
import { Context } from './context'
import { z } from 'zod'

const t = initTRPC.context<Context>().create()

export const appRouter = t.router({

  tickly: ticklyRouter, 

  publicHello: t.procedure.query(() => {
    return 'Hello 👋 (publique)'
  }),

  protectedHello: t.procedure.query(({ ctx }) => {
    if (!ctx.user) throw new Error('UNAUTHORIZED')
    return `Bienvenue ${ctx.user.email}`
  }),

  echo: t.procedure
    .input(z.object({ message: z.string() }))
    .query(({ input }) => `Tu as dit : ${input.message}`),
})

export type AppRouter = typeof appRouter

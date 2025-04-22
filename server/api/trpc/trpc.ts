// import { initTRPC } from '@trpc/server'
// import { createContext } from './context'

// const t = initTRPC.context<typeof createContext>().create()

// export const router = t.router
// export const procedure = t.procedure
// export const middleware = t.middleware
// export const publicProcedure = t.procedure
// export const protectedProcedure = t.procedure.use((opts) => { 
//   if (!opts.ctx.user) throw new Error('Unauthorized')
//   return opts.next({ ctx: { user: opts.ctx.user } })
// })
import { initTRPC } from '@trpc/server'
import { createContext } from './context'

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new Error('Unauthorized')
  return next({ ctx: { user: ctx.user } })
})
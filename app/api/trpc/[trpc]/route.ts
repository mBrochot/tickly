import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { serverTRPC } from '@/lib/trpc/server'

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: serverTRPC.router,
    createContext: serverTRPC.createContext,
  })
}

export { handler as GET, handler as POST }

import { getUserSession } from '@/lib/auth'

// tRPC context type
export type Context = {
  user: Awaited<ReturnType<typeof getUserSession>>
}

// create context function
export async function createContext(): Promise<Context> {
 const user = await getUserSession()
  return { user }
}

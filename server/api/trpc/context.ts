import { getUserSession } from '@/lib/auth'

// Type du contexte tRPC
export type Context = {
  user: Awaited<ReturnType<typeof getUserSession>>
}

// Fonction de création du contexte (appelée à chaque requête tRPC)
export async function createContext(): Promise<Context> {
 const user = await getUserSession()
  return { user }
}

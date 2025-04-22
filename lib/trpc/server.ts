import { appRouter } from './router'
import { createContext } from './context'

export const serverTRPC = {
  router: appRouter,
  createContext,
}

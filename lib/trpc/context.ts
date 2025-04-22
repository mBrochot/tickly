import { adminAuth } from '@/lib/firebase-admin'
import { cookies } from 'next/headers'

export async function createContext() {
  const token = (await cookies()).get('token')?.value
  let user = null
  console.log('Token du cookie :', token)
  if (token) {
    try {
      user = await adminAuth.verifyIdToken(token)
    } catch (e) {
      console.error('[Firebase Admin] Erreur lors de la vérification du token', e)
      user = null
    }
  }

  return { user }
}

export type Context = Awaited<ReturnType<typeof createContext>>

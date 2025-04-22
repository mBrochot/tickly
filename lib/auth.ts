import { cookies as getCookies  } from 'next/headers'
import { adminAuth } from './firebase-admin'

export async function getUserSession() {
  
  const cookieStore = getCookies()
  const token = (await cookieStore).get('token')?.value
  console.log('Token reçu :', token)
  if (!token) return null

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    console.log('Utilisateur vérifié ✅', decoded)
    return decoded // contient email, uid, etc.
  } catch (err) {
    if (err instanceof Error) {
    console.error('Erreur Firebase Admin:', err.message)
  }
    return null
  }
}
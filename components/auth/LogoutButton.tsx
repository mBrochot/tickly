'use client';

import type { ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const LogoutButton = (): ReactNode => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);

    // Supprime le cookie (en le remplaçant par un vide et une expiration immédiate)
    document.cookie = 'token=; path=/; Max-Age=0';

    router.push('/login');
  };

  return (
    <Button
      variant='destructive'
      onClick={handleLogout}
      className='cursor-pointer w-40'
    >
      Déconnexion
    </Button>
  );
};

export default LogoutButton;

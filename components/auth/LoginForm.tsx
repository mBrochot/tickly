'use client';

import { type ReactNode, useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginForm = (): ReactNode => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      // Stocke le token dans un cookie
      document.cookie = `token=${token}; path=/`;

      router.push('/dashboard');
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <Input
        placeholder='Adresse email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete='off'
      />
      <Input
        placeholder='Mot de passe'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete='new-password'
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <Button type='submit' className='w-full'>
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;

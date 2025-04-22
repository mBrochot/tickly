'use client';

import { type ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignUpForm = (): ReactNode => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();

      document.cookie = `token=${token}; path=/`;

      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
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
      />
      <Input
        placeholder='Mot de passe'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <Button type='submit' className='w-full'>
        Créer un compte
      </Button>
    </form>
  );
};

export default SignUpForm;

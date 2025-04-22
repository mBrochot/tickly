import type { ReactNode } from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = (): ReactNode => {
  console.log('app/login/page.tsx');
  return (
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Connexion</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

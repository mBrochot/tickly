import type { ReactNode } from 'react';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUpPage = (): ReactNode => {
  return (
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Créer un compte</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;

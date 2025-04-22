'use client';

import type { ReactNode } from 'react';
import LogoutButton from '@/components/auth/LogoutButton';
import NewTicklyButton from '@/components/tickly/NewTicklyButton';
import { useState } from 'react';
import NewTicklyModal from '@/components/tickly/NewTicklyModal';

const DashboardClient = (): ReactNode => {
  const [open, setOpen] = useState(false);

  return (
    <div className='max-w-xl mx-auto p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>Bienvenue sur ton dashboard 👋</h1>
      <p className='text-muted-foreground'>Tu es bien connecté.</p>
      <div className='flex flex-col space-y-14 w-40'>
        <NewTicklyButton onClick={() => setOpen(true)} />
        <LogoutButton />
      </div>
      <NewTicklyModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DashboardClient;

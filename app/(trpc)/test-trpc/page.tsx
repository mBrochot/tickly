'use client';

import { trpc } from '@/lib/trpc/client';

export default function TestTrpcPage() {
  const hello = trpc.publicHello.useQuery();
  const secure = trpc.protectedHello.useQuery();

  return (
    <div className='p-6 space-y-4'>
      <p>Public : {hello.data}</p>
      <p>Protégé : {secure.data || secure.error?.message}</p>
    </div>
  );
}

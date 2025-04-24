'use client';

import type { ReactNode } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Card, CardContent } from '@/components/ui/card';
import TicklyCard from '@/components/tickly/TicklyCard';

const TicklyList = (): ReactNode => {
  const { data: ticklys = [], isLoading } =
    trpc.tickly.getCurrentTicklys.useQuery();

  if (isLoading) return <p>Chargement...</p>;

  return (
    <Card className='flex flex-row justify-center'>
      <CardContent className='grid gap-6 md:grid-cols-3'>
        {ticklys
          .filter(
            (tickly): tickly is NonNullable<typeof tickly> => tickly !== null
          )
          .map((tickly) => (
            <TicklyCard
              key={tickly.id}
              id={tickly.id}
              icon={tickly.icon}
              start_at={tickly.start_at}
            />
          ))}
      </CardContent>
    </Card>
  );
};

export default TicklyList;

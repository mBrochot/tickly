'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { Card } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

dayjs.extend(duration);

type Props = {
  icon: keyof typeof LucideIcons;
  id: string;
  start_at: Date;
};

const TicklyCard = ({ icon, id, start_at }: Props): ReactNode => {
  const Icon = LucideIcons[icon] as (props: LucideProps) => ReactNode;
  const router = useRouter();

  const now = dayjs();
  const start = dayjs(start_at);
  const diff = dayjs.duration(now.diff(start));

  const days = Math.floor(diff.asDays());
  const hours = diff.hours();
  const minutes = diff.minutes();

  const timeDisplay =
    days >= 1
      ? `${days} jour${days > 1 ? 's' : ''}`
      : `${hours}:${minutes.toString().padStart(2, '0')}`;

  return (
    <Card
      className='flex flex-row gap-0 justify-center items-center p-3 hover:bg-muted cursor-pointer transition-colors w-40'
      onClick={() => router.push(`/tickly/${id}`)}
    >
      <div className='h-16 w-16 flex items-center justify-center rounded-md bg-secondary mr-4'>
        <Icon className='w-10 h-10 text-primary' />
      </div>
      <div className='flex'>
        <span className='text-lg font-medium'>{timeDisplay}</span>
      </div>
    </Card>
  );
};

export default TicklyCard;

'use client';

import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  onClick?: () => void;
};

const NewTicklyButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} variant='outline' className='cursor-pointer'>
      <CirclePlus className='w-4 h-4' />
      New Tickly
    </Button>
  );
};

export default NewTicklyButton;

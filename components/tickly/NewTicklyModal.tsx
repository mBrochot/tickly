'use client';

import type { FC, ReactNode, SVGProps } from 'react';
import { trpc } from '@/lib/trpc/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

type TicklyType = {
  uuid: string;
  type: string;
  label: string;
  icon: keyof typeof LucideIcons;
};

const NewTicklyModal = ({ open, onClose }: Props): ReactNode => {
  const { data: types = [] } = trpc.tickly.getTypes.useQuery<TicklyType[]>();

  const utils = trpc.useUtils();
  const { mutate } = trpc.tickly.createTickly.useMutation({
    onSuccess: () => {
      utils.tickly.getCurrentTicklys.invalidate();
      onClose();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-xs'>
        <DialogHeader>
          <DialogTitle>Créer un nouveau Tickly</DialogTitle>
        </DialogHeader>
        <div className='grid gap-2 mt-4'>
          {types.map(({ uuid, label, icon }) => {
            const LucideIcon =
              (LucideIcons[icon] as FC<SVGProps<SVGSVGElement>>) ||
              LucideIcons.Circle;
            return (
              <Button
                key={uuid}
                variant='outline'
                size='lg'
                className='gap-2 justify-start cursor-pointer'
                onClick={() =>
                  mutate({
                    ticklyTypeUuid: uuid,
                    label,
                  })
                }
              >
                <LucideIcon className='w-4 h-4' />
                {label}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTicklyModal;

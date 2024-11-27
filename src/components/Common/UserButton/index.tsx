'use client';

import { User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/stores/useAuthModal';

const UserButton = () => {
  const { onOpen } = useAuthModal((state) => state);

  return (
    <Button variant='ghost' className='h-8 w-8 rounded-full' onClick={onOpen}>
      <UserIcon />
    </Button>
  );
};

export default UserButton;

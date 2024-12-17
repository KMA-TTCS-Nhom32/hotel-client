'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/stores/modals/useAuthModal';
import { useProfileStore } from '@/providers/profile-store-provider';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';
import SideBar from '@/components/layouts/SideBar';

const UserButton = () => {
  const { profile } = useProfileStore((state) => state);
  const { onOpen } = useAuthModal((state) => state);
  const [openPopover, setOpenPopover] = useState(false);
  const pathname = usePathname();
    console.log(profile);
  const handleClick = () => {
    profile ? setOpenPopover(!openPopover) : onOpen();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 rounded-full' onClick={handleClick}>
          <UserIcon />
        </Button>
      </PopoverTrigger>
      {profile && (
        <PopoverContent className='w-auto min-w-[320px]' align='end' side='bottom'>
          <SideBar lng={pathname.split('/')[1]} className='!w-full' />
        </PopoverContent>
      )}
    </Popover>
  );
};

export default UserButton;

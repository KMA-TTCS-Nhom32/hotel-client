'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useRequest } from 'ahooks';
import { logoutUserService } from '@/services/auth';
import { useAuth } from '@/stores/auth/useAuth';

interface LogOutButtonProps {
  className?: string;
}

const LogOutButton = ({ className }: Readonly<LogOutButtonProps>) => {
  const { t } = useTranslation('account');
  const { onLogout } = useAuth();

  const { run } = useRequest(logoutUserService, {
    manual: true,
    onSuccess: () => {
      onLogout();
    },
  });

  return (
    <Button
      variant='ghost'
      className={cn('w-full font-semibold  hover:text-red-500 ', className)}
      onClick={run}
    >
      <h4 className='text-2xl text-left text-destructive'>{t('log_out')}</h4>
    </Button>
  );
};

export default LogOutButton;

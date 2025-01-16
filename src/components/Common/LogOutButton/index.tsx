'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useRequest } from 'ahooks';
import { logoutUserService } from '@/services/auth';
import { useAuth } from '@/stores/auth/useAuth';
import { ButtonCustom } from '@/components/ui/button-custom';

interface LogOutButtonProps {
  className?: string;
}

const LogOutButton = ({ className }: Readonly<LogOutButtonProps>) => {
  const { t } = useTranslation('account');
  const { onLogout } = useAuth();

  const { run, loading } = useRequest(logoutUserService, {
    manual: true,
    onSuccess: () => {
      onLogout();
    },
  });

  return (
    <ButtonCustom
      variant='ghost'
      className={cn(
        'w-full h-12 !rounded-md font-semibold bg-red-50 hover:bg-red-200 hover:text-red-700',
        className,
      )}
      onClick={run}
      loading={loading}
    >
      <h4 className='text-2xl text-left text-destructive'>{t('log_out')}</h4>
    </ButtonCustom>
  );
};

export default LogOutButton;

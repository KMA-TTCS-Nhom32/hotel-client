import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';
import { Icons } from '../Common/Icons';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  shape?: 'regtangle' | 'circle';
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  loading?: boolean;
}

export const ButtonCustom = ({
  children,
  className,
  shape = 'circle',
  prefix,
  suffix,
  loading,
  ...props
}: ButtonCustomProps) => {
  return (
    <Button
      className={cn(className, shape === 'circle' && 'rounded-[40px] px-8 py-2.5')}
      {...props}
    >
      {prefix}

      {loading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}

      {children}

      {suffix}
    </Button>
  );
};

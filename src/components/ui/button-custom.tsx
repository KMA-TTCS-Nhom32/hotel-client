import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

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

      {loading && (
        <LoaderCircle
          className={cn(
            '!mr-2 !h-5 !w-5 animate-spin',
            props.variant === 'default' ? '!text-white' : '!text-[#ff7526]',
          )}
          color={props.variant === 'default' ? '#fff' : '#ff7526'}
        />
      )}

      {children}

      {suffix}
    </Button>
  );
};

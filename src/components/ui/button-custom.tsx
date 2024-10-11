import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface ButtonCustomProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  shape?: 'regtangle' | 'circle';
}

export const ButtonCustom = ({
  children,
  className,
  shape = 'regtangle',
  ...props
}: ButtonCustomProps) => {
  return (
    <Button
      className={cn(className, shape === 'circle' && 'rounded-[40px] px-8 py-2.5')}
      {...props}
    >
      {children}
    </Button>
  );
};

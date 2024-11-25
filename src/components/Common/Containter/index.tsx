import React from 'react';

import styles from './index.module.scss';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Readonly<ContainerProps>) => {
  return <section className={cn(styles.container, className)}>{children}</section>;
};

export default Container;

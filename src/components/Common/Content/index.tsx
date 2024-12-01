import React from 'react';

import styles from './index.module.scss';
import { cn } from '@/lib/utils';

interface ContentProps {
    children: React.ReactNode;
    className?: string;
}

const Content = ({ children, className }: Readonly<ContentProps>) => {
    return <section className={cn(styles.content, className)}>{children}</section>;
};

export default Content;

import { cn } from '@/lib/utils';
import styles from './index.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Readonly<ContainerProps>) => {
  return <section className={cn(styles.container, className)}>{children}</section>;
};

export default Container;

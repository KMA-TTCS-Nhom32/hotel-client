import { cn } from '@/lib/utils';
import styles from './index.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: Readonly<ContainerProps>) => {
  return (
    <section id={id} className={cn(styles.container, className)}>
      {children}
    </section>
  );
};

export default Container;

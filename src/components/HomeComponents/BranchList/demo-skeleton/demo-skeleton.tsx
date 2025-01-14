import { Skeleton } from '@/components/ui/skeleton';
import styles from './index.module.scss';
import { cn } from '@/lib/utils';

export function SkeletonDemo() {
  return (
    <div className={cn(styles.cityFilter)}>
      <div className={styles.button}>
        <Skeleton />
      </div>
    </div>
  );
}

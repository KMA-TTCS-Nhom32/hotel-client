import { Skeleton } from '@/components/ui/skeleton';
import styles from './index.module.scss';
import { cn } from '@/lib/utils';

export function SkeletonPagination() {
  return (
    <div className={cn(styles.cityFilter)}>
      <button title='Loading button...'>
        <Skeleton />
      </button>
    </div>
  );
}

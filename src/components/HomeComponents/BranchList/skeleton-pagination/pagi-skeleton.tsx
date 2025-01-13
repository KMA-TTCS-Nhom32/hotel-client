import { Skeleton } from '@/components/ui/skeleton';
import styles from './index.module.scss';
import { cn } from '@/lib/utils';

export function SkeletonPagi() {
  return (
    <div className={cn(styles.cityFilter)}>
      <button>
        <Skeleton />
      </button>
    </div>
  );
}

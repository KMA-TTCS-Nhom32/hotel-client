import { Skeleton } from '@/components/ui/skeleton';
import styles from './index.module.scss';
import Link from 'next/link';

export function SkeletonCard() {
  return (
        <div className={styles.branchCard}>
          <div>
            <Skeleton className={styles.branchImage} />
          </div>
          <div className={styles.branchInfo}>
            <div>
              <Skeleton className={styles.branchName} />
            </div>
            <div>
              <Skeleton className={styles.button} />
            </div>
          </div>
        </div>
  );
}

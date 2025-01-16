import { Skeleton } from '@/components/ui/skeleton';
import styles from './index.module.scss';
import { cn } from '@/lib/utils';

export function RoomSkeleton() {
  return (
    <div
      className={`${styles.roomcard_container} flex flex-col md:flex-row shadow-lg border border-gray-200 rounded-lg overflow-hidden`}
    >
      <div className={`${styles.room_image} w-full md:w-1/3`}>
      <img src='/images/gray.png' className={styles.roomImage} />
      </div>
      <div
        className={cn(
          styles.room_contents,
          'w-full md:w-2/3 flex flex-row justify-between pt-4 px-4',
        )}
      >
        <div className={`${styles.room_detail} mb-4 md:w-2/3`}>
          <h3 className={`${styles.room_type} text-xl font-bold mb-2`}>
            <Skeleton />
          </h3>
          <p className={`${styles.hotel_branch} text-sm font-medium mb-0`}>
            <Skeleton />
          </p>
          <div className={cn(styles.address, 'mb-2')}>
            <Skeleton />
          </div>
          <div className='flex flex-wrap gap-3 mb-2'>
            <div className={cn(styles.badge, 'gap-2 w-auto py-2 rounded-full')}>
              <div className={cn(styles.icon, 'h-4 w-4')} />
              <span>
                <Skeleton />
              </span>
            </div>
          </div>
          <div className={styles.hotelDescription}>
            <span>
              <Skeleton />
            </span>
          </div>
        </div>
        <div className={`${styles.room_price} mt-4 md:w-1/3 border-t pt-4`}>
          <div className={`${styles.price_detail}`}>
            <span className={`${styles.price_range} text-lg font-semibold`}>
              <Skeleton />
            </span>
            <span className={`${styles.room_cost} text-orange-600 text-2xl`}>
                <Skeleton />
            </span>
            <span className={`${styles.price_curency}`}>
                <Skeleton />
            </span>
            <p className={`${styles.price_tax} text-sm text-gray-500 mb-4`}>
              <Skeleton />
            </p>
          </div>
            <button className='py-2 px-4 rounded-full'>
                <Skeleton />
            </button>
        </div>
      </div>
    </div>
  );
}

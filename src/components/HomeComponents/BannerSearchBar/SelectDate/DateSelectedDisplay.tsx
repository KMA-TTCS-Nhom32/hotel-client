import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/funcs/date';
import { SelectDateType } from '@/lib/types/select-date';
import { Text } from '@/components/ui/text';
import { BookingTime } from '@/stores/search-bar/searchBarStore';
import styles from '../index.module.scss';
import type { AppTranslationFunction } from '@/lib/types/i18n';

interface DateSelectedDisplayProps {
  t: AppTranslationFunction;
  lng: string;
  type: SelectDateType;
  bookingData: BookingTime;
  selectedDateLabel?: SelectDateType | null;
  isPopoverDisplay?: boolean;
  onSelect?: (type: SelectDateType) => void;
}

export const DateSelectedDisplay = ({
  t,
  lng,
  type,
  bookingData,
  selectedDateLabel = null,
  isPopoverDisplay = false,
  onSelect,
}: DateSelectedDisplayProps) => {
  const isHourly = bookingData.type === 'HOURLY';

  return (
    <div
      id='select-date-trigger'
      className={cn(
        isPopoverDisplay ? styles.select_date_popover_display : styles.select_date_trigger,
        selectedDateLabel && type === selectedDateLabel && styles.selected,
      )}
      onClick={() => !isPopoverDisplay && onSelect?.(type)}
    >
      <Text element='h5' type='title2-semi-bold'>
        {t(`bookingform.${type}`)}
      </Text>
      <div className={styles.display_date_trigger}>
        <CalendarDays />
        <Text element='p' type='body1'>
          {formatDate(lng, bookingData[type], true, isHourly, isHourly)}
        </Text>
      </div>
    </div>
  );
};

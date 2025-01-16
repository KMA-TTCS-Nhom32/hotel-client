'use client';

import { useState } from 'react';

import { AppTranslationFunction } from '@/lib/types/i18n';
import { SelectDateType } from '@/lib/types/select-date';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import styles from '../index.module.scss';
import { DateSelectedDisplay } from './DateSelectedDisplay';
import { SelectDate } from '.';

interface SelectDateSectionProps {
  t: AppTranslationFunction;
  lng: string;
}

const SelectDatePopover = ({ t, lng }: Readonly<SelectDateSectionProps>) => {
  const { bookingTime, setBookingTime } = useSearchBarStore();

  const [selectedDateLabel, setSelectedDateLabel] = useState<SelectDateType | null>(null);

  const handleCloseSelectDate = () => {
    setSelectedDateLabel(null);
  };

  const handleClickOutsideSelectDate = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // Check if the click is on the trigger element
    const target = e.target as HTMLElement;

    const triggerElement = document.getElementById('select-date-trigger');

    // If clicking on trigger or its children, do nothing
    if (
      target.id === 'select-date-trigger' ||
      target.closest('#select-date-trigger') ||
      target.offsetParent?.id === 'select-date-trigger' ||
      target.contains(triggerElement) ||
      triggerElement?.contains(target)
    ) {
      return;
    }

    // Otherwise close the popover
    handleCloseSelectDate();
  };

  return (
    <Popover open={selectedDateLabel !== null}>
      <PopoverTrigger id='select-date-trigger' asChild>
        <div className={styles.select_date_trigger_wrapper}>
          <DateSelectedDisplay
            t={t}
            lng={lng}
            type='checkIn'
            bookingData={bookingTime}
            selectedDateLabel={selectedDateLabel}
            onSelect={setSelectedDateLabel}
          />
          <DateSelectedDisplay
            t={t}
            lng={lng}
            type='checkOut'
            bookingData={bookingTime}
            selectedDateLabel={selectedDateLabel}
            onSelect={setSelectedDateLabel}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={styles.popover_wrap_3}
        align='start'
        side='bottom'
        onInteractOutside={handleClickOutsideSelectDate}
      >
        <div className={styles.select_date_popover_content}>
          <div className={styles.select_date_popover_header}>
            <DateSelectedDisplay
              t={t}
              lng={lng}
              type='checkIn'
              bookingData={bookingTime}
              selectedDateLabel={selectedDateLabel}
              isPopoverDisplay={true}
            />
            <DateSelectedDisplay
              t={t}
              lng={lng}
              type='checkOut'
              bookingData={bookingTime}
              selectedDateLabel={selectedDateLabel}
              isPopoverDisplay={true}
            />
          </div>

          <SelectDate t={t} booking={bookingTime} setBooking={setBookingTime} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectDatePopover;

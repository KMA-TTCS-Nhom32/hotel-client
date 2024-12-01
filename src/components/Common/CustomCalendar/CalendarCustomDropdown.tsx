'use client';

import * as React from 'react';
import dayjs from 'dayjs';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type CustomCalendarDropdownProps = React.ComponentProps<typeof Calendar>;

export function CustomCalendarDropdown({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CustomCalendarDropdownProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  // Generate array of months
  const months = Array.from({ length: 12 }, (_, i) => {
    return { value: i, label: dayjs().month(i).format('MMMM') };
  });

  // Generate array of years
  const currentYear = dayjs().year();
  const years = Array.from({ length: currentYear - 1900 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, label: year.toString() };
  });

  const handleMonthChange = (month: string) => {
    setDate(dayjs(date).month(parseInt(month)).toDate());
  };

  const handleYearChange = (year: string) => {
    setDate(dayjs(date).year(parseInt(year)).toDate());
  };

  return (
    <div className={cn('mt-2 pt-2 bg-background rounded-md', className)}>
      <div className='w-full flex gap-2 justify-center'>
        <Select onValueChange={handleMonthChange} value={date.getMonth().toString()}>
          <SelectTrigger className='w-[140px]'>
            <SelectValue placeholder='Select month' />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleYearChange} value={date.getFullYear().toString()}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='Select year' />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year.value} value={year.value.toString()}>
                {year.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Calendar
        month={date}
        onMonthChange={setDate}
        className={cn('rounded-md border w-auto', className)}
        classNames={{
          ...classNames,
          nav: cn('space-x-1 flex items-center', classNames?.nav),
          nav_button_previous: cn('hidden', classNames?.nav_button_previous),
          nav_button_next: cn('hidden', classNames?.nav_button_next),
          head_cell: cn(
            'text-muted-foreground font-normal text-[0.8rem] w-9',
            classNames?.head_cell,
          ),
          day: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100', classNames?.day),
          day_today: cn('bg-accent text-accent-foreground rounded-sm', classNames?.day_today),
          day_selected: cn(
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-sm',
            classNames?.day_selected,
          ),
          table: cn('w-full border-collapse space-y-1', classNames?.table),
        }}
        showOutsideDays={showOutsideDays}
        {...props}
      />
    </div>
  );
}

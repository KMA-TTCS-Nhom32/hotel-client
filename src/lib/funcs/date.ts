import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { WorkingHour } from '../types/select-date';
import { Period } from '../types/select-date';

const DAY_NAMES = {
  short: {
    vi: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  full: {
    vi: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
};

const MONTH_NAMES = {
  short: {
    vi: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  full: {
    vi: [
      'Tháng 01',
      'Tháng 02',
      'Tháng 03',
      'Tháng 04',
      'Tháng 05',
      'Tháng 06',
      'Tháng 07',
      'Tháng 08',
      'Tháng 09',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
  },
};

export const getTodayViLocale = (): Date => {
  return dayjs().locale('vi').toDate();
};

// Extract time utilities
export const parseTime = (timeString: string) => timeString.split(':').map(Number);
export const parseDate = (dateString: string) => dateString.split('/').map(Number);

export const addDays = (date: Date, days: number) => dayjs(date).add(days, 'day').toDate();
export const addYears = (date: Date, years: number): Date =>
  dayjs(date).add(years, 'year').toDate();

export const countWorkingUnit = ({ start, end }: WorkingHour) => {
  const [startHour, startMinute] = parseTime(start);
  const [endHour, endMinute] = parseTime(end);

  return (endHour - startHour) * 2 + (endMinute === 30 ? 1 : 0) - (startMinute === 30 ? 1 : 0);
};

export const formatDateDayjs = (date: Date) => dayjs(date).format('DD-MM-YYYY');

export const formatDateWithTime = (date: Date) => dayjs(date).format('HH:mm - DD/MM/YYYY');

export const formatDate = (
  lng: string,
  date: Date | string | number,
  isShortType = true,
  isHourlySelect = false,
  isDateNum = false,
  isDisableDate = false,
): string => {
  if (!date) {
    throw new Error('Date parameter is required');
  }

  const dayjsDate = dayjs(date).locale(lng);

  if (!dayjsDate.isValid()) {
    throw new Error('Invalid date provided');
  }

  const getDayName = () => {
    if (isDisableDate) return '';
    const type = isShortType ? 'short' : 'full';
    return (
      (lng === 'vi' ? DAY_NAMES[type].vi[dayjsDate.day()] : DAY_NAMES[type].en[dayjsDate.day()]) +
      ', '
    );
  };

  const getMonthName = () => {
    const type = isShortType ? 'short' : 'full';
    return lng === 'vi' ? MONTH_NAMES[type].vi[dayjsDate.month()] : dayjsDate.format('MMM');
  };

  const timeString = isHourlySelect ? `${dayjsDate.format('HH:mm')} ` : '';

  const formattedDate = isHourlySelect ? 'DD/MM' : 'DD/MM/YYYY';

  const dateString =
    getDayName() +
    (isDateNum === true
      ? dayjsDate.format(formattedDate)
      : `${dayjsDate.format('DD')} ${getMonthName()} ${dayjsDate.format('YYYY')}`);

  return `${timeString}${dateString}`;
};

export const isInPeriod = (date: Date, period: Period): boolean => {
  const [startDay, startMonth] = parseDate(period.start);
  const [endDay, endMonth] = parseDate(period.end);

  const currentMonth = date.getMonth() + 1; // Convert to 1-based month
  const currentDay = date.getDate();

  // Handle year wrapping (e.g., Nov-Jan period)
  if (startMonth > endMonth) {
    // If we're in or after start month OR in or before end month
    return (
      currentMonth > startMonth ||
      (currentMonth === startMonth && currentDay >= startDay) ||
      currentMonth < endMonth ||
      (currentMonth === endMonth && currentDay <= endDay)
    );
  }

  // If start and end months are different but in same year order
  if (startMonth !== endMonth) {
    return (
      (currentMonth > startMonth && currentMonth < endMonth) || // Any month in between
      (currentMonth === startMonth && currentDay >= startDay) || // Start month, after or on start day
      (currentMonth === endMonth && currentDay <= endDay) // End month, before or on end day
    );
  }

  // If same month
  return currentMonth === startMonth && currentDay >= startDay && currentDay <= endDay;
};

export const isBefore = (
  date1: Date,
  date2: Date,
  unit: 'day' | 'month' | 'year' = 'day',
): boolean => {
  return dayjs(date1).isBefore(dayjs(date2), unit);
};

export const isAfter = (
  date1: Date,
  date2: Date,
  unit: 'day' | 'month' | 'year' = 'day',
): boolean => {
  return dayjs(date1).isAfter(dayjs(date2), unit);
};

// Optional: You might want to add these useful dayjs utilities
export const startOf = (date: Date, unit: 'day' | 'month' | 'year'): Date => {
  return dayjs(date).startOf(unit).toDate();
};

export const endOf = (date: Date, unit: 'day' | 'month' | 'year'): Date => {
  return dayjs(date).endOf(unit).toDate();
};

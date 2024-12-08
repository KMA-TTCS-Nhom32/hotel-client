import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const formatDateDayjs = (date: Date) => {
  return dayjs(date).format('DD-MM-YYYY');
};

export const getTodayViLocale = (): Date => {
  return dayjs().locale('vi').toDate();
};

export const formatDate = (
  lng: string,
  date: Date | string | number,
  isShortType = true,
  showTime = false,
): string => {
  if (!date) {
    throw new Error('Date parameter is required');
  }

  const dayjsDate = dayjs(date).locale(lng);

  if (!dayjsDate.isValid()) {
    throw new Error('Invalid date provided');
  }

  const getDayName = () => {
    const type = isShortType ? 'short' : 'full';
    return lng === 'vi' ? DAY_NAMES[type].vi[dayjsDate.day()] : DAY_NAMES[type].en[dayjsDate.day()];
  };

  const getMonthName = () => {
    const type = isShortType ? 'short' : 'full';
    return lng === 'vi' ? MONTH_NAMES[type].vi[dayjsDate.month()] : dayjsDate.format('MMM');
  };

  const timeString = showTime ? `${dayjsDate.format('HH:mm')} - ` : '';
  const dateString = `${getDayName()}, ${dayjsDate.format(
    'DD',
  )} ${getMonthName()} ${dayjsDate.format('YYYY')}`;

  return `${timeString}${dateString}`;
};

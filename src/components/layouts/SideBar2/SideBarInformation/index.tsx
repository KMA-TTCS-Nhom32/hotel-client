'use client';

import Image from 'next/image';
import { AppTranslationFunction } from '@/lib/types/i18n';
import { BookingInfor } from '@/stores/booking/bookingStore';
import { BookingTime, CustomerAmount } from '@/stores/search-bar/searchBarStore';
import { formatCurrency } from '@/lib/funcs/currency';
import { useMemo } from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes.constant';
import { formatDate } from '@/lib/funcs/date';
interface SideBarInformationProps {
  lng: string;
  t: AppTranslationFunction;
  bookingInfor: BookingInfor;
  bookingTime: BookingTime;
  customer: CustomerAmount;
}

const SideBarInformation = ({
  lng,
  t,
  bookingInfor,
  bookingTime,
  customer,
}: SideBarInformationProps) => {
  const bookingDuration = useMemo(() => {
    const { checkIn, checkOut, type } = bookingTime;

    if (type === 'NIGHTLY') {
      return `1 ${t('sidebar.night')}`;
    } else if (type === 'HOURLY') {
      const hours = checkOut.getHours() - checkIn.getHours();
      return `${hours} ${t('sidebar.hours')}`;
    }
    const days = checkOut.getDay() - checkIn.getDay();
    return `${days} ${t('sidebar.day', { count: days })}`;
  }, [bookingTime]);

  return (
    <div className='hidden sm:block'>
      <div className='gap-2.5 items-center justify-between pt-2 flex'>
        <div className='booking-room-building__info'>
          <h3 className='font-semibold text-base'>{bookingInfor.branchName}</h3>
          <div className='text-sm text-gray-500'>{bookingInfor?.branchAddress}</div>
        </div>
        <div className='min-w-[100px] cursor-pointer'>
          <span className='min-w-[100px]'>
            <Image
              src={bookingInfor?.thumbnail ?? '/images/bed1.png'}
              height={150}
              width={150}
              alt=''
              className='object-cover w-[100px] h-[100px]'
            />
          </span>
        </div>
      </div>
      <div className='bg-gray-400 h-[1px] my-2 '> </div>
      <div className='booking-checkin-date flex justify-between'>
        <div className='booking-checkin-date__item'>
          <div className='text-base text-gray-500'>Nhận phòng</div>
          <div className='text-base font-semibold'>
            {formatDate(lng, bookingTime.checkIn, true, bookingTime.type === 'HOURLY')}
          </div>
        </div>
        <div className='booking-checkin-date__item'>
          <div className='text-base text-gray-500'>Trả phòng</div>
          <div className='text-base font-semibold'>
            {formatDate(lng, bookingTime.checkOut, true, bookingTime.type === 'HOURLY')}
          </div>
        </div>
      </div>
      <div className='bg-gray-400 h-[1px] my-2 '> </div>
      <div className='booking-guest-number'>
        <div className='font-normal text-base text-gray-600'>
          {customer.adult + customer.child} Khách ( {customer.adult} Người lớn, {customer.child} Trẻ
          em)
        </div>
        <div className='flex justify-between'>
          <div className='text-base font-medium'>(1x) {bookingInfor.detailName}</div>

          <div>
            <Link
              href={`${APP_ROUTES.Branch}/${bookingInfor.branchSlug}`}
              className='text-orange-600 underline underline-offset-4 font-medium'
            >
              Thay đổi
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-gray-400 h-[1px] my-2'> </div>

      <div className=' flex items-end justify-between'>
        <div className='booking-total-price__info'>
          <div className='text-base font-medium'>Tổng tiền</div>
          <div className='text-sm text-gray-500'>1 phòng, {bookingDuration}</div>
        </div>
        <div className='font-bold text-xl text-orange-600'>
          {formatCurrency(bookingInfor.totalAmount)}
        </div>
      </div>
    </div>
  );
};

export default SideBarInformation;

'use client';

import { useTranslation } from '@/i18n/client';
import SideBarInformation from './SideBarInformation';
import SideBarPolicy from './SideBarPolicy';
import { Icons } from '../../Common/Icons';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { APP_ROUTES } from '@/constants/routes.constant';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { BookingTime, useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import { getTodayViLocale } from '@/lib/funcs/date';
import { CircleMinus } from 'lucide-react';
interface SideBar2 {
  lng: string;
}

const SideBar2 = ({ lng }: Readonly<SideBar2>) => {
  const { t } = useTranslation(lng, 'booking');
  const { bookingInfor, userInfor } = useBookingStore((state) => state);
  const { bookingTime, customerAmount } = useSearchBarStore((state) => state);
    console.log(userInfor);
  const pathname = usePathname();

  const isPaymentPage = useMemo(() => {
    return pathname.includes(APP_ROUTES.Payment);
  }, [pathname]);

  const isAbleToChangeDate = (bookingTime: BookingTime) => {
    const { checkIn, checkOut, type } = bookingTime;
    const today = getTodayViLocale();

    let isAble = false;

    if (type === 'HOURLY' || type === 'NIGHTLY') {
      isAble =
        checkIn.getDay() > today.getDay() ||
        (checkIn.getDate() === today.getDate() && checkIn.getHours() - 2 > today.getHours());
    } else if (type === 'DAILY') {
      if (checkIn.getDay() - 1 > today.getDay()) {
        isAble = true;
        if (checkOut.getDay() - checkIn.getDay() > 6) {
          isAble = checkIn.getDay() - today.getDay() > 2;
        } else if (checkOut.getDay() - checkIn.getDay() > 13) {
          isAble = checkIn.getDay() - today.getDay() > 4;
        }
      }
    }

    return isAble;
  };

  const isMoreThan7Days = (checkIn: Date) => {
    const today = getTodayViLocale();

    return checkIn.getDay() - today.getDay() >= 7;
  };

  return (
    <div className=''>
      <div className='flex flex-col'>
        {!isPaymentPage ? (
          <div className='bg-primary rounded-t-xl px-3 py-2'>
            <p className='title2-semi-bold text-white'>{t('sidebar.reward_booking')}</p>
          </div>
        ) : (
          <div className='flex items-center flex-1 py-3 gap-2 bg-orange-200 rounded-t-xl px-2'>
            <div className='flex items-center'>
              <Icons.hotel />
            </div>
            <div className='flex flex-col'>
              <div className='font-medium text-lg hidden sm:block'>
                {t('sidebar.booking_details')}
              </div>
              <div className='font-medium text-lg sm:hidden'>{bookingInfor?.branchName}</div>
              <div className='text-sm text-gray-500 sm:hidden'>{bookingInfor?.branchAddress}</div>
            </div>
          </div>
        )}

        <div className='rounded-t-none bg-white rounded-xl px-4 py-6'>
          {bookingInfor && (
            <SideBarInformation
              lng={lng}
              t={t}
              bookingInfor={bookingInfor}
              bookingTime={bookingTime}
              customer={customerAmount}
            />
          )}

          {isPaymentPage && (
            <div className={isPaymentPage ? 'hidden sm:block' : ''}>
              <div className='text-base font-medium'>{t('sidebar.check_in_infor')}</div>
              <div className='flex items-center justify-between mt-2'>
                <div className='text-gray-500'>{t('sidebar.customer')}</div>
                <div className='text-base font-medium'>{userInfor?.name}</div>
              </div>
              {isAbleToChangeDate(bookingTime) && (
                <div className='mt-3'>
                  <div className='flex items-center gap-2'>
                    <Icons.successCheck />
                    <span>{t('sidebar.free_cancel')}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Icons.successCheck />
                    <span>{t('sidebar.changable_date')}</span>
                  </div>
                </div>
              )}
              <div className='bg-gray-400 h-[1px] my-2 '> </div>
            </div>
          )}

          {isPaymentPage && (
            <div className={isPaymentPage ? 'hidden sm:block' : ''}>
              <div className='mb-2 font-medium'>{t('sidebar.contact_infor')}</div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-500'>{t('sidebar.user_name')}</div>
                <div className='font-medium'>{userInfor?.name}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-500'>{t('sidebar.phone')}</div>
                <div className='font-medium'>{userInfor?.phone}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-500'>Email</div>
                <div className='font-medium'>{userInfor?.email}</div>
              </div>
            </div>
          )}
        </div>

        {isAbleToChangeDate(bookingTime) && (
          <div className='rounded-xl bg-white flex flex-col px-4 py-6 mt-6'>
            <div className='text-lg font-medium'>Chính sách hủy và dời lịch</div>
            <div className='mt-4'>
              <div className='flex gap-3 mt-2'>
                <Icons.successCheck className='mt-1' />
                <span className='flex-1 body1'>{t('sidebar.free_cancel')}</span>
              </div>
              <div className='flex gap-3 mt-2'>
                <Icons.successCheck className='mt-1' />
                <span className='flex-1 body1'>{t('sidebar.changable_date')}</span>
              </div>
              {isMoreThan7Days(bookingTime.checkIn) && (
                <div className='flex gap-3 mt-2'>
                  <CircleMinus className='!w-3 !h-3 mt-1 text-red-600' />
                  <span className='flex-1 body1'>{t('sidebar.not_able_fully_refund')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <SideBarPolicy t={t} bookingType={bookingTime.type} />
      </div>
    </div>
  );
};

export default SideBar2;

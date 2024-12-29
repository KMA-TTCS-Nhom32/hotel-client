'use client';

import { useTranslation } from '@/i18n/client';
import SideBarInformation from './SideBarInformation';
import SideBarPolicy from './SideBarPolicy';
import { Icons } from '../../Common/Icons';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { APP_ROUTES } from '@/constants/routes.constant';
interface SideBar2 {
  lng: string;
}

const SideBar2 = ({ lng }: Readonly<SideBar2>) => {
  const { t } = useTranslation(lng, 'account');

  const pathname = usePathname();

  const isPaymentPage = useMemo(() => {
    return pathname.includes(APP_ROUTES.Payment);
  }, [pathname]);
  return (
    <div className=''>
      <div className='flex flex-col'>
        {!isPaymentPage && (
          <div className='text-white text-xs bg-primary font-semibold rounded-t-xl px-2 py-2'>
            Đơn đặt phòng này sẽ nhận được 1 tích điểm
          </div>
        )}
        {isPaymentPage && (
          <div className='flex items-center flex-1 py-3 gap-2 bg-orange-200 rounded-t-xl px-2'>
            <div className='flex items-center'>
              <Icons.hotel />
            </div>
            <div className='flex flex-col'>
              <div className='font-medium text-lg hidden sm:block'>Chi tiết đặt phòng</div>
              <div className='font-medium text-lg sm:hidden'>M VILLAGE HOTEL HỒ GƯƠM</div>
              <div className='text-sm text-gray-500 sm:hidden'>
                Số 38, phố Hai Bà Trưng, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội
              </div>
            </div>
          </div>
        )}

        <div className='rounded-t-none bg-white rounded-xl px-4 py-6'>
          <SideBarInformation t={t} />

          {isPaymentPage && (
            <div className={isPaymentPage ? 'hidden sm:block' : ''}>
              <div className='text-base font-medium'>Thông tin check-in</div>
              <div className='flex items-center justify-between mt-2'>
                <div className='text-gray-500'>Khách</div>
                <div className='text-base font-medium'>nguyenngocdung</div>
              </div>
              <div className='mt-3'>
                <div className='flex items-center gap-2'>
                  <Icons.successCheck />
                  <span>Hủy Phòng Miễn Phí</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Icons.successCheck />
                  <span>Có thể dời lịch</span>
                </div>
              </div>
              <div className='bg-gray-400 h-[1px] my-2 '> </div>
            </div>
          )}

          {isPaymentPage && (
            <div className={isPaymentPage ? 'hidden sm:block' : ''}>
              <div className='mb-2 font-medium'>Thông tin liên hệ</div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-500'>Người đặt phòng</div>
                <div className='font-medium'>nguyenngocdung</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-500'>Số điện thoại</div>
                <div className='font-medium'>+84969012735</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='text-gray-500'>Email</div>
                <div className='font-medium'>nguyenngocdung8g@gmail.com</div>
              </div>
            </div>
          )}
        </div>

        <SideBarPolicy t={t} />
      </div>
    </div>
  );
};

export default SideBar2;

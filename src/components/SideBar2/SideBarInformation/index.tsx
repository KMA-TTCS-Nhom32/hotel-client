'use client';
import { Text } from '@/components/ui/text';
import Image from 'next/image';
interface SideBarInformationProps {
  lng: string;
  side_bar_pay_ment: boolean;
}

const SideBarInformation = async ({ lng, side_bar_pay_ment }: SideBarInformationProps) => {
  return (
    <div className={side_bar_pay_ment ? 'hidden sm:block' : ''}>
      <div className='gap-2.5 items-center justify-between pt-2 flex'>
        <div className='booking-room-building__info'>
          <h3 className='font-semibold text-base'>M VILLAGE HOTEL HỒ GƯƠM</h3>
          <div className='text-sm text-gray-500'>
            Số 38, phố Hai Bà Trưng, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội
          </div>
        </div>
        <div className='min-w-[100px] cursor-pointer'>
          <span className='min-w-[100px]'>
            <Image
              src={'/images/bed1.png'}
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
          <div className='text-base font-semibold'>CN, 29 Th12</div>
        </div>
        <div className='booking-checkin-date__item'>
          <div className='text-base text-gray-500'>Trả phòng</div>
          <div className='text-base font-semibold'>T2, 30 Th12</div>
        </div>
      </div>
      <div className='bg-gray-400 h-[1px] my-2 '> </div>
      <div className='booking-guest-number'>
        <div className='font-normal text-base font-normal text-gray-600'>
          2 Khách ( 2 Người lớn, 0 Trẻ em)
        </div>
        <div className='flex justify-between'>
          <div className='text-base font-medium'>(1x) Phòng Executive</div>
          {!side_bar_pay_ment && (
            <div>
              <a className='text-orange-600 underline underline-offset-4 font-medium'>Thay đổi</a>
            </div>
          )}
        </div>
      </div>
      <div className='bg-gray-400 h-[1px] my-2'> </div>
      {!side_bar_pay_ment && (
        <div className=' flex items-end justify-between'>
          <div className='booking-total-price__info'>
            <div className='text-base font-medium'>Tổng tiền</div>
            <div className='text-sm text-gray-500'>1 phòng, 1 đêm</div>
          </div>
          <div className='font-bold text-xl text-orange-600'>1.750.000 VND</div>
        </div>
      )}
    </div>
  );
};

export default SideBarInformation;

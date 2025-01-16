'use client';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';

interface Branch {
  id: string;
  name: string;
  address: string;
}

interface RoomDetail {
  id: string;
  name: string;
  slug: string;
  status: string;
  description: string;
  thumbnail: {
    url: string;
    publicId: string;
  };
  branch: Branch;
}

interface Booking {
  id: string;
  status: string;
  total_amount: string;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  room: {
    id: string;
    detail?: RoomDetail;
  };
  user: {
    name: string;
    email: string;
  };
}

interface ListRoomProps {
  lng: string;
  bookings: Booking[];
}
const ListRoom = ({ lng, bookings }: ListRoomProps) => {
  const { t } = useTranslation(lng, 'myreservation');
  return (
    <div>
      {bookings.map((booking) => (
        <div className='w-full pt-5 flex flex-col cursor-pointer sm:flex-row'>
          <div className='relative sm:w-1/3 h-full w-full'>
            <Image
              src={booking.room.detail?.thumbnail.url || '/images/living-story-6-1.png'}
              alt=''
              height={100}
              width={276}
              className='h-full w-auto'
            ></Image>

            <div className='absolute top-0 right-0 m-2 px-2 py-0.5 bg-pink-200 rounded-2xl'>
              <span className=' text-red-500 text-center '>{booking.status}</span>
            </div>
          </div>
          <div className='sm:flex sm:justify-between flex-row w-full'>
            <div className='flex flex-col py-2 px-3 gap-2 flex-col justify-between w-full sm:w-2/3'>
              <p className='text-xs text-gray-500'>Thuộc đơn:{booking.id} </p>

              <div className=''>
                <div className='mb-1 text-lg font-medium'>
                  <p>{booking.room.detail?.name || 'Room Name'}</p>
                </div>
                <div>
                  <p className=''>
                    <span className='uppercase text-sm text-orange-500'>
                      {' '}
                      {booking.room.detail?.branch.name || 'Branch Name'}
                    </span>
                    <span> • </span>
                    <span className='text-xs'>
                      {booking.room.detail?.branch.address || 'Address'}
                    </span>
                  </p>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center gap-[12px] sm:w-1/2 max-sm:w-full'>
                  <div className='flex flex-col flex-1 gap-[4px] py-[8px] px-[16px] rounded-[8px] border border-solid  border-gray-500 '>
                    <p>{t('Check-in')}</p>
                    <h5>{new Date(booking.start_date).toLocaleDateString()}</h5>
                  </div>
                </div>
                <div className='flex items-center gap-[12px] sm:w-1/2 max-sm:w-full'>
                  <div className='flex flex-col flex-1 gap-[4px] py-[8px] px-[16px] rounded-[8px] border border-solid  border-gray-500 '>
                    <p>{t('Check-out')}</p>
                    <h5>{new Date(booking.end_date).toLocaleDateString()}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:w-3/12 w-full flex flex-col justify-between item-end  sm:border-dashed border-l-2 border-l-slate-400'>
              <p className='text-right text-gray-500'>ID: {booking.id}</p>
              <div className='text-end'>
                <p className='body2 text-primary'>{t('Total price')}</p>
                <p className='heading4-semi-bold x-hotel-main'>{booking.total_amount}đ</p>
                <button className='xhotel-primary button hidden w-[124px] medium' type='button'>
                  Đặt lại
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListRoom;

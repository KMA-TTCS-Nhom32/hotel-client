'use client';
import { useTranslation } from '@/i18n/client';
import { formatCurrency } from '@/lib/funcs/currency';
import { getPrice } from '@/lib/funcs/price';
import { cancelBooking } from '@/services/auth';
import Image from 'next/image';
import { useState } from 'react';

interface RoomDetail {
  thumbnail: { url: string };
  name: string;
  branch: { name: string; address: string };
}

interface Booking {
  id: string;
  code: string;
  status: string;
  room: { detail?: RoomDetail };
  start_date: string;
  end_date: string;
  total_amount: string;
}

interface ListRoomProps {
  lng: string;
  bookings: Booking[];
}

const ListRoom = ({ lng, bookings: initialBookings }: ListRoomProps) => {
  const { t } = useTranslation(lng, 'myreservation');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [showAlert, setShowAlert] = useState(false);
  const totalPages = Math.ceil(initialBookings.length / itemsPerPage);
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = initialBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handleCancel = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!cancelReason || cancelReason.trim() === '') {
      setShowAlert(true);
      setShowModal(false);
      return;
    }

    setLoadingId(currentBookingId);
    setErrorMessage(null);

    const payload = { cancel_reason: cancelReason };

    try {
      await cancelBooking(currentBookingId as string, payload);
      window.location.reload();
    } catch (error) {
      setErrorMessage(t('Cancel room installation failure, please try again.'));
    } finally {
      setLoadingId(null);
      setShowModal(false);
      setCancelReason('');
      setCurrentBookingId(null);
    }
  };

  return (
    <div>
      {errorMessage && <div className='text-red-500'>{errorMessage}</div>}

      {currentBookings.map((booking) => (
        <div key={booking.id} className='w-full pt-5 flex flex-col cursor-pointer sm:flex-row'>
          <div className='relative sm:w-1/3 h-full w-full'>
            <Image
              src={booking.room.detail?.thumbnail.url as string}
              alt='Room Thumbnail'
              height={100}
              width={276}
              className='h-full w-auto'
            />
            <div className='absolute top-0 right-0 m-2 px-2 py-0.5 bg-pink-200 rounded-2xl'>
              <span className='text-red-500 text-center text-sm'>{t(booking.status as any)}</span>
            </div>
          </div>
          <div className='sm:flex sm:justify-between flex-row w-full'>
            <div className='flex flex-col py-2 px-3 gap-2 justify-between w-full sm:w-2/3'>
              <p className='text-xs text-gray-500'>Thuộc đơn: {booking.code}</p>
              <div>
                <div className='mb-1 text-lg font-medium'>
                  <p>{booking.room.detail?.name || 'Room Name'}</p>
                </div>
                <div>
                  <p>
                    <span className='uppercase text-sm text-orange-500'>
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
                  <div className='flex flex-col flex-1 gap-[4px] py-[8px] px-[16px] rounded-[8px] border border-solid border-gray-500'>
                    <p>{t('Check-in')}</p>
                    <h5>{new Date(booking.start_date).toLocaleDateString()}</h5>
                  </div>
                </div>
                <div className='flex items-center gap-[12px] sm:w-1/2 max-sm:w-full'>
                  <div className='flex flex-col flex-1 gap-[4px] py-[8px] px-[16px] rounded-[8px] border border-solid border-gray-500'>
                    <p>{t('Check-out')}</p>
                    <h5>{new Date(booking.end_date).toLocaleDateString()}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:w-3/12 w-full flex flex-col justify-between item-end sm:border-dashed border-l-2 border-l-slate-400'>
              <p className='text-right text-gray-500'>ID: {booking.code}</p>
              <div className='text-end'>
                <p className='body2 text-primary'>{t('Total price')}</p>
                <p className='heading4-semi-bold x-hotel-main'>{formatCurrency(booking.total_amount) }đ</p>
                {booking.status === 'PENDING' && (
                  <button
                    className='medium bg-red-500 text-white rounded px-4 py-2'
                    type='button'
                    onClick={() => handleCancel(booking.id)}
                    disabled={loadingId === booking.id}
                    aria-label={`Hủy đặt phòng ${booking.id}`}
                  >
                    {loadingId === booking.id ? t('Processing...') : t('cancel')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className='flex items-center justify-center mt-4'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 rounded-lg text-sm ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white'} transition duration-200`}
          >
            Previous
          </button>

          <span className='text-gray-700 text-sm'>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-2 rounded-lg text-sm ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white'} transition duration-200`}
          >
            Next
          </button>
        </div>
      )}
      {showAlert && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 w-80'>
            <h2 className='text-lg font-bold mb-4'>{t('Notification')}</h2>
            <p>{t('Cancellation reason is required')}</p>
            <div className='flex justify-end mt-4'>
              <button
                onClick={() => setShowAlert(false)}
                className='bg-orange-500 text-white rounded px-4 py-2'
              >
                'OK'
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 w-80'>
            <h2 className='text-lg font-bold mb-4'>Nhập lý do hủy</h2>
            <input
              type='text'
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder={t('Reason for cancellation')}
              className='border border-gray-300 rounded w-full p-2 mb-4'
            />
            <div className='flex justify-between'>
              <button
                onClick={handleConfirmCancel}
                className='bg-orange-500 text-white rounded px-4 py-2'
              >
                {t('confirm')}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className='bg-gray-300 text-black rounded px-4 py-2'
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListRoom;

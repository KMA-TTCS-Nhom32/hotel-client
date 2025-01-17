'use client';
import TabNavList from './tab-nav-list';
import ListRoom from './ListRoom';
import { useTranslation } from '@/i18n/client';
import { getMyBooking } from '@/services/auth';
import { useRequest } from 'ahooks';
import NoBookings from './ListRoom/noBookings';
import { useState } from 'react';
interface PageMyReservationInforProps {
  lng: string;
}

const PageMyReservationInfor = ({ lng }: PageMyReservationInforProps) => {
  const { t } = useTranslation(lng);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { data, error, loading } = useRequest(getMyBooking);
  const bookings = data?.data.data ?? [];
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'Upcoming')
      return (
        booking.status === 'PENDING' ||
        booking.status === 'CHECKED_IN' ||
        booking.status === 'WAITING_FOR_CHECK_IN'
      );
    if (activeTab === 'Completed') return booking.status === 'COMPLETED';
    if (activeTab === 'Cancelled')
      return (
        booking.status === 'CANCELLED' ||
        booking.status === 'REJECTED' ||
        booking.status === 'REFUNDED'
      );
    return true;
  });
  return (
    <div className='bg-white px-3 py-4 rounded-2xl w-full'>
      <TabNavList lng={lng} onTabChange={setActiveTab} />{' '}
      {filteredBookings.length === 0 ? (
        <NoBookings lng={lng} />
      ) : (
        <ListRoom lng={lng} bookings={filteredBookings as any} />
      )}{' '}
    </div>
  );
};

export default PageMyReservationInfor;

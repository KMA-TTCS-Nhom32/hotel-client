'use client';
import TabNavList from './tab-nav-list';
import ListRoom from './ListRoom';
import { useTranslation } from '@/i18n/client';
import { getMyBooking } from '@/services/auth';
import { useRequest } from 'ahooks';
import NoBookings from './ListRoom/noBookings';
import { useEffect, useState } from 'react';
import { FilterMyBookingsDto } from '@ahomevilla-hotel/node-sdk';
import LoadingSection from '@/components/Common/LoadingSection';
interface PageMyReservationInforProps {
  lng: string;
}

const PageMyReservationInfor = ({ lng }: PageMyReservationInforProps) => {
  const { t } = useTranslation(lng, 'myreservation');
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  const getStatuses = (activeTab: string) => {
    return activeTab === 'Upcoming'
      ? ['PENDING', 'CHECKED_IN', 'WAITING_FOR_CHECK_IN']
      : activeTab === 'Completed'
        ? ['COMPLETED']
        : ['CANCELLED', 'REJECTED', 'REFUNDED'];
  };

  const { data, loading, refresh } = useRequest(
    () => {
      return getMyBooking({
        page: currentPage,
        pageSize: 5,
        filters: JSON.stringify({
          status: getStatuses(activeTab),
        } as FilterMyBookingsDto),
      });
    },
    {
      refreshDeps: [currentPage],
    },
  );

  useEffect(() => {
    setCurrentPage(1);
    refresh();
  }, [activeTab]);

  return (
    <div className='bg-white px-3 py-4 rounded-2xl w-full'>
      <TabNavList lng={lng} activeTab={activeTab} onTabChange={setActiveTab} />

      {loading ? <LoadingSection /> : <>{<ListRoom t={t} bookings={data?.data.data ?? []} />}</>}
      {data?.data.data.length === 0 ? (
        <NoBookings lng={lng} />
      ) : (
        <div className='flex items-center justify-center mt-4'>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 rounded-lg text-sm ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white'} transition duration-200`}
          >
            Previous
          </button>

          <span className='text-gray-700 text-sm'>
            Page {currentPage} of {data?.data.meta.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === data?.data.meta.totalPages}
            className={`px-4 py-2 mx-2 rounded-lg text-sm ${currentPage === data?.data.meta.totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white'} transition duration-200`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PageMyReservationInfor;

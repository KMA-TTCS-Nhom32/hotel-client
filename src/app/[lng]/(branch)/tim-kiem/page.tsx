'use client';

import React, { useState } from 'react';
import { useRequest, useUpdateEffect } from 'ahooks';
import { useInView } from 'react-intersection-observer';

import styles from './index.module.scss';

import { useTranslation } from '@/i18n/client';
import Filter from '@/components/SearchRoomPage/RoomList/Filter';
import RoomCard from '@/components/SearchRoomPage/RoomList/RoomCard';
import Sidebar from '@/components/SearchRoomPage/Sidebar';
import Container from '@/components/Common/Container';
import { RoomSkeleton } from '@/components/SearchRoomPage/RoomList/Skeleton';
import { getRoomDetailInfiniteService } from '@/services/room-detail';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import { FilterRoomDetailDto, RoomDetail } from '@ahomevilla-hotel/node-sdk';
import { formatBookingDateTime } from '@/lib/funcs/date';

interface SearchPageProps {
  params: { lng: string; slug: string };
}

export default function ({ params: { lng } }: Readonly<SearchPageProps>) {
  const { bookingTime, customerAmount, province } = useSearchBarStore((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [haveNextPage, setHaveNextPage] = useState(true);
  const [priceRange, setPriceRange] = useState<number[] | undefined>(undefined);

  const [roomDetails, setRoomDetails] = useState<RoomDetail[]>([]);

  const { t } = useTranslation(lng, 'searchroom');

  const { ref, inView } = useInView();

  const { loading: getRoomDetailLoading, refresh } = useRequest(
    () => {
      const { startTime, startDate, endTime, endDate } = formatBookingDateTime(
        bookingTime.checkIn,
        bookingTime.checkOut,
      );

      return getRoomDetailInfiniteService({
        pageSize: 10,
        page: currentPage,
        filters: JSON.stringify({
          bookingType: bookingTime.type,
          minPrice: priceRange ? String(priceRange[0]) : undefined,
          maxPrice: priceRange ? String(priceRange[1]) : undefined,
          adults: customerAmount.adult,
          children: customerAmount.child,
          provinceSlug: province,
          startDate,
          endDate,
          startTime,
          endTime,
        } as FilterRoomDetailDto),
      });
    },
    {
      onSuccess: ({ data }) => {
        setRoomDetails([...roomDetails, ...data.data]);
        setHaveNextPage(data.hasNextPage);
      },
      refreshDeps: [currentPage],
    },
  );

  useUpdateEffect(() => {
    if (inView && haveNextPage && !getRoomDetailLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView]);

  useUpdateEffect(() => {
    setCurrentPage(1);
    setRoomDetails([]);
    refresh();
  }, [priceRange, bookingTime, customerAmount, province]);

  return (
    <Container className={styles.page_container}>
      <div className='min-h-screen flex-grow'>
        <Filter lng={lng} />
        <div className='min-h-screen flex flex-col gap-5'>
          {currentPage === 1 && getRoomDetailLoading && (
            <>
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
            </>
          )}
          {roomDetails.map((room) => (
            <RoomCard key={room.id} room={room} bookingType={bookingTime.type} t={t} />
          ))}
          {getRoomDetailLoading && (
            <>
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
            </>
          )}
        </div>
      </div>
      <div className='flex-grow'>
        <Sidebar lng={lng} onChangePriceRange={setPriceRange} />
      </div>

      <div id='children' className='h-1' ref={ref} />
    </Container>
  );
}

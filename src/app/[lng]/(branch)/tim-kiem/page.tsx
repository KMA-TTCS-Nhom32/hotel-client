'use client';

import Filter from '@/components/SearchRoomPage/RoomList/Filter';
import RoomCard from '@/components/SearchRoomPage/RoomList/RoomCard';
import Sidebar from '@/components/SearchRoomPage/Sidebar';
import React, { useState } from 'react';
import styles from './index.module.scss';
import Container from '@/components/Common/Container';
import { useDebounce, useInViewport, useRequest, useUpdateEffect } from 'ahooks';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [haveNextPage, setHaveNextPage] = useState(true);
  const [priceRange, setPriceRange] = useState<number[] | undefined>(undefined);

  const [roomDetails, setRoomDetails] = useState<RoomDetail[]>([]);

  const [inViewport, ratio] = useInViewport(() => document.getElementById('children'), {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    root: () => document.getElementById('parent'),
  });

  const debounceInViewport = useDebounce(inViewport, { wait: 300 });

  const { loading: getRoomDetailLoading } = useRequest(
    () => {
      const { startTime, startDate, endTime, endDate } = formatBookingDateTime(
        bookingTime.checkIn,
        bookingTime.checkOut,
      );

      return getRoomDetailInfiniteService({
        pageSize: 10,
        page: currentPage,
        filters: JSON.stringify({
          minPrice: priceRange?.[0],
          maxPrice: priceRange?.[1],
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
      refreshDeps: [currentPage, priceRange, bookingTime, customerAmount, province],
    },
  );

  useUpdateEffect(() => {
    if (debounceInViewport && haveNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [debounceInViewport]);

  return (
    <Container className={styles.page_container} id='parent'>
      <div className='flex-grow'>
        <Filter lng={lng} />
        <div className='min-h-screen flex flex-col gap-5'>
          {roomDetails.map((room) => (
            <RoomCard key={room.id} room={room} bookingType={bookingTime.type} />
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

      <div id='children' className='h-1' />
    </Container>
  );
}

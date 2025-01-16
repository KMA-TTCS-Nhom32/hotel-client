'use client';

import Filter from '@/components/SearchRoomPage/RoomList/Filter';
import RoomCard from '@/components/SearchRoomPage/RoomList/RoomCard';
import Sidebar from '@/components/SearchRoomPage/Sidebar';
import React, { use, useState } from 'react';
import styles from './index.module.scss';
import Container from '@/components/Common/Container';
import { getRoomDetailService } from '@/services/roomdetail';
import { useRequest } from 'ahooks';
import { RoomSkeleton } from '@/components/SearchRoomPage/RoomList/Skeleton';

interface SearchPageProps {
  params: { lng: string; slug: string };
}

export default function ({ params: { lng } }: Readonly<SearchPageProps>) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: getRoomDetailResponse, loading: getRoomDetailLoading } = useRequest(
    () => {
      return getRoomDetailService({
        pageSize: 10,
        page: currentPage,
      });
    },
    {
      refreshDeps: [currentPage],
    },
  );

  return (
    <Container className={styles.page_container}>
      <div className='flex-grow'>
        <Filter lng={lng} />
        <div>
          {getRoomDetailLoading && (
            <>
              <RoomSkeleton />
              <RoomSkeleton />
              <RoomSkeleton />
            </>
          )}
          {getRoomDetailResponse?.data.data.map((room) => <RoomCard room={room} />)}
        </div>
        <RoomSkeleton />
      </div>
      <div className='flex-grow'>
        <Sidebar lng={lng} />
      </div>
    </Container>
  );
}

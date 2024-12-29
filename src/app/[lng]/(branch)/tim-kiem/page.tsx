import Filter from '@/components/SearchRoomPage/RoomList/Filter';
import RoomCard from '@/components/SearchRoomPage/RoomList/RoomCard';
import Sidebar from '@/components/SearchRoomPage/Sidebar';
import React from 'react';
import styles from './index.module.scss';
import Container from '@/components/Common/Container';

interface BranchDetailPageProps {
  params: { lng: string; slug: string };
}

const BranchDetailPage = ({ params: { lng, slug } }: BranchDetailPageProps) => {
  console.log(lng, slug);
  return (
    <Container className={styles.page_container}>
      <div className='flex-grow'>
        <Filter />
        <RoomCard />
      </div>
      <div className='flex-grow'>
        <Sidebar />
      </div>
    </Container>
  );
};

export default BranchDetailPage;

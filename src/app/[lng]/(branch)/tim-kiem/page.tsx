import Filter from '@/components/SearchRoomPage/RoomList/Filter';
import RoomCard from '@/components/SearchRoomPage/RoomList/RoomCard';
import Sidebar from '@/components/SearchRoomPage/Sidebar';
import React from 'react';
import styles from './index.module.scss';
import Container from '@/components/Common/Container';

interface SearchPageProps {
  params: { lng: string; slug: string };
}

const SearchPage = ({ params: { lng, slug } }: SearchPageProps) => {
  console.log(lng, slug);
  return (
    <Container className={styles.page_container}>
      <div className='flex-grow'>
        <Filter lng={lng} />
        <RoomCard />
      </div>
      <div className='flex-grow'>
        <Sidebar lng={lng} />
      </div>
    </Container>
  );
};

export default SearchPage;

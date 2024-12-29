import React from 'react';
import SideBar2 from '@/components/layouts/SideBar2';
import Container from '@/components/Common/Container';

import styles from './index.module.scss';
import HeaderBooking from '@/components/layouts/HeaderBooking';

interface BookingLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default async function BookingLayout({
  children,
  params: { lng },
}: Readonly<BookingLayoutProps>) {
  return (
    <>
      <HeaderBooking lng={lng} />
      <section className={styles.layout}>
        <Container className={styles.layoutContainer}>
          {children}
          <SideBar2 lng={lng} />
        </Container>
      </section>
    </>
  );
}

import React from 'react';
import Sidebar from '@/components/layouts/SideBar';
import Container from '@/components/Common/Containter';
import styles from './index.module.scss';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const ProfileLayout = ({ children, params: { lng } }: Readonly<ProfileLayoutProps>) => {
  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.content}>
          <Sidebar lng={lng} />
          {children}
        </div>
      </Container>
    </section>
  );
};

export default ProfileLayout;

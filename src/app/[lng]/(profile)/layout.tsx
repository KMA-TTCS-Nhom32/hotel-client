import React from 'react';

import HeaderSecondary from '@/components/layouts/HeaderSecondary';
import Sidebar from '@/components/UserComponents/SideBar';

import styles from './index.module.css';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const ProfileLayout = ({ children, params: { lng } }: Readonly<ProfileLayoutProps>) => {
  return (
    <>
      <HeaderSecondary lng={lng} />
      <div className={styles.userpage}>
        <div className={styles.inner}>
          <Sidebar lng={lng} />
          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
import HeaderSecondary from '@/components/layouts/HeaderSecondary';
import React from 'react';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const ProfileLayout = ({ children, params: { lng } }: Readonly<ProfileLayoutProps>) => {
  return (
    <>
      <HeaderSecondary lng={lng} />
      {children}
    </>
  );
};

export default ProfileLayout;

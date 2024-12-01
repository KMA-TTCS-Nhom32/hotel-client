import React from 'react';
import HeaderSecondary from '@/components/layouts/HeaderSecondary';

interface OthersLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const OthersLayout = ({ children, params: { lng } }: Readonly<OthersLayoutProps>) => {
  return (
    <>
      <HeaderSecondary lng={lng} />
      {children}
    </>
  );
};

export default OthersLayout;

import Header from '@/components/layouts/Header';
import BranchPage from '@/components/TEST/Components/BranchPage/layouts';
import IllustrationImage from '@/components/HotelComponents/IllustrationImage';
import React from 'react';

interface ServicesLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const ServicesLayout = ({ children, params: { lng } }: Readonly<ServicesLayoutProps>) => {
  return (
    <>
      <Header lng={lng} />
      {children}
    </>
  );
};

export default ServicesLayout;

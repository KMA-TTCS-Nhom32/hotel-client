import Header from '@/components/layouts/Header';
import BranchPage from '@/components/TEST/Components/BranchPage/layouts';
import IllustrationImage from '@/components/HotelComponents/IllustrationImage';
import React from 'react';

interface HomeLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default async function HomeLayout({ children, params: { lng } }: Readonly<HomeLayoutProps>) {
  return (
    <>
      <Header lng={lng} />
      {children}
    </>
  );
}

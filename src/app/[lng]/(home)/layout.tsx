import Header from '@/components/layouts/Header';
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

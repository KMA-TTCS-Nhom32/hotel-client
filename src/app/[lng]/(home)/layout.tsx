import React from 'react';
import Header from '@/components/layouts/Header';

interface HomeLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default async function HomeLayout({ children, params }: Readonly<HomeLayoutProps>) {
  const { lng } = params;

  return (
    <>
      <Header lng={lng} />
      {children}
    </>
  );
}

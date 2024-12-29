import React, { Suspense } from 'react';
import HeaderSecondary from '@/components/layouts/HeaderSecondary';
interface OthersLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const OthersLayout = async ({ children, params: { lng } }: Readonly<OthersLayoutProps>) => {
  return (
    <Suspense fallback={undefined}>
      <HeaderSecondary lng={lng} />
      <div className='mt-[65px]'>{children}</div>
    </Suspense>
  );
};
export default OthersLayout;

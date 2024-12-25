import React from 'react';

import HeaderBranch from '@/components/layouts/HeaderBranch';

interface BranchLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

const BranchLayout = ({ children, params: { lng } }: BranchLayoutProps) => {
  return (
    <>
      <HeaderBranch lng={lng} />
      {children}
    </>
  );
};

export default BranchLayout;

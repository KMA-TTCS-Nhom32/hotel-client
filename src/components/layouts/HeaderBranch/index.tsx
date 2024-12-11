import React from 'react';
import HeaderSecondary from '../HeaderSecondary';
import SearchForm from '@/components/HomeComponents/BannerSearchBar/SearchForm';
import Container from '@/components/Common/Container';

interface HeaderBranchProps {
  lng: string;
}

const HeaderBranch = ({ lng }: HeaderBranchProps) => {
  return (
    <>
      <header className='h-auto'>
        <HeaderSecondary lng={lng} className='!relative' />
      </header>
      <div className='sticky w-full bg-white top-0 mt-0 z-30 border-t border-solid border-t-gray-200 shadow-md'>
        <Container>
          <SearchForm lng={lng} className='!max-w-full sm:!px-0' />
        </Container>
      </div>
    </>
  );
};

export default HeaderBranch;

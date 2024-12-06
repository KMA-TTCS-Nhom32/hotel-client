import React from 'react';

import { Resources, TFunction } from 'i18next';

import TopSearchBar from '@/components/HomeComponents/BannerSearchBar';
import TopAdvertisement from '@/components/HomeComponents/Advertisement/Advertisement';
import BranchList from '@/components/HomeComponents/BranchList/BranchList';
import FooterImage from '@/components/HomeComponents/Advertisement/FooterImage';

import Gallery from '../Gallery';

interface HomePageProps {
  t: TFunction<keyof Resources, undefined>;
  lng: string;
}

const HomePage = ({ t, lng }: HomePageProps) => {
  return (
    <main>
      <TopSearchBar t={t} lng={lng} />

      <TopAdvertisement t={t} />

      <BranchList />
      <FooterImage t={t} />
      <Gallery t={t} />
    </main>
  );
};

export default HomePage;

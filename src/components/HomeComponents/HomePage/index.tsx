import React from 'react';

import Image from 'next/image';
import { Resources, TFunction } from 'i18next';

import TopSearchBar from '@/components/HomeComponents/BannerSearchBar';
import Container from '@/components/HomeComponents/Advertisement/Advertisement';
import BranchList from '@/components/HomeComponents/BranchList/BranchList';
import FooterImage from '@/components/FooterImage';

import styles from './index.module.scss';
import Gallery from '../Gallery';

interface HomePageProps {
  t: TFunction<keyof Resources, undefined>;
  lng: string;
}

const HomePage = ({ t, lng }: HomePageProps) => {
  return (
    <main>
      <div className={styles.header_banner_container}>
        <Image alt='banner' src='/images/banner_1.webp' width={1920} height={600} />

        {/* Banner Section */}
        <TopSearchBar lng={lng} />
      </div>

      {/* Container Section */}
      <Container t={t} />

      {/* Branch List Section */}
      {/* <BranchList /> */}

      {/* Footer Image Section */}
      {/* <FooterImage lng={lng} t={t} /> */}
      <BranchList />
      <FooterImage t={t} />
      <Gallery t={t} />
    </main>
  );
};

export default HomePage;

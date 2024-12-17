'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';
import styles from './index.module.scss';
import BreadCrumb from '../../../HotelComponents/Breadcrumb';
import IllustrationImage from '../../../HotelComponents/IllustrationImage';
import Tabs from '../../../HotelComponents/HotelCard/tab'
import HomePage from '../../../HotelComponents/HotelCard/homepage';

interface BranchPageProps {
  lng: string;
}

const BranchPage = ({ lng }: Readonly<BranchPageProps>) => {
  const { t } = useTranslation(lng);
  return (
    <div className={styles.brandpage_contents}>
      <BreadCrumb />
      <IllustrationImage />
      <Tabs />
      <HomePage />
    </div>
  );
};

export default BranchPage;

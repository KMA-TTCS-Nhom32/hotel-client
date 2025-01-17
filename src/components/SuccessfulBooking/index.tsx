'use client';

import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import Container from '@/components/Common/Container';
import { CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes.constant';

interface SuccessfulBookingProps {
  lng: string;
}

const SuccessfulBooking = ({ lng }: SuccessfulBookingProps) => {
  const { t } = useTranslation(lng, 'payment');

  return (
    <Container className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.topIcon}>
          <CircleCheckBig />
        </div>
        <div className={styles.notification}>
          <h1 className={styles.title}>{t('inform.title')}</h1>
          <span className={styles.subtitle}>
            <p>{t('inform.subtitle1')}</p>
            <p>{t('inform.subtitle2')}</p>
          </span>
        </div>
        <div className={styles.confirm_btn}>
          <Link href={APP_ROUTES.Home}>
            <button className={styles.okButton}>{t('inform.button')}</button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SuccessfulBooking;

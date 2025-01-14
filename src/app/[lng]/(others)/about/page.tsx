'use client';

import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

import GalleryImages from '@/components/HomeComponents/Gallery';
import Advertisement from '@/components/HomeComponents/Advertisement/Advertisement';

interface AboutProps {
  params: {
    lng: string;
  };
}

const About = ({ params: { lng } }: Readonly<AboutProps>) => {
  const { t } = useTranslation(lng, 'about');
  return (
    <div>
      <div className={styles.topPart}>
        <span>{t('about.subtitle')}</span>
        <h2 className={cn(styles.title, 'text-center')}> {t('about.title')} </h2>
        <p className={styles.para}>{t('about.para')}</p>
      </div>

      <section className={styles.advertisement}>
        <Advertisement t={t} />
      </section>

      <section className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.subtitle2}>
            <span className={styles.subtitle2}>{t('about.subtitle2')}</span>
          </div>
          <span className={styles.title2}>{t('about.title2')}</span>
          <p className={cn(styles.para2, 'pb-40')}>{t('about.para2')}</p>
        </div>
      </section>

      <section className={styles.gallery}>
        <GalleryImages t={t} />
      </section>
    </div>
  );
};

export default About;

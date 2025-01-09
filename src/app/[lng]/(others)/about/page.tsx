'use client';

import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

interface AboutProps {
  params: {
    lng: string;
  };
}

const About = ({ params: { lng } }: Readonly<AboutProps>) => {
  const {t} = useTranslation(lng, 'about');
  return (
    <div className='min-h-screen'>
      <div className={styles.topPart}>
        <span>{t('about.subtitle')}</span>
        <h2 className={cn(styles.title, 'text-center')}> {t('about.title')} </h2>
        <p className={styles.para}>{t('about.para')}</p>
      </div>

      <section className={styles.banner}>
        <div className={styles.container}>
            <span className={styles.subtitle}>{t('about.subtitle')}</span>
            <span className={styles.title}>{t('about.title')}</span>
            <p className={styles.para}>{t('about.para')}</p>
        </div>
      </section>
    </div>
  )
}

export default About
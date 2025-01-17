import React from 'react';
import styles from './index.module.scss';
import Container from '../Common/Container';
import Advertisement from '../HomeComponents/Advertisement/Advertisement';
import Gallery from '../HomeComponents/Gallery';
import { cn } from '@/lib/utils';
import { AppTranslationFunction } from '@/lib/types/i18n';

interface AboutPageProps
 {
  lng: string;
  t: AppTranslationFunction;
}
const AboutPage = ({ lng, t }: AboutPageProps) => {

  return (
    <>
      <Container className={styles.topPart}>
        <span>{t('about.subtitle')}</span>
        <h2 className={cn(styles.title, 'text-center')}>{t('about.title')}</h2>
        <p className={styles.para}>{t('about.para')}</p>
      </Container>
      <section className={styles.advertisement}>
        <Advertisement t={t} />
      </section>
      <section className={styles.banner}>
        <div className={styles.container}>
          <span className={styles.subtitle2}>{t('about.subtitle2')}</span>
          <span className={styles.title2}>{t('about.title2')}</span>
          <p className={cn(styles.para2, 'pb-40')}>{t('about.para2')}</p>
        </div>
      </section>
      <section className={styles.gallery}>
        <Gallery t={t} />
      </section>
    </>
  );
};

export default AboutPage;

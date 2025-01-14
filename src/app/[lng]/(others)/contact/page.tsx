'use client';

import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

import Advertisement from '@/components/HomeComponents/Advertisement/Advertisement';
import TierBenefit from '@/components/Citizen/TierBenefitContainer';
import GalleryImages from '@/components/HomeComponents/Gallery';
import { Headset, Mails, MessageCircleMore } from 'lucide-react';

interface ContactProps {
  params: {
    lng: string;
  };
}

const Contact = ({ params: { lng } }: Readonly<ContactProps>) => {
  const { t } = useTranslation(lng, 'about');

  return (
    <div className=''>
      <div className={styles.container}>
        <section className={cn(styles.Contact)}>
          <h1>{t('contact.contact')}</h1>
          <div className={styles.content}>
            <div className={styles.needhelp}>
              <span>
                <Headset className={styles.helpIcon} />
              </span>
              <h2 className={styles.helpSubtitle}>{t('contact.byphone')}</h2>
              <p>{t('contact.phonedesc')}</p>
            </div>
            <div className={styles.needhelp}>
              <span>
                <MessageCircleMore className={styles.helpIcon} />
              </span>
              <h2 className={styles.helpSubtitle}>{t('contact.chat')}</h2>
              <p>{t('contact.chatdesc')}</p>
            </div>
          </div>
        </section>

        <section className={cn(styles.intro)}>
          <div className={styles.title}>{t('contact.title')}</div>
          <div className={styles.para}>{t('contact.para1')}</div>
          <div className={styles.para}>{t('contact.para2')}</div>
          <div className={styles.para}>{t('contact.para3')}</div>
          <div className={styles.para}>{t('contact.para4')}</div>
        </section>
      </div>

      <section className={styles.gallery}>
        <GalleryImages t={t} />
      </section>
    </div>
  );
};

export default Contact;

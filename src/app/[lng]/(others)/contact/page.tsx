import React from 'react';
import styles from './index.module.scss';
import { cn } from '@/lib/utils';

import GalleryImages from '@/components/HomeComponents/Gallery';
import { Headset, MessageCircleMore } from 'lucide-react';
import { createTranslation } from '@/i18n';

interface ContactProps {
  params: {
    lng: string;
  };
}

const Contact = async ({ params: { lng } }: Readonly<ContactProps>) => {
  const { t } = await createTranslation(lng, 'about');

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
    </div>
  );
};

export default Contact;

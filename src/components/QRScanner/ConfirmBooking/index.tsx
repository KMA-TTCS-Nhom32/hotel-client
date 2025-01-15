'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';
import styles from './index.module.scss';
import Container from '@/components/Common/Container';
import { CircleAlert, Clock, Download } from 'lucide-react';

interface ConfirmBookingProps {
  lng: string;
}

const ConfirmBooking = ({ lng }: ConfirmBookingProps) => {
  const { t } = useTranslation(lng, 'payment');

  return (
    <Container>
      <div className={styles.contents}>
        <div className={styles.scan_to_pay_text}>{t('confirm.title')}</div>
        <div className={styles.expired_time}>
          <div className={styles.expired_label}>{t('confirm.expire')}</div>
          <div className={styles.time_countdown}>
            <Clock className={styles.icon} />
            <div className={styles.time_container}>
              <div>10</div>:<div>00</div>
            </div>
          </div>
        </div>
        <div className={styles.QR_scanner}>
          <img src='https://qrcode-gen.com/images/qrcode-default.png' width={242} height={242} />
        </div>
        <div className={styles.saveQR}>
          <button className={styles.button}>
            <Download className={styles.icon} /> {t('confirm.save')}
          </button>
        </div>
        <div className={styles.note}>
          <CircleAlert className={styles.icon} />
          {t('confirm.note')}
        </div>
      </div>

      <div className={styles.inquiry}>
        <div className={styles.text}>{t('inquiry.title')}</div>
        <div className={styles.body}>
          <div className={styles.body_items}>{t('inquiry.text1')}</div>
          <div className={styles.body_items}>{t('inquiry.text2')}</div>
          <div className={styles.body_items}>{t('inquiry.text3')}</div>
        </div>
      </div>
    </Container>
  );
};

export default ConfirmBooking;

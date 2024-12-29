'use client';

import React, { useState } from 'react';

import { Ticket } from 'lucide-react';

import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

import styles from './index.module.scss';

interface PaymentDetailProps {
  lng: string;
}

const PaymentDetail = ({ lng }: PaymentDetailProps) => {
  const { t } = useTranslation(lng, 'searchroom');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: 'method1',
      label: t('payment.method_option1'),
      image: '/images/payment/Logo-TPBank.webp',
    },
    {
      id: 'method2',
      label: t('payment.method_option2'),
      image: '/images/payment/1622013240_vtc-pay-la-gi-1.png',
    },
    {
      id: 'method3',
      label: t('payment.method_option3'),
      image:
        '/images/payment/kisspng-logo-brand-payment-image-product-design-cufflins-the-sultans-of-swag-1713950042775.webp',
    },
    {
      id: 'method4',
      label: t('payment.method_option4'),
      image: '/images/payment/360_F_816534453_nMDnApiGPNgXjo5YDbLvOPViHwWksGIy.jpg',
    },
  ];

  return (
    <div className={styles.main_content}>
      <div className={styles.payment_method_section}>
        <h2 className={styles.payment_method_title}>{t('payment.method_title')}</h2>

        <div className={cn(styles.payment_method, 'pt-3 md:pt-4')}>
          {paymentMethods.map((method) => (
            <div key={method.id} className={styles.method_container}>
              <div className={cn(styles.method_body)}>
                <div className='flex align-middle md:flex-row'>
                  <div className={styles.radio}>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value={method.id}
                      className={styles.radio_input}
                      onChange={() => setSelectedMethod(method.id)}
                      checked={selectedMethod === method.id}
                    />
                  </div>
                  <div className={cn(styles.method_body_item, 'flex justify-between items-center')}>
                    <div className={styles.method_body_item__label}>{method.label}</div>
                    <div className={styles.method_body_item__image}>
                      <span className='inline-block cursor-pointer'>
                        <img
                          src={method.image}
                          alt={t('payment.img')}
                          title={t('payment.img')}
                          width={100}
                          height={30}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedMethod === method.id && (
                <div className={styles.payment_method_note_container}>
                  <div className={styles.payment_method_note}>
                    <div className={styles.payment_note}>
                      <ul>
                        <li>{t('payment.note_1')}</li>
                        <li>{t('payment.note_2')}</li>
                        <li>{t('payment.note_3')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={cn(styles.payment_coupon, 'flex flex-col')}>
        <div className='flex items-center mb-4'>
          <div className={cn(styles.promotion_icon, 'mr-2')}>
            <Ticket />
          </div>
          <div className={styles.promotion_title}>{t('payment.promotion_title')}</div>
        </div>
        <div className='flex items-center'>
          <div className='flex-1'>
            <input
              type='text'
              className={styles.form_control}
              placeholder={t('payment.input_text')}
            />
          </div>
          <button type='button' className={cn(styles.payment_promotion_apply_button, 'ml-2 px-4')}>
            {t('payment.promotion_apply_button')}
          </button>
        </div>
      </div>

      <div className={cn(styles.payment_detail, 'flex flex-col')}>
        <div className={styles.detail_payment_title}>{t('payment.detail_title')}</div>
        <div className={styles.div_line}></div>
        <div className={cn(styles.room_info_container, 'flex justify-between')}>
          <div className={styles.room_info}>{t('payment.room_info')}</div>
          <div className={styles.room_info}>{t('payment.room_price')}</div>
        </div>
        <div className={cn(styles.total_price_container, 'flex justify-between')}>
          <div className={styles.total_price}>{t('payment.total_price_title')}</div>
          <div className={styles.total_price}>{t('payment.total_price')}</div>
        </div>
      </div>

      <div className='flex flex-col'>
        <button className={styles.submit_button}>
          {selectedMethod
            ? `${t('payment.submit')} ${paymentMethods.find((method) => method.id === selectedMethod)?.label}`
            : t('payment.submit')}
        </button>
        <div className={cn(styles.note_text, 'text-center')}>{t('payment.note_text')}</div>
      </div>
    </div>
  );
};

export default PaymentDetail;

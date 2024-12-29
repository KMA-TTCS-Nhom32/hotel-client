// Adjusted BookingForm Component
'use client';

import React from 'react';
import { User, BookUp } from 'lucide-react';

import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';
import styles from './index.module.scss';

import { Textarea } from '@/components/ui/textarea';

interface BookingFormProps {
  lng: string;
}

const BookingForm = ({ lng }: BookingFormProps) => {
  const { t } = useTranslation(lng, 'searchroom');
  
  return (
    <div className={styles.booking_container}>
      <div className={styles.booking_title}>{t('booking.title')}</div>
      <div className={styles.booking_subtitle}>{t('booking.subtitle')}</div>

      <div className={styles.booking_alert}>
        <span className='inline-block rounded-full bg-[#dadada] p-1 max-w-full'>
          <User className={styles.icon} />
        </span>
        <div className='flex flex-row gap-3 flex-1 items-center'>
          <div>
            <p className={styles.citizen_text}>
              {t('booking.citizen_text')}
              <span className={styles.citizen_text2}>{t('booking.citizen_text2')}</span>
            </p>
            <p className={styles.citizen_subtext}>{t('booking.citizen_subtext')}</p>
          </div>
          <div className={styles.citizen_level}>
            <BookUp className={styles.icon_small} />
            <span>{t('booking.citizen_level_label')}</span>
          </div>
        </div>
      </div>

      <div className={styles.contact_section}>
        <h2 className={styles.form_section_title}>{t('booking.contact')}</h2>
        <p className={styles.form_note}>{t('booking.contact_alert')}</p>

        <div className={styles.input_group}>
          <label className={styles.input_label}>
            {t('booking.input_label')} <span className={styles.required_icon}>*</span>
          </label>
          <input
            type='text'
            placeholder={t('booking.nameinput_placeholder')}
            className={styles.form_control}
          />
          <span className={styles.input_note}>
            {t('booking.input_note')}{' '}
            <a href='#' className={styles.link}>
              {t('booking.input_note_link')}
            </a>
          </span>
        </div>

        <div className={styles.flex_row}>
          <div className={styles.input_group_half}>
            <div className={styles.input_email}>
              <label className={styles.input_label}>
                {t('booking.email_label')} <span className={styles.required_icon}>*</span>
              </label>
              <input
                type='email'
                placeholder={t('booking.email_placeholder')}
                className={styles.form_control}
              />
              <span className={styles.email_note}>{t('booking.email_note')}</span>
            </div>
          </div>

          <div className={styles.input_group_half}>
            <div className={styles.input_phonenumber}>
              <label className={styles.input_label}>
                {t('booking.phone_label')} <span className={styles.required_icon}>*</span>
              </label>
              <input
                type='tel'
                placeholder={t('booking.phone_placeholder')}
                className={styles.form_control}
              />
            </div>
          </div>
        </div>
        <div className={cn(styles.guest_switch, 'flex')}>
          {/* <div className={styles.radio_group}>
            <label className={styles.radio_item}>
              <input type='radio' name='guest' value='self' className={styles.radio_input} />
              {t('booking.guest_switch_option1')}
            </label>
          </div>
          <div className={styles.radio_group}>
            <label className={styles.radio_item}>
              <input type='radio' name='guest' value='other' className={styles.radio_input} />
              {t('booking.guest_switch_option2')}
            </label>
          </div> */}
        </div>
      </div>

      <div className={styles.special_requirements}>
        <h2 className={styles.form_section_title}>{t('booking.srtitle')}</h2>
        <p className={styles.form_note}>{t('booking.srsubtitle')}</p>
        <Textarea placeholder={t('booking.textarea')} />
      </div>

      <div className={styles.submit_section}>
        <button className={styles.submit_button}>{t('booking.submit')}</button>
      </div>
    </div>
  );
};

export default BookingForm;

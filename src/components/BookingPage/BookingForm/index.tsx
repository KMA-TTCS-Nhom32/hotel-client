// Adjusted BookingForm Component
'use client';

import Link from 'next/link';
import React from 'react';
import { User, BookUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './index.module.scss';

import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';
import { APP_ROUTES } from '@/constants/routes.constant';
import { BookingFormValues, bookingSchema } from '@/lib/validators/booking';

import { useProfileStore } from '@/providers/profile-store-provider';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  lng: string;
}

const BookingForm = ({ lng }: BookingFormProps) => {
  const { t } = useTranslation(lng, 'booking');
  const { push } = useRouter();
  const { profile } = useProfileStore((state) => state);
  const { bookingInfo, setBookingInfo } = useBookingStore((state) => state);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      email: profile?.email ?? bookingInfo.email,
      phone: profile?.phone ?? bookingInfo.phone,
      special_requests: bookingInfo.special_requests,
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    setBookingInfo(values);
    push(APP_ROUTES.Payment);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.booking_container}>
        <div className={styles.booking_title}>{t('title')}</div>
        <div className={styles.booking_subtitle}>{t('subtitle')}</div>

        <div className={styles.booking_alert}>
          <span className='inline-block rounded-full bg-[#dadada] p-1 max-w-full'>
            <User className={styles.icon} />
          </span>
          <div className='flex flex-row justify-between flex-1 items-center'>
            <div>
              <p className={styles.citizen_text}>
                {t('booking.citizen_text', {
                  name: profile?.name,
                })}
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
            <Input
              type='text'
              placeholder={t('booking.nameinput_placeholder')}
              className={styles.form_control}
              value={profile?.name}
              disabled
            />
            <span className={styles.input_note}>
              {t('booking.input_note')}{' '}
              <a href={APP_ROUTES.AccountInfor} className={styles.link}>
                {t('booking.input_note_link')}
              </a>
            </span>
          </div>

          <div className={styles.flex_row}>
            <div className={styles.input_group_half}>
              <div className={styles.input_email}>
                {profile?.verified_email ? (
                  <>
                    <label className={styles.input_label}>
                      {t('booking.email_label')} <span className={styles.required_icon}>*</span>
                    </label>
                    <Input
                      type='email'
                      value={profile?.email}
                      disabled
                      className={styles.form_control}
                    />
                  </>
                ) : (
                  <InputText<BookingFormValues>
                    control={form.control}
                    name='email'
                    label={
                      <label className={styles.input_label}>
                        {t('booking.email_label')} <span className={styles.required_icon}>*</span>
                      </label>
                    }
                    placeholder={t('booking.email_placeholder')}
                    className={styles.form_control}
                    t={t}
                  />
                )}
                <span className={styles.email_note}>{t('booking.email_note')}</span>
              </div>
            </div>

            <div className={styles.input_group_half}>
              <div className={styles.input_phonenumber}>
                {profile?.verified_phone ? (
                  <>
                    <label className={styles.input_label}>
                      {t('booking.phone_label')} <span className={styles.required_icon}>*</span>
                    </label>
                    <Input
                      value={profile?.phone}
                      placeholder={t('booking.phone_placeholder')}
                      className={styles.form_control}
                      disabled
                    />
                  </>
                ) : (
                  <InputText<BookingFormValues>
                    control={form.control}
                    name='phone'
                    label={
                      <label className={styles.input_label}>
                        {t('booking.phone_label')} <span className={styles.required_icon}>*</span>
                      </label>
                    }
                    placeholder={t('booking.phone_placeholder')}
                    className={styles.form_control}
                    t={t}
                  />
                )}
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
          {/* <h2 className={styles.form_section_title}>{t('booking.srtitle')}</h2>
          <p className={styles.form_note}>{t('booking.srsubtitle')}</p> */}
          <InputText<BookingFormValues>
            control={form.control}
            name='special_requests'
            label={
              <>
                <h2 className={styles.form_section_title}>{t('booking.srtitle')}</h2>
                <p className={styles.form_note}>{t('booking.srsubtitle')}</p>
              </>
            }
            placeholder={t('booking.textarea')}
            t={t}
            isTextArea
          />
        </div>

        <Link href={APP_ROUTES.Payment} className={styles.submit_section}>
          <button type='submit' className={styles.submit_button}>{t('booking.submit')}</button>
        </Link>
      </form>
    </Form>
  );
};

export default BookingForm;

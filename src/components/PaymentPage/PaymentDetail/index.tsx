'use client';

import React, { useState } from 'react';

import { toast } from 'sonner';
import { useRequest } from 'ahooks';
import { LoaderCircle, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

import styles from './index.module.scss';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useBookingStore } from '@/stores/booking/bookingStore';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import { formatCurrency } from '@/lib/funcs/currency';
import { createBookingService } from '@/services/booking';
import { formatBookingDateTime } from '@/lib/funcs/date';
import { CreateBookingOnlineDtoPaymentMethodEnum } from '@ahomevilla-hotel/node-sdk';
import { APP_ROUTES } from '@/constants/routes.constant';
import { createPaymentLinkService } from '@/services/payment';

interface PaymentDetailProps {
  lng: string;
}

const PaymentDetail = ({ lng }: PaymentDetailProps) => {
  const { t } = useTranslation(lng, 'payment');
  const [selectedMethod, setSelectedMethod] = useState<string>('VIET_QR');

  const { bookingInfor, userInfor } = useBookingStore((state) => state);
  const { customerAmount, bookingTime } = useSearchBarStore((state) => state);

  const { push } = useRouter();

  const { run: handleCreateBooking, loading } = useRequest(
    () => {
      const { startTime, startDate, endTime, endDate } = formatBookingDateTime(
        bookingTime.checkIn,
        bookingTime.checkOut,
      );

      return createBookingService({
        type: bookingTime.type,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        number_of_guests: customerAmount.adult + customerAmount.child,
        adults: customerAmount.adult,
        children: customerAmount.child,
        infants: customerAmount.infant,
        special_requests: userInfor?.special_requests,
        detailId: bookingInfor?.detailId as string,
        payment_method:
          selectedMethod === 'VIET_QR'
            ? ('VIET_QR' as CreateBookingOnlineDtoPaymentMethodEnum)
            : undefined,
      });
    },
    {
      manual: true,
      onSuccess: ({ data }) => {
        toast.success(selectedMethod === 'VIET_QR' ? t('payment.success') : t('payment.success2'));
        if (selectedMethod === 'VIET_QR') {
          createPaymentLinkHandle(data.code);
        } else {
          setTimeout(() => {
            push(APP_ROUTES.Home);
          }, 3000);
        }
      },
      onError: (error) => {
        console.log('error', error);
        toast.error(t('payment.error'));
        // setTimeout(() => {
        //   push(APP_ROUTES.Home);
        // }, 3000);
      },
    },
  );

  const { run: createPaymentLinkHandle, loading: creatingPayment } = useRequest(
    (code: string) => {
      return createPaymentLinkService({
        orderCode: Number(code),
        amount: (bookingInfor?.totalAmount as number) / 100,
        description: `AHomeVilla-${code}`,
        buyerName: userInfor?.name as string,
        buyerEmail: userInfor?.email as string,
        buyerPhone: userInfor?.phone as string,
        items: [
          {
            name: bookingInfor?.detailName as string,
            quantity: 1,
            price: (bookingInfor?.totalAmount as number) / 100,
          },
        ],
        cancelUrl: `${window.location.origin}${APP_ROUTES.CancelBooking}`,
        returnUrl: `${window.location.origin}${APP_ROUTES.SuccessPayment}`,
      } as any);
    },
    {
      manual: true,
      onSuccess: ({ data }) => {
        const {
          accountName,
          accountNumber,
          amount,
          description,
          orderCode,
          qrCode,
          bin,
          checkoutUrl,
        } = data.data;
        const params = new URLSearchParams({
          accountName,
          accountNumber,
          amount,
          description,
          orderCode,
          qrCode,
          bin,
          checkoutUrl,
        });

        push(`${APP_ROUTES.ConfirmBooking}?${params.toString()}`);
      },
      onError: (error) => {
        console.log('error', error);
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    },
  );

  const paymentMethods = [
    {
      id: 'VIET_QR',
      label: t('payment.method_option1'),
      image: '/images/payment/Logo-TPBank.webp',
    },
    {
      id: 'at_hotel',
      label: t('payment.method_option5'),
      image: '/logos/logo-large-dark.png',
    },
  ];

  return (
    <div className={styles.main_content}>
      <div className={styles.payment_method_section}>
        <h2 className={styles.payment_method_title}>{t('payment.method_title')}</h2>

        <RadioGroup
          className={cn(styles.payment_method, 'pt-3 md:pt-4')}
          value={selectedMethod}
          onValueChange={setSelectedMethod}
        >
          {paymentMethods.map((method) => (
            <div key={method.id} className={styles.method_container}>
              <div className={cn(styles.method_body)}>
                <div className='flex items-center align-middle md:flex-row'>
                  {/* <div className={styles.radio}>
                    <input
                      type='radio'
                      name='paymentMethod'
                      value={method.id}
                      className={styles.radio_input}
                      onChange={() => setSelectedMethod(method.id)}
                      checked={selectedMethod === method.id}
                    />
                  </div> */}
                  <RadioGroupItem
                    value={method.id}
                    className={cn(
                      'w-5 h-5 border-2 border-black',
                      selectedMethod === method.id && 'border-primary',
                    )}
                    checked={selectedMethod === method.id}
                  />
                  <div
                    className={cn(
                      styles.method_body_item,
                      'flex justify-between items-center flex-1',
                    )}
                  >
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
                  {['VIET_QR', 'method2'].includes(method.id) && (
                    <div className={styles.payment_method_note}>
                      <div className={styles.payment_note}>
                        <ul>
                          <li>{t('payment.note_1')}</li>
                          <li>{t('payment.note_2')}</li>
                          <li>{t('payment.note_3')}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {method.id === 'method3' && (
                    <div className={styles.payment_method_note}>
                      <div className={styles.payment_note}>
                        <ul>
                          <li>{t('payment.note_4')}</li>
                          <li>{t('payment.note_5')}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {method.id === 'at_hotel' && (
                    <div className={styles.payment_method_note}>
                      <div className={styles.payment_note}>
                        <ul>
                          <li>{t('payment.note_6')}</li>
                          <li>{t('payment.note_7')}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
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
          <div className={styles.room_info}>
            (x1) {bookingInfor?.detailName} - {customerAmount.adult + customerAmount.child}{' '}
            {t('payment.guests')}
          </div>
          <div className={styles.room_info}>{formatCurrency(bookingInfor?.totalAmount ?? '')}</div>
        </div>
        <div className={cn(styles.total_price_container, 'flex justify-between')}>
          <div className={styles.total_price}>{t('payment.total_price_title')}</div>
          <div className={styles.total_price}>
            {formatCurrency(bookingInfor?.totalAmount ?? '')}
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <button
          className={styles.submit_button}
          disabled={loading || creatingPayment}
          onClick={handleCreateBooking}
        >
          {(loading || creatingPayment) && (
            <LoaderCircle className='!w-6 !h-6 !text-white animate-spin' />
          )}

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

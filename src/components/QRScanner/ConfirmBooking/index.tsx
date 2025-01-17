'use client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'sonner';
import { useRequest } from 'ahooks';

import styles from './index.module.scss';

import { useTranslation } from '@/i18n/client';
import Container from '@/components/Common/Container';
import { CircleAlert, Clock, Download } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cancelPaymentService, getListBank } from '@/services/payment';
import { APP_ROUTES } from '@/constants/routes.constant';
import { AuthCookieService } from '@/services/auth-cookie';
import { toJpeg } from 'html-to-image';

import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConfirmBookingProps {
  lng: string;
}

const ConfirmBooking = ({ lng }: ConfirmBookingProps) => {
  const { t } = useTranslation(lng, 'payment');
  const params = useSearchParams();
  const { push } = useRouter();
  const socket = io((process.env.NEXT_PUBLIC_SERVER_API_URL as string).replace('/api', ''), {
    extraHeaders: {
      authorization: AuthCookieService.getAccessToken() ?? '',
    },
  });
  const [bank, setBank] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);

  const { run: cancelOrder } = useRequest(
    (reason: string) => {
      return cancelPaymentService({
        paymentLinkId: params.get('orderCode') ?? '',
        cancelReason: reason,
      });
    },
    {
      manual: true,
      onSuccess: ({ data }) => {
        console.log(data);
        push(params.get('cancelUrl') ?? APP_ROUTES.Home);
      },
    },
  );

  const handleCopyText = (textToCopy: string) => {
    toast.success('Sao chép thành công');
    navigator.clipboard.writeText(textToCopy);
  };

  const downloadQRCode = async () => {
    const node = document.getElementById('my-node');
    if (!node) return;

    toJpeg(node, { quality: 0.95 })
      .then(function (dataUrl) {
        // download(dataUrl, "my-node.png");
        const link = document.createElement('a');
        link.download = `${params.get('accountNumber')}_${params.get('bin')}_${params.get('amount')}_${params.get('orderCode')}_Qrcode.png`;
        link.href = dataUrl;
        link.click();
        link.remove();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  useEffect(() => {
    if (!params.get('bin')) return;
    (async () => {
      getListBank()
        .then((res) => {
          const bank = res.data.filter((bank: any) => bank.bin === params.get('bin'));
          setBank(bank[0]);
        })
        .catch((err) => console.log(err));
    })();

    socket.on('paymentUpdated', (data) => {
      if (data.orderId === params.get('orderCode')) {
        setIsCheckout(true);
        socket.emit('leaveOrderRoom', params.get('orderCode'));

        setTimeout(() => {
          const newParams = new URLSearchParams({ orderCode: params.get('orderCode') ?? '' });
          push(`${APP_ROUTES.SuccessPayment}?${newParams.toString()}`);
        }, 3000);
      }

      // Cập nhật trạng thái đơn hàng trên giao diện người dùng
    });

    socket.emit('joinOrderRoom', params.get('orderCode'));

    // Gửi yêu cầu rời khỏi phòng orderId khi component bị hủy
    return () => {
      socket.emit('leaveOrderRoom', params.get('orderCode'));
    };
  }, []);

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
          {/* <img src='https://qrcode-gen.com/images/qrcode-default.png' width={242} height={242} /> */}
          <QRCodeSVG
            id='my-node'
            value={params.get('qrCode') ?? ''}
            level='M'
            marginSize={4}
            fgColor={'#25174E'}
            bgColor='transparent'
            style={{ borderRadius: 10, width: '100%', height: '100%' }}
            className='!bg-gradient-to-br from-green-200 via-purple-200 to-green-200'
          />
        </div>
        <div className='flex flex-col gap-5'>
          <div className={cn(styles.bank_img, 'flex flex-row gap-2 items-center')}>
            <img src={(bank as any)?.logo ?? ''} alt='bank-logo' width={100} height={55} />
            <div className={cn(styles.bank, 'flex flex-col')}>
              <p className='text-gray-900 text-opacity-70 !text-sm'>{t('booking.bank')}</p>
              <p className='text-gray-800 !text-sm !font-bold'>{(bank as any)?.name}</p>
            </div>
          </div>
          <div className={styles.saveQR}>
            <button className={styles.button} onClick={downloadQRCode}>
              <Download className={styles.icon} /> {t('confirm.save')}
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row'>
              <div className={cn(styles.acc_holder, 'flex flex-col')}>
                <h4 className='text-gray-900 text-opacity-70 !text-sm'>{t('booking.holder')}</h4>
                <p className='text-gray-800 title1-semi-bold !font-bold'>
                  {params.get('accountName')}
                </p>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className={cn(styles.acc_number, 'flex flex-col')}>
                <p className='text-gray-900 text-opacity-70 !text-sm'>{t('booking.number')}</p>
                <p className='text-gray-800 !text-sm !font-bold'>{params.get('accountNumber')}</p>
              </div>
              <Button
                className={cn(styles.copybtn, 'h-7 !bg-purple-200 !object-right !ml-auto !my-auto')}
                onClick={() => handleCopyText(params.get('accountNumber') ?? '')}
              >
                <p className='!text-xs !font-bold text-gray-600 normal-case'>{t('booking.copy')}</p>
              </Button>
            </div>
          </div>
          <div className={styles.note}>
            <CircleAlert className={styles.icon} />
            {t('confirm.note')}
          </div>
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

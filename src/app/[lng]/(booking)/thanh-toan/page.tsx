import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import PaymentDetail from '@/components/PaymentPage/PaymentDetail';


interface PaymentPageProps {
  params: { lng: string; booking: string };
}

const PaymentPage = ({ params: { lng, booking } }: PaymentPageProps) => {
  console.log(lng, booking);
  return (
    <div>
      <PaymentDetail />
    </div>
  );
};

export default PaymentPage;
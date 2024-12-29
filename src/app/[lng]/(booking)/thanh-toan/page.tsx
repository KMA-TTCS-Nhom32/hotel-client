import React from 'react';

import PaymentDetail from '@/components/PaymentPage/PaymentDetail';

interface PaymentPageProps {
  params: { lng: string };
}

const PaymentPage = ({ params: { lng } }: PaymentPageProps) => {
  return <PaymentDetail lng={lng} />;
};

export default PaymentPage;

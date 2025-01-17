import SuccessfulBooking from '@/components/SuccessfulBooking';
import React from 'react';

interface SuccessfullPaymentProps {
  params: { lng: string };
}

const SuccessfullPaymentPage = ({params: {lng}} :SuccessfullPaymentProps) => {
  return (
      <div>
        <SuccessfulBooking lng={lng} />
      </div>
  );
};

export default SuccessfullPaymentPage;

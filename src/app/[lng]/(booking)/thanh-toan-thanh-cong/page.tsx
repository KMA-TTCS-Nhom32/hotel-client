import LoadingSection from '@/components/Common/LoadingSection';
import React, { Suspense } from 'react';

const SuccessfullPaymentPage = () => {
  return (
    <Suspense fallback={<LoadingSection />}>
      <div>SuccessfullPaymentPage</div>
    </Suspense>
  );
};

export default SuccessfullPaymentPage;

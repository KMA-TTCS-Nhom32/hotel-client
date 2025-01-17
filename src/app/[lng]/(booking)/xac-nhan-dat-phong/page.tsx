import ConfirmBooking from '@/components/QRScanner/ConfirmBooking';
import TopPart from '@/components/QRScanner/TopPart';
import React from 'react';

interface QRScannerProps {
  params: { lng: string };
}

const QRScannerPage = ({ params: { lng } }: QRScannerProps) => {
  return <ConfirmBooking lng={lng} />;
};

export default QRScannerPage;

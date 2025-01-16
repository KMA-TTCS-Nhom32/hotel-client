'use client';
import PageMyReservationInfor from '../MyReservationIfor';
import { Text } from '@/components/ui/text';
import { useTranslation } from '@/i18n/client';
interface PageMyReservationProps {
  lng: string;
}

const PageMyReservation = ({ lng }: PageMyReservationProps) => {
  const { t } = useTranslation(lng, 'account');

  return (
    <>
      <Text element='h3' type='heading3-semi-bold'>
        {t('my_reservations')}
      </Text>
      <PageMyReservationInfor lng={lng} />
    </>
  );
};

export default PageMyReservation;

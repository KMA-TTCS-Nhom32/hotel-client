import TabNavList from './tab-nav-list';
import ListRoom from './ListRoom';
import { useTranslation } from '@/i18n/client';

interface PageMyReservationInforProps {
  lng: string;
}

const PageMyReservationInfor = async ({ lng }: PageMyReservationInforProps) => {
  const { t } = useTranslation(lng);

  return (
    <div className='bg-white px-3 py-4 rounded-2xl w-full'>
      <TabNavList lng={lng} />
      <ListRoom lng={lng} />
    </div>
  );
};

export default PageMyReservationInfor;

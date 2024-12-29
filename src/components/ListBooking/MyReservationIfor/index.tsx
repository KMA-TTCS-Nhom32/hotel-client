
import { createTranslation } from '@/i18n/server';
import { Text } from '@/components/ui/text';
import TabNavList from './tab-nav-list';
import ListRoom from './ListRoom';
interface PageMyReservationInforProps {
    lng: string;
}

const PageMyReservationInfor = async ({ lng }: PageMyReservationInforProps) => {
    const { t } = await createTranslation(lng, 'account');

    return (
        <div className='bg-white px-3 py-4 rounded-2xl w-full'>
            <TabNavList lng={lng} /> 
            <ListRoom lng={lng} />
        </div>
        
        
     );

};

export default PageMyReservationInfor;
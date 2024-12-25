import PageMyReservationInfor from '../MyReservationIfor';
import { createTranslation } from '@/i18n/server';
import { Text } from '@/components/ui/text';
interface PageMyReservationProps {
    lng: string;
}

const PageMyReservation = async ({ lng }: PageMyReservationProps) => {
    const { t } = await createTranslation(lng, 'account');

    return (
        <>
            <Text element='h3' type='heading3-semi-bold'>
                Danh sách đặt phòng
            </Text>
            <PageMyReservationInfor lng={lng} />

        </>
    );
};

export default PageMyReservation;

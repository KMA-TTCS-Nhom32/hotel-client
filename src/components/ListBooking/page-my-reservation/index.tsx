import PageMyReservationInfor from '../MyReservationIfor';
import { Text } from '@/components/ui/text';
interface PageMyReservationProps {
    lng: string;
}

const PageMyReservation = async ({ lng }: PageMyReservationProps) => {
   

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

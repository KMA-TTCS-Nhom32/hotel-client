import PageMyReservation from '@/components/ListBooking/page-my-reservation';
import Content from '@/components/Common/Content';
interface HomeProps {
    params: {
        lng: string;
    };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
    return (
        <Content className='w-full'>
            <PageMyReservation lng={lng} />
        </Content>
    );
}

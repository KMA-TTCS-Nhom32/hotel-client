
import Content from '@/components/Common/Content';
import Citizen from '@/components/Citizen/CitizenInner';

interface HomeProps {
    params: {
        lng: string;
    };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
    return (
        <Content className='w-full'>
            <Citizen lng={lng}/>
        </Content>
    );
}

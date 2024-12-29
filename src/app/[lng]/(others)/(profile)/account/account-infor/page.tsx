import UserPage from '@/components/UserComponents/UserPage';
import Content from '@/components/Common/Content';
interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  return (
    <Content className='w-full'>
      <UserPage lng={lng} />
    </Content>
  );
}

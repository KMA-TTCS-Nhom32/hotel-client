import UserPage from '@/components/UserComponents/UserPage';

interface HomeProps {
  params: {
    lng: string;
  };
}

export default function Home({ params: { lng } }: Readonly<HomeProps>) {
  return <UserPage lng={lng} />;
}

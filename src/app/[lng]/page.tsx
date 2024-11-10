import { createTranslation } from '@/i18n/server';
import Header from '@/components/Header';
import Banner from '@/components/HomeComponents/Banner/Banner';
import Container from '@/components/Container';
import BranchList from '@/components/HomeComponents/BranchList/BranchList';
import FooterImage from '@/components/FooterImage';

interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  const { t } = await createTranslation(lng);

  return (
    <main>
      <div className='header-banner-container'>
        {/* Header Section */}
        <Header lng={lng} t={t} />

        {/* Banner Section */}
        <Banner lng={lng} t={t} />
      </div>

      {/* Container Section */}
      <Container lng={lng} t={t} />

      {/* Branch List Section */}
      <BranchList />

      {/* Footer Image Section */}
      <FooterImage lng={lng} t={t} />
    </main>
  );
}

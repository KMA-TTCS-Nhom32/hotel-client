import { createTranslation } from '@/i18n/server';

import HomePage from '@/components/HomeComponents/HomePage';

interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  const { t } = await createTranslation(lng);

  return <HomePage t={t} lng={lng} />;
}

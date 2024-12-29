import { createTranslation } from '@/i18n';

import HomePage from '@/components/HomeComponents/HomePage';

interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  const { t } = await createTranslation(lng);

    return (
        <div>
         
      </div>
  );
}

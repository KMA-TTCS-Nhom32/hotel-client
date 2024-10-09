import Link from 'next/link';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { createTranslation } from '@/i18n/server';

interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  const { t } = await createTranslation(lng);

  return (
    <div>
      <Link href={`/${lng}/second-page`}>
        <button type='button'>{t('hello')}</button>
      </Link>
      <div className='w-full flex justify-center py-5'>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

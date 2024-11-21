import Link from 'next/link';

import { createTranslation } from '@/i18n/server';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Text } from '@/components/ui/text';

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
        <ButtonCustom shape='circle' size='lg'>
          <Text type='heading6-bold' color='text-inverse'>{t('hello')}</Text>
        </ButtonCustom>
      </Link>
      <div className='w-full flex justify-center py-5'>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { useTranslation } from '@/i18n/client';

const img_path = {
  vi: '/images/flag-vn.png',
  en: '/images/flag-uk.png',
};

// Separate the part that uses useSearchParams into its own component
const LanguageSwitcherContent = () => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1] as 'vi' | 'en';
  const { t } = useTranslation(lng);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleChangeLanguage = (language: string) => {
    const newPathname = pathname.replace(/^\/(vi|en)/, `/${language}`);
    const params = new URLSearchParams(searchParams);
    replace(`${newPathname}${params.toString()}`);
  };

  const items = [
    {
      key: '1',
      value: 'vi',
      label: { img: img_path.vi, text: t('lng_vi') },
    },
    {
      key: '2',
      value: 'en',
      label: { img: img_path.en, text: t('lng_en') },
    },
  ];

  return (
    <Select value={lng} onValueChange={handleChangeLanguage}>
      <SelectTrigger className='w-auto sm:w-[124px] [&>svg]:hidden focus:ring-0 focus:ring-offset-ring flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <Image
            src={img_path[lng]}
            alt={`flag-${lng}`}
            width={40}
            height={40}
            className='w-6 h-auto'
          />
          <Text>{t(`lng_${lng}`)}</Text>
        </div>
      </SelectTrigger>
      <SelectContent align='center' className='w-[160px]'>
        {items.map((item) => (
          <SelectItem key={item.key} value={item.value}>
            <div className='flex items-center gap-4 cursor-pointer'>
              <Image
                src={item.label.img}
                alt='flag-en'
                width={40}
                height={40}
                className='w-6 h-auto'
              />
              <Text element='p'>{item.label.text}</Text>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Main component with Suspense
export const LanguageSwitcher = () => {
  return (
    <Suspense fallback={<div className='w-[124px] h-[40px] animate-pulse bg-gray-200 rounded' />}>
      <LanguageSwitcherContent />
    </Suspense>
  );
};

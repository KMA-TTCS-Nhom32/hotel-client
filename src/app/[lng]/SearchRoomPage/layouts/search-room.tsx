'use client';

import { useTranslation } from '@/i18n/client';
import Header from '@/components/layouts/Header';
import BannerSearchBar from '@/components/HomeComponents/BannerSearchBar';
import BranchList from '@/app/[lng]/SearchRoomPage/BranchList';

interface SearchRoomPageProps {
  params: {
    lng: string;
  };
}

export default function SearchRoomPage({ params: { lng } }: Readonly<SearchRoomPageProps>) {
  const { t } = useTranslation(lng);

  return (
    <>
      <Header lng={lng} />
      <BannerSearchBar lng={lng} t={t} />
      {/* <BranchList /> */}
    </>
  );
}

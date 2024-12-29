import type { AppTranslationFunction } from '@/lib/types/i18n';

import styles from './index.module.scss';
import SearchForm from './SearchForm';
import BannerSlider from './BannerSlider';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes.constant';

interface HomeSearchBarProps {
  lng: string;
  t: AppTranslationFunction;
}

export default function HomeSearchBar({ lng, t }: Readonly<HomeSearchBarProps>) {
  return (
    <section className={styles.banner_section}>
      <BannerSlider />

      <Link href={APP_ROUTES.SearchRoom} className={styles.booking_wrapper}>
        <SearchForm lng={lng} />
        <button className={styles.explore_button}>{t(['bookingform.explore'])}</button>
      </Link>
    </section>
  );
}

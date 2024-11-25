import { Resources, TFunction } from 'i18next';

import styles from './index.module.scss';
import SearchForm from './SearchForm';

interface HomeSearchBarProps {
  t: TFunction<keyof Resources, undefined>;
}

export default function HomeSearchBar({ t }: Readonly<HomeSearchBarProps>) {
  return (
    <section className={styles.banner_section}>
      <div className={styles.booking_wrapper}>
        <SearchForm t={t} />
      </div>

      <button className={styles.explore_button}>{t('Khám phá')}</button>
    </section>
  );
}

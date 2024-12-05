import { Resources, TFunction } from 'i18next';

import styles from './index.module.scss';
import SearchForm from './SearchForm';

interface HomeSearchBarProps {
  lng: string;
}

export default function HomeSearchBar({ lng }: Readonly<HomeSearchBarProps>) {

  return (
    <section className={styles.banner_section}>
      <div className={styles.booking_wrapper}>
        <SearchForm lng={lng} />
      </div>

      {/* <button className={styles.explore_button}>{t(['bookingform.explore'])}</button> */}
    </section>
  );
}

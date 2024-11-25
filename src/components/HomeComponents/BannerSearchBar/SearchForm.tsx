import React from 'react';
import { Resources, TFunction } from 'i18next';

import styles from './index.module.scss';

interface HomeSearchBarProps {
  t: TFunction<keyof Resources, undefined>;
}

const SearchForm = ({ t }: Readonly<HomeSearchBarProps>) => {
  return (
    <div id='home-search-bar' className={styles.booking_form}>
      <div className={styles.filter_location_container}>
        <label>{t('Chọn vị trí')}</label>
        <input type='text' placeholder={t('Công tác ngắn ngày?')} />
      </div>
      <div className={styles.filter_range_date}>
        <label>{t('Nhận phòng')}</label>
        <input type='date' />
      </div>
      <div className={styles.filter_range_date}>
        <label>{t('Trả phòng')}</label>
        <input type='date' />
      </div>
      <div className={styles.filter_occupancy_container}>
        <label>{t('Số khách')}</label>
        <input type='number' min='1' max='10' />
      </div>
      <button className={styles.search_button}>{t('Tìm phòng')}</button>
    </div>
  );
};

export default SearchForm;

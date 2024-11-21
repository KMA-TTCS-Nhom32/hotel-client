import { Resources, TFunction } from 'i18next';

import './Banner.scss';

interface HomeSearchBarProps {
  t: TFunction<keyof Resources, undefined>;
  isHeader?: boolean;
}

export default function HomeSearchBar({ t, isHeader = false }: Readonly<HomeSearchBarProps>) {
  return (
    <section id='home-search-bar' className='banner-section'>
      <div className='booking-form'>
        <div className='filter-location-container'>
          <label>{t('Chọn vị trí')}</label>
          <input type='text' placeholder={t('Công tác ngắn ngày?')} />
        </div>
        <div className='filter-range-date'>
          <label>{t('Nhận phòng')}</label>
          <input type='date' />
        </div>
        <div className='filter-range-date'>
          <label>{t('Trả phòng')}</label>
          <input type='date' />
        </div>
        <div className='filter-occupancy-container'>
          <label>{t('Số khách')}</label>
          <input type='number' min='1' max='10' />
        </div>
        <button className='search-button'>{t('Tìm phòng')}</button>
      </div>

      {!isHeader && <button className='explore-button'>{t('Khám phá')}</button>}

    </section>
  );
}

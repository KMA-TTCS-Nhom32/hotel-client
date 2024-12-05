'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';

import styles from './index.module.scss';
import { Search } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HomeSearchBarProps {
  lng: string;
}

const SearchForm = ({ lng }: Readonly<HomeSearchBarProps>) => {
  const { t } = useTranslation(lng);
  return (
    <div id='home-search-bar' className={styles.booking_form}>
      <div className={styles.filter_container}>
        <div className={styles.filter_location_container}>
          <Popover>
            <PopoverTrigger>
              <label>{t(['bookingform.location'])}</label>
              <input type='text' placeholder={t('bookingform.placeholder')} />
            </PopoverTrigger>
            <PopoverContent>
              <div className={styles.popover_locations}>
                <div className={styles.location_item}>
                  <h4>Hà Nội</h4>
                </div>
                <div className={styles.location_item}>
                  <h4>Hồ Chí Minh</h4>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className={styles.date_contents}>
          <div className={styles.filter_range_date}>
            <label>{t('bookingform.check_in')}</label>
            <input type='date' />
          </div>
          <div className={styles.filter_range_date}>
            <label>{t('bookingform.check_out')}</label>
            <input type='date' />
          </div>
          <div className={styles.filter_occupancy_container}>
            <Popover>
              <PopoverTrigger>
                <label>{t('bookingform.occupancy')}</label>
                <input type='number' min='1' max='10' placeholder='Guests' />
              </PopoverTrigger>
              <PopoverContent>
                <div className={styles.occupancy_item}>
                  <div className={styles.occupancy_item_title}>{t('bookingform.adults')}</div>
                  <span>{t('bookingform.adults_description')}</span>
                  <div className={styles.occupancy_item_actions}></div>
                </div>
                <div className={styles.occupancy_item}>
                  <div className={styles.occupancy_item_title}>{t('bookingform.children')}</div>
                  <span>{t('bookingform.children_description')}</span>
                  <div className={styles.occupancy_item_actions}></div>
                </div>
                <div className={styles.occupancy_item}>
                  <div className={styles.occupancy_item_title}>{t('bookingform.baby')}</div>
                  <span>{t('bookingform.baby_description')}</span>
                  <div className={styles.occupancy_item_actions}></div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <button className={styles.search_button}>
        <label>{t('bookingform.search')}</label> <Search />{' '}
      </button>
    </div>
  );
};

export default SearchForm;
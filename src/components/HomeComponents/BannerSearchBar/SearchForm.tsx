'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/client';

import styles from './index.module.scss';
import { Search } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface HomeSearchBarProps {
  lng: string;
}

const SearchForm = ({ lng }: Readonly<HomeSearchBarProps>) => {
  const [date, setDate] = useState<Date | null>(null);

  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  const [numBaby, setNumBaby] = useState(0);

  const handleAdultsChange = (operation: 'increment' | 'decrement') => {
    if (operation === 'increment') {
      setNumAdults(numAdults + 1);
    } else {
      setNumAdults(Math.max(numAdults - 1, 1));
    }
  };

  const handleChildrenChange = (operation: 'increment' | 'decrement') => {
    if (operation === 'increment') {
      setNumChildren(numChildren + 1);
    } else {
      setNumChildren(Math.max(numChildren - 1, 0));
    }
  };

  const handleBabyChange = (operation: 'increment' | 'decrement') => {
    if (operation === 'increment') {
      setNumBaby(numBaby + 1);
    } else {
      setNumBaby(Math.max(numBaby - 1, 0));
    }
  };

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
            <Popover>
              <PopoverTrigger>
                <label>{t('bookingform.check_in')}</label>
                <input type='date' />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  className='rounded-md border'
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className={styles.filter_range_date}>
            <Popover>
              <PopoverTrigger>
                <label>{t('bookingform.check_out')}</label>
                <input type='date' />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  className='rounded-md border'
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className={styles.filter_occupancy}>
            <Popover>
              <PopoverTrigger>
                <div className={styles.filter_occupancy_container}>
                  <label>{t('bookingform.occupancy')}</label>
                  <button className='total-occupancy text-left'>{numAdults + numChildren + numBaby}</button>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className={styles.occupancy_item}>
                  <div className={styles.occupancy_item_title}>
                    <div className={styles.occupancy_item_title_icon}>
                      {t('bookingform.adults')}
                    </div>
                    <span>{t('bookingform.adults_description')}</span>
                  </div>
                  <div className={styles.occupancy_item_actions}>
                    <div className='flex items-center gap-2'>
                      <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-lg font-bold'
                        onClick={() => handleAdultsChange('decrement')}
                      >
                        -
                      </button>
                      <span>{numAdults}</span>
                      <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-lg font-bold'
                        onClick={() => handleAdultsChange('increment')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.occupancy_item}>
                  <div className={styles.occupancy_item_title}>
                    <div className={styles.occupancy_item_title_icon}>
                      {t('bookingform.children')}
                    </div>
                    <span>{t('bookingform.children_description')}</span>
                  </div>
                  <div className={styles.occupancy_item_actions}>
                    <div className='flex items-center gap-2'>
                      <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-lg font-bold'
                        onClick={() => handleChildrenChange('decrement')}
                      >
                        -
                      </button>
                      <span>{numChildren}</span>
                      <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-lg font-bold'
                        onClick={() => handleChildrenChange('increment')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.occupancy_item}>
                  <div className={styles.occupancy_item_title}>
                    <div className={styles.occupancy_item_title_icon}>{t('bookingform.baby')}</div>
                    <span>{t('bookingform.baby_description')}</span>
                  </div>
                  <div className={styles.occupancy_item_actions}>
                    <div className='flex items-center gap-2'>
                      <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-lg font-bold'
                        onClick={() => handleBabyChange('decrement')}
                      >
                        -
                      </button>
                      <span>{numBaby}</span>
                      <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-lg font-bold'
                        onClick={() => handleBabyChange('increment')}
                      >
                        +
                      </button>
                    </div>
                  </div>
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

'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

import styles from './index.module.scss';

import { useTranslation } from '@/i18n/client';

import { DualRangeSlider } from '@/components/ui/dual-slider';
import { Input } from '@/components/ui/input';
import { useDebounce, useUpdateEffect } from 'ahooks';

interface SidebarProps {
  lng: string;
  onChangePriceRange: (values: number[]) => void;
}

function Sidebar({ lng, onChangePriceRange }: Readonly<SidebarProps>) {
  const { t } = useTranslation(lng, 'searchroom');

  const [values, setValues] = useState([800000, 3100000]); // Initial price range

  const debouncedValues = useDebounce(values, { wait: 300 });

  useUpdateEffect(() => {
    onChangePriceRange(debouncedValues);
  }, [debouncedValues]);

  return (
    <div className={styles.sidebar}>
      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.mapContainer}>
          {/* Map Image */}
          <img
            src='/images/map-view/staticmap.webp'
            alt='Map of Ho Chi Minh'
            className={styles.mapImage}
          />
          {/* Map Button */}
          <a
            href='https://www.google.com/maps/place/Ho+Chi+Minh+City/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.mapButton}
          >
            {t('searchroom.viewmap')}
          </a>
        </div>
      </div>

      {/* Price Slider Section */}
      <div className={styles.priceSection}>
        {/* Price Header */}
        <div className={styles.priceHeader}>
          <p className={styles.priceTitle}>{t('searchroom.pricetitle')}</p>
          <p className={styles.priceSubtitle}>{t('searchroom.priceSubtitle')}</p>
        </div>

        {/* Dual Range Slider */}
        <div className={styles.sliderContainer}>
          <DualRangeSlider
            value={values}
            onValueChange={(newValues) => setValues(newValues)}
            min={800000}
            max={3100000}
            step={20000}
            // showLabels={false}
          />
        </div>

        {/* Price Inputs */}
        <div className={styles.priceInputs}>
          <div className={styles.inputWrapper}>
            <div className='relative'>
              <Input
                type='text'
                value={values[0].toLocaleString('vi-VN')}
                readOnly
                className={styles.priceInput}
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                <span className={styles.currency}>đ</span>
              </div>
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <div className='relative'>
              <Input
                type='text'
                value={values[1].toLocaleString('vi-VN')}
                readOnly
                className={styles.priceInput}
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                <span className={styles.currency}>đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          className={styles.resetButton}
          onClick={() => setValues([800000, 3100000])} // Reset to default range
        >
          <i>
            <RotateCcw />
          </i>
          {t('booking.button')}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

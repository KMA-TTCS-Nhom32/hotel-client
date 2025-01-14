'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import styles from './index.module.scss';
import { ChevronDown } from 'lucide-react';

interface FilterProps {
  lng: string;
}

const Filter = ({ lng }: FilterProps) => {
  const { t } = useTranslation(lng, 'searchroom');
  const [selectedOption, setSelectedOption] = useState('Phổ biến nhất'); // Lựa chọn mặc định

  const sortOptions: string[] = [t('filter.choice1'), t('filter.choice2'), t('filter.choice3')];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Cập nhật trạng thái khi chọn
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.hotelsFound}>
        <b>2</b> {t('filter.hotelsFound')}
      </div>

      <div
        className={styles.sortContainer}
        aria-describedby='branch-list-sort-selection'
        id='findroom_sort-btn'
      >
        <Popover>
          <PopoverTrigger className={styles.sortTrigger}>
            <div className={styles.sortText}>
              <div className={`${styles.sortText}`}>{t('filter.sort')}</div>
              <span className={styles.selectedOption}>{selectedOption}</span>
            </div>
            <div className={styles.arrowIcon}>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className={styles.sortOptions}>
            {sortOptions.map((option) => (
              <div
                key={option}
                className={styles.option}
                onClick={() => handleOptionClick(option)} 
              >
                {option}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Filter;

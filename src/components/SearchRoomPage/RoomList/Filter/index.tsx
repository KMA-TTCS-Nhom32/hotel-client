'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import styles from './index.module.scss';
import { ChevronDown } from 'lucide-react';
import { label } from 'yet-another-react-lightbox';

interface FilterProps {
  lng: string;
}

const Filter = ({ lng }: FilterProps) => {
  const { t } = useTranslation(lng, 'searchroom');
  const [selectedOption, setSelectedOption] = useState('asc'); 

  const sortOptions = [{ value: 'asc', label: t('filter.choice2')  }, { value: 'dsc', label:  t('filter.choice3')}];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Cập nhật trạng thái khi chọn
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.hotelsFound}>
        {/* <b>2</b> {t('filter.hotelsFound')} */}
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
                key={option.value}
                className={styles.option}
                onClick={() => handleOptionClick(option.value)} 
              >
                {option.label}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Filter;

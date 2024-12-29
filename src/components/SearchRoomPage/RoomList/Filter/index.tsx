'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import styles from './index.module.scss';
import { ChevronDown } from 'lucide-react';

const Filter = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('Phổ biến nhất'); // Lựa chọn mặc định

  const sortOptions = ['Phổ biến nhất', 'Giá từ thấp đến cao', 'Giá từ cao đến thấp'];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Cập nhật trạng thái khi chọn
  };

  return (
    <div className={styles.filterContainer}>
      {/* Hotels Found */}
      <div className={styles.hotelsFound}>
        <b>1</b> khách sạn phù hợp
      </div>

      {/* Sort Dropdown */}
      <div
        className={styles.sortContainer}
        aria-describedby='branch-list-sort-selection'
        id='findroom_sort-btn'
      >
        <Popover>
          <PopoverTrigger className={styles.sortTrigger}>
            <div className={styles.sortText}>
              <div className={`${styles.sortText}`}>Sắp xếp</div>
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
                onClick={() => handleOptionClick(option)} // Xử lý khi chọn
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

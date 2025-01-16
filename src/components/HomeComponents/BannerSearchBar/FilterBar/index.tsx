'use client';

import { AppTranslationFunction } from '@/lib/types/i18n';

import styles from '../index.module.scss';

import SelectProvincePopover from '../SelectProvince';
import { SelectCustomerPopover } from '../SelectCustomer';
import SelectDatePopover from '../SelectDate/SelectDatePopover';


interface FilterBarProps {
  t: AppTranslationFunction;
  lng: string;
}

const FilterBar = ({ t, lng }: Readonly<FilterBarProps>) => {
  return (
    <div className={styles.filter_container}>
      <SelectProvincePopover t={t} />

      <SelectDatePopover t={t} lng={lng} />

      <SelectCustomerPopover t={t} />
    </div>
  );
};

export default FilterBar;

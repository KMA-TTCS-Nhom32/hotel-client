'use client';

import { Search } from 'lucide-react';

import { useTranslation } from '@/i18n/client';

import { Text } from '@/components/ui/text';
import { ButtonCustom } from '@/components/ui/button-custom';

import { useScreen } from '@/hooks/useScreen';
import { cn } from '@/lib/utils';

import { DOM_IDS } from '@/constants/dom.constant';

import styles from './index.module.scss';

import FilterBar from './FilterBar';
import FilterBarMobile from './FilterBar/FilterBarMobile';

interface HomeSearchBarProps {
  lng: string;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

const SearchForm = ({ lng, className }: Readonly<HomeSearchBarProps>) => {
  const { t } = useTranslation(lng);
  const { isMobile } = useScreen();

  return (
    <div id={DOM_IDS.HOME_SEARCH_BAR} className={cn(styles.booking_form, className)}>
      {isMobile ? <FilterBarMobile t={t} lng={lng} /> : <FilterBar t={t} lng={lng} />}

      <ButtonCustom className={styles.search_button}>
        <Text element='p' type='title1-semi-bold'>
          {t('bookingform.search')}
        </Text>
        <Search />
      </ButtonCustom>
    </div>
  );
};

export default SearchForm;

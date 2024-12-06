'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';

import { Minus, Plus, Search } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { ButtonCustom } from '@/components/ui/button-custom';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';

interface HandleAdjustCustomerAmountProps {
  title: string;
  desc?: string;
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const HandleAdjustCustomerAmount = ({
  title,
  desc,
  amount,
  onIncrease,
  onDecrease,
}: Readonly<HandleAdjustCustomerAmountProps>) => {
  return (
    <div className={styles.occupancy_item}>
      <div className={styles.occupancy_item_text}>
        <Text className={styles.occupancy_item_title}>{title}</Text>
        <span>{desc}</span>
      </div>
      <div className={styles.occupancy_item_actions}>
        <Button variant='outline' onClick={onDecrease}>
          <Minus />
        </Button>
        <span>{amount}</span>
        <Button variant='outline' onClick={onIncrease}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

interface HomeSearchBarProps {
  lng: string;
}

const SearchForm = ({ lng }: Readonly<HomeSearchBarProps>) => {
  const { t } = useTranslation(lng);
  const { province, setProvince, customerAmount, setCustomerAmount } = useSearchBarStore();

  const handleSelectLocation = (location: string) => {
    setProvince(location);
  };

  return (
    <div id='home-search-bar' className={styles.booking_form}>
      <div className={styles.filter_container}>
        <Popover>
          <PopoverTrigger className={styles.filter_location_container}>
            <Text element='h5' type='title2-semi-bold'>
              {t(['bookingform.location'])}
            </Text>
            <Text element='p' type='body1'>
              {province
                ? t(province as unknown as TemplateStringsArray)
                : t('bookingform.placeholder_location')}
            </Text>
          </PopoverTrigger>
          <PopoverContent className={styles.popover_wrap} align='start' side='bottom'>
            <ToggleGroup
              type='single'
              className={styles.location_toggle_group}
              onValueChange={handleSelectLocation}
            >
              <ToggleGroupItem className={styles.location_item} value='hanoi'>
                <h4>Hà Nội</h4>
              </ToggleGroupItem>
              <ToggleGroupItem className={styles.location_item} value='ho_chi_minh'>
                <h4>Hồ Chí Minh</h4>
              </ToggleGroupItem>
            </ToggleGroup>
          </PopoverContent>
        </Popover>
        {/* <div className={styles.date_contents}>
          <div className={styles.filter_range_date}>
            <label>{t('bookingform.check_in')}</label>
            <input type='date' />
          </div>
          <div className={styles.filter_range_date}>
            <label>{t('bookingform.check_out')}</label>
            <input type='date' />
          </div>
        </div> */}

        <Popover>
          <PopoverTrigger className={styles.filter_occupancy_container}>
            <Text element='h5' type='title2-semi-bold'>
              {t('bookingform.occupancy')}
            </Text>
            <Text element='p' type='body1'>
              0
            </Text>
          </PopoverTrigger>
          <PopoverContent className={styles.popover_wrap_2} align='start' side='bottom'>
            <HandleAdjustCustomerAmount
              title={t('bookingform.adults')}
              desc={t('bookingform.adults_description')}
              amount={customerAmount.adult}
              onIncrease={() => {}}
              onDecrease={() => {}}
            />
            <HandleAdjustCustomerAmount
              title={t('bookingform.children')}
              desc={t('bookingform.children_description')}
              amount={customerAmount.child}
              onIncrease={() => {}}
              onDecrease={() => {}}
            />
            <HandleAdjustCustomerAmount
              title={t('bookingform.baby')}
              desc={t('bookingform.baby_description')}
              amount={customerAmount.infant}
              onIncrease={() => {}}
              onDecrease={() => {}}
            />
          </PopoverContent>
        </Popover>
      </div>
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

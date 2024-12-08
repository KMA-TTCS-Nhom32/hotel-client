'use client';

import { Minus, Plus, Search } from 'lucide-react';

import { useTranslation } from '@/i18n/client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { ButtonCustom } from '@/components/ui/button-custom';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import {
  type CustomerAmount,
  useSearchBarStore,
} from '@/stores/search-bar/searchBarStore';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';
import SelectDateSection from './SelectDate';

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

interface AdjustCustomerProps {
  customerToHandles: {
    key: keyof CustomerAmount;
    title: string;
    desc?: string;
    amount: number;
  }[];
  onAdjust: (key: keyof CustomerAmount, num: number) => void;
}

const AdjustCustomer = ({ customerToHandles, onAdjust }: Readonly<AdjustCustomerProps>) => {
  return (
    <div className={styles.occupancy_wrapper}>
      {customerToHandles.map((item) => (
        <HandleAdjustCustomerAmount
          key={item.key}
          title={item.title}
          desc={item.desc}
          amount={item.amount}
          onIncrease={() => onAdjust(item.key, 1)}
          onDecrease={() => onAdjust(item.key, -1)}
        />
      ))}
    </div>
  );
};

interface SelectProvinceProps {
  province: string | null;
  provinces: {
    label: string;
    value: string;
  }[];
  onSelectProvince: (province: string) => void;
}

const SelectProvince = ({
  province,
  provinces,
  onSelectProvince,
}: Readonly<SelectProvinceProps>) => {
  return (
    <ToggleGroup
      type='single'
      className={styles.location_toggle_group}
      value={province || ''}
      onValueChange={onSelectProvince}
    >
      {provinces.map((item) => (
        <ToggleGroupItem key={item.value} value={item.value} className={styles.location_item}>
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

interface HomeSearchBarProps {
  lng: string;
}

const SearchForm = ({ lng }: Readonly<HomeSearchBarProps>) => {
  const { t } = useTranslation(lng);

  const { province, customerAmount, bookingTime, setProvince, setCustomerAmount, setBookingTime } =
    useSearchBarStore();

  const handleSelectLocation = (location: string) => {
    setProvince(location);
  };

  const handleAdjustCustomerAmount = (key: keyof CustomerAmount, num: number) => {
    setCustomerAmount({
      ...customerAmount,
      [key]: customerAmount[key] + num,
    });
  };

  return (
    <div id='home-search-bar' className={styles.booking_form}>
      <div className={styles.filter_container}>
        <Popover modal>
          <PopoverTrigger id='select-location-trigger' className={styles.filter_location_container}>
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
            <SelectProvince
              province={province}
              provinces={[
                { label: t('hanoi'), value: 'hanoi' },
                { label: t('ho_chi_minh'), value: 'ho_chi_minh' },
              ]}
              onSelectProvince={handleSelectLocation}
            />
          </PopoverContent>
        </Popover>

        <SelectDateSection
          t={t}
          lng={lng}
          bookingData={bookingTime}
          onChangeBooking={setBookingTime}
        />

        <Popover modal>
          <PopoverTrigger
            id='select-customer-trigger'
            className={styles.filter_occupancy_container}
          >
            <Text element='h5' type='title2-semi-bold'>
              {t('bookingform.occupancy')}
            </Text>
            <Text element='p' type='body1'>
              {customerAmount.adult + customerAmount.child + customerAmount.infant}
            </Text>
          </PopoverTrigger>
          <PopoverContent className={styles.popover_wrap_2} align='start' side='bottom'>
            <AdjustCustomer
              customerToHandles={[
                {
                  key: 'adult',
                  title: t('bookingform.adults'),
                  desc: t('bookingform.adults_description'),
                  amount: customerAmount.adult,
                },
                {
                  key: 'child',
                  title: t('bookingform.children'),
                  desc: t('bookingform.children_description'),
                  amount: customerAmount.child,
                },
                {
                  key: 'infant',
                  title: t('bookingform.baby'),
                  desc: t('bookingform.baby_description'),
                  amount: customerAmount.infant,
                },
              ]}
              onAdjust={handleAdjustCustomerAmount}
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

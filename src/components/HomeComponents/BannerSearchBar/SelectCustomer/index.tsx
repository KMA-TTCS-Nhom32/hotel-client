import { Minus, Plus } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { useSearchBarStore, type CustomerAmount } from '@/stores/search-bar/searchBarStore';
import { AppTranslationFunction } from '@/lib/types/i18n';

import styles from '../index.module.scss';

interface HandleSelectCustomerAmountProps {
  title: string;
  desc?: string;
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const HandleSelectCustomerAmount = ({
  title,
  desc,
  amount,
  onIncrease,
  onDecrease,
}: Readonly<HandleSelectCustomerAmountProps>) => {
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

type CustomerToHandler = {
  key: keyof CustomerAmount;
  title: string;
  desc?: string;
  amount: number;
};

interface SelectCustomerProps {
  customerToHandlers: CustomerToHandler[];
  onAdjust: (key: keyof CustomerAmount, num: number) => void;
}

export const SelectCustomer = ({ customerToHandlers, onAdjust }: Readonly<SelectCustomerProps>) => {
  return (
    <div className={styles.occupancy_wrapper}>
      {customerToHandlers.map((item) => (
        <HandleSelectCustomerAmount
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

interface SelectCustomerPopoverProps {
  t: AppTranslationFunction;
}

export const SelectCustomerPopover = ({ t }: Readonly<SelectCustomerPopoverProps>) => {
  const { customerAmount, setCustomerAmount } = useSearchBarStore();

  const customerToHandlers: CustomerToHandler[] = [
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
  ];

  const handleAdjustCustomerAmount = (key: keyof CustomerAmount, num: number) => {
    setCustomerAmount({
      ...customerAmount,
      [key]: customerAmount[key] + num,
    });
  };

  return (
    <Popover modal>
      <PopoverTrigger id='select-customer-trigger' asChild>
        <div className={styles.filter_occupancy_container}>
          <Text element='h5' type='title2-semi-bold'>
            {t('bookingform.occupancy')}
          </Text>
          <Text element='p' type='body1'>
            {customerAmount.adult + customerAmount.child + customerAmount.infant}
          </Text>
        </div>
      </PopoverTrigger>
      <PopoverContent className={styles.popover_wrap_2} align='start' side='bottom'>
        <SelectCustomer
          customerToHandlers={customerToHandlers}
          onAdjust={handleAdjustCustomerAmount}
        />
      </PopoverContent>
    </Popover>
  );
};

interface SelectedCustomerDisplayProps {
  t: AppTranslationFunction;
  customerAmount: CustomerAmount;
}

export const SelectedCustomerDisplay = ({
  t,
  customerAmount,
}: Readonly<SelectedCustomerDisplayProps>) => {
  return (
    <Text element='p' type='caption2' className='text-zinc-600'>
      {customerAmount.adult + customerAmount.child + customerAmount.infant}{' '}
      {t('bookingform.guests')}
    </Text>
  );
};

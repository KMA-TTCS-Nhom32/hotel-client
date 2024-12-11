import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { AppTranslationFunction } from '@/lib/types/i18n';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';

import styles from '../index.module.scss';

interface SelectProvinceProps {
  province: string | null;
  provinces: {
    label: string;
    value: string;
  }[];
  onSelectProvince: (province: string) => void;
}

export const SelectProvince = ({
  province,
  provinces,
  onSelectProvince,
}: Readonly<SelectProvinceProps>) => {
  return (
    <ToggleGroup
      type='single'
      className={styles.location_toggle_group}
      value={province ?? ''}
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

interface SelectProvincePopoverProps {
  t: AppTranslationFunction;
}

export const SelectProvincePopover = ({ t }: Readonly<SelectProvincePopoverProps>) => {
  const { province, setProvince } = useSearchBarStore();

  const provinces = [
    { label: t('hanoi'), value: 'hanoi' },
    { label: t('ho_chi_minh'), value: 'ho_chi_minh' },
  ];

  return (
    <Popover modal>
      <PopoverTrigger id='select-location-trigger' asChild>
        <div className={styles.filter_location_container}>
          <Text element='h5' type='title2-semi-bold'>
            {t(['bookingform.location'])}
          </Text>
          <Text element='p' type='body1'>
            {province
              ? t(province as unknown as TemplateStringsArray)
              : t('bookingform.placeholder_location')}
          </Text>
        </div>
      </PopoverTrigger>
      <PopoverContent className={styles.popover_wrap} align='start' side='bottom'>
        <SelectProvince province={province} provinces={provinces} onSelectProvince={setProvince} />
      </PopoverContent>
    </Popover>
  );
};

interface SelectedProvinceDisplayProps {
  t: AppTranslationFunction;
  province: string | null;
}

export const SelectedProvinceDisplay = ({ t, province }: SelectedProvinceDisplayProps) => {
  return (
    <Text element='h5' type='title1-semi-bold'>
      {province
        ? t(province as unknown as TemplateStringsArray)
        : t('bookingform.placeholder_location')}
    </Text>
  );
};

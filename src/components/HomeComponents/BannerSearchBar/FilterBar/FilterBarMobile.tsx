'use client';

import { useMemo } from 'react';
import { useRequest } from 'ahooks';

import { AppTranslationFunction } from '@/lib/types/i18n';
import { cn } from '@/lib/utils';
import { type CustomerAmount, useSearchBarStore } from '@/stores/search-bar/searchBarStore';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Text } from '@/components/ui/text';
import { BasicScrollArea } from '@/components/Common/BasicScrollArea';

import { SelectedProvinceDisplay, SelectProvince } from '../SelectProvince';
import { SelectDate, SelectedDateDisplay } from '../SelectDate';
import { SelectCustomer, SelectedCustomerDisplay } from '../SelectCustomer';
import { DateSelectedDisplay } from '../SelectDate/DateSelectedDisplay';

import styles from '../index.module.scss';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/funcs/date';
import { getProvinceService } from '@/services/province';

interface FilterBarMobileProps {
  t: AppTranslationFunction;
  lng: string;
}

const FilterBarMobile = ({ t, lng }: Readonly<FilterBarMobileProps>) => {
  const { province, bookingTime, customerAmount, setBookingTime, setCustomerAmount, setProvince } =
    useSearchBarStore();

  const { data: getProvinceResponse } = useRequest(() =>
    getProvinceService({
      pageSize: 100,
    }),
  );

  const provinces = useMemo(() => {
    return (
      getProvinceResponse?.data.data.map((province) => ({
        label: province.name,
        value: province.slug,
      })) ?? []
    );
  }, [getProvinceResponse?.data]);

  const handleAdjustCustomerAmount = (key: keyof CustomerAmount, num: number) => {
    setCustomerAmount({
      ...customerAmount,
      [key]: customerAmount[key] + num,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div className={cn(styles.filter_container, styles.wrap)}>
          <SelectedProvinceDisplay t={t} province={province} />
          <div className={styles.row}>
            <SelectedDateDisplay
              lng={lng}
              checkIn={bookingTime.checkIn}
              checkOut={bookingTime.checkOut}
            />
            <span className='inline-divider' />
            <SelectedCustomerDisplay t={t} customerAmount={customerAmount} />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className='relative w-full'>
          <ScrollArea className='w-full max-h-[64vh] overflow-y-scroll hidden-scrollbar'>
            <div className={styles.filter_drawer_container}>
              <article>
                <Text element='h5' type='title1-semi-bold'>
                  {t(['bookingform.location'])}
                </Text>
                <SelectProvince
                  province={province}
                  provinces={provinces}
                  onSelectProvince={setProvince}
                />
              </article>
              <article>
                <Text element='h5' type='title2-semi-bold'>
                  {t(`bookingform.checkIn`)} - {t(`bookingform.checkOut`)}
                </Text>
                <SelectDate t={t} booking={bookingTime} setBooking={setBookingTime} />
              </article>
              <article>
                <Text element='h5' type='title1-semi-bold'>
                  {t('bookingform.occupancy')}
                </Text>
                <SelectCustomer
                  customerToHandlers={[
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
              </article>
            </div>
          </ScrollArea>
          <DrawerFooter className='absolute py-2 px-4 bottom-0 w-full flex flex-row items-center justify-between bg-white border-t border-solid border-t-slate-100'>
            <div className='flex gap-2 items-center'>
              <div>
                <Text element='h5' type='title2-semi-bold' className='text-zinc-600'>
                  {t(`bookingform.checkIn`)}
                </Text>
                <Text element='p' type='body2'>
                  {formatDate(
                    lng,
                    bookingTime.checkIn,
                    true,
                    bookingTime.type === 'HOURLY',
                    bookingTime.type === 'HOURLY',
                    true,
                  )}
                </Text>
              </div>
              <span>-</span>
              <div>
                <Text element='h5' type='title2-semi-bold' className='text-zinc-600'>
                  {t(`bookingform.checkOut`)}
                </Text>
                <Text element='p' type='body2'>
                  {formatDate(
                    lng,
                    bookingTime.checkIn,
                    true,
                    bookingTime.type === 'HOURLY',
                    bookingTime.type === 'HOURLY',
                    true,
                  )}
                </Text>
              </div>
            </div>
            <DrawerClose asChild>
              <Button className='h-auto px-6 py-3 rounded-full'>{t('bookingform.apply')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterBarMobile;

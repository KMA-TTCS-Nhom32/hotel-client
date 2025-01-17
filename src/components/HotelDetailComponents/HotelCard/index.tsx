'use client';

import React from 'react';
import { Clock, Ruler, User, BedDouble } from 'lucide-react';

import { RoomDetail } from '@ahomevilla-hotel/node-sdk';
import { useTranslation } from '@/i18n/client';
import { BookingType } from '@/stores/search-bar/searchBarStore';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

import styles from './index.module.scss';
import { formatCurrency } from '@/lib/funcs/currency';

interface HotelCardProps {
  room: RoomDetail;
  lng: string;
  currentType: BookingType;
  onOpen: (room: RoomDetail) => void;
  bookingButton: React.ReactNode;
}

const HotelCard = ({ lng, room, currentType, onOpen, bookingButton }: HotelCardProps) => {
  const { t } = useTranslation(lng, 'branch');

  const getPrice = (room: RoomDetail) => {
    if (currentType === 'HOURLY') {
      return room.special_price_per_hour ?? room.base_price_per_hour;
    } else if (currentType === 'NIGHTLY') {
      return room.special_price_per_night ?? room.base_price_per_night;
    } else if (currentType === 'DAILY') {
      return room.special_price_per_day ?? room.base_price_per_day;
    }
    return null;
  };

  return (
    <button onClick={() => onOpen(room)} key={room.id} className={styles.roomCard}>
      <div className={styles.roomDetails}>
        <h3 className={styles.roomName}>{room.name}</h3>
        <div className={styles.roomAttributes}>
          <span>
            <Ruler /> {room.area} m²
          </span>
          <span>
            <BedDouble /> {room.bed_type}
          </span>
          <span>
            <User /> {room.max_adults} {t('branch.people')}
          </span>
        </div>

        <div className={styles.thumbnail}>
          <img src={room.thumbnail.url} alt={room.name} className={styles.roomImage} />
        </div>

        <ul className={styles.roomFeatures}>
          {room.amenities.map((amenity) => (
            <div key={amenity.slug}>
              <li>
                {amenity.icon && (
                  <img src={amenity.icon.url} alt={amenity.name} className={styles.icon} />
                )}
                <span>{amenity.name}</span>
              </li>
            </div>
          ))}
        </ul>

        <div className={styles.roomFooter}>
          {room.is_available && (
            <div className={styles.price}>
              <span>
              {formatCurrency(getPrice(room) as string)} <p>{t('room.currency')}</p>
              </span>
            </div>
          )}
          <div onClick={(e) => e.stopPropagation()}>
            {room.is_available ? bookingButton : (
              <Button
                variant='outline'
                className='h-12 w-full rounded-md select-none border-red-600 hover:bg-red-200 cursor-default bg-red-200'
              >
                <Clock className='text-red-700 !w-5 !h-5' />
                <Text element='h5' type='title1-semi-bold' className='text-red-700'>
                  {t('room.unvailable')}
                </Text>
              </Button>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default HotelCard;

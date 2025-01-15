'use client';

import React from 'react';
import { Clock, Ruler, User, BedDouble } from 'lucide-react';

import { RoomDetail } from '@ahomevilla-hotel/node-sdk';
import { useTranslation } from '@/i18n/client';
import { BookingType } from '@/stores/search-bar/searchBarStore';
import styles from './index.module.scss';

interface HotelCardProps {
  room: RoomDetail;
  lng: string;
  currentType: BookingType;
  onOpen: (room: RoomDetail) => void;
}

const HotelCard = ({ lng, room, currentType, onOpen }: HotelCardProps) => {
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

  const getButton = (rooms: RoomDetail[]) => {
    const isAvailable = rooms.some((room) => room.is_available);
    if (isAvailable) {
      return <button className={styles.bookButton}>{t('room.book')}</button>;
    }
    return (
      <button className={styles.unavailableButton}>
        <Clock /> {t('room.unvailable')}
      </button>
    );
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
          <div className={styles.price}>
            {getPrice(room) && (
              <span>
                {getPrice(room)} <p>{t('room.currency')}</p>
              </span>
            )}
          </div>
          {getButton([room])}
        </div>
      </div>
    </button>
  );
};

export default HotelCard;

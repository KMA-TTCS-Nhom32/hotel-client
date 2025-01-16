'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './index.module.scss';
import { cn } from '@/lib/utils';
import { APP_ROUTES } from '@/constants/routes.constant';
import { Button } from '@/components/ui/button';
import { RoomDetail } from '@ahomevilla-hotel/node-sdk';
import Image from 'next/image';
import AmenityBadge from '@/components/Common/AmenityBadge';
import { BookingType } from '@/stores/search-bar/searchBarStore';
import { formatCurrency } from '@/lib/funcs/currency';
import { useRouter } from 'next/navigation';

interface RoomCardProps {
  room: RoomDetail;
  bookingType: BookingType;
}

const RoomCard = ({ room, bookingType }: RoomCardProps) => {
  const { push } = useRouter();

  const getPrice = (room: RoomDetail, type: BookingType) => {
    if (type === 'HOURLY') {
      return room.special_price_per_hour
        ? Number(room.special_price_per_hour) * 2
        : Number(room.base_price_per_hour) * 2;
    }
    if (type === 'NIGHTLY') {
      return room.special_price_per_night ?? room.base_price_per_night;
    }
    if (type === 'DAILY') {
      return room.special_price_per_day ?? room.base_price_per_day;
    }
    return 0;
  };

  const getUnit = (type: BookingType) => {
    if (type === 'HOURLY') {
      return '2 Giờ';
    }
    if (type === 'NIGHTLY') {
      return 'Đêm';
    }
    return 'Ngày';
  };

  return (
    <div
      className={`${styles.roomcard_container} flex flex-col md:flex-row shadow-lg border border-gray-200 rounded-lg overflow-hidden`}
    >
      <div className={`${styles.room_image} w-full md:w-1/3`}>
        <Swiper spaceBetween={10} slidesPerView={1}>
          {[room.thumbnail, ...room.images].map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                height={240}
                width={400}
                src={img.url}
                alt={`Room Image ${index + 1}`}
                className='rounded-md h-[240px] w-auto max-w-full object-cover object-center'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className={cn(
          styles.room_contents,
          'w-full md:w-2/3 flex flex-row justify-between pt-4 px-4',
        )}
      >
        <div className={`${styles.room_detail} mb-4 md:w-2/3`}>
          <h3 className={`${styles.room_type} text-xl font-bold mb-2`}>{room.name}</h3>
          <p className={`${styles.hotel_branch} text-sm font-medium mb-0`}>{room.branch?.name}</p>
          <div className={cn(styles.address, 'mb-2')}>{room.branch?.address}</div>
          <div className='flex flex-wrap gap-3 mb-2'>
            {room.amenities.map((amenity) => (
              <AmenityBadge key={amenity.id} amenity={amenity} />
            ))}
          </div>
          <div className={styles.hotelDescription}>
            <span>{room.description}</span>
          </div>
        </div>
        <div className={`${styles.room_price} mt-4 md:w-1/3 border-t pt-4`}>
          <div className={`${styles.price_detail}`}>
            <span className={`${styles.price_range} text-lg font-semibold`}>CHỈ TỪ </span>
            <span className={`${styles.room_cost} text-orange-600 text-2xl`}>
              {formatCurrency(getPrice(room, bookingType))}
            </span>
            <span className={`${styles.price_curency}`}>VND / {getUnit(bookingType)}</span>
            <p className={`${styles.price_tax} text-sm text-gray-500 mb-4`}>
              Đã bao gồm thuế và phí
            </p>
          </div>
          <div className={styles.pure_link}>
            <Button
              className='py-2 px-4 rounded-full'
              onClick={() => push(`${APP_ROUTES.Branch}/${room.branch.slug}`)}
            >
              Đặt phòng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './index.module.scss';
import { CircleParking, Coffee, Link, Utensils, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { APP_ROUTES } from '@/constants/routes.constant';
import { Button } from '@/components/ui/button';

const RoomCard = () => {
  const [images] = useState([
    '/images/SearchRoomPage/StandardTwin/standardtwin.webp',
    '/images/SearchRoomPage/StandardTwin/standardtwin1.webp',
    '/images/SearchRoomPage/StandardTwin/standardtwin2.webp',
    '/images/SearchRoomPage/StandardTwin/standardtwin3.webp',
    '/images/SearchRoomPage/StandardTwin/standardtwin4.webp',
  ]);

  return (
    <>
      <div
        className={`${styles.roomcard_container} flex flex-col md:flex-row shadow-lg border border-gray-200 rounded-lg overflow-hidden`}
      >
        <div className={`${styles.room_image} w-full md:w-1/3`}>
          <Swiper spaceBetween={10} slidesPerView={1}>
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Room Image ${index + 1}`} className={styles.roomImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={cn(styles.room_contents, 'w-full md:w-2/3 flex flex-row justify-between p-4')}
        >
          <div className={`${styles.room_detail} mb-4 md:w-2/3`}>
            <h3 className={`${styles.roome_type} text-xl font-bold mb-2`}>Single Room</h3>
            <p className={`${styles.hotel_branch} text-sm font-medium mb-4`}>
              AHomeVilla Hotel Trần Phú
            </p>
            <div className='flex flex-wrap gap-3'>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <Wifi className='h-4 w-4' />
                <span>Wifi Free</span>
              </Badge>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <CircleParking className='h-4 w-4' />
                <span>Bãi đỗ xe miễn phí</span>
              </Badge>
            </div>
          </div>
          <div className={`${styles.room_price} mt-4 md:w-1/3 border-t pt-4`}>
            <div className={`${styles.price_detail}`}>
              <span className={`${styles.price_range} text-lg font-semibold`}>CHỈ TỪ </span>
              <span className={`${styles.room_cost} text-orange-600 text-2xl`}>400.000</span>
              <span className={`${styles.price_curency}`}>VND / Đêm</span>
              <p className={`${styles.price_tax} text-sm text-gray-500 mb-4`}>
                Đã bao gồm thuế và phí
              </p>
            </div>
            <Link href={`${APP_ROUTES.Branch}/1`} className={styles.pure_link}>
              <Button className='py-2 px-4 rounded-full'>Đặt phòng</Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${styles.roomcard_container} flex flex-col md:flex-row shadow-lg border border-gray-200 rounded-lg overflow-hidden`}
      >
        <div className={`${styles.room_image} w-full md:w-1/3`}>
          <Swiper spaceBetween={10} slidesPerView={1}>
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Room Image ${index + 1}`} className={styles.roomImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={cn(styles.room_contents, 'w-full md:w-2/3 flex flex-row justify-between p-4')}
        >
          <div className={`${styles.room_detail} mb-4 md:w-2/3`}>
            <h3 className={`${styles.roome_type} text-xl font-bold mb-2`}>Standard Twin</h3>
            <p className={`${styles.hotel_branch} text-sm font-medium mb-4`}>
              AHomeVilla Hotel Global City
            </p>
            <div className='flex flex-wrap gap-3'>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <Wifi className='h-4 w-4' />
                <span>Wifi Free</span>
              </Badge>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <CircleParking className='h-4 w-4' />
                <span>Bãi đỗ xe miễn phí</span>
              </Badge>
            </div>
          </div>
          <div className={`${styles.room_price} mt-4 md:w-1/3 border-t pt-4`}>
            <div className={`${styles.price_detail}`}>
              <span className={`${styles.price_range} text-lg font-semibold`}>CHỈ TỪ </span>
              <span className={`${styles.room_cost} text-orange-600 text-2xl`}>516.000</span>
              <span className={`${styles.price_curency}`}>VND / Đêm</span>
              <p className={`${styles.price_tax} text-sm text-gray-500 mb-4`}>
                Đã bao gồm thuế và phí
              </p>
            </div>
            <Link href={`${APP_ROUTES.Branch}/1`} className={styles.pure_link}>
              <Button className='py-2 px-4 rounded-full'>Đặt phòng</Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${styles.roomcard_container} flex flex-col md:flex-row shadow-lg border border-gray-200 rounded-lg overflow-hidden`}
      >
        <div className={`${styles.room_image} w-full md:w-1/3`}>
          <Swiper spaceBetween={10} slidesPerView={1}>
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Room Image ${index + 1}`} className={styles.roomImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={cn(styles.room_contents, 'w-full md:w-2/3 flex flex-row justify-between p-4')}
        >
          <div className={`${styles.room_detail} mb-4 md:w-2/3`}>
            <h3 className={`${styles.roome_type} text-xl font-bold mb-2`}>Standard Twin</h3>
            <p className={`${styles.hotel_branch} text-sm font-medium mb-4`}>
              AHomeVilla Hotel Thợ nhuộm
            </p>
            <div className='flex flex-wrap gap-3'>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <Wifi className='h-4 w-4' />
                <span>Wifi Free</span>
              </Badge>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <CircleParking className='h-4 w-4' />
                <span>Bãi đỗ xe miễn phí</span>
              </Badge>
              <Badge className='gap-2 w-auto py-2 rounded-full'>
                <Utensils className='h-4 w-4' />
                <span>Nhà hàng được Michelin đánh giá cực chất lượng</span>
              </Badge>
            </div>
          </div>
          <div className={`${styles.room_price} mt-4 md:w-1/3 border-t pt-4`}>
            <div className={`${styles.price_detail}`}>
              <span className={`${styles.price_range} text-lg font-semibold`}>CHỈ TỪ </span>
              <span className={`${styles.room_cost} text-orange-600 text-2xl`}>1.300.000</span>
              <span className={`${styles.price_curency}`}>VND / Đêm</span>
              <p className={`${styles.price_tax} text-sm text-gray-500 mb-4`}>
                Đã bao gồm thuế và phí
              </p>
            </div>
            <Link href={`${APP_ROUTES.Branch}/1`} className={styles.pure_link}>
              <Button className='py-2 px-4 rounded-full'>Đặt phòng</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;

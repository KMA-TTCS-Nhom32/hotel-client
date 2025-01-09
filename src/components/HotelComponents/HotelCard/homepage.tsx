'use client';

import React, { useRef } from 'react';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import { hotelRooms } from './data';
import {
  Clock,
  Ruler,
  User,
  BedDouble,
  Refrigerator,
  Monitor,
  Speaker,
  Sunset,
  UserRound,
  Waves,
  TreeDeciduous,
  Utensils,
  Wifi,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelDescriptionProps {
  lng: string;
}

const HotelDescription = ({ lng }: HotelDescriptionProps) => {
  const { t } = useTranslation(lng, 'branch');
  const icons = [<Refrigerator />, <Monitor />, <Speaker />, <Sunset />];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='container mx-auto py-3'>
      <div className={styles.MuiTabs}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <a href='#about'>{t('branch.menuAbout')}</a>
              {/* Giới thiệu */}
            </li>
            <li>
              <a href='#booking'>{t('branch.menuBooking')}</a>
              {/* Đặt phòng */}
            </li>
          </ul>
        </nav>
      </div>

      <main>
        <section id='about' className={styles.section}>
          <div className='space-y-0'>
            <div className={styles.hotelIntro}>
              <h2 className={styles.hotelTitle}>
                <div className={styles.hotelName}>PRESIDENT MAISON</div>
                <div className={styles.hotelBranch}>SIGNATURE BY M VILLAGE</div>
              </h2>
            </div>
            <p className={styles.hotelDescription}>
              Nép mình trên con đường Tú Xương giữa lòng Quận 3, President Maison, từ một biệt thự
              cổ lưu giữ nhiều dấu ấn lịch sử, nay mang vẻ an tĩnh trong vườn xanh và nắng ấm, với
              thiết kế theo cảm hứng "Green House" bao bọc bạn khỏi những ồn ào thường nhật. Không
              gian phòng rộng rãi, tràn ngập ánh sáng tự nhiên, đủ an để bạn nghỉ ngơi và đủ yên để
              bạn thảnh thơi suy nghĩ. Dịch vụ cá nhân hóa với quản gia riêng, gối đệm, mùi hương và
              bữa sáng tuyển chọn – tất cả đã được chuẩn bị sẵn sàng để mang đến cho bạn một kỳ nghỉ
              thư giãn trọn vẹn.
            </p>
            <div className={cn(styles.hotelAmenities, 'py-3')}>
              <div className={styles.hotelAmenity_title}>
                <h3 className={styles.AmenityTitle}>{t('branch.amenitytitle')}</h3> {/* Tiêu đề */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
                  <div className={styles.AmenityItem}>
                    <UserRound className={styles.icon} />
                    <span>{t('amenity.butler')}</span>
                  </div>
                  <div className={styles.AmenityItem}>
                    <Waves className={styles.icon} />
                    <span>{t('amenity.pool')}</span>
                  </div>
                  <div className={styles.AmenityItem}>
                    <TreeDeciduous className={styles.icon} />
                    <span>{t('amenity.garden')}</span>
                  </div>
                  <div className={styles.AmenityItem}>
                    <Utensils className={styles.icon} />
                    <span>{t('amenity.restaurant')}</span>
                  </div>
                  <div className={styles.AmenityItem}>
                    <Wifi className={styles.icon} />
                    <span>{t('amenity.wf')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className={styles.}></div> */}

        <section id='booking' className={styles.hotelRoomList}>
          <div className={styles.roomGrid}>
            {hotelRooms.map((room) => (
              <div key={room.id} className={styles.roomCard}>
                <div className={styles.roomDetails}>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <div className={styles.roomAttributes}>
                    <span>
                      <Ruler /> {room.size} m²
                    </span>
                    <span>
                      <BedDouble /> {room.bed_type}
                    </span>
                    <span>
                      <User /> {room.max_adults} người
                    </span>
                  </div>

                  <div className={styles.thumbnail}>
                    <img src={room.thumbnail.url} alt={room.name} className={styles.roomImage} />
                  </div>

                  <ul className={styles.roomFeatures}>
                    {room.features.map((feature, index) => (
                      <li key={index}>
                        {icons[index]} {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.roomFooter}>
                    <div className={styles.price}>
                      <span>
                        {room.price} <p>{t('room.currency')}</p> {/* Đồng / Đêm */}
                      </span>
                    </div>
                    {room.available ? (
                      <button className={styles.bookButton}>
                        {t('room.book')} {/* Đặt phòng */}
                      </button>
                    ) : (
                      <button className={styles.unavailableButton}>
                        <Clock /> {t('room.unvailable')} {/* Hết phòng */}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelDescription;

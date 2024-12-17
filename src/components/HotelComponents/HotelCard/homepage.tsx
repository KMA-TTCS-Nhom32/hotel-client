'use client';

import React, { useRef } from 'react';
import Tabs from './tab';
import HotelRoomCardList from './index';
import styles from './index.module.scss';

const HotelDescription = () => {
  // Sử dụng HTMLDivElement thay vì HTMLElement
  const introRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      name: 'Giới thiệu',
      content: (
        <div ref={introRef} className='space-y-0'>
          <div className={styles.hotelName}>PRESIDENT MAISON</div>
          <div className={styles.hotelBranch}>SIGNATURE BY M VILLAGE</div>
          <p className={styles.hotelDescription}>
            Nép mình trên con đường Tú Xương giữa lòng Quận 3, President Maison, từ một biệt thự cổ
            lưu giữ nhiều dấu ấn lịch sử, nay mang vẻ an tĩnh trong vườn xanh và nắng ấm, với thiết
            kế theo cảm hứng "Green House" bao bọc bạn khỏi những ồn ào thường nhật. Không gian
            phòng rộng rãi, tràn ngập ánh sáng tự nhiên, đủ an để bạn nghỉ ngơi và đủ yên để bạn
            thảnh thơi suy nghĩ. Dịch vụ cá nhân hóa với quản gia riêng, gối đệm, mùi hương và bữa
            sáng tuyển chọn – tất cả đã được chuẩn bị sẵn sàng để mang đến cho bạn một kỳ nghỉ thư
            giãn trọn vẹn.
          </p>
          <div className={styles.hotelAmenities}>
            <div className={`${styles.hotelAmenity_title} py-3`}>
              
            </div>
          </div>
        </div>
      ),
      ref: introRef,
    },
    {
      name: 'Chọn phòng',
      content: (
        <div ref={roomsRef} className='space-y-4'>
          <HotelRoomCardList />
        </div>
      ),
      ref: roomsRef,
    },
  ];

  return (
    <div className='container mx-auto p-6'>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default HotelDescription;

// 'use client';

// import React from 'react';
// import styles from './index.module.scss';
// import { useTranslation } from 'react-i18next';
// import { hotelRooms } from './data';
// import {
//   Clock,
//   Ruler,
//   User,
//   BedDouble,
//   Refrigerator,
//   Monitor,
//   Speaker,
//   Sunset,
//   Ratio,
//   Fullscreen,
// } from 'lucide-react';

// const HotelRoomCardList = () => {
//   const { t } = useTranslation();
//   const icons = [<Refrigerator />, <Monitor />, <Speaker />, <Sunset />];
//   return (
//     <section className={styles.hotelRoomList}>
//       <div className={styles.roomGrid}>
//         {hotelRooms.map((room) => (
//           <div key={room.id} className={styles.roomCard}>
//             <div className={styles.roomDetails}>
//               <h3 className={styles.roomName}>{room.name}</h3>
//               <div className={styles.roomAttributes}>
//                 <span>
//                   <Ruler /> {room.size} m²
//                 </span>
//                 <span>
//                   <BedDouble /> {room.bed_type}
//                 </span>
//                 <span>
//                   <User /> {room.max_adults} người
//                 </span>
//               </div>

//               <div className={styles.thumbnail}>
//                 <img src={room.thumbnail.url} alt={room.name} className={styles.roomImage} />
//               </div>

//               <ul className={styles.roomFeatures}>
//                 {room.features.map((feature, index) => (
//                   <li key={index}>
//                     {icons[index]} {feature}
//                   </li>
//                 ))}
//               </ul>

//               <div className={styles.roomFooter}>
//                 <div className={styles.price}>
//                   <span>
//                     {room.price} <p>{t('room.currency')}</p> {/*Đồng / Đêm*/}
//                   </span>
//                 </div>
//                 {room.available ? (
//                   <button className={styles.bookButton}>
//                     {' '}
//                     {t('room.book')} {/*Đặt phòng*/}{' '}
//                   </button>
//                 ) : (
//                   <button className={styles.unavailableButton}>  <Clock />
//                     {' '}
//                     {t('room.unavailable')} {/*Hết phòng*/}{' '}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HotelRoomCardList;

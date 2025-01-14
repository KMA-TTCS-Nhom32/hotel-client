'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import { Clock, Ruler, User, BedDouble } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BranchDetail, RoomDetail, Image } from '@ahomevilla-hotel/node-sdk';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ImageSlider from '../ImageSlider';

interface HotelDescriptionProps {
  branch: BranchDetail;
  lng: string;
}

const HotelDescription = ({ lng, branch }: HotelDescriptionProps) => {
  const { t } = useTranslation(lng, 'branch');
  const { bookingTime } = useSearchBarStore((state) => state);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);
  const [open, setOpen] = useState(false);

  const openDialog = (room: RoomDetail) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  console.log(selectedRoom);

  const getPrice = (room: RoomDetail) => {
    if (bookingTime.type === 'HOURLY') {
      return room.special_price_per_hour || room.base_price_per_hour;
    } else if (bookingTime.type === 'NIGHTLY') {
      return room.special_price_per_night || room.base_price_per_night;
    } else if (bookingTime.type === 'DAILY') {
      return room.special_price_per_day || room.base_price_per_day;
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
    <div className='container mx-auto py-3'>
      <div className={styles.MuiTabs}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <a href='#about'>{t('branch.menuAbout')}</a>
            </li>
            <li>
              <a href='#booking'>{t('branch.menuBooking')}</a>
            </li>
          </ul>
        </nav>
      </div>

      <main>
        <div className={styles.contents}>
          <section id='about' className={cn(styles.section, 'flex-grow')}>
            <div className='space-y-0'>
              <div className={styles.hotelIntro}>
                <h2 className={styles.hotelTitle}>
                  <div className={styles.hotelName}>{branch.name}</div>
                </h2>
              </div>
              <p className={styles.hotelDescription}>{branch.description}</p>

              <div className={cn(styles.hotelAmenities, 'py-3')}>
                <div className={styles.hotelAmenity_title}>
                  <h3 className={styles.AmenityTitle}>{t('branch.amenitytitle')}</h3>
                  <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-4'>
                    {branch.amenities.map((amenity) => (
                      <div key={amenity.slug} className={styles.AmenityItem}>
                        {amenity.icon && (
                          <img src={amenity.icon.url} alt={amenity.name} className={styles.icon} />
                        )}
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id='sidebar' className={cn(styles.sidebar, 'flex-grow')}>
            <div className={styles.mapSection}>
              <div className={styles.mapContainer}>
                <img
                  src='/images/map-view/staticmap.webp'
                  alt='Map of Ho Chi Minh'
                  className={styles.mapImage}
                />
                <a
                  href='https://www.google.com/maps/place/Ho+Chi+Minh+City/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mapButton}
                >
                  {t('branch.viewmap')}
                </a>
              </div>
              <div className={styles.overview_address}>{branch.address}</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_area_heading}>{t('branch.explorearea')}</div>
              {branch.nearBy.map((place) => (
                <div key={place.name}>
                  <div>
                    <div className={styles.explore_area}>
                      <div className='flex mb-2 flex-1 justify-between'>
                        <div className={styles.explore_text}>{place.name}</div>
                        <div className={styles.explore_text_distance}>{place.distance}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section id='booking' className={styles.hotelRoomList}>
          <div className={styles.roomGrid}>
            {branch.rooms.map((room) => (
              <button onClick={() => openDialog(room)} key={room.id} className={styles.roomCard}>
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
                            <img
                              src={amenity.icon.url}
                              alt={amenity.name}
                              className={styles.icon}
                            />
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
            ))}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='max-w-[1080px] h-auto overflow-y-scroll max-h-4/5 '>
              {selectedRoom && (
                <div className={styles.popOver}>
                  <DialogHeader>
                    <div className={styles.topPart}>
                      <DialogTitle className={styles.title}>{selectedRoom.name}</DialogTitle>
                    </div>
                  </DialogHeader>
                  <div className={cn(styles.dialogContainer)}>
                    <div className={styles.Image}>
                      <ImageSlider images={selectedRoom.images} />
                    </div>
                    <div className={cn(styles.dialogContents)}>
                      <div className={styles.dialogDescContent}>
                        <div className={styles.dialogHotelLogo}>
                          <img
                            src='/logos/logo-large-dark.png'
                            alt='Hotel Logo'
                            className={styles.dialogLogo}
                          />
                        </div>
                        <div className={styles.dialogRoomDescription}>
                          {selectedRoom.description}
                        </div>
                      </div>
                      <div className={styles.dialogRoomDetails}>
                        <div className={styles.title}>{t('room.title')}</div>
                        <div className={cn(styles.dialogRoomAttributes, 'flex flex-row')}>
                          <span>
                            <Ruler className={styles.icon} /> {selectedRoom.area} m²
                          </span>
                          <span>
                            <BedDouble className={styles.icon} /> {selectedRoom.bed_type}
                          </span>
                          <span>
                            <User className={styles.icon} /> {selectedRoom.max_adults}{' '}
                            {t('branch.people')}
                          </span>
                        </div>
                      </div>
                      <div className={styles.dialogRoomAmenities}>
                        <div className={styles.title}>{t('room.title2')}</div>
                        <div className='flex flex-col gap-2'>
                          {selectedRoom.amenities.map((amenity) => (
                            <div
                              key={amenity.slug}
                              className={cn(styles.AmenityItem, 'flex flex-row')}
                            >
                              {amenity.icon && (
                                <img
                                  src={amenity.icon.url}
                                  alt={amenity.name}
                                  className={styles.icon}
                                  width={22}
                                  height={22}
                                />
                              )}
                              <span>{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.button}>
                        <div className={styles.dialogRoomButton}>{getButton([selectedRoom])}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </section>
      </main>
    </div>
  );
};

export default HotelDescription;

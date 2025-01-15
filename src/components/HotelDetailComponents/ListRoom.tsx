'use client';

import { useState } from 'react';
import { BedDouble, Clock, Ruler, User } from 'lucide-react';

import styles from './index.module.scss';

import { cn } from '@/lib/utils';
import { RoomDetail } from '@ahomevilla-hotel/node-sdk';
import { useTranslation } from '@/i18n/client';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import { DialogCustom } from '@/components/Common/CustomDialog';
import HotelCard from './HotelCard';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageSlider from './ImageSlider';
import { ScrollArea } from '@/components/ui/scroll-area';
import Container from '@/components/Common/Container';

interface ListRoomProps {
  roomDetails: RoomDetail[];
  lng: string;
}

const ListRoom = ({ roomDetails, lng }: Readonly<ListRoomProps>) => {
  const { t } = useTranslation(lng, 'branch');
  const { bookingTime } = useSearchBarStore((state) => state);
  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);

  const previewRoom = DialogCustom.useDialog();

  const openDialog = (room: RoomDetail) => {
    setSelectedRoom(room);
    previewRoom.open();
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
    <Container id='booking' className='py-8'>
      <div className={styles.roomGrid}>
        {roomDetails.map((room) => (
          <HotelCard
            key={room.id}
            lng={lng}
            currentType={bookingTime.type}
            room={room}
            onOpen={openDialog}
          />
        ))}
      </div>

      <DialogCustom dialog={previewRoom} className='max-w-[1080px] w-full'>
        {selectedRoom && (
          <div className={styles.popOver}>
            <DialogHeader>
              <div className={styles.topPart}>
                <DialogTitle className={styles.title}>{selectedRoom.name}</DialogTitle>
              </div>
            </DialogHeader>
            <div className={styles.dialogContainer}>
              <div className={styles.Image}>
                <ImageSlider images={selectedRoom.images} />
              </div>
              <div className={styles.dialogContents}>
                <ScrollArea className='max-h-[400px]'>
                  <div className={styles.dialogDescContent}>
                    <div className={styles.dialogHotelLogo}>
                      <img
                        src='/logos/logo-large-dark.png'
                        alt='Hotel Logo'
                        className={styles.dialogLogo}
                      />
                    </div>
                    <div className={styles.dialogRoomDescription}>{selectedRoom.description}</div>
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
                        <div key={amenity.slug} className={cn(styles.AmenityItem, 'flex flex-row')}>
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
                </ScrollArea>
                <div className={styles.button}>
                  <div className={styles.dialogRoomButton}>{getButton([selectedRoom])}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogCustom>
    </Container>
  );
};

export default ListRoom;

'use client';

import { useMemo, useState } from 'react';
import { BedDouble, Hotel, Ruler, User, Clock } from 'lucide-react';

import styles from './index.module.scss';

import { cn } from '@/lib/utils';
import { FilterRoomDetailDto, RoomDetail } from '@ahomevilla-hotel/node-sdk';
import { useTranslation } from '@/i18n/client';
import { useSearchBarStore } from '@/stores/search-bar/searchBarStore';
import { DialogCustom } from '@/components/Common/CustomDialog';
import HotelCard from './HotelCard';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageSlider from './ImageSlider';
import { ScrollArea } from '@/components/ui/scroll-area';
import Container from '@/components/Common/Container';
import { useRequest } from 'ahooks';
import { getRoomDetailService } from '@/services/room-detail';
import { Text } from '@/components/ui/text';
import LoadingSection from '@/components/Common/LoadingSection';
import { formatBookingDateTime } from '@/lib/funcs/date';
import { BookingButton } from './BookingButton';
import { Button } from '@/components/ui/button';
import { getPrice } from '@/lib/funcs/price';

interface ListRoomProps {
  lng: string;
  branchSlug: string;
  roomDetails: RoomDetail[];
  branchInfor: {
    name: string;
    address: string;
  };
}

const ListRoom = ({ branchSlug, lng, roomDetails, branchInfor }: Readonly<ListRoomProps>) => {
  const { t } = useTranslation(lng, 'branch');
  const { province, bookingTime, customerAmount } = useSearchBarStore((state) => state);

  const [selectedRoom, setSelectedRoom] = useState<RoomDetail | null>(null);

  const { data: roomDetailsResponse, loading } = useRequest(
    () => {
      const { checkIn, checkOut } = bookingTime;
      const { startDate, endDate, startTime, endTime } = formatBookingDateTime(checkIn, checkOut);

      return getRoomDetailService({
        pageSize: 100,
        filters: JSON.stringify({
          branchSlug,
          provinceSlug: province,
          adults: customerAmount.adult,
          children: customerAmount.child,
          startDate,
          endDate,
          startTime,
          endTime,
        } as FilterRoomDetailDto),
      });
    },
    {
      refreshDeps: [branchSlug, province, customerAmount, bookingTime],
    },
  );

  const previewRoom = DialogCustom.useDialog();

  const availableRooms = useMemo(() => {
    const roomIds = roomDetailsResponse?.data.data.map((room) => room.id) ?? [];

    return roomDetails.map((room) => ({
      ...room,
      is_available: roomIds.includes(room.id),
    }));
  }, [roomDetailsResponse]);

  const openDialog = (room: RoomDetail) => {
    setSelectedRoom(room);
    previewRoom.open();
  };

  return (
    <Container id='booking' className='py-8'>
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          <div className={styles.roomGrid}>
            {availableRooms.map((room) => (
              <HotelCard
                key={room.id}
                lng={lng}
                currentType={bookingTime.type}
                room={room}
                onOpen={openDialog}
                bookingButton={
                  <BookingButton
                    t={t}
                    bookingInfor={{
                      detailId: room.id,
                      branchSlug,
                      detailName: room.name,
                      thumbnail: room.thumbnail.url,
                      branchName: branchInfor.name,
                      branchAddress: branchInfor.address,
                      totalAmount: getPrice(room, bookingTime),
                    }}
                    isRoomDetailCard
                  />
                }
              />
            ))}
          </div>

          {roomDetailsResponse?.data.meta.total === 0 && (
            <div className='w-full h-[240px] flex flex-col items-center justify-center gap-6'>
              <Hotel className='!w-32 !h-32 text-accent' />
              <Text type='title1-semi-bold'>{t('no_rooms')}</Text>
            </div>
          )}
        </>
      )}

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
                {selectedRoom.is_available ? (
                  <BookingButton
                    t={t}
                    bookingInfor={{
                      detailId: selectedRoom.id,
                      branchSlug,
                      detailName: selectedRoom.name,
                      thumbnail: selectedRoom.thumbnail.url,
                      branchName: branchInfor.name,
                      branchAddress: branchInfor.address,
                      totalAmount: getPrice(selectedRoom, bookingTime),
                    }}
                  />
                ) : (
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
        )}
      </DialogCustom>
    </Container>
  );
};

export default ListRoom;

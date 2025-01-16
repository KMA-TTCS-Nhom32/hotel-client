import { BookingTime, BookingType } from '@/stores/search-bar/searchBarStore';
import { RoomDetail } from '@ahomevilla-hotel/node-sdk';

const parsePrice = (price: string | undefined): number => {
  if (!price) return 0;
  return parseFloat(price) || 0;
};

const calculateHoursDifference = (checkIn: Date, checkOut: Date): number => {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60));
};

const calculateDaysDifference = (checkIn: Date, checkOut: Date): number => {
  const checkInDate = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const checkOutDate = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
  const diffMs = checkOutDate.getTime() - checkInDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export class RoomPriceCalculator {
  constructor(
    private readonly room: RoomDetail,
    private readonly checkIn: Date,
    private readonly checkOut: Date,
  ) {}

  private readonly priceMap = {
    HOURLY: () => {
      const hours = calculateHoursDifference(this.checkIn, this.checkOut);
      const hourlyRate = parsePrice(
        this.room.special_price_per_hour ?? this.room.base_price_per_hour,
      );
      return hourlyRate * hours;
    },
    NIGHTLY: () => parsePrice(this.room.special_price_per_night ?? this.room.base_price_per_night),
    DAILY: () => {
      const days = calculateDaysDifference(this.checkIn, this.checkOut);
      const dailyRate = parsePrice(this.room.special_price_per_day ?? this.room.base_price_per_day);
      return dailyRate * days;
    },
  } as const;

  getPrice(type: BookingType) {
    return this.priceMap[type]?.() ?? 0;
  }
}

// Helper function for easier usage
export const getPrice = (room: RoomDetail, bookingTimeData: BookingTime) => {
  const { checkIn, checkOut, type } = bookingTimeData;
  return new RoomPriceCalculator(room, checkIn, checkOut).getPrice(type);
};

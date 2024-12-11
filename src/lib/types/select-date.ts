import { BookingTime } from "@/stores/search-bar/searchBarStore";

export type WorkingHour = {
  start: string;
  end: string;
};

export type TimeOption = {
  time: string;
  isDisabled: boolean;
};

export type SelectDateType = keyof Omit<BookingTime, 'type'>;

export interface Period {
  start: string; // format: "DD/MM"
  end: string; // format: "DD/MM"
}
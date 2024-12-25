'use client';
import { FaCloudMoon } from "react-icons/fa6";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import Link from "next/link";
import { useTranslation } from '@/i18n/client';
import { ButtonCustom } from "@/components/ui/button-custom";


interface BannerBooking {
    lng: string;
}

const BannerBooking = ({ lng }: Readonly<BannerBooking>) => {


    return (
        <div className="flex mt-4 rounded-3xl hidden sm:block" >
            <div className="bg-red-800 flex flex-col gap-5 shrink-0 justify-center w-2/5 rounded-bl-2xl rounded-tl-2xl">
                <div className="text-white text-left text-2xl font-medium text-center p-5">
                    Bắt đầu chuyến đi trong mơ của bạn!

                </div>
                <div className="text-center">
                    <ButtonCustom className="">Đặt phòng ngay </ButtonCustom>
                </div>

            </div>
            <div className="w-3/5 ">
                <img className="rounded-r-2xl w-full" alt="" src="/images/banner-booking.png "/>

            </div>
            
        </div>


    );
};

export default BannerBooking;

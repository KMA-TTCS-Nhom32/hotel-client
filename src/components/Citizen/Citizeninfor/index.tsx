'use client';
import { FaCloudMoon } from "react-icons/fa6";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import Link from "next/link";
import { useTranslation } from '@/i18n/client';
import { Progress } from "@/components/ui/progress"

interface CitizenInfor {
    lng: string;
    title: string;
    nextname: string;
}


const CitizenInfor = ({ lng, title, nextname }: Readonly<CitizenInfor>) => {

    const { t } = useTranslation(lng, 'home'); 
    

    return (
        <div className="bg-orange-500 p-6 relative rounded-xl">
            <div className="text-3xl text-white pb-2 font-medium	">
              {title}
            </div>
            <div className="text-lg	 text-white">Tích luỹ
                <b> 3 đặt phòng </b>
                hoặc
                <b> 7 đêm </b>
                trước
                <b> 15/07/2025 </b>
                để tiến tới
                <b> { nextname}</b></div>
            <div className=" sm:flex flex-row pt-2 mt-2 items-center gap-2 pb-5 ">
                <div className="flex items-center gap-3 grow shrink">
                    <div className="">
                        <FaCloudMoon className="text-orange-600  justify-items-center rounded-xl bg-white w-10 h-20 px-2 py-2" />
                    </div>
                    <div className="grow shrink">
                        <div className="text-lg	text-slate-200">
                            <b className="text-white text-3xl ">
                                0/
                            </b>
                            7 Đêm

                        </div>

                        <div className="">
                            <Progress className=" bg-orange-700 mt-1 relative h-6 rounded-xl " value={50} />

                        </div>

                    </div>

                </div>
                <div className="flex flex-col items-center grow-0 sm:shrink sm:gap-2 px-5 justify-center ">
                    <div className="w-0.5 h-10 bg-white hidden sm:block">

                    </div>
                    <div className="divider-label uppercase text-white ">
                        hoặc

                    </div>
                    <div className="w-0.5 h-10 bg-white gap-2 hidden sm:block">

                    </div>

                </div>
                <div className="flex items-center gap-3 grow shrink ">
                    <div className="icon">
                        <FaHouseChimneyWindow className="text-orange-600 justify-items-center rounded-xl bg-white w-10 h-20 px-2 py-2" />


                    </div>
                    <div className="grow shrink">
                        <div className="text-lg	text-slate-200">
                            <b className="text-white text-3xl ">
                                0/
                            </b>
                            3 Đặt phòng

                        </div>
                        <div className="">
                            <Progress className="bg-orange-700 mt-1 relative h-6 rounded-xl " value={50} />

                        </div>


                    </div>
                </div>

            </div>
            <div className="pt-2 text-white text-base">
                <p>1 Đơn đặt phòng yêu cầu tối thiểu 2 đêm. Vui lòng xem chi tiết </p>
                <Link className="underline" href="" target="_blank"> Điều khoản &amp; Điều kiện</Link>
            </div>
        </div>


    );
};

export default CitizenInfor;

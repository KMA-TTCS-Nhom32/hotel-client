'use client';
import { FaCalendarCheck } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
interface TierBenefit {
    lng: string;
}

const TierBenefit = ({ lng }: Readonly<TierBenefit>) => {


    return (
        <div>
            <div className="bg-white p-6 rounded-xl ">
                <div className="text-xl font-medium">
                    Quyền lợi của bạn
                </div>
                <div className="my-4 py-2 relative flex flex-col items-center">
                    <div className="w-14 h-14 icon bg-slate-200 rounded-full">
                        <FaDoorOpen className="w-full h-full p-2 text-orange-400" />

                    </div>
                    <div className="pt-2 pr-2 text-lg font-medium text-center	">
                        Nhận phòng sớm
                    </div>
                    <div className="text-center text-lg text-gray-400">
                        Thêm thời gian trải nghiệm khi nhận phòng sớm (dựa theo tình trạng phòng)
                    </div>


                </div>
                <div className="pt-3 text-center">
                    <a className="text-orange-500" href="">  Tìm hiểu về M Village MORE  &gt;  </a>

                </div>

            </div>

            <div className="mt-5 flex flex-col justify-between gap-4 p-5 border-solid border-2 border-gray-400 rounded-xl">
                <div className="next-tier_content">
                    <div className="text-xl font-medium">
                        Hạng tiếp theo: Bạc

                    </div >
                    <div className="mt-2 text-lg text-gray-400">
                        Tích luỹ 7 đêm và tận hưởng thêm những trải nghiệm thú vị với đặc quyền Ưu tiên trả phòng muộn.
                    </div>

                </div>
                <div className="flex gap-4 pt-4 ">
                    <div className="flex flex-col grow-0 shrink bg-gray-200 p-4 rounded-2xl ">
                        <div className="  w-10 h-10 relative flex flex-col bg-white  rounded-2xl">
                            <FaCalendarCheck className=" text-gray-500 h-full w-full p-3" />

                        </div>
                        <div className="text-lg pt-2 pb-6 pl-2">
                            Ưu tiên trả phòng muộn
                        </div>
                        <div className="ml-auto">

                            <MdLockClock className=" text-gray-500 w-6 h-6 " />

                        </div>

                    </div>

                </div>

            </div>

        </div>


    );
};

export default TierBenefit;

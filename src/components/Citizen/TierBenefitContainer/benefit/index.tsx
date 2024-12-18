'use client';
import { FaCalendarCheck } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
interface Benefit {
    lng: string;
    title: string;
    description: string;
}

const Benefit = ({ lng, title, description }: Readonly<Benefit>) => {


    return (

        <div className="my-4 py-2 relative flex flex-col items-center bg-orange-200 rounded-2xl ">
            <div className="w-14 h-14 icon bg-slate-200 rounded-full">
                <FaDoorOpen className="w-full h-full p-2 text-orange-400" />

            </div>
            <div className="pt-2 pr-2 text-lg font-medium text-center	">
                {title}
            </div>
            <div className="text-center text-lg text-gray-400">
                {description}
            </div>


        </div>


    );
};

export default Benefit;




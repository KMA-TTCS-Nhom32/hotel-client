'use client';

import { title } from "process";
import CitizenInfor from "../Citizeninfor";
import TierBenefit from "../TierBenefitContainer";
import BannerBooking from "@/components/Citizen/BannerBooking.tsx";
interface Citizen {
    lng: string;
   
}

const Citizen = ({ lng }: Readonly<Citizen>) => {


    return (
        <>
            <CitizenInfor lng={lng} /> 
            <TierBenefit lng={lng} />
            <BannerBooking lng={lng} />
            </>

    );
};

export default Citizen;
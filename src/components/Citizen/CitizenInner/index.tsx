'use client';

import { title } from "process";
import CitizenInfor from "../Citizeninfor";
import TierBenefit from "../TierBenefitContainer";
import BannerBooking from "@/components/Citizen/BannerBooking.tsx";

import { deflate } from "zlib";
import NextBenefit from "../TierBenefitContainer/nextBenefit";
interface Citizen {
    lng: string;

}

interface Benefit {
    title: string;
    description: string;
    bonusContent?: string;
    nextlevel?: string;
}

interface nextBenefit {
    title: string;
}



interface userRank {
    usersid: 'bronze' | 'silver' | 'gold' | 'platium';
    name: 'Thành viên Mới' | 'Thành viên Bạc' | 'Thành viên Vàng' | 'Thành viên Bạch Kim';
    nextname: 'Thành viên Bạc' | 'Thành viên Vàng' | 'Thành viên Bạch Kim';
    Benefits: Benefit[];
    nextBenefits: nextBenefit[];
}

const generateDatabyRank: userRank = (usersid: 'bronze' | 'silver' | 'gold' | 'platium') => {
    switch (usersid) {
        case 'bronze':
            return {
                usersid: usersid,
                name: 'Thành viên Mới',
                nextname: 'Thành viên Bạc',
                Benefits: [{
                    title: 'Nhận phòng sớm',
                    description: '(Phụ thuộc vào tình trạng phòng)',

                }],
                nextBenefits: [{ title: 'Ưu tiên trả phòng muộn' }]
            }
        case 'silver':
            return {
                usersid: usersid,
                name: 'Thành viên Bạc',
                nextname: 'Thành viên Vàng',
                Benefits: [{
                    title: 'Nhận phòng sớm',
                    description: '(Phụ thuộc vào tình trạng phòng)'
                },
                {
                    title: 'Ưu tiên trả phòng muộn',
                    description: '(Phụ thuộc vào tình trạng phòng, cần thông báo khi nhận phòng)',

                }
                ],
                nextBenefits: [
                    { title: 'Tăng hạng phòng miễn phí' },
                    { title: 'Miễn phí hủy phòng' }
                ]


            }

        case 'gold':
            return {
                usersid: usersid,
                name: 'Thành viên Vàng',
                nextname: 'Thành viên Bạch Kim',
                Benefits: [{
                    title: 'Nhận phòng sớm',
                    description: '(Phụ thuộc vào tình trạng phòng)'
                },
                {
                    title: 'Ưu tiên trả phòng muộn',
                    description: '(Phụ thuộc vào tình trạng phòng, cần thông báo khi nhận phòng)',

                },
                {
                    title: 'Tăng hạng phòng miễn phí',
                    description: '(Phụ thuộc vào tình trạng phòng)',

                },
                {
                    title: 'Miễn phí hủy phòng',
                    description: '',

                }
                          
                ],
                nextBenefits: [
                    { title: 'Quà tặng thường niên' },
                    
                ]

            }
        default: {
            return {
                usersid: usersid,
                name: 'Thành viên Bạch Kim',
                nextname: 'Thành viên Bạch Kim',
                Benefits: [{
                    title: 'Nhận phòng sớm',
                    description: '(Phụ thuộc vào tình trạng phòng)'
                },
                {
                    title: 'Ưu tiên trả phòng muộn',
                    description: '(Phụ thuộc vào tình trạng phòng, cần thông báo khi nhận phòng)',

                },
                {
                    title: 'Tăng hạng phòng miễn phí',
                    description: '(Phụ thuộc vào tình trạng phòng)',

                },
                {
                    title: 'Miễn phí hủy phòng',
                    description: '',

                }
                    ,

                {
                    title: 'Quà tặng thường niên',
                    description: '',

                }


                ]

            }


        }

    }

}

const Citizen = ({ lng }: Readonly<Citizen>) => {
    const userRank = generateDatabyRank('silver');

    return (
        <>
            <CitizenInfor lng={lng} title={userRank.name} nextname={userRank.nextname} />
            <TierBenefit lng={lng} Benefits={userRank.Benefits} nextname={userRank.nextname} nextBenefits={userRank.nextBenefits} />
            <BannerBooking lng={lng} />
        </>

    );
};

export default Citizen;
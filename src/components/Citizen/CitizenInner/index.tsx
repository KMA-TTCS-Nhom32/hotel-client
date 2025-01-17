'use client';
import { useRequest } from 'ahooks';
import CitizenInfor from '../Citizeninfor';
import TierBenefit from '../TierBenefitContainer';
import BannerBooking from '@/components/Citizen/BannerBooking.tsx';
import { useTranslation } from '@/i18n/client';
import { getUsers } from '@/services/auth';

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

interface UserRank {
  usersid: 'bronze' | 'silver' | 'gold' | 'platium';
  name: 'Thành viên Mới' | 'Thành viên Bạc' | 'Thành viên Vàng' | 'Thành viên Bạch Kim';
  nextname: 'Thành viên Bạc' | 'Thành viên Vàng' | 'Thành viên Bạch Kim';
  Benefits: Benefit[];
  nextBenefits: nextBenefit[];
}

const generateDatabyRank: any = (usersid: 'bronze' | 'silver' | 'gold' | 'platium') => {
  switch (usersid) {
    case 'bronze':
      return {
        usersid: usersid,
        name: 'New Citizen',
        nextname: 'Silver Citizen',
        Benefits: [
          {
            title: 'Early Check-in',
            description: '(Based on availability)',
          },
        ],
        nextBenefits: [{ title: 'Priority late Check-out' }],
      };
    case 'silver':
      return {
        usersid: usersid,
        name: 'Silver Citizen',
        nextname: 'Gold Citizen',
        Benefits: [
          {
            title: 'Early Check-in',
            description: '(Based on availability)',
          },
          {
            title: 'Priority late Check-out',
            description: '(Based on availability, need to inform upon check-in)',
          },
        ],
        nextBenefits: [{ title: 'Free Room upgrade' }, { title: 'Free cancellation' }],
      };

    case 'gold':
      return {
        usersid: usersid,
        name: 'Gold Citizen',
        nextname: 'Platinum Citizen',
        Benefits: [
          {
            title: 'Early Check-in',
            description: '(Based on availability)',
          },
          {
            title: 'Priority late Check-out',
            description: '(Based on availability, need to inform upon check-in)',
          },
          {
            title: 'Free Room upgrade',
            description: '(Subject on availability)',
          },
          {
            title: 'Free cancellation',
            description: '',
          },
        ],
        nextBenefits: [{ title: 'Annual Surprise Gift' }],
      };
    default: {
      return {
        usersid: usersid,
        name: 'Platinum Citizen',
        nextname: 'Platinum Citizen',
        Benefits: [
          {
            title: 'Early Check-in',
            description: '(Based on availability)',
          },
          {
            title: 'Priority late Check-out',
            description: '(Based on availability, need to inform upon check-in)',
          },
          {
            title: 'Free Room upgrade',
            description: '(Subject on availability)',
          },
          {
            title: 'Free cancellation',
            description: '',
          },

          {
            title: 'Annual Surprise Gift',
            description: '',
          },
        ],
        nextBenefits: [],
      };
    }
  }
};

const Citizen = ({ lng }: Readonly<Citizen>) => {
  const { data, error, loading } = useRequest(getUsers);
  let bookings = data?.data._count?.bookings ?? 0;
  let userrank = '';
  let room = 0;

  if (typeof bookings === 'number' && bookings >= 0 && bookings < 3) {
    userrank = 'bronze';
  } else if (typeof bookings === 'number' && bookings >= 3 && bookings < 6) {
    userrank = 'silver';
    room = bookings - 3;
  } else if (typeof bookings === 'number' && bookings >= 6 && bookings < 9) {
    userrank = 'gold';
    room = bookings - 6;
  }
   else if (typeof bookings === 'number' && bookings >= 9) {
     userrank = 'platinum';
  }
  const userRank = generateDatabyRank(userrank);
  return (
    <>
      <CitizenInfor lng={lng} title={userRank.name} nextname={userRank.nextname} bookings={room} />
      <TierBenefit
        lng={lng}
        Benefits={userRank.Benefits}
        nextname={userRank.nextname}
        nextBenefits={userRank.nextBenefits}
      />
      <BannerBooking lng={lng} />
    </>
  );
};

export default Citizen;

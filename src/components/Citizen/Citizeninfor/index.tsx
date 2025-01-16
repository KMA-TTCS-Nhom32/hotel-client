'use client';
import { FaCloudMoon } from 'react-icons/fa6';
import { FaHouseChimneyWindow } from 'react-icons/fa6';
import Link from 'next/link';
import { useTranslation } from '@/i18n/client';
import { Progress } from '@/components/ui/progress';
import { useRequest } from 'ahooks';
import { useProfileStore } from '@/providers/profile-store-provider';
import { getUsers } from '@/services/auth';

interface CitizenInfor {
  lng: string;
  title: string;
  nextname: string;
  bookings: number;
}

const CitizenInfor = ({ lng, title, nextname, bookings }: Readonly<CitizenInfor>) => {
  const { t } = useTranslation(lng, 'benefit');
  return (
    <div className='bg-orange-500 p-6 relative rounded-xl'>
      <div className='text-3xl text-white pb-2 font-medium	'>{t(title)}</div>
      <div className='text-lg	 text-white'>
        {t('Earn')}
        <b> 3{t('booking(s)')} </b>
        {t('by')}
        <b> 15/07/2025 </b>
        {t('to become')}
        <b> {nextname}</b>
      </div>
      <div className=' sm:flex flex-row pt-2 mt-2 items-center gap-2 pb-5 '>
        <div className='flex items-center gap-3 sm:w-1/2 w-full'>
          <div className='icon'>
            <FaHouseChimneyWindow className='text-orange-600 justify-items-center rounded-xl bg-white w-10 h-20 px-2 py-2' />
          </div>
          <div className='grow shrink'>
            <div className='text-lg	text-slate-200'>
              <b className='text-white text-3xl uppercase'>{bookings}/</b>3 {t('booking(s)')}
            </div>
            <div className=''>
              <Progress
                className='bg-orange-700 mt-1 relative h-6 rounded-xl '
                value={bookings * 10}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='pt-2 text-white text-base'>
        <p>{t('Minimum 2 nights per booking. See more details at ')}</p>
        <Link className='underline' href='' target='_blank'>
          {t('Term & Condition')}
        </Link>
      </div>
    </div>
  );
};

export default CitizenInfor;

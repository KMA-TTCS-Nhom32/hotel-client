'use client';
import { FaCalendarCheck } from 'react-icons/fa';
import { MdLockClock } from 'react-icons/md';
import { useTranslation } from '@/i18n/client';
interface NextBenefit {
  lng: string;
  title: string;
}

const NextBenefit = ({ lng, title }: Readonly<NextBenefit>) => {
  const { t } = useTranslation(lng, 'benefit');
  return (
    <div className='flex  flex-col grow-0 shrink bg-gray-200 p-4 rounded-2xl '>
      <div className='  w-10 h-10 relative flex flex-col bg-white  rounded-2xl'>
        <FaCalendarCheck className=' text-gray-500 h-full w-full p-3' />
      </div>
      <div className='text-lg pt-2 pb-6 pl-2'>{t(title)}</div>
      <div className='ml-auto'>
        <MdLockClock className=' text-gray-500 w-6 h-6 ' />
      </div>
    </div>
  );
};

export default NextBenefit;

'use client';
import { FaDoorOpen } from 'react-icons/fa';
import { useTranslation } from '@/i18n/client';
interface Benefit {
  lng: string;
  title: 'New Citizen' | 'Your benefits' | 'Silver Citizen' | 'Gold Citizen' | 'Platinum Citizen';
  description: any;
}

const Benefit = ({ lng, title, description }: Readonly<Benefit>) => {
   const { t } = useTranslation(lng, 'benefit');
  return (
    <div className='my-4 py-2 relative flex flex-col items-center bg-orange-100 rounded-2xl '>
      <div className='w-14 h-14 icon bg-slate-200 rounded-full'>
        <FaDoorOpen className='w-full h-full p-2 text-orange-400' />
      </div>
      <div className='pt-2 pr-2 text-lg font-medium text-center	'>{t(title)}</div>
      <div className='text-center text-lg text-gray-400'>{t(description)}</div>
    </div>
  );
};

export default Benefit;

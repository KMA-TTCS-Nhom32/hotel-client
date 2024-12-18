'use client';
import { SlArrowRight } from 'react-icons/sl';
import { RiMedalFill } from 'react-icons/ri';
import { useTranslation } from '@/i18n/client';
import LogOutButton from '@/components/Common/LogOutButton';
import Link from 'next/link';
import style from './index.module.scss';

interface SideBar {
  lng: string;
}

const SideBar = ({ lng }: Readonly<SideBar>) => {
  const { t } = useTranslation(lng, 'account');
  return (
    <div className={style.side_bar}>

      <div className={style.container}>
        <div className={style.text_heading}>Hi, Nguyễn Ngọc Dũng</div>
        <div className={style.news}>
          <div className={style.icon1}>
            <RiMedalFill />
          </div>
          <div className={style.text}>
            <Link href={'/account'}>
            <div className="text-white text-base">{t('YOU’RE')}</div>
              <div className='text-white text-lg font-bold'>{t('New_Citizen')}</div>
            </Link>
          </div>
          <div className={style.icon2}>{`>`}</div>
        </div>
        <div className={style.ifm}>
          <div className={style.ifm1}>
            <div className='text-orange-500'>0</div>
            <div className='text-gray-500'>{t('Night')}</div>
          </div>
          <div className={style.ifm2}></div>
          <div className={style.ifm3}>
            <div className='text-orange-500'>0</div>
            <div className='text-gray-500'>{t('Booking')}</div>
          </div>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.box}>
          <Link href={'/account/account-infor'}>   {t('account_manager')}</Link>

        </div>
        <div className={style.box}>{t('my_reservations')}</div>
        <div className={style.box3}></div>
        <div className={style.box}>
          <LogOutButton />
        </div>
      </div>



    </div>
  );
};

export default SideBar;

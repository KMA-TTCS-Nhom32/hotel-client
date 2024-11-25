'use client';
import { SlArrowRight } from 'react-icons/sl';
import { RiMedalFill } from 'react-icons/ri';
import { useTranslation } from '@/i18n/client';
import LogOutButton from '@/components/Common/LogOutButton';

import style from './index.module.scss';

interface SideBar {
  lng: string;
}

const SideBar = ({ lng }: Readonly<SideBar>) => {
  const { t } = useTranslation(lng, 'account');
  return (
    <div className={style.side_bar}>
      <div className={style.sidebar_reponsive}>
        <div className={style.text_heading}>Hi, Nguyễn Ngọc Dũng</div>
        <div className={style.news}>
          <div className={style.icon1}>
            <RiMedalFill />
          </div>
          <div className={style.text}>
            <div className={style.text1}>{t('YOU’RE')}</div>
            <div className={style.text2}>{t('New_Citizen')}</div>
          </div>
          <div className={style.icon2}>{`>`}</div>
        </div>
        <div className={style.ifm}>
          <div className={style.ifm1}>
            <div className={style.text3}>0</div>
            <div className={style.text4}>{t('Night')}</div>
          </div>
          <div className={style.ifm2}></div>
          <div className={style.ifm3}>
            <div className={style.text3}>0</div>
            <div className={style.text4}>{t('Booking')}</div>
          </div>
        </div>

        <div className={style.main}>
          <div className={style.box1}>{t('account_manager')}</div>
          <div className={style.box2}>{t('my_reservations')}</div>
          <div className={style.box3}></div>
        </div>

        <LogOutButton className='justify-start' />
      </div>

      {/* <div className={style.main}>
        <div className={style.box1}>{t('account_manager')}</div>
        <div className={style.box2}>{t('my_reservations')}</div>
        <div className={style.box3}></div>
        <div className={style.box4}>{t('log_out')}</div>
      </div> */}
    </div>
  );
};

export default SideBar;

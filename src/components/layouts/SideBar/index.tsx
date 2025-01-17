'use client';

import { RiMedalFill } from 'react-icons/ri';
import { useTranslation } from '@/i18n/client';
import LogOutButton from '@/components/Common/LogOutButton';
import Link from 'next/link';
import style from './index.module.scss';
import { cn } from '@/lib/utils';
import { useProfileStore } from '@/providers/profile-store-provider';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes.constant';
import { Text } from '@/components/ui/text';
import { useRequest } from 'ahooks';
import { getUsers } from '@/services/auth';

interface SideBar {
  lng: string;
  className?: string;
}

const SideBar = ({ lng, className }: Readonly<SideBar>) => {
  const { t } = useTranslation(lng, 'account');
  const { profile } = useProfileStore((state) => state);

  const pathName = usePathname();

  const isCurrentPathname = (path: string) => {
    return pathName.includes(path);
  };

  const links: { href: string; title: string }[] = [
    { href: APP_ROUTES.AccountInfor, title: t('account_manager') },
    { href: APP_ROUTES.AccountMyReservation, title: t('my_reservations') },
  ];
  const { data, error, loading } = useRequest(getUsers);
  let bookings = data?.data._count?.bookings ?? 0;
  let userrank : any;
  if (typeof bookings === 'number' && bookings >= 0 && bookings < 3) {
    userrank = 'New Citizen';
  } else if (typeof bookings === 'number' && bookings >= 3 && bookings < 6) {
    userrank = 'Silver Citizen';
  } else if (typeof bookings === 'number' && bookings >= 6 && bookings < 9) {
    userrank = 'Gold Citizen';
  } else if (typeof bookings === 'number' && bookings >= 9) {
    userrank = 'Platinum Citizen';
  }
  return (
    <div className={cn(style.side_bar, className)}>
      <div className={style.container}>
        <div className={style.text_heading}>Hi, {profile?.name}</div>
        <div className={style.news}>
          <div className={style.icon1}>
            <RiMedalFill />
          </div>
          <div className={style.text}>
            <Link href={'/account'}>
              <Text type='body1' className='text-white text-base'>
                {t('YOU’RE')}
              </Text>
              <Text type='heading5-medium' className='text-white text-lg font-bold'>
                {t(userrank)}
              </Text>
            </Link>
          </div>
          <div className={style.icon2}>{`>`}</div>
        </div>
        <div className={style.ifm}>
          <div className={style.ifm3}>
            <div className='text-orange-500'>{bookings}</div>
            <div className='text-gray-500'>{t('Booking')}</div>
          </div>
        </div>
      </div>
      <div className={style.main}>
        {links.map((link, index) => (
          <div
            key={index}
            className={cn(style.box, isCurrentPathname(link.href) && 'bg-orange-100')}
          >
            <Link href={link.href}>
              <Text type='title1-semi-bold' className='!text-gray-900'>
                {link.title}
              </Text>
            </Link>
          </div>
        ))}
        <div className={style.box3}></div>

        <LogOutButton />
      </div>
    </div>
  );
};

export default SideBar;

import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { CircleUserRound, Menu } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  lng: string;
  t: (key: string) => string;
}

export default function Header({ lng, t }: HeaderProps) {
  return (
    <header className='header-section'>
      <div className='logo'>
        <img src='/images/logo-mvillage-w.png' alt='Logo' />
      </div>

      <nav className='nav-links'>
        <Link href={`/${lng}/booking`} className='nav-link'>
          {t('booking')}
        </Link>
        <Link href={`/${lng}/long-term-stay`} className='nav-link'>
          {t('Lưu trú dài hạn')}
        </Link>
        <Link href={`/${lng}/membership`} className='nav-link'>
          {t('Hội viên thân thiết')}
        </Link>
        <Link href={`/${lng}/our-brand`} className='nav-link'>
          {t('Thương hiệu thành viên')}
          <span className='new-tag'>MỚI</span>
        </Link>

        <LanguageSwitcher />

        <div id='basic-button'>
          <a className='account-menu'>
            <CircleUserRound />
          </a>
          <a className='account-menu'>
            <Menu />
          </a>
        </div>
      </nav>
    </header>
  );
}

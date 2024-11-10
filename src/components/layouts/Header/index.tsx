'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { CircleUserRound, Menu } from 'lucide-react';

import { useTranslation } from '@/i18n/client';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import HomeSearchBar from '@/components/HomeComponents/BannerSearchBar';

import { useObserverHomeSearchBar } from '@/hooks/useObserverHomeSearchBar';

import { APP_ROUTES } from '@/constants/routes.constant';

import styles from './index.module.scss';

interface HeaderProps {
  lng: string;
}

const logo = {
  dark: '/logos/logo-large-dark.png',
  light: '/logos/logo-large-light.png',
};

export default function Header({ lng }: Readonly<HeaderProps>) {
  const { t } = useTranslation(lng);
  const [logoSrc, setLogoSrc] = useState(logo.light);

  const headerRef = useRef<HTMLHeadElement>(null);

  const { isVisible } = useObserverHomeSearchBar();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        headerRef.current?.classList.add(styles.bg_white);
        setLogoSrc(logo.dark);
      } else {
        headerRef.current?.classList.remove(styles.bg_white);
        setLogoSrc(logo.light);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerRef.current?.classList]);

  return (
    <header className={styles.header_section} ref={headerRef}>
      {isVisible ? (
        <>
          <div className={styles.logo}>
            <Image src={logoSrc} alt='Logo' width={64} height={64} className='h-[60px] w-auto' />
          </div>

          <nav className={styles.nav_links}>
            <Link href={APP_ROUTES.SearchRoom}>{t('route.search_room')}</Link>
            <Link href={APP_ROUTES.About}>{t('route.about')}</Link>
            <Link href={APP_ROUTES.Contact}>{t('route.contact')}</Link>
            {/* <Link href={`/${lng}/long-term-stay`}>{t('Lưu trú dài hạn')}</Link>
            <Link href={`/${lng}/membership`}>{t('Hội viên thân thiết')}</Link>
            <Link href={`/${lng}/our-brand`}>
              {t('Thương hiệu thành viên')}
              <span className='new-tag'>MỚI</span>
            </Link> */}

            <LanguageSwitcher />

            <div className={styles.basic_button}>
              <div className={styles.account_menu}>
                <CircleUserRound />
              </div>
              <div className={styles.account_menu}>
                <Menu />
              </div>
            </div>
          </nav>
        </>
      ) : (
        <HomeSearchBar t={t} isHeader={isVisible} />
      )}
    </header>
  );
}

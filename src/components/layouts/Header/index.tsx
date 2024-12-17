'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

import Link from 'next/link';
import Image from 'next/image';

import { useTranslation } from '@/i18n/client';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import UserButton from '@/components/Common/UserButton';
import Container from '@/components/Common/Container';

import { useObserverHomeSearchBar } from '@/hooks/useObserverHomeSearchBar';

import { APP_ROUTES } from '@/constants/routes.constant';

import styles from './index.module.scss';

const DynamicSearchForm = dynamic(
  () => import('@/components/HomeComponents/BannerSearchBar/SearchForm'),
  { ssr: false },
);

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
      <Container className={styles.header_container}>
        {isVisible ? (
          <>
            <Link href={APP_ROUTES.Home}>
              <Image
                src={logoSrc}
                alt='Logo'
                width={200}
                height={40}
                className={styles.logo}
                priority
              />
            </Link>

            <nav className={styles.nav_links}>
              <Link href={APP_ROUTES.SearchRoom} className={styles.pure_link}>
                {t('route.search_room')}
              </Link>
              <Link href={APP_ROUTES.About} className={styles.pure_link}>
                {t('route.about')}
              </Link>
              <Link href={APP_ROUTES.Contact} className={styles.pure_link}>
                {t('route.contact')}
              </Link>

              <LanguageSwitcher />

              <UserButton />
            </nav>
          </>
        ) : (
          <Suspense fallback={null}>
            <DynamicSearchForm lng={lng} />
          </Suspense>
        )}
      </Container>
    </header>
  );
}

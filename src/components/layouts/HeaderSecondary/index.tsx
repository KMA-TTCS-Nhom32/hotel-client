import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { createTranslation } from '@/i18n';
import styles from '../Header/index.module.scss';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import Container from '@/components/Common/Container';
import UserButton from '@/components/Common/UserButton';

import { APP_ROUTES } from '@/constants/routes.constant';
import { cn } from '@/lib/utils';

import Logo from '@public/logos/logo-large-dark.webp';

interface HeaderSecondaryProps {
  lng: string;
  className?: string;
  logoSrc?: StaticImport;
}

const HeaderSecondary = async ({ lng, className, logoSrc }: HeaderSecondaryProps) => {
  const { t } = await createTranslation(lng);

  //   const logo = {
  //     dark: '/logos/logo-large-dark.png',
  //     light: '/logos/logo-large-light.png',
  //   };

  return (
    <header className={cn(styles.header_section, styles.bg_white, className)}>
      <Container className={styles.header_container}>
        <Link href={APP_ROUTES.Home}>
          <Image src={logoSrc ?? Logo} alt='Logo' className={styles.logo} priority />
        </Link>

        <nav className={styles.nav_links}>
          <Link href={APP_ROUTES.SearchRoom}>{t('route.search_room')}</Link>
          <Link href={APP_ROUTES.About}>{t('route.about')}</Link>
          <Link href={APP_ROUTES.Contact}>{t('route.contact')}</Link>

          <LanguageSwitcher />

          <UserButton />
        </nav>
      </Container>
    </header>
  );
};

export default HeaderSecondary;

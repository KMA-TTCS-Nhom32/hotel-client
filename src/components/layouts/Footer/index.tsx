// components/Footer/Footer.tsx
import styles from './index.module.scss';
import Link from 'next/link';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { createTranslation } from '@/i18n/server';

interface FooterProps {
    lng: string;
  }

const Footer = async ({ lng }: Readonly<FooterProps>) => {
  const { t } = await createTranslation(lng);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.grid}>
          {/* Feedback Section */}
          <div className={styles.feedback}>
            <h3>{t('feedback.title')}</h3>
            <p>{t('feedback.para')}</p>
            <button>{t('feedback.share')}</button>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <h4>{t('route.contact')}</h4>
            <div className={styles.contact}>
              <div>
                <p>Hotline</p>
                <p className={styles.bold}>1900 3311</p>
              </div>
              <div>
                <p>Email</p>
                <p>booking@homevilla.vn</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4>HOME VILLA</h4>
            <ul>
              <li>
                <Link href='#'>{t('route.about')}</Link>
              </li>
              <li>
                <Link href='#'>{t('route.recruitment')}</Link>
              </li>
              <li>
                <Link href='#'>{t('route.login')}</Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className={styles.section}>
            <h4>{t('policies.policy')}</h4>
            <ul>
              <li>
                <Link href='#'>{t('policies.privacy')}</Link>
              </li>
              <li>
                <Link href='#'>{t('policies.terms')}</Link>
              </li>
              <li>
                <Link href='#'>{t('policies.faqs')}</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className={styles.section}>
            <h4>{t('route.follow')}</h4>
            <div className={styles.social}>
              <Link href='#'>
                <Facebook />
              </Link>
              <Link href='#'>
                <Instagram />
              </Link>
              <Link href='#'>
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>© A HOMEVILLA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

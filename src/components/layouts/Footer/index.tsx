// components/Footer/Footer.tsx
import styles from './index.module.scss';
import Link from 'next/link';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Linkedin } from 'lucide-react';
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-facebook'
                >
                  <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                </svg>
              </Link>
              <Link href='#'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-instagram'
                >
                  <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                  <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                  <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
                </svg>
              </Link>
              <Link href='#'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-linkedin'
                >
                  <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
                  <rect width='4' height='12' x='2' y='9' />
                  <circle cx='4' cy='4' r='2' />
                </svg>
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

'use client';

import React from 'react';
import { useTranslation } from '@/i18n/client';
import styles from './index.module.scss';
import { ArrowLeft} from 'lucide-react';

interface TopPartProps {
  lng: string;
}

const TopPart = ({ lng }: TopPartProps) => {
  const { t } = useTranslation(lng, 'payment');

  return (
      <div className={styles.topPart}>
        <div className='flex items-center gap-2'>
          <ArrowLeft className={styles.icon} />
          <span>{t('confirm.back')}</span>
        </div>
      </div>
   
  );
};

export default TopPart;

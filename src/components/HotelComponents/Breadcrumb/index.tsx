'use client';

import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';

interface BreadcrumbProps {
  lng: string;
}

const BreadcrumbComponent = ({ lng }: Readonly<BreadcrumbProps>) => {
  const { t } = useTranslation(lng);
  
  return (
    <UIBreadcrumb>
      <div className={styles.breadcrumb_item}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t('bcrumb.main')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('bcrumb.HotelBranch')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </div>
    </UIBreadcrumb>
  );
};

export default BreadcrumbComponent;

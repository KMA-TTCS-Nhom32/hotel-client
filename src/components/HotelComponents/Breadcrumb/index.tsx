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
  name: string;
}

const BreadcrumbComponent = ({ lng, name }: Readonly<BreadcrumbProps>) => {
  const { t } = useTranslation(lng);
  
  return (
    <UIBreadcrumb>
      <div className={styles.breadcrumb_item}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </div>
    </UIBreadcrumb>
  );
};

export default BreadcrumbComponent;

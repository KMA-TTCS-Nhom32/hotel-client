'use client';

import {
  Breadcrumb as UIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

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
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </div>
    </UIBreadcrumb>
  );
};

export default BreadcrumbComponent;

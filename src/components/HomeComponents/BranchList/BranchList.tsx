'use client';

import React, { useState } from 'react';
import styles from './BranchList.module.scss';
import Link from 'next/link';

import { useRequest } from 'ahooks';
import { getProvinceService } from '@/services/province';
import { getBranchesService } from '@/services/branches';
import { FilterBranchesDto } from '@ahomevilla-hotel/node-sdk';
import { PaginationComponent } from '@/components/ui/normal-pagination';
import { SkeletonCard } from '@/components/HomeComponents/BranchList/loading-skeleton/loading-skeleton';
import { SkeletonPagination } from '@/components/HomeComponents/BranchList/skeleton-pagination/pagination-skeleton';
import { SkeletonDemo } from '@/components/HomeComponents/BranchList/demo-skeleton/demo-skeleton';
import { APP_ROUTES } from '@/constants/routes.constant';

const BranchList = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: getProvinceResponse, loading: getProvinceLoading } = useRequest(getProvinceService);

  const { data: getBranchesResponse, loading: getBranchesLoading } = useRequest(
    () => {
      return getBranchesService({
        page: currentPage,
        pageSize: 6,
        filters: JSON.stringify({
          provinceSlug: selectedProvince,
        } as FilterBranchesDto),
      });
    },
    {
      refreshDeps: [selectedProvince, currentPage],
    },
  );

  return (
    <section className={styles.branchList}>
      <div className={styles.cityFilter}>
        {getProvinceLoading && (
          <>
            <SkeletonDemo />
            <SkeletonDemo />
            <SkeletonDemo />
            <SkeletonDemo />
          </>
        )}
        {getProvinceResponse?.data.data.map((province) => (
          <button
            key={province.id}
            onClick={() => setSelectedProvince(province.slug)}
            className={selectedProvince === province.slug ? styles.active : ''}
          >
            {province.name}
          </button>
        ))}
      </div>

      <div className={styles.branchGrid}>
        {getBranchesLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {getBranchesResponse?.data.data.map((branch) => (
              <Link key={branch.id} href={`${APP_ROUTES.Branch}/${branch.slug}`}>
                <div className={styles.branchCard}>
                  <img
                    src={branch.thumbnail.url}
                    alt={branch.name}
                    className={styles.branchImage}
                  />
                  <div className={styles.branchInfo}>
                    <h3>{branch.name}</h3>
                    <Link href={`/chi-nhanh/${branch.slug}`} className={styles.bookNow}>
                      Đặt ngay
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>

      <div className={styles.pagination}>
        {getBranchesLoading ? (
          <>
            <SkeletonPagination />
            <SkeletonPagination />
            <SkeletonPagination />
            <SkeletonPagination />
          </>
        ) : (
          <>
            {getBranchesResponse?.data?.meta.total && (
              <PaginationComponent
                page={currentPage}
                pageSize={6}
                total={getBranchesResponse.data.meta.total}
                onChangePage={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BranchList;

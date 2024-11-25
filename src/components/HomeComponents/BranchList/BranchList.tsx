'use client';

import React, { useState } from 'react';
import styles from './BranchList.module.scss';
import { cn } from '@/lib/utils';

interface Branch {
  id: number;
  name: string;
  brand: string;
  city: string;
  district: string;
  imageUrl: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'SIGNATURE BY M VILLAGE LÊ THÁNH TÔN',
    brand: 'Signature',
    city: 'Ho Chi Minh',
    district: 'Quận 1',
    imageUrl:
      'https://img.mvillage.vn/JaRWpxElM75o0MIri38lqkN0b27d34YjXz6tbkqwqA0/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D27%26field%3Dimage_1920',
  },
  {
    id: 2,
    name: 'SIGNATURE BY M VILLAGE HAI BÀ TRƯNG',
    brand: 'Signature', 
    city: 'Ho Chi Minh',
    district: 'Quận 1',
    imageUrl:
      'https://img.mvillage.vn/eVP597RSrStm3uL9FYg8L2DTmQaVVRMhAzXyU1PFfOo/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D28%26field%3Dimage_1920',
  },
  {
    id: 3,
    name: 'EXPRESS BY M VILLAGE VÕ VĂN KIỆT',
    brand: 'Express',
    city: 'Ho Chi Minh', 
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/zmP9DhrShWAec13LvwBUtk0DeJUy7dcNnuT81PrSQbg/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D100%26field%3Dimage_1920',
  },
  {
    id: 4,
    name: 'EXPRESS BY M VILLAGE NGUYỄN BỈNH KHIÊM',
    brand: 'Express',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/Mr1pG0QeKI9zS81QVImkpwpnpaG-LCAD2B8tfc1Ns4E/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D142%26field%3Dimage_1920',
  },
  {
    id: 5,
    name: 'EXPRESS BY M VILLAGE ĐIỆN BIÊN PHỦ Q3',
    brand: 'Express',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/Mr1pG0QeKI9zS81QVImkpwpnpaG-LCAD2B8tfc1Ns4E/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D142%26field%3Dimage_1920',
  },
  {
    id: 6,
    name: 'EXPRESS BY M VILLAGE PHẠM NGŨ LÃO',
    brand: 'Express',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/Mr1pG0QeKI9zS81QVImkpwpnpaG-LCAD2B8tfc1Ns4E/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D142%26field%3Dimage_1920',
  },
  {
    id: 7,
    name: 'M VILLAGE LIVING KỲ ĐỒNG',
    brand: 'M Living',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/nz26J5Fd3ilHoGJCJIEAdFN1786A5uqp_e8pakGoGxo/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D56%26field%3Dimage_1920',
  },
  {
    id: 8,
    name: 'M VILLAGE LIVING CÁCH MẠNG THÁNG 8',
    brand: 'M Living',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/wjuu-qluvMPLxgJ9in2_bq9e1w7ok7iCLdElWHrhBfk/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D36%26field%3Dimage_1920',
  },
  {
    id: 9,
    name: 'M VILLAGE LIVING VÕ THỊ SÁU',
    brand: 'M Living',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/A2OvHKPwVHz_vN3R7r6S5VEkFniwZa5Ak6BoB3Iaw1U/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D8%26field%3Dimage_1920',
  },
  {
    id: 10,
    name: 'M VILLAGE LIVING 59 THẢO ĐIỂN',
    brand: 'M Living',
    city: 'Ho Chi Minh',
    district: 'Quận 5',
    imageUrl:
      'https://img.mvillage.vn/_3jMzxpefMs_qe8c9A816osUPKFAkg8Kz6sppdD2L74/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D44%26field%3Dimage_1920',
  },
  {
    id: 11,
    name: 'M VILLAGE HOTEL LÝ TỰ TRỌNG',
    brand: 'M Hotel',
    city: 'Ho Chi Minh',
    district: 'Quận 1',
    imageUrl:
      'https://img.mvillage.vn/Mr1pG0QeKI9zS81QVImkpwpnpaG-LCAD2B8tfc1Ns4E/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D142%26field%3Dimage_1920',
  },
  {
    id: 12,
    name: 'M VILLAGE HOTEL TAO ĐÀN PARK',
    brand: 'M Hotel',
    city: 'Ho Chi Minh',
    district: 'Quận 3',
    imageUrl:
      'https://img.mvillage.vn/ow9yoshKnMn4GxHvExf99aApb2luhlQn9kNUTby6oU8/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D94%26field%3Dimage_1920',
  },
  {
    id: 13,
    name: 'M VILLAGE HOTEL TÔN THẤT ĐẠM',
    brand: 'M Hotel',
    city: 'Ho Chi Minh',
    district: 'Quận 1',
    imageUrl:
      'https://img.mvillage.vn/yl5FaQ-Mu2chOB2W4-cbAiSUQH09NOAgtLM2D8djL6M/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D22%26field%3Dimage_1920',
  },
  {
    id: 14,
    name: 'M VILLAGE HOTEL NGUYỄN KIỆM',
    brand: 'M Hotel',
    city: 'Ho Chi Minh',
    district: 'Phú Nhuận',
    imageUrl:
      'https://img.mvillage.vn/0JRvKSKeVTEdpzGz59EVB9m_V3peoVViwr_qvoLdvh4/rs:fit:500:500/plain/https%3A%2F%2Fpms.mvillage.vn%2Fweb%2Fimage%3Fmodel%3Dhotel%26id%3D65%26field%3Dimage_1920',
  },
];

const BranchList = () => {
  const [selectedCity, setSelectedCity] = useState('Ho Chi Minh');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const branchesPerPage = 6;

  const filteredBranches = branches.filter(
    (branch) =>
      (selectedCity === 'All' || branch.city === selectedCity) &&
      (selectedDistrict === 'Tất cả' || branch.district === selectedDistrict) &&
      (selectedBrand === 'All' || branch.brand === selectedBrand),
  );

  // Get current branches
  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = filteredBranches.slice(indexOfFirstBranch, indexOfLastBranch);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBranches.length / branchesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className={styles.branchList}>
      <div className={styles.cityFilter}>
        <button onClick={() => setSelectedCity('Ho Chi Minh')}>Ho Chi Minh</button>
        <button onClick={() => setSelectedCity('Hà Nội')}>Hà Nội</button>
      </div>

      <div className={styles.districtFilter}>
        <button
          onClick={() => {
            setSelectedBrand('All');
            setSelectedDistrict('Tất cả');
          }}
        >
          Tất cả
        </button>
        <button onClick={() => setSelectedDistrict('Quận 1')}>Quận 1</button>
        <button onClick={() => setSelectedDistrict('Quận 2')}>Quận 2</button>
        <button onClick={() => setSelectedDistrict('Quận 3')}>Quận 3</button>
        <button onClick={() => setSelectedDistrict('Phố Cổ')}>Phố Cổ</button>
      </div>

      <div className={styles.branchGrid}>
        {currentBranches.map((branch) => (
          <div key={branch.id} className={styles.branchCard}>
            <img src={branch.imageUrl} alt={branch.name} className={styles.branchImage} />
            <div className={styles.branchInfo}>
              <h3>{branch.name}</h3>
              <a href='#' className={styles.bookNow}>
                Đặt ngay →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={cn(pageNumber === currentPage && styles.active)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BranchList;

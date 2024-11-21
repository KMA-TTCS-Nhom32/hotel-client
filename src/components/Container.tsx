import { MoveUpRight } from 'lucide-react';
import { TFunction, Resources } from 'i18next';

import './Container.scss';

interface ContainerProps {
  t: TFunction<keyof Resources, undefined>;
}

export default function Container({ t }: Readonly<ContainerProps>) {
  return (
    // Add this after the existing banner section in `page.txs`

    <section className='village-section'>
      <h2 className='section-title'>{t('Khám phá các Village mới')}</h2>

      <div className='card-container'>
        <div className='signature-card'>
          <span>
            <img
              src='https://img.mvillage.vn/cpV1n6RgIauS4d3S--xyYH30ukS_MD4RdMes2tHxkOc/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2F14_50_1_060278bb65.png'
              alt='M Village Hotel Đà Nẵng Centre'
            />
          </span>
          <div className='card-body'>
            <div className='card-body__city mb-2'>CHI NHÁNH MỚI: ĐÀ NẴNG</div>
            <div className='card-body__building-name mb-3'>M Village Hotel Đà Nẵng Centre</div>
            <div className='card-body__description mb-4'>
              Vừa ra mắt, M Village là trải nghiệm Đà Nẵng "đúng bài" với vị trí trung tâm và phòng
              ngập nắng. Tặng voucher trị giá 1.5 triệu tại những điểm đến bản địa nhất.
            </div>
            <button>
              {t('Đặt ngay')}
              <span>
                <MoveUpRight />
              </span>
            </button>
          </div>
        </div>

        <div className='signature-card'>
          <span>
            <img
              src='https://img.mvillage.vn/ShRKDC_QBPx1MPFylQTBxOlOFNJm9izhld9ED4kAyWI/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2Fvvk_18470e1e15.jpeg'
              alt='Express by M Village Võ Văn Kiệt'
            />
          </span>
          <div className='card-body'>
            <div className='card-body__city mb-2'>CHI NHÁNH MỚI: HỒ CHÍ MINH</div>
            <div className='card-body__building-name mb-3'>Express by M Village Võ Văn Kiệt</div>
            <div className='card-body__description mb-4'>
              Điểm đến lý tưng để “phá đảo” văn hoá Sài Gòn Chợ Lớn! Nằm tại giao lộ Quận 1 và 5,
              mang âm hưởng thiết kế Trung Hoa, có dịch vụ tiện ích linh hoạt.
            </div>
            <button>
              {t('Đặt ngay')}
              <span>
                <MoveUpRight />
              </span>
            </button>
          </div>
        </div>

        <div className='signature-card'>
          <span>
            <img
              src='https://img.mvillage.vn/R5CTvhoF0jCB23W2U8OSTdgEA5ffJ7XEN72PkNhgH2k/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2FM_Village_Nguyen_Binh_Khiem_01_427ad5919c.jpg'
              alt='Express by M Village Nguyễn Bỉnh Khiêm'
            />
          </span>
          <div className='card-body'>
            <div className='card-body__city mb-2'>CHI NHÁNH MỚI: HỒ CHÍ MINH</div>
            <div className='card-body__building-name mb-3'>
              Express by M Village Nguyễn Bỉnh Khiêm
            </div>
            <div className='card-body__description mb-4'>
              Chọn Express Nguyễn Bỉnh Khiêm cho chuyến công tác tiện lợi nhưng yên tĩnh tại Quận 1.
              100% lựa chọn có phòng ngủ và phòng khách riêng biệt kèm bếp riêng tại phòng.
            </div>
            <button>
              {t('Đặt ngay')}
              <span>
                <MoveUpRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

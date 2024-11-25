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
      <h2 className='section-title'>{t('content.title')}</h2>

      <div className='card-container'>
        <div className='signature-card'>
          <span>
            <img
              src='https://img.mvillage.vn/cpV1n6RgIauS4d3S--xyYH30ukS_MD4RdMes2tHxkOc/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2F14_50_1_060278bb65.png'
              alt='M Village Hotel Đà Nẵng Centre'
            />
          </span>
          <div className='card-body'>
            <div className='card-body__city mb-2'>{t('village.newDN')}</div>
            <div className='card-body__building-name mb-3'>{t('village.nameDN')}</div>
            <div className='card-body__description mb-4'>{t('village.desDN')}</div>
            <button>
              {t('village.booking')}
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
            <div className='card-body__city mb-2'>{t('village.newHCM')}</div>
            <div className='card-body__building-name mb-3'>Express by M Village Võ Văn Kiệt</div>
            <div className='card-body__description mb-4'>{t('village.desHCM1')}</div>
            <button>
              {t('village.booking')}
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
            <div className='card-body__city mb-2'>{t('village.newHCM')}</div>
            <div className='card-body__building-name mb-3'>
              Express by M Village Nguyễn Bỉnh Khiêm
            </div>
            <div className='card-body__description mb-4'>
            {t('village.desHCM2')}
            </div>
            <button>
              {t('village.booking')}
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

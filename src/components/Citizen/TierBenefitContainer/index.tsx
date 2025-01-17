'use client';
import Benefit from './benefit';
import NextBenefit from './nextBenefit';
import { useTranslation } from '@/i18n/client';
interface TierBenefit {
  lng: string;
  Benefits: any[];
  nextname: any;
  nextBenefits: any[];
}

const TierBenefit = ({ lng, Benefits, nextname, nextBenefits }: Readonly<TierBenefit>) => {
  const { t } = useTranslation(lng, 'benefit');
  return (
    <div>
      <div className='bg-white p-6 rounded-xl '>
        <div className='text-xl font-medium'>{t('Your benefits')}</div>
        <div className='grid grid-cols-2 gap-5'>
          {Benefits.map((benefit: any, index: number) => (
            <Benefit
              lng={lng}
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>

      <div className='mt-5 flex flex-col justify-between gap-4 p-5 border-solid border-2 border-gray-400 rounded-xl'>
        <div className='next-tier_content'>
          <div className='text-xl font-medium'>{t(nextname as any)}</div>
          <div className='mt-2 text-lg text-gray-400'>
            Tích luỹ 7 đêm và tận hưởng thêm những trải nghiệm thú vị với đặc quyền Ưu tiên
          </div>
        </div>
        <div className='grid grid-cols-2 justify-center items-center gap-5'>
          {nextBenefits.map((benefit: any, index: number) => (
            <NextBenefit lng={lng} key={index} title={benefit.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TierBenefit;

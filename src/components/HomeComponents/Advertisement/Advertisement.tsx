import { MoveUpRight } from 'lucide-react';
import { TFunction, Resources } from 'i18next';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Container from '@/components/Common/Container';
import { Text } from '@/components/ui/text';

import styles from './index.module.scss';
import { useRequest } from 'ahooks';
import { getLatestBranchesService } from '@/services/branches';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes.constant';

interface AdvertisementProps {
  t: TFunction<keyof Resources, undefined>;
}

export default async function Advertisement({ t }: Readonly<AdvertisementProps>) {
  const { data } = await getLatestBranchesService();

  return (
    <Container className={styles.advertisement_section}>
      <Text element='h2' type='heading2-bold'>
        {t('content.title')}
      </Text>

      <Carousel className='w-full max-w-full'>
        <CarouselContent>
          {/* <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <div className={styles.signature_card}>
              <img
                src='https://img.mvillage.vn/gOHGur9Ym35jl2CulnRIIc1qEdkAuybxhyZgvHIyaf8/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2FGreen_House_6508_0d29d81a67.jpg'
                alt='M Village Hotel Đà Nẵng Centre'
              />
              <div className={styles.card_body}>
                <Text element='h4' type='title1-semi-bold' className={styles.card_body_city}>
                  {t('village.newDN')}
                </Text>
                <div className='card-body__building-name space'>{t('village.nameDN')}</div>
                <div className='card-body__description'>{t('village.desDN')}</div>
                <button>
                  {t('village.booking')}
                  <span>
                    <MoveUpRight />
                  </span>
                </button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <div className={styles.signature_card}>
              <img
                src='https://img.mvillage.vn/gOHGur9Ym35jl2CulnRIIc1qEdkAuybxhyZgvHIyaf8/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2FGreen_House_6508_0d29d81a67.jpg'
                alt='M Village Hotel Đà Nẵng Centre'
              />
              <div className={styles.card_body}>
                <Text element='h4' type='title1-semi-bold' className={styles.card_body_city}>
                  {t('village.newDN')}
                </Text>
                <div className='card-body__building-name space'>{t('village.nameDN')}</div>
                <div className='card-body__description'>{t('village.desDN')}</div>
                <button>
                  {t('village.booking')}
                  <span>
                    <MoveUpRight />
                  </span>
                </button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <div className={styles.signature_card}>
              <img
                src='https://img.mvillage.vn/gOHGur9Ym35jl2CulnRIIc1qEdkAuybxhyZgvHIyaf8/rs:fit:800:800/plain/https%3A%2F%2Fcdn-v2.mvillage.vn%2Fcms%2FGreen_House_6508_0d29d81a67.jpg'
                alt='M Village Hotel Đà Nẵng Centre'
              />
              <div className={styles.card_body}>
                <Text element='h4' type='title1-semi-bold' className={styles.card_body_city}>
                  {t('village.newDN')}
                </Text>
                <div className='card-body__building-name space'>{t('village.nameDN')}</div>
                <div className='card-body__description'>{t('village.desDN')}</div>
                <button>
                  {t('village.booking')}
                  <span>
                    <MoveUpRight />
                  </span>
                </button>
              </div>
            </div>
          </CarouselItem> */}
          {data.map((branch) => (
            <CarouselItem key={branch.id} className='md:basis-1/2 lg:basis-1/3'>
              <div className={styles.signature_card}>
                <Image
                  src={branch.thumbnail.url}
                  alt='M Village Hotel Đà Nẵng Centre'
                  width={800}
                  height={800}
                />
                <div className={styles.card_body}>
                  <Text element='h4' type='title1-semi-bold' className={styles.card_body_city}>
                    {t('village.newDN', { name: branch.province?.name })}
                  </Text>
                  <div className='card-body__building-name space'>{branch.name}</div>
                  <div className='card-body__description'>{branch.description}</div>
                  <Link href={`${APP_ROUTES.Branch}/${branch.slug}`}>
                    <button>
                      {t('village.booking')}
                      <span>
                        <MoveUpRight />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:block' />
        <CarouselNext className='hidden sm:block' />
      </Carousel>
    </Container>
  );
}

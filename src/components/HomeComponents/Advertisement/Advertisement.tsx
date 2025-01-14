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
import { cn } from '@/lib/utils';

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
          {data.map((branch) => (
            <CarouselItem key={branch.id} className='md:basis-1/2 lg:basis-1/3'>
              <Link href={`${APP_ROUTES.Branch}/${branch.slug}`}>
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
                    <div className={cn(styles.card_body_building_name, 'space-x-0')}>
                      {branch.name}
                    </div>
                    <div className={styles.card_body_description}>
                      <p>{branch.description}</p>
                    </div>
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
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:block' />
        <CarouselNext className='hidden sm:block' />
      </Carousel>
    </Container>
  );
}

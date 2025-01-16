import Container from '@/components/Common/Container';
import styles from './index.module.scss';
import BreadcrumbComponent from '@/components/HotelDetailComponents/Breadcrumb';
import IllustrationImage from '@/components/HotelDetailComponents/IllustrationImage';
import HotelDescription from '@/components/HotelDetailComponents/HotelCard';
import { getDetailBranchService } from '@/services/branches';
import HotelDetail from '@/components/HotelDetailComponents/HotelDetail';
import { Suspense } from 'react';
import LoadingSection from '@/components/Common/LoadingSection';
import ListRoom from '@/components/HotelDetailComponents/ListRoom';

interface HotelProps {
  params: {
    lng: string;
    slug: string;
  };
}

export default async function HotelPage({ params: { lng, slug } }: Readonly<HotelProps>) {
  const { data } = await getDetailBranchService(slug);

  return (
    <Suspense fallback={<LoadingSection />}>
      <Container>
        <section className={styles.hotel_contain}>
          <div className={styles.hotel_content}>
            <BreadcrumbComponent lng={lng} name={data.name} />
            <IllustrationImage images={[data.thumbnail, ...data.images]} />
            {/* <HotelDescription lng={lng} branch={data} /> */}
            <HotelDetail
              lng={lng}
              name={data.name}
              description={data.description}
              amenities={data.amenities}
              address={data.address}
              nearBy={data.nearBy}
            />
            <ListRoom lng={lng} branchSlug={slug} roomDetails={data.rooms} />
          </div>
        </section>
      </Container>
    </Suspense>
  );
}

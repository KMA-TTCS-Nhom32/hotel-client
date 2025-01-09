import Container from '@/components/Common/Container';
import styles from './index.module.scss';
import BreadcrumbComponent from '@/components/HotelComponents/Breadcrumb';
import IllustrationImage from '@/components/HotelComponents/IllustrationImage';
import HotelDescription from '@/components/HotelComponents/HotelCard/homepage';
import { getDetailBranchService } from '@/services/branches';

interface HotelProps {
  params: {
    lng: string;
    slug: string;
  };
}

export default async function HotelPage({ params: { lng, slug } }: Readonly<HotelProps>) {
  const { data } = await getDetailBranchService(slug);

  console.log(data);

  return (
    <Container>
      <section className={styles.hotel_contain}>
        <div className={styles.hotel_content}>
          <BreadcrumbComponent lng={lng} name={data.name} />
          <IllustrationImage images={[data.thumbnail, ...data.images]} />
          <HotelDescription lng={lng} />
        </div>
      </section>
    </Container>
  );
}

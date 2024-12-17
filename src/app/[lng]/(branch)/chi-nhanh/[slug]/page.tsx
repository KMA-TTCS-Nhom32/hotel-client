import Container from '@/components/Common/Container';
import styles from './index.module.scss';
import BreadcrumbComponent from '@/components/HotelComponents/Breadcrumb';
import IllustrationImage from '@/components/HotelComponents/IllustrationImage';
import HotelDescription from '@/components/HotelComponents/HotelCard/homepage';

interface HotelProps {
  params: {
    lng: string;
  };
}



export default async function HotelPage({ params: { lng } }: Readonly<HotelProps>) {
  return (
    <Container>
      <section className={styles.hotel_contain}>
        <div className={styles.hotel_content}>
          <BreadcrumbComponent lng={lng} />
          <IllustrationImage />
          <HotelDescription/>

        </div>
      </section>
    </Container>
  );
}

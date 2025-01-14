import { Amenity, NearBy } from '@ahomevilla-hotel/node-sdk';

import styles from './index.module.scss';

import Container from '@/components/Common/Container';
import { createTranslation } from '@/i18n';
import ScrollLink from '../ScrollLink';

interface HotelDetailProps {
  lng: string;
  name: string;
  description: string;
  amenities: Amenity[];
  address: string;
  nearBy: NearBy[];
}

const HotelDetail = async ({
  lng,
  name,
  description,
  amenities,
  address,
  nearBy,
}: Readonly<HotelDetailProps>) => {
  const { t } = await createTranslation(lng, 'branch');

  return (
    <Container className='py-3'>
      <div className={styles.MuiTabs}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <ScrollLink href='#about'>{t('branch.menuAbout')}</ScrollLink>
            </li>
            <li>
              <ScrollLink href='#booking'>{t('branch.menuBooking')}</ScrollLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.contents}>
        <section id='about' className={styles.section}>
          <div className='space-y-0'>
            <div className={styles.hotelIntro}>
              <h2 className={styles.hotelTitle}>
                <div className={styles.hotelName}>{name}</div>
              </h2>
            </div>
            <p className={styles.hotelDescription}>{description}</p>

            <div className={styles.hotelAmenities}>
              <div className={styles.hotelAmenity_title}>
                <h3 className={styles.AmenityTitle}>{t('branch.amenitytitle')}</h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-4'>
                  {amenities.map((amenity) => (
                    <div key={amenity.slug} className={styles.AmenityItem}>
                      {amenity.icon && (
                        <img src={amenity.icon.url} alt={amenity.name} className={styles.icon} />
                      )}
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='sidebar' className={styles.sidebar}>
          <div className={styles.mapSection}>
            <div className={styles.mapContainer}>
              <img
                src='/images/map-view/staticmap.webp'
                alt='Map of Ho Chi Minh'
                className={styles.mapImage}
              />
              <a
                href='https://www.google.com/maps/place/Ho+Chi+Minh+City/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.mapButton}
              >
                {t('branch.viewmap')}
              </a>
            </div>
            <div className={styles.overview_address}>{address}</div>
          </div>
          <div className={styles.overview_area}>
            <div className={styles.overview_area_heading}>{t('branch.explorearea')}</div>
            {nearBy.map((place) => (
              <div key={place.name}>
                <div>
                  <div className={styles.explore_area}>
                    <div className='flex mb-2 flex-1 justify-between'>
                      <div className={styles.explore_text}>{place.name}</div>
                      <div className={styles.explore_text_distance}>{place.distance}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default HotelDetail;

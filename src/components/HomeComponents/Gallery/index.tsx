import Image from 'next/image';
import './GalleryComponent.scss';
import { useTranslation } from '@/i18n/client';
import { TFunction } from 'i18next';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  size: 'large' | 'small';
  column: 1 | 2 | 3;
  // lng: string;
}

const galleryImages: GalleryImage[] = [
  // Column 1 (odd - large then small)
  {
    id: 1,
    src: '/images/living-story-1-1.png',
    alt: 'Bedroom with city view',
    size: 'large',
    column: 1,
  },
  {
    id: 2,
    src: '/images/living-story-2-1.png',
    alt: 'Bedroom with arched windows',
    size: 'small',
    column: 1,
  },
  // Column 2 (even - small then large)
  {
    id: 3,
    src: '/images/living-story-3-1.png',
    alt: 'Modern living space',
    size: 'small',
    column: 2,
  },
  {
    id: 4,
    src: '/images/living-story-4-1.png',
    alt: 'Outdoor dining area',
    size: 'large',
    column: 2,
  },
  // Column 3 (odd - large then small)
  {
    id: 5,
    src: '/images/living-story-5-1.png',
    alt: 'Bedroom with skyline view',
    size: 'large',
    column: 3,
  },
  {
    id: 6,
    src: '/images/living-story-6-1.png',
    alt: 'Cozy sitting area',
    size: 'small',
    column: 3,
  },
];

interface GalleryProps {
  t: TFunction<any>;
}

export default function Gallery({ t }: GalleryProps) {
  const getColumnImages = (columnNumber: 1 | 2 | 3) => {
    return galleryImages.filter((image) => image.column === columnNumber);
  };

  return (
    <div className='container'>
      <div className='living-story-header text-center mb-4 mb-md-5'>{t('content.header')}</div>

      <div className='gallery'>
        {[1, 2, 3].map((columnNum) => (
          <div key={columnNum} className='column'>
            {getColumnImages(columnNum as 1 | 2 | 3).map((image) => (
              <div key={image.id} className={`imageWrapper ${image.size}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='image'
                  priority={image.id <= 3}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

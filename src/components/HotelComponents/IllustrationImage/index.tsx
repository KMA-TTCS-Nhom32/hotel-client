'use client';

import styles from './index.module.scss';
import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Download } from 'yet-another-react-lightbox/plugins';
import { Images } from 'lucide-react';
import { useState } from 'react';
import { Image } from '@ahomevilla-hotel/node-sdk';

interface IllustrationImageProps {
  images: Image[];
}

export default function IllustrationImage({ images }: IllustrationImageProps) {
  const [open, setOpen] = useState(false);

  const handleImageClick = () => {
    setOpen(true);
  };

  if (!images || images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`${styles.grid} grid-cols-4 gap-4 relative`}>
        <div
          className={`${styles.main_image} col-span-2 row-span-2`}
          onClick={() => handleImageClick()}
        >
          <img
            src={images[0]?.url}
            alt="Main image" 
            className='w-full h-full object-cover cursor-pointer'
          />
        </div>

        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className={`${styles.image} col-span-1`}
            onClick={() => handleImageClick()}
          >
            <img
              src={image.url}
              alt={`Image ${index + 1}`}
              className='w-full h-full object-cover cursor-pointer'
            />
          </div>
        ))}

        <div className={`${styles.total_count}`} onClick={() => handleImageClick()}>
          <Images size={20} className='mr-1' />
          <span>{images.length}</span>
        </div>
      </div>

      <Lightbox
        plugins={[Download]}
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({ src: img.url }))}
      />
    </>
  );
}

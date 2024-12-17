'use client';

import styles from './index.module.scss';

import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { slides } from './data';
import { Download } from 'yet-another-react-lightbox/plugins';
import { Images } from 'lucide-react';
import { useEffect } from 'react';

export default function IllustrationImage() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log(slides);
  }, []);

  const handleImageClick = (index: number) => {
    setOpen(true);
  };

  return (
    <>
      <div className={`${styles.grid} grid-cols-4 gap-4 relative`}>
        <div
          className={`${styles.main_image} col-span-2 row-span-2`}
          onClick={() => handleImageClick(0)}
        >
          <img
            src={slides[0].src}
            alt={slides[0].caption}
            className='w-full h-full object-cover cursor-pointer'
          />
        </div>

        {slides.slice(1, 5).map((slide, index) => (
          <div
            key={index}
            className={`${styles.image} col-span-1`}
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              className='w-full h-full object-cover cursor-pointer'
            />
          </div>
        ))}

        <div className={`${styles.total_count}`} onClick={() => handleImageClick(0)}>
          <Images size={20} className='mr-1' />
          <span>{slides.length}</span>
        </div>
      </div>

      <Lightbox plugins={[Download]} open={open} close={() => setOpen(false)} slides={slides} />
    </>
  );
}

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Thumbnails } from 'yet-another-react-lightbox/plugins';
import { Image } from '@ahomevilla-hotel/node-sdk';

interface ImageSliderProps {
  images: Image[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='relative w-full h-96'>
        <img
          src={images[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          className='w-full h-full object-cover cursor-pointer'
          onClick={() => setOpen(true)}
        />

        <button
          onClick={handlePrevious}
          className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button
          onClick={handleNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors'
        >
          <ChevronRight className='w-6 h-6' />
        </button>

        <div className='absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div className='flex space-x-2 overflow-x-auto pb-2'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 ${
              currentIndex === index
                ? 'border border-solid border-[rgb(241,106,36)]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className='h-20 w-20 object-cover rounded'
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={images.map((img) => ({ src: img.url }))}
        plugins={[Thumbnails]}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
          border: 2,
          borderRadius: 4,
          padding: 4,
          gap: 16,
        }}
      />
    </div>
  );
};

export default ImageSlider;


'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselOptions,
} from '@/components/ui/carousel';

// generate wait function
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const BannerSlider = () => {
  const options: CarouselOptions = {
    loop: true,
    duration: 60,
  };

  const plugins = [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnFocusIn: false }),
    Fade(),
  ];

  return (
    <Carousel plugins={plugins} opts={options} className='w-full embla__slide'>
      <CarouselContent>
        <CarouselItem>
          <Image
            alt='banner'
            src='/images/banner_1.webp'
            width={1920}
            height={600}
            className='h-full min-h-[600px] sm:max-h-[720px] sm:w-full object-cover object-center'
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            alt='banner'
            src='/images/banner_2.webp'
            width={1920}
            height={600}
            className='h-full min-h-[600px] sm:max-h-[720px] sm:w-full object-cover object-center'
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BannerSlider;

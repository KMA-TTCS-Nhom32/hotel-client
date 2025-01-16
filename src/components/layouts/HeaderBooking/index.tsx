import HeaderSecondary from '../HeaderSecondary';
import BookingSteps from './BookingSteps';

interface HeaderBookingProps {
  lng: string;
}

const HeaderBooking = ({ lng }: HeaderBookingProps) => {
  return (
    <>
      <header className='h-auto'>
        <HeaderSecondary lng={lng} className='!relative !z-30 !shadow-none !border-none' />
      </header>
      <BookingSteps lng={lng} />
    </>
  );
};

export default HeaderBooking;

import { MoveUpRight } from 'lucide-react';
import './FooterImage.scss';

interface FooterImageProps {
  lng: string;
  t: (key: string) => string;
}

export default function FooterImage({ lng, t }: FooterImageProps) {
  return (
    <>
      <div className='footer_image-section'>
        <div className='img_center'>
          <span className='img-load'>
            <img src='/images/home-mvl-more-footer-bg.png' alt='Footer Image' />
          </span>
          <div className='footer-content-container container'>
            <div className='footer-content__heading text-center'>
              Đăng kí thành viên MORE, tối đa trải nghiệm
            </div>
            <div className='footer-content__description text-center'>
              Là thành viên chương trình MORE, bạn có thể tích luỹ số đêm trải nghiệm tại M Village
              để tận hưởng các quyền lợi độc quyền như nhận phòng sớm, trả phòng muộn và miễn phí
              nâng hạng phòng ở 33 khách sạn tại Hồ Chí Minh, Hà Nội và Đà Nẵng.
            </div>
            <div className='footer-content__actions text-center'>
              <a className='action-text'>
                Tham gia M Village MORE{' '}
                <span>
                  <MoveUpRight />
                </span>
              </a>
              <a className='action-text'>
                Tải ứng dụng{' '}
                <span>
                  <MoveUpRight />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

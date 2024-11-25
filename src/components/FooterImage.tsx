import { MoveUpRight } from 'lucide-react';
import './FooterImage.scss';
import { TFunction } from 'i18next';

interface FooterImageProps {
  t: TFunction<any>;
}

export default function FooterImage({ t }: FooterImageProps) {
  return (
    <>
      <div className='footer_image-section'>
        <div className='img_center'>
          <span className='img-load'>
            <img src='/images/home-mvl-more-footer-bg.png' alt='Footer Image' />
          </span>
          <div className='footer-content-container container'>
            <div className='footer-content__heading text-center'>
              Đăng kí thành viên, tối đa trải nghiệm
            </div>
            <div className='footer-content__description text-center'>
              Là hội viên của khách sạn, bạn có thể tích luỹ số đêm trải nghiệm tại A HOMEVILLA
              để tận hưởng các quyền lợi độc quyền như nhận phòng sớm, trả phòng muộn và miễn phí
              nâng hạng phòng ở nhiều cơ sở khách sạn của chúng tôi.
            </div>
            <div className='footer-content__actions text-center'>
              <a className='action-text'>
                Tham gia Home Villa{' '}
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

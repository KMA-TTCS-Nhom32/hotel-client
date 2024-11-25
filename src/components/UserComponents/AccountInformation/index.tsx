'use client';
import style from '@/components/UserComponents/AccountInformation/index.module.scss';
import { FaUser } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';
import { FaPhoneVolume } from 'react-icons/fa6';
import { BsFillKeyFill } from 'react-icons/bs';
import { useState } from 'react';
import { SiTrueup } from 'react-icons/si';
import { FaEyeSlash } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n/client';
interface User {
  lng: string;
}
const User = ({ lng }: Readonly<User>) => {
  const { t } = useTranslation(lng, 'account');
  const [changepw, setchanpw] = useState(true);
  const changepassword = () => {
    setchanpw(false);
  };
  const [viewpw1, setviewpw1] = useState(true);
  const viewpassword1 = () => {
    setviewpw1(!viewpw1);
  };
  const [viewpw2, setviewpw2] = useState(true);
  const viewpassword2 = () => {
    setviewpw2(!viewpw2);
  };

  const [viewpw3, setviewpw3] = useState(true);
  const viewpassword3 = () => {
    setviewpw3(!viewpw3);
  };

  return (
    <div className={style.content}>
      <div className={style.title}>{t('Personal_details')}</div>
      <div className={style.card}>
        <div className={style.text}>{t('Peronsal_info')}</div>
        <div className={style.form}>
          <div className={style.box1}>
            <div className='pb-3'>{t('Full_name')}</div>
            <div className=''>
              <div className='relative w-full '>
                <FaUser className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input className='pl-8 w-full' />
              </div>
            </div>
          </div>
          <div className={style.box2}>
            <div className={style.boxip1}>
              <div className='pb-3'>{t('Nationality')}</div>
              <div className='relative w-full '>
                <FaUser className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input className='pl-8 w-full' />
              </div>
            </div>
          </div>
          <div className={style.box3}>
            <div className={style.boxip1}>
              <div className='pb-3'>Email</div>
              <div className='relative w-full '>
                <CgMail className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input className='pl-8 w-full' />
              </div>
            </div>
          </div>
          <div className={style.box4}>
            <div className={style.boxip1}>
              <div className='pb-3'>{t('Phone_number')}</div>
              <div className='relative w-full '>
                <FaPhoneVolume className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input className='pl-8 w-full' />
              </div>
            </div>
          </div>
        </div>
        <div className={style.form_action}>
          <button className={style.btn}>{t('Save_changes')}</button>
        </div>
      </div>
      <div className={style.password_card}>
        {changepw && (
          <>
            <div className={style.form1}>
              <div className={style.ptext}>{t('Password')}</div>
              <div className={style.password_pre}>
                <div className={style.icon}>
                  <BsFillKeyFill />
                </div>
                <div className={style.pass_dot}>●●●●●●●</div>
                <button onClick={() => changepassword()} className={style.btnpw}>
                  {' '}
                  {t('Change_password')}
                </button>
              </div>
            </div>
          </>
        )}
        {!changepw && (
          <div className={style.password_form}>
            <div className={style.area1}>
              <div className={style.pwtext1}>{t('Current_password')}</div>
              <div className={style.pwbox}>
                <div className={style.box1}>
                  <div className='relative w-full '>
                    <BsFillKeyFill className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input type={viewpw1 ? 'password' : 'text'} className='pl-8 w-full' />
                    <div
                      onClick={() => viewpassword1()}
                      className='absolute right-2 top-2.5 h-4 w-4 text-muted-foreground'
                    >
                      {viewpw1 ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.area2}>
              <div className={style.pwtext1}>{t('New_password')}</div>
              <div className={style.pwbox}>
                <div className={style.box1}>
                  <div className='relative w-full '>
                    <BsFillKeyFill className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input type={viewpw2 ? 'password' : 'text'} className='pl-8 w-full' />
                    <div
                      onClick={() => viewpassword2()}
                      className='absolute right-2 top-2.5 h-4 w-4 text-muted-foreground'
                    >
                      {viewpw2 ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.mt}>
              <div className={style.mt1}>
                <div className={style.icon}>
                  <IoCheckmarkCircle />
                </div>
                <div className={style.text}>{t(' Must have at least 8 characters')}</div>
              </div>
              <div className={style.mt1}>
                <div className={style.icon}>
                  <IoCheckmarkCircle />
                </div>
                <div className={style.text}>{t('Contain uppercase and lowercase')}</div>
              </div>
              <div className={style.mt1}>
                <div className={style.icon}>
                  <IoCheckmarkCircle />
                </div>
                <div className={style.text}>{t('Contain a number')}</div>
              </div>
              <div className={style.mt1}>
                <div className={style.icon}>
                  <IoCheckmarkCircle />
                </div>
                <div className={style.text}>{t('Contain a symbol')}</div>
              </div>
            </div>
            <div className={style.area3}>
              <div className={style.pwtext1}>{t('Confirm new password')}</div>
              <div className={style.pwbox}>
                <div className={style.box1}>
                  <div className='relative w-full '>
                    <BsFillKeyFill className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input type={viewpw3 ? 'password' : 'text'} className='pl-8 w-full' />
                    <div
                      onClick={() => viewpassword3()}
                      className='absolute right-2 top-2.5 h-4 w-4 text-muted-foreground'
                    >
                      {viewpw3 ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.form_action}>
              <button className={style.btn1}> {t('Cancel')}</button>
              <button className={style.btn2}>{t('Change_password')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;

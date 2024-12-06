'use client';
import style from './index.module.scss';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import ChangePassword from './ChangePassword/index';
import ProfileCard from '../Card';
interface Password {
  lng: string;
}

const Password = ({ lng }: Readonly<Password>) => {
  const { t } = useTranslation(lng, 'account');
  const [changepw, setchanpw] = useState(true);
  const changepassword = () => {
    setchanpw(false);
  };
  const handleCancel = () => {
    setchanpw(true);

  };
  return (
    <ProfileCard title={t('Password')}>
      {changepw && (
        <div className=''>
          <div className='pb-4'>{t('Password')}</div>
          <div className='flex items-center '>
            <div className={'text-orange-300'}>
              <BsFillKeyFill />
            </div>
            <div className='pl-3 basis-0 grow shrink'>●●●●●●●</div>
            <div className=''>
              <button onClick={() => changepassword()} className='px-4 text-orange-500'>
                {t('Change_password')}
              </button>
            </div>
          </div>
        </div>
      )}
      {!changepw && <ChangePassword lng={lng} onCancel={handleCancel} />}
    </ProfileCard>
  );
};

export default Password;

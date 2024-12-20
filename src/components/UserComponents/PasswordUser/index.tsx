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
import { AppTranslationFunction } from '@/lib/types/i18n';
interface Password {
  t: AppTranslationFunction;
}

const Password = ({ t }: Readonly<Password>) => {
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
    <ProfileCard title='Password'>
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
      {!changepw && <ChangePassword t={t} />}
    </ProfileCard>
  );
};

export default Password;

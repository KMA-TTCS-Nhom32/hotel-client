'use client';

import { useState } from 'react';

import { BsFillKeyFill } from 'react-icons/bs';
import ChangePassword from './ChangePassword';
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
      {!changepw && <ChangePassword t={t} onCancel={handleCancel} />}
    </ProfileCard>
  );
};

export default Password;

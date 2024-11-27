'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslation } from '@/i18n/client';

import { Modal } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { useAuthModal } from '@/stores/useAuthModal';

import CoverImg from '@public/images/advertisements/night-scene-2.webp';
import Logo from '@public/logos/logo-light.png';

import LoginForm from './LoginForm';

interface AuthModalProps {
  lng: string;
}

const AuthModal = ({ lng }: AuthModalProps) => {
  const { isOpen, onClose } = useAuthModal((state) => state);
  const [authForm, setAuthForm] = useState<'login' | 'register'>('login');
  const { t } = useTranslation(lng);

  //   const buttonLink = {
  //     desc: authForm === 'login' ? t('auth.dont_have_account') : t('auth.have_account'),
  //     link: authForm === 'login' ? t('auth.register') : t('auth.login'),
  //   };

  const buttonLink =
    authForm === 'login'
      ? {
          desc: t('auth.dont_have_account'),
          link: t('auth.register'),
        }
      : {
          desc: t('auth.have_account'),
          link: t('auth.login'),
        };

  const onSwitchForm = () => {
    setAuthForm(authForm === 'login' ? 'register' : 'login');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-[1080px] h-full max-h-[600px] p-0 mx-4 overflow-hidden'
      disableClickOutside
    >
      <section className='grid grid-cols-1 sm:grid-cols-[minmax(360px,_600px)_1fr] h-full'>
        <div className='w-full h-full relative hidden sm:block'>
          <Image
            src={CoverImg}
            alt='cover'
            className='w-auto h-full object-cover object-[80%_20%]'
          />
          <Image src={Logo} alt='logo' className='absolute top-5 left-5 h-20 w-auto' />
        </div>
        <div className='w-full min-w-[400px] h-full p-5 sm:px-8 flex flex-col items-start justify-center gap-8'>
          <Text element='h3' type='heading3-bold'>
            {t('auth.welcome')}
          </Text>

          <div className='w-full'>
            {authForm === 'login' ? <LoginForm t={t} /> : <div>Register Form</div>}
            <div className='w-full flex items-center justify-center gap-2'>
              <Text element='p' type='body2'>
                {buttonLink.desc}
              </Text>
              <Button variant='link' className='p-0' onClick={onSwitchForm}>
                <Text element='p' type='body2' className='underline' color='primary-main'>
                  {buttonLink.link}
                </Text>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default AuthModal;

'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslation } from '@/i18n/client';

import { Modal } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { useAuthModal } from '@/stores/modals/useAuthModal';

import CoverImg from '@public/images/advertisements/night-scene-2.webp';
import Logo from '@public/logos/logo-light.png';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
// import { UserIdentifierTypeEnum } from '@ahomevilla-hotel/node-sdk';
import ActiveAccount from './ActiveAccount';
import { IdentifierValue } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AuthModalProps {
  lng: string;
}

const AuthModal = ({ lng }: AuthModalProps) => {
  const { isOpen, onClose, formType } = useAuthModal((state) => state);
  const { t } = useTranslation(lng);
  const [authForm, setAuthForm] = useState<'login' | 'register'>('login');
  const [registerIdentifier, setRegisterIdentifier] = useState<IdentifierValue>({
    type: 'EMAIL',
    value: '',
    id: '',
  });
  console.log(registerIdentifier);
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
      className='max-w-[94%] sm:max-w-[1080px] sm:h-full sm:max-h-[600px] p-0 overflow-hidden rounded-lg'
      disableClickOutside
    >
      <section className='grid grid-cols-1 sm:grid-cols-[minmax(360px,_600px)_1fr] h-full sm:max-h-[600px]'>
        <div className='w-full h-full relative hidden sm:block'>
          <Image
            src={CoverImg}
            alt='cover'
            className='w-auto h-full object-cover object-[80%_20%]'
          />
          <Image src={Logo} alt='logo' className='absolute top-5 left-5 h-20 w-auto' />
        </div>
        <div className='w-full sm:min-w-[400px] h-full sm:max-h-[600px] p-5 sm:px-8 flex flex-col items-start justify-center gap-8'>
          <Text element='h3' type='heading3-bold'>
            {t('auth.welcome')}
          </Text>

          <ScrollArea className='w-full h-full overflow-y-scroll hidden-scrollbar'>
            {formType === 'auth' &&
              (authForm === 'login' ? (
                <LoginForm t={t} />
              ) : (
                <RegisterForm t={t} onRegisterSuccess={setRegisterIdentifier} />
              ))}
            {formType === 'confirm_email_or_phone' && (
              <ActiveAccount t={t} data={registerIdentifier} />
            )}
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
          </ScrollArea>
        </div>
      </section>
    </Modal>
  );
};

export default AuthModal;

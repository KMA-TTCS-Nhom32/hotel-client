'use client';

import { useRequest } from 'ahooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { AppTranslationFunction } from '@/lib/types/i18n';
import { zodResolver } from '@hookform/resolvers/zod';

import { newPasswordchema, newPasswordValue } from '@/lib/validators/auth';

import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { ButtonCustom } from '@/components/ui/button-custom';

import { registerUserService, reserPasswordService } from '@/services/auth';
import { useAuthModal } from '@/stores/modals/useAuthModal';
import { RegisterDto, ResetPasswordWithOTPEmailDto } from '@ahomevilla-hotel/node-sdk';
import { IdentifierValue, Identifier } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import LoginForm from './LoginForm';

interface SetNewPasswordProps {
  t: AppTranslationFunction;
  dataEmail: string;
  dataCode: string;
}

const SetNewPassword = ({ t, dataEmail, dataCode }: SetNewPasswordProps) => {
  const [login, setlogin] = useState(true);
  const onclickSetLogin = () => {
    setlogin(!login);
  };
  const { run } = useRequest(reserPasswordService, {
    manual: true,
    onSuccess({ data }) {
      toast.success('cap nhat thanh cong');
      onclickSetLogin();
    },
    onError() {
      toast.error('cap nhat that bai');
    },
  });
  function onSubmit(values: newPasswordValue) {
    const payload: ResetPasswordWithOTPEmailDto = {
      email: dataEmail,
      code: dataCode,
      newPassword: values.newPassword,
    };
    run(payload);
  }
  const form = useForm<newPasswordValue>({
    resolver: zodResolver(newPasswordchema),
    defaultValues: {
      newPassword: '',
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  return (
    <div>
      {login && (
        <div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 pl-[1px] pr-2.5'>
              <InputPassword<newPasswordValue>
                name='newPassword'
                label='New Password'
                placeholder={t('auth.placeholder.password')}
                t={t}
              />

              <ButtonCustom
                type='submit'
                className=''
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Tiếp Tục
              </ButtonCustom>
            </form>
          </Form>
        </div>
      )}
      {!login && <LoginForm t={t} />}
    </div>
  );
};

export default SetNewPassword;

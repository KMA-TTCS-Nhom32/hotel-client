import React from 'react';
import { TFunction, Resources } from 'i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormValues } from '@/lib/validators/auth';
import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { ButtonCustom } from '@/components/ui/button-custom';

interface LoginFormProps {
  t: TFunction<keyof Resources>;
}

const LoginForm = ({ t }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = form;

  function onSubmit(values: LoginFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-4'>
          <InputText<LoginFormValues>
            name='emailOrPhone'
            label={t('auth.email_or_phone')}
            placeholder={t('auth.placeholder.email_or_phone')}
          />
          <InputPassword<LoginFormValues>
            name='password'
            label={t('auth.password')}
            placeholder={t('auth.placeholder.password')}
            disablePasswordEye={watch('password').length === 0}
          />
          <div className='w-full text-end'>
            <a href='#' className='primary-main hover:underline'>
              {t('auth.forgot_password')}?
            </a>
          </div>
        </div>
        <ButtonCustom
          type='submit'
          className='w-full mt-6'
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t('auth.login')}
        </ButtonCustom>
      </form>
    </Form>
  );
};

export default LoginForm;

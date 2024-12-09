'use client';

import { useForm } from 'react-hook-form';

import type { AppTranslationFunction } from '@/lib/types/i18n';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterFormValues, registerSchema } from '@/lib/validators/auth';

import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { ButtonCustom } from '@/components/ui/button-custom';

interface RegisterFormProps {
  t: AppTranslationFunction;
}

const RegisterForm = ({ t }: RegisterFormProps) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = form;

  function onSubmit(values: RegisterFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
        <InputText<RegisterFormValues>
          name='name'
          label={t('auth.name')}
          placeholder={t('auth.placeholder.name')}
        />
        <InputText<RegisterFormValues>
          name='emailOrPhone'
          label={t('auth.email_or_phone')}
          placeholder={t('auth.placeholder.email_or_phone')}
        />
        <InputPassword<RegisterFormValues>
          name='password'
          label={t('auth.password')}
          placeholder={t('auth.placeholder.password')}
          disablePasswordEye={watch('password').length === 0}
        />
        <InputPassword<RegisterFormValues>
          name='confirmPassword'
          label={t('auth.confirm_password')}
          placeholder={t('auth.placeholder.confirm_password')}
          disablePasswordEye={watch('confirmPassword').length === 0}
        />

        <ButtonCustom
          type='submit'
          className='w-full'
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {t('auth.register')}
        </ButtonCustom>
      </form>
    </Form>
  );
};

export default RegisterForm;

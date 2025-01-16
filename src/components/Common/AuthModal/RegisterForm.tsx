'use client';

import { useRequest } from 'ahooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { AppTranslationFunction } from '@/lib/types/i18n';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegexValidation, RegisterFormValues, registerSchema } from '@/lib/validators/auth';

import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { ButtonCustom } from '@/components/ui/button-custom';

import { registerUserService } from '@/services/auth';
import { useAuthModal } from '@/stores/modals/useAuthModal';
import { RegisterDto } from '@ahomevilla-hotel/node-sdk';
import { IdentifierValue, Identifier } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RegisterFormProps {
  t: AppTranslationFunction;
  onRegisterSuccess?: (data: IdentifierValue) => void;
}

const RegisterForm = ({ t, onRegisterSuccess }: RegisterFormProps) => {
  const { setFormType } = useAuthModal((state) => state);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, watch } = form;

  const { run: handleRegister, loading } = useRequest(registerUserService, {
    manual: true,
    onSuccess({ data }) {
      onRegisterSuccess?.({
        type: data.identifier_type,
        value: (data.identifier_type === 'EMAIL' ? data.email : data.phone) as string,
        id: data.id,
      });
      setFormType('confirm_email_or_phone');
      toast.success(t('auth.register_success'));
    },
    onError(error) {
      console.error(error.message);
      toast.error(t('auth.register_error'));
    },
  });

  function onSubmit(values: RegisterFormValues) {
    const isSignupWithPhone = RegexValidation.phone.test(values.emailOrPhone);
    const registerField = isSignupWithPhone ? 'phone' : 'email';

    const payload: RegisterDto = {
      data: {
        name: values.name,
        email: isSignupWithPhone ? undefined : values.emailOrPhone,
        phone: isSignupWithPhone ? values.emailOrPhone : undefined,
        password: values.password,
      },
      accountIdentifier: registerField.toUpperCase() as Identifier,
    };

    handleRegister(payload);
  }

  return (
    
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4 pl-[1px] pr-2.5'>
        <InputText<RegisterFormValues>
          name='name'
          label={t('auth.name')}
          placeholder={t('auth.placeholder.name')}
          t={t}
        />
        <InputText<RegisterFormValues>
          name='emailOrPhone'
          label={t('auth.email_or_phone')}
          placeholder={t('auth.placeholder.email_or_phone')}
          t={t}
        />
        <InputPassword<RegisterFormValues>
          name='password'
          label={t('auth.password')}
          placeholder={t('auth.placeholder.password')}
          disablePasswordEye={watch('password').length === 0}
          t={t}
        />
        <InputPassword<RegisterFormValues>
          name='confirmPassword'
          label={t('auth.confirm_password')}
          placeholder={t('auth.placeholder.confirm_password')}
          disablePasswordEye={watch('confirmPassword').length === 0}
          t={t}
        />

        <ButtonCustom type='submit' className='w-full' disabled={loading} loading={loading}>
          {t('auth.register')}
        </ButtonCustom>
      </form>
    </Form>
  );
};

export default RegisterForm;

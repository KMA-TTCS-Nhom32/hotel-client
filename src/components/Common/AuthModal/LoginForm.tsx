import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppTranslationFunction } from '@/lib/types/i18n';

import { loginSchema, LoginFormValues } from '@/lib/validators/auth';
import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { ButtonCustom } from '@/components/ui/button-custom';

import { loginUserService } from '@/services/auth';
import { useAuth } from '@/stores/auth/useAuth';
import { useAuthModal } from '@/stores/modals/useAuthModal';

interface LoginFormProps {
  t: AppTranslationFunction;
}

const LoginForm = ({ t }: LoginFormProps) => {
  const { refresh } = useRouter();
  const { onClose } = useAuthModal((state) => state);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  const { handleSubmit, watch, control } = form;

  const { onLogin } = useAuth();

  const { run: handleLogin, loading } = useRequest(loginUserService, {
    manual: true,
    onSuccess({ data }) {
      toast.success(t('auth.login_success'));
      onLogin({
        token: data.accessToken,
        refreshToken: data.refreshToken,
        expiredTime: data.accessTokenExpires,
      });
      onClose();
      refresh();
    },
    onError(error) {
      console.error(error.message);
      toast.error(t('auth.login_error'));
    },
  });

  function onSubmit(values: LoginFormValues) {
    handleLogin(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full px-[1px]'>
        <div className='space-y-4'>
          <InputText<LoginFormValues>
            control={control}
            name='emailOrPhone'
            label={t('auth.email_or_phone')}
            placeholder={t('auth.placeholder.email_or_phone')}
            t={t}
          />
          <InputPassword<LoginFormValues>
            control={control}
            name='password'
            label={t('auth.password')}
            placeholder={t('auth.placeholder.password')}
            disablePasswordEye={watch('password').length === 0}
            t={t}
          />
          <div className='w-full text-end'>
            <a href='#' className='primary-main hover:underline'>
              {t('auth.forgot_password')}?
            </a>
          </div>
        </div>
        <ButtonCustom type='submit' className='w-full mt-6' disabled={loading} loading={loading}>
          {t('auth.login')}
        </ButtonCustom>
      </form>
    </Form>
  );
};

export default LoginForm;

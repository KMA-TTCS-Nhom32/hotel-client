import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppTranslationFunction } from '@/lib/types/i18n';

import { loginSchema, LoginFormValues, EmailValue, emailSchema } from '@/lib/validators/auth';
import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { ButtonCustom } from '@/components/ui/button-custom';

import { loginUserService, verifyEmailService, verifyUserEmailService } from '@/services/auth';
import { useAuth } from '@/stores/auth/useAuth';
import { useAuthModal } from '@/stores/modals/useAuthModal';
import { useState } from 'react';
import ActiveAccount from './ActiveAccount';
import ActiveForgotPassword from './ActiveForgotPassword';
import { InitiateForgotPasswordEmailDto, VerifyEmailDto } from '@ahomevilla-hotel/node-sdk';

interface ForgotPasswordProps {
  t: AppTranslationFunction;
}

const ForgotPasswordPage = ({ t }: ForgotPasswordProps) => {
  const [otp, setOtp] = useState(true);
  const onclickResendOtp = () => {
    setOtp(!otp);
  };
 const [inputValue, setInputValue] = useState('');

 const handleInputChange = (event) => {
   setInputValue(event.target.value);
 };
  const form = useForm<EmailValue>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const { run } = useRequest(verifyEmailService, {
    manual: true,
    onSuccess({ data }) {
      toast.success('cap nhat thanh cong');
      onclickResendOtp();
    },
    onError() {
      toast.error('cap nhat that bai');
    },
  });
  function onSubmit(values: EmailValue) {
    const payload: InitiateForgotPasswordEmailDto = {
      email: values.email,
    };
    run(payload);
  }
  return (
    <div>
      {otp && (
        <div>
          <Form {...form}>
            <form className='w-full px-[1px]' onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                <InputText<EmailValue>
                  value={inputValue}
                  onChange={handleInputChange}
                  control={form.control}
                  name='email'
                  label={t('auth.email_or_phone')}
                  placeholder={t('auth.placeholder.email_or_phone')}
                  t={t}
                />
              </div>
              <ButtonCustom
                type='submit'
                className='w-full mt-6'
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Gửi mã OTP
              </ButtonCustom>
            </form>
          </Form>
        </div>
      )}
      {!otp && <ActiveForgotPassword t={t} dataEmail={inputValue} />}
    </div>
  );
};

export default ForgotPasswordPage;

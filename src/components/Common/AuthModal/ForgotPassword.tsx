import { useState } from 'react';

import { useRequest } from 'ahooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppTranslationFunction } from '@/lib/types/i18n';

import { EmailValue, emailSchema } from '@/lib/validators/auth';
import { Form } from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import { ButtonCustom } from '@/components/ui/button-custom';

import { verifyEmailService } from '@/services/auth';
import ActiveForgotPassword from './ActiveForgotPassword';
import { InitiateForgotPasswordEmailDto } from '@ahomevilla-hotel/node-sdk';

interface ForgotPasswordProps {
  t: AppTranslationFunction;
}

const ForgotPasswordPage = ({ t }: ForgotPasswordProps) => {
  const [otp, setOtp] = useState(true);
  const onclickResendOtp = () => {
    setOtp(!otp);
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
    control,
    getValues,
  } = form;

  const { run } = useRequest(verifyEmailService, {
    manual: true,
    onSuccess() {
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
                  control={control}
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
      {!otp && <ActiveForgotPassword t={t} dataEmail={getValues().email} />}
    </div>
  );
};

export default ForgotPasswordPage;

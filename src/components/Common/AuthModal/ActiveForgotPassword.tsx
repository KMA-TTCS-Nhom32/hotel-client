import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IdentifierValue } from '@/lib/types';
import { AppTranslationFunction } from '@/lib/types/i18n';
import { useAuthModal } from '@/stores/modals/useAuthModal';
import {
  ActiveAccountFormValues,
  activeAccountSchema,
  EmailandCodeValue,
} from '@/lib/validators/auth';
import { verifyOTP, verifyUserEmailService } from '@/services/auth';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { ButtonCustom } from '@/components/ui/button-custom';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useEffect, useState } from 'react';
import SetNewPassword from './SetNewPassword';
import { VerifyCodeDto, VerifyEmailOTP } from '@ahomevilla-hotel/node-sdk';

interface ActiveForgotPasswordProps {
  t: AppTranslationFunction;
  dataEmail: string;
}

const ActiveForgotPassword = ({ dataEmail, t }: ActiveForgotPasswordProps) => {
  const [newPassword, setNewPassword] = useState(true);
  const onclickNewPassword = () => {
    setNewPassword(!newPassword);
  };
  const { run } = useRequest(verifyOTP, {
    manual: true,
    onSuccess({ data }) {
      toast.success('cap nhat thanh cong');
      onclickNewPassword();
    },
    onError() {
      toast.error('cap nhat that bai');
    },
  });
  function onSubmit(values: ActiveAccountFormValues) {
    const payload: VerifyEmailOTP = {
      email: dataEmail,
      code: values.otp,
    };
    run(payload);
  }
  const form = useForm<ActiveAccountFormValues>({
    resolver: zodResolver(activeAccountSchema),
    defaultValues: {
      otp: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  return (
    <div>
      {newPassword && (
        <div>
          <Form {...form}>
            <Text className='text-center heading1-semi-bold '>
              Nhập mã OTP đã được gửi đến email {dataEmail}
            </Text>
            <form
              className='w-full flex flex-col gap-6 items-center px-[1px]'
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage t={t} />
                  </FormItem>
                )}
              />

              <ButtonCustom
                type='submit'
                className='w-full mt-6'
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Tiếp tục
              </ButtonCustom>
            </form>
          </Form>
        </div>
      )}
      {!newPassword && <SetNewPassword t={t} dataEmail={dataEmail} dataCode={form.getValues('otp')} />}
    </div>
  );
};

export default ActiveForgotPassword;

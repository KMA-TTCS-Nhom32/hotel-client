import { useRequest } from 'ahooks';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IdentifierValue } from '@/lib/types';
import { AppTranslationFunction } from '@/lib/types/i18n';
import { useAuthModal } from '@/stores/modals/useAuthModal';
import { ActiveAccountFormValues, activeAccountSchema } from '@/lib/validators/auth';
import { verifyUserEmailService } from '@/services/auth';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { ButtonCustom } from '@/components/ui/button-custom';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useEffect } from 'react';

interface ActiveAccountProps {
  t: AppTranslationFunction;
  data: IdentifierValue;
}

const ActiveAccount = ({ t, data }: ActiveAccountProps) => {
  const { setFormType } = useAuthModal((state) => state);

  useEffect(() => {
    if (data.id === '') {
      setFormType('auth');
    }
  }, []);

  const form = useForm<ActiveAccountFormValues>({
    resolver: zodResolver(activeAccountSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { handleSubmit } = form;

  const { run: handleVerifyEmail, loading } = useRequest(verifyUserEmailService, {
    manual: true,
    onSuccess() {
      setFormType('auth');
      toast.success(t('auth.active_account_success'));
    },
    onError(error) {
      console.error(error.message);
      toast.error(t('auth.active_account_error'));
    },
  });

  const onSubmit = async (values: ActiveAccountFormValues) => {
    handleVerifyEmail({
      userId: data.id,
      code: values.otp,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-6 items-center px-[1px]'>
        <Text type='heading4-semi-bold'>
          {t('auth.enter_otp', {
            replace: { field: `${data.type.toLowerCase()} ${data.value}` },
          })}
        </Text>

        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
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

        <ButtonCustom type='submit' className='w-full' disabled={loading} loading={loading}>
          {t('auth.register')}
        </ButtonCustom>
      </form>
    </Form>
  );
};

export default ActiveAccount;

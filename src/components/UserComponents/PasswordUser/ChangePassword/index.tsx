import { ButtonCustom } from '@/components/ui/button-custom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordFormValues, changePasswordSchema } from '@/lib/validators/change-password'; // Giả sử bạn đã có schema này từ trước
import { TFunction, Resources } from 'i18next';
import ProfileCard from '..//../Card';
import { useTranslation } from '@/i18n/client';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import InputText from '@/components/Common/Form/InputText';
import InputPassword from '@/components/Common/Form/InputPassword';
import { AppTranslationFunction } from '@/lib/types/i18n';

interface ChangePasswordFormProps {
  t: AppTranslationFunction;
  onCancel: () => void;
}
const ChangePasswordForm = ({ t, onCancel }: ChangePasswordFormProps) => {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  function onSubmit(values: ChangePasswordFormValues) {
    console.log(values);
  }

  return (
    <ProfileCard title={t('Change_password')}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='sm:w-2/4 w-full'>
          <div className='space-y-4'>
            <InputPassword<ChangePasswordFormValues>
              name='currentPassword'
              label={t('Current_password')}
              placeholder={t('auth.placeholder.current_password')}
            />
            <InputPassword<ChangePasswordFormValues>
              name='newPassword'
              label={t('New_password')}
              placeholder={t('auth.placeholder.new_password')}
            />
            <InputPassword<ChangePasswordFormValues>
              name='confirmNewPassword'
              label={t('Confirm new password')}
              placeholder={t('auth.placeholder.confirm_new_password')}
            />
          </div>
          <div className='flex  mt-6 justify-center'>
            <button type='button' onClick={onCancel} className=' text-orange-500 px-6'>
              {t('Cancel')}
            </button>
            <ButtonCustom type='submit' className='' disabled={isSubmitting} loading={isSubmitting}>
              {t('Save_changes')}
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </ProfileCard>
  );
};

export default ChangePasswordForm;

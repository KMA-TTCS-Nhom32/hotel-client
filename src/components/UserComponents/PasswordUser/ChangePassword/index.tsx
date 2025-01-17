import { ButtonCustom } from '@/components/ui/button-custom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordFormValues, changePasswordSchema } from '@/lib/validators/change-password';
import ProfileCard from '..//../Card';
import { Form } from '@/components/ui/form';
import InputPassword from '@/components/Common/Form/InputPassword';
import { AppTranslationFunction } from '@/lib/types/i18n';
import { useRequest } from 'ahooks';
import { changePassWordService } from '@/services/auth';
import { toast } from 'sonner';
import { ChangePasswordDto } from '@ahomevilla-hotel/node-sdk';

interface ChangePasswordFormProps {
  t: AppTranslationFunction;
  onCancel: () => void;
}
const ChangePasswordForm = ({ t, onCancel }: ChangePasswordFormProps) => {
  const { run } = useRequest(changePassWordService, {
    manual: true,
    onSuccess({ data }) {
      toast.success(t('Updated successfully'));
      onCancel();
    },
    onError() {
      toast.error(t('update failed'));
    },
  });
  function onSubmit(values: ChangePasswordFormValues) {
    const payload: ChangePasswordDto = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmNewPassword,
    };
    run(payload);
  }
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

  return (
    <ProfileCard title={t('Change_password')}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='sm:w-2/4 w-full'>
          <div className='space-y-4'>
            <InputPassword<ChangePasswordFormValues>
              name='currentPassword'
              label={t('Current_password')}
              placeholder={t('placeholder.current_password')}
            />
            <InputPassword<ChangePasswordFormValues>
              name='newPassword'
              label={t('New_password')}
              placeholder={t('placeholder.new_password')}
            />
            <InputPassword<ChangePasswordFormValues>
              name='confirmNewPassword'
              label={t('Confirm new password')}
              placeholder={t('placeholder.confirm_new_password')}
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

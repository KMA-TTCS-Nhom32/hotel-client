'use client';
import styles from './index.module.scss';
import { useTranslation } from '@/i18n/client';
import LogOutButton from '@/components/Common/LogOutButton';
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
type FormFields = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string

};


interface User {
    lng: string;

}



const ChangePassword = ({ lng }: Readonly<User>) => {
    const { watch , register, handleSubmit, formState: { errors } } = useForm<FormFields>();
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    }

    const { t } = useTranslation(lng, 'account');
    return (<>
        <div className={ styles.formChangePasword}>
            <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>
                    <label>{t('Current_password')}</label>
                    <Input {...register('currentPassword', { required: 'Mật khẩu cũ là bắt buộc' },)} type='password' placeholder={t('Current_password')} />
                    {errors.currentPassword && <p className='text-red-500'>{errors.currentPassword.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label>{t('New_password')}</label>
                    <Input {...register('newPassword', {
                        required: 'Mật khẩu mới là bắt buộc',
                        minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                    },)} type='password' placeholder={t('New_password')} />
                    {errors.newPassword && <p className='text-red-500'>{errors.newPassword.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label>{t('Confirm new password')}</label>
                    <Input {...register('confirmNewPassword', {
                        required: 'Vui lòng xác nhận mật khẩu mới',
                        validate: value => value === watch('newPassword') || 'Mật khẩu không khớp'
                    })}
                        type='password' placeholder={t('Confirm new password')} />
                    {errors.confirmNewPassword && <p className='text-red-500'>{errors.confirmNewPassword.message}</p>}
                </div>

                <div className='text-right mt-3'>
                    <Button className=' text-right px-4 submit'>{t('Change_password')}</Button>
                </div>
              

            </form>
            <div className={styles.log_out}>
                <LogOutButton />
            </div>
        </div>




    </>
    );
};

export default ChangePassword;

'use client';
import style from './index.module.scss';
import { useTranslation } from '@/i18n/client';

import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
type FormFields = {
  email: string;
  fullname: string;
  phoneNumber: string;
  dateOfBirth: Date;

};


interface User {
  lng: string;

}



const User = ({ lng }: Readonly<User>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  }

  const { t } = useTranslation(lng, 'account');
  return (<>
    <div className={style.card}>
      <div className={style.title}>{t('Peronsal_info')}</div>
      <form className={style.form}  onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3'>
          <label>Email</label>
          <Input {...register('email',
            {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes('@')) {
                  return "Email must include @"
                }
                return true;
              }
            }
          )}
            type='text' placeholder='Email' />
          <p className='text-red-500'>{errors.email?.message}</p>
        </div>
        <div className='flex flex-col gap-3'>
          <label>Full Name</label>
          <Input {...register('fullname', {
            required: "Full name is required",
            maxLength: {
              value: 50,
              message: "Full name must be at most 50 characters long"
            },
          },

          )} type='text' placeholder='Full name' />
          <p className='text-red-500'>{errors.fullname?.message}</p>
        </div>
        <div className='flex flex-col gap-3'>
          <label >Phone Number</label>
          <Input {...register('phoneNumber', {
            required: "Phone Number is required",
            validate: value => value.length === 10 || 'Phone Number must be at least 10 characters long'
          },)} type='number' placeholder='Phone Number' />
          <p className='text-red-500'>{errors.phoneNumber?.message}</p>
        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor="dob">Ngày sinh</label>
          <Input
            type="date"
            {...register('dateOfBirth', {
              required: 'Ngày sinh là bắt buộc',
              validate: value => {
                const age = new Date().getFullYear() - new Date(value).getFullYear();
                return age >= 18 || 'Bạn phải đủ 18 tuổi';
              }
            })}
          />
          {errors.dateOfBirth && <p className='text-red-500'>{errors.dateOfBirth.message}</p>}
        </div>
        <div className='text-right'>
          <Button className=' text-right px-4'>{t('Save_changes')}</Button>
        </div>
      </form>
    </div>
  </>
  );
};

export default User;

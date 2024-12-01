'use client';
import { useForm } from 'react-hook-form';

import { useTranslation } from '@/i18n/client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import ProfileCard from '../Card';
import { accountInforSchema, AccountInforValues } from '@/lib/validators/account-infor';
import { zodResolver } from '@hookform/resolvers/zod';

import InputText from '@/components/Common/Form/InputText';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

import dayjs from 'dayjs';
import { ButtonCustom } from '@/components/ui/button-custom';
import { CustomCalendarDropdown } from '@/components/Common/CustomCalendar/CalendarCustomDropdown';

interface AccountInfoProps {
  lng: string;
}

const AccountInfo = ({ lng }: Readonly<AccountInfoProps>) => {
  const { t } = useTranslation(lng, 'account');
  //   const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

  //   const onSubmit: SubmitHandler<FormFields> = (data) => {
  //     console.log(data);
  //   }

  const form = useForm<AccountInforValues>({
    resolver: zodResolver(accountInforSchema),
    defaultValues: {
      email: '',
      name: '',
      gender: 'male',
      phone: '',
      birthDate: new Date(),
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = form;

  function onSubmit(values: AccountInforValues) {
    console.log(values);
  }

  return (
    <ProfileCard title={t('Peronsal_info')}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InputText<AccountInforValues>
              name='email'
              label={t('Email')}
              placeholder={t('placeholder.email')}
            />
            <InputText<AccountInforValues>
              name='phone'
              label={t('Phone_number')}
              placeholder='Input Email'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InputText<AccountInforValues>
              name='name'
              label={t('Full_name')}
              placeholder={t('Full_name')}
            />
            <FormField
              control={control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={'outline'} className='w-full text-left font-normal'>
                          {field.value ? (
                            dayjs(field.value).format('DD/MM/YYYY')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start' side='bottom'>
                      <CustomCalendarDropdown
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end'>
            <ButtonCustom type='submit' loading={isSubmitting}>
              {t('Save_changes')}
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </ProfileCard>
  );
};

export default AccountInfo;

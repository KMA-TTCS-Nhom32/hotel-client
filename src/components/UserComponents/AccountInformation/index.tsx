'use client';
import { useForm } from 'react-hook-form';

import { AppTranslationFunction } from '@/lib/types/i18n';
import { accountInforSchema, AccountInforValues } from '@/lib/validators/account-infor';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import ProfileCard from '../Card';
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
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

import dayjs from 'dayjs';
import { ButtonCustom } from '@/components/ui/button-custom';
import { CustomCalendarDropdown } from '@/components/Common/CustomCalendar/CalendarCustomDropdown';
import { useProfileStore } from '@/providers/profile-store-provider';
import { useRequest } from 'ahooks';
import { updateProfileService } from '@/services/auth';
import { UpdateProfileDto } from '@ahomevilla-hotel/node-sdk';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface AccountInfoProps {
  t: AppTranslationFunction;
}

const AccountInfo = ({ t }: Readonly<AccountInfoProps>) => {
  //   const { register, handleSubmit, formState: { errors } } = useForm<FormFields>();

  //   const onSubmit: SubmitHandler<FormFields> = (data) => {
  //     console.log(data);
  //   }
  const { profile, setProfile } = useProfileStore((state) => state);
  // const [state, setState] = useState('');

  const form = useForm<AccountInforValues>({
    resolver: zodResolver(accountInforSchema),
    defaultValues: {
      email: profile?.email ?? '',
      name: profile?.name ?? '',
      gender: 'male',
      phone: profile?.phone ?? '',
      birthDate: profile?.birth_date ? new Date(profile.birth_date) : new Date(),
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = form;

  useEffect(() => {
    reset({
      email: profile?.email ?? '',
      name: profile?.name ?? '',
      gender: 'male',
      phone: profile?.phone ?? '',
      birthDate: profile?.birth_date ? new Date(profile.birth_date) : new Date(),
    });
  }, [profile]);

  const { run } = useRequest(updateProfileService, {
    manual: true,
    onSuccess({ data }) {
      setProfile(data);
      toast.success('cap nhat thanh cong');
    },
    onError() {
      toast.error('cap nhat that bai');
    },
  });

  function onSubmit(values: AccountInforValues) {
    const payload: UpdateProfileDto = {
      name: values.name,
      birth_date: values.birthDate.toISOString(),
      gender: values.gender.toUpperCase() as any,
    };

    if (!profile?.verified_email) {
      payload.email = values.email;
    }

    if (!profile?.verified_phone) {
      payload.phone = values.phone;
    }

    run(payload);
  }

  return (
    <ProfileCard title={t('Peronsal_info')}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InputText<AccountInforValues>
              name='email'
              label='Email'
              placeholder={t('placeholder.email')}
              disabled={profile?.verified_email}
            />
            <InputText<AccountInforValues>
              name='phone'
              label={t('Phone_number')}
              placeholder={t('placeholder.phone_number')}
              disabled={profile?.verified_phone}
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InputText<AccountInforValues>
              name='name'
              label={t('Full_name')}
              placeholder={t('placeholder.full_name')}
            />
            <FormField
              control={control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('gender')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>{t('male')}</SelectItem>
                      <SelectItem value='female'>{t('female')}</SelectItem>
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
                  <FormLabel>{t('date_of_birth')}</FormLabel>
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

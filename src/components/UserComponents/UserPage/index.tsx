'use client';

import { useTranslation } from '@/i18n/client';

import AccountInformation from '@/components/UserComponents/AccountInformation';
import Content from '@/components/Common/Content';
import { Text } from '@/components/ui/text';
import Password from '../PasswordUser';

interface UserPageProps {
  lng: string;
}

const UserPage = ({ lng }: UserPageProps) => {
  const { t } = useTranslation(lng, 'account');

  return (
    <Content className='w-full'>
      <Text element='h3' type='heading3-semi-bold'>
        {t('detail_infomation')}
      </Text>
      <AccountInformation t={t} />
      <Password t={t} />
    </Content>
  );
};

export default UserPage;

import AccountInformation from '@/components/UserComponents/AccountInformation';
import Password from '../PasswordUser';
import { createTranslation } from '@/i18n/server';
import { Text } from '@/components/ui/text';
interface UserPageProps {
  lng: string;
}

const UserPage = async ({ lng }: UserPageProps) => {
  const { t } = await createTranslation(lng, 'account');

  return (
    <>
      <Text element='h3' type='heading3-semi-bold'>
        {t('detail_infomation')}
      </Text>
      <AccountInformation lng={lng} />
      <Password lng={lng} />
    </>
  );
};

export default UserPage;

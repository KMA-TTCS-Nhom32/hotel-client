import { useRequest } from 'ahooks';
import { getProfileService } from '@/services/auth';
import { useProfileStore } from '@/providers/profile-store-provider';

export const useInitialProfile = () => {
  const { setProfile } = useProfileStore((state) => state);

  useRequest(getProfileService, {
    onSuccess: ({ data }) => {
      setProfile(data);
    },
  });
};

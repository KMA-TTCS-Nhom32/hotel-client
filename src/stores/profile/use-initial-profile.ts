import { useMount, useRequest } from 'ahooks';
import { getProfileService } from '@/services/auth';
import { useProfileStore } from '@/providers/profile-store-provider';
import { AuthCookieService } from '@/services/auth-cookie';

export const useInitialProfile = () => {
  const { setProfile } = useProfileStore((state) => state);

  const { run, refresh } = useRequest(getProfileService, {
    manual: true,
    onSuccess: ({ data }) => {
      setProfile(data);
    },
  });

  useMount(() => {
    const isLogin = AuthCookieService.getAccessToken();

    if (isLogin) {
      run();
    }
  });

  return {
    run,
    onRefresh: refresh,
  };
};

import { memo } from 'react';
import { useEffect } from 'react';
import { useMainContext } from '../../../context/MainContext';
import type { User } from '@offers/types';
import { fetcher } from '../../../lib/utils/fetcher';
import { BASIC_API_URL } from '../../../lib/utils/consts';

type AuthCheckerProps = { readonly children: React.ReactNode };

export const AuthChecker = memo<AuthCheckerProps>(({ children }) => {
  const { setUser, setIsLogin, setLoading } = useMainContext();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data }: { data: User } = await fetcher(`${BASIC_API_URL}/users`, 'GET');
      setUser({ ...data, password: '' });
      setIsLogin(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return <>{children}</>;
});

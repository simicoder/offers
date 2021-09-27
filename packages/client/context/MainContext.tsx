import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';
import type { UserRegisterData } from '@offers/types';

const MainContext = createContext<ContextType>({
  loading: false,
  setLoading: () => {},
  isLogin: false,
  setIsLogin: () => {},
  user: { name: '', email: '', company: '', password: '' },
  setUser: () => {},
});

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  user: UserRegisterData;
  setUser: Dispatch<SetStateAction<UserRegisterData>>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Error while reading context!');
  }

  return context;
};

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', company: '', password: '' });

  return (
    <MainContext.Provider
      value={{
        loading,
        setLoading,
        isLogin,
        setIsLogin,
        user,
        setUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

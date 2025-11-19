import { createContext, useContext } from 'react';

interface IAuthContext {
  recaptchaToken: string;
  refreshCaptcha: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

const useAuthContext = () => {
  const c = useContext(AuthContext);
  if (c) return c;
  throw new Error('AuthContext is null');
};

export { AuthContext, useAuthContext };

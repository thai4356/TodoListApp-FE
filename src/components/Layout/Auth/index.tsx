import ModalPortal from 'components/Modal/ModalPortal';
import { checkLoginUser } from 'config/api';
import { useCallback, useMemo, useState } from 'react';
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { Navigate, Outlet } from 'react-router-dom';
import { navigateToPrivateRoute } from 'routes';
import { AuthContext } from './authProvider';

const AuthLayout = () => {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const refreshCaptcha = useCallback(() => {
    setRefreshReCaptcha((r) => !r);
  }, []);

  const verifyRecaptchaCallback = useCallback((t: string) => {
    setRecaptchaToken(t);
  }, []);

  const contextValue = useMemo(
    () => ({
      recaptchaToken,
      refreshCaptcha,
    }),
    [recaptchaToken, refreshCaptcha],
  );

  return !checkLoginUser() ? (
    <AuthContext.Provider value={contextValue}>
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY} language="vi">
        <ModalPortal />
        <Outlet />
        <GoogleReCaptcha onVerify={verifyRecaptchaCallback} refreshReCaptcha={refreshReCaptcha} />
      </GoogleReCaptchaProvider>
    </AuthContext.Provider>
  ) : (
    <Navigate to={navigateToPrivateRoute()} />
  );
};

export default AuthLayout;

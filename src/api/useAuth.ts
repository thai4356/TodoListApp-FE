import { useMutation } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTERS } from 'routes';
import { login } from 'store/slices/userSlice';
import type {
  ForgotPasswordReq,
  RegisterUser,
  SendOtp,
  SendOtpReq,
  UserLoginReq,
  UserLoginRes,
} from 'types/SwaggerTypeUser';
import type { BaseResponse } from 'types/index';

const url = {
  loginAdmin: 'admin/v1/auth/login',
  sendOtpAdmin: 'admin/v1/auth/send-otp',
  forgotPasswordAdmin: 'admin/v1/auth/forgot-password',
  loginProvider: 'v1/auth/login',
  registerProvider: 'v1/auth/register',
  sendOtp: 'v1/auth/send-otp',
  forgotPasswordProvider: 'v1/auth/forgot-password',
};

const useLoginProvider = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: Partial<UserLoginReq & { recaptchaToken?: string }>): Promise<BaseResponse<UserLoginRes>> => {
      return fetcher(
        {
          method: HTTPMethod.POST,
          url: url.loginProvider,
          data: body,
        },
        {
          withToken: false,
        },
      );
    },
    onSuccess: (res) => {
      notifySuccess(t('notification.field_successfully', { field: t('auth.login') }));
      login(res.data);
      navigate(PRIVATE_ROUTERS.BUSINESS.BASE, { replace: true });
    },
  });
};

const useRegisterProvider = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: Partial<RegisterUser>): Promise<BaseResponse<UserLoginRes>> => {
      return fetcher(
        {
          method: HTTPMethod.POST,
          url: url.registerProvider,
          data: body,
        },
        {
          withToken: false,
        },
      );
    },
    onSuccess: (res) => {
      notifySuccess(t('notification.field_successfully', { field: t('auth.register') }));
      login(res.data);
      navigate(PRIVATE_ROUTERS.BUSINESS.BASE, { replace: true });
    },
  });
};

const useSentOTPProvider = () =>
  useMutation({
    mutationFn: (body: Partial<SendOtpReq & { recaptchaToken?: string }>): Promise<BaseResponse<SendOtp>> => {
      return fetcher(
        {
          method: HTTPMethod.POST,
          url: url.sendOtp,
          data: body,
        },
        {
          withToken: false,
        },
      );
    },
  });

const useSentOTPAdmin = () =>
  useMutation({
    mutationFn: (body: Partial<SendOtpReq & { recaptchaToken?: string }>): Promise<BaseResponse<SendOtp>> => {
      return fetcher(
        {
          method: HTTPMethod.POST,
          url: url.sendOtpAdmin,
          data: body,
        },
        {
          withToken: false,
        },
      );
    },
  });

const useForgotPasswordProvider = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: Partial<ForgotPasswordReq>): Promise<unknown> => {
      return fetcher(
        {
          method: HTTPMethod.POST,
          url: url.forgotPasswordProvider,
          data: body,
        },
        {
          withToken: false,
        },
      );
    },
    onSuccess: () => {
      notifySuccess(t('notification.field_successfully', { field: t('auth.change_password') }));
      navigate(PRIVATE_ROUTERS.BUSINESS.BASE, { replace: true });
    },
  });
};

export { useForgotPasswordProvider, useLoginProvider, useRegisterProvider, useSentOTPAdmin, useSentOTPProvider };

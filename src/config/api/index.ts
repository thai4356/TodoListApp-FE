import type { AxiosError, AxiosHeaderValue, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

import { notifyError } from 'components/custom/Notification';
import { KEY_AUTH, NETWORK_CONFIG } from 'config/constants';
import { t } from 'i18next';
import { app } from 'routes';
import store from 'store';
import { logoutUser } from 'store/slices/userSlice';
import { BaseResponse } from 'types';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTION = 'OPTION',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK',
}

type ConfigOptions = {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  hiddenError?: boolean;
  isFormData?: boolean;
  headerValueType?: AxiosHeaderValue;
};

export const getAuthorization = (defaultOptions?: ConfigOptions | undefined) => {
  if (defaultOptions?.withToken === false) return;
  const accessToken = window.localStorage.getItem(KEY_AUTH[app]);
  if (defaultOptions?.token) {
    return defaultOptions?.token;
  }
  const state = store.getState();
  const token = state.user?.[app]?.accessToken;
  if (token) {
    return token;
  }

  if (accessToken === null) return undefined;

  return accessToken;
};

const displayError = (errorMessage: string) => {
  notifyError(t('error_message.something_went_wrong'), errorMessage, 4);
};

export const checkLoginUser = () => {
  const user = store.getState().user;
  if (user[app]) return true;

  const tokenInStorageStr = window.localStorage.getItem(KEY_AUTH[app]);
  if (tokenInStorageStr === null) return false;

  if (tokenInStorageStr) {
    return true;
  }
  return false;
};

export const fetcher = <T>(
  config: AxiosRequestConfig & {
    method: HTTPMethod;
  },
  options?: ConfigOptions,
) => {
  return new Promise<T>((resolve, reject) => {
    axios
      .create({
        baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
        headers: {
          Accept: options?.headerValueType ?? (options?.isFormData ? 'multipart/form-data' : 'application/json'),
          Authorization: `Bearer ${getAuthorization(options)}`,
        },
        timeout: config.timeout ?? NETWORK_CONFIG.TIMEOUT,
        withCredentials: NETWORK_CONFIG.WITH_CREDENTIALS,
        responseType: config?.responseType ?? 'json',
      })
      .request<T | undefined, AxiosResponse<T>>(config)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        }
      })
      .catch((error: AxiosError<BaseResponse<T>>) => {
        if (error.response?.status && +error.response?.status === 401 && checkLoginUser()) {
          displayError(t('token_expire'));
          setTimeout(() => {
            logoutUser();
          }, 500);
          return;
        }
        if (error.code === 'ERR_NETWORK') {
          displayError('Please check internet connection!');
          setTimeout(() => {
            logoutUser();
          }, 500);
          reject(error);
          return;
        }
        if (error.response?.data.message && !options?.hiddenError) {
          displayError(error.response?.data.message);
        }
        reject(error);
      });
  });
};

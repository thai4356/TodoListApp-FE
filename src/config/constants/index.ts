import type { TablePaginationConfig } from 'antd';
export { QUERY_KEY } from './queryKey';

export const FOOTER_CONTENT = '2024 ITS';
export const COLOR_PRIMARY = 'rgba(0, 145, 140, 255)';

export enum APP {
  USER,
}

export const KEY_ACCESS_TOKEN = 'S0VZX0FDQ0VTU19UT0VLTg==';
export const KEY_AUTH = {
  [APP.USER]: 'S0VZX0FVVEhfSU5GT01BVElPTgAP==',
} as const;

export const KEY_SEED_PHRASE = 'InterITS.com';
export const KEY_LANGUAGE = 'S0VZX0xBTkdVQUdF';

export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';
export const LANG = {
  EN: 'en',
  VI: 'vi',
} as const;

export const FORMAT_DATE = {
  ASIA_HO_CHI_MINH: 'DD/MM/YYYY',
  ASIA_HCM_DATE_MONTH: 'DD/MM',
  ASIA_HCM_WITH_TIME_REVERSE: 'DD/MM/YYYY HH:mm:ss',
  ASIA_HCM_WITH_TIME: 'HH:mm:ss DD/MM/YYYY',
  ASIA_HCM_HOUR_MINUTE: 'DD/MM/YYYY HH:mm',
  ASIA_HCM_ISO_8601: 'YYYY-MM-DD HH:mm:ss',
  TIME_ASIA_HO_CHI_MINH: 'YYYY_MM_DD_HHmmss',
  ASIA_HCM_DATE: 'HH:mm:ss',
  ASIA_HCM_TIME: 'HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIMEZONE: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  API_ISO_8601: 'YYYY-MM-DDTHH:mm:ss',
} as const;

// export const REGEX_PHONE = /^(((\+|)84)|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
export const TYPE_FORMAT_HOUR_ASIA_HO_CHI_MINH = 'HH';
export const TYPE_FORMAT_MINUTE_ASIA_HO_CHI_MINH = 'mm';

export const REGEX = {
  // eslint-disable-next-line no-useless-escape
  PHONE: /^[\+\d]{0,1}\d{7,15}$/gm,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()]).{8,}$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NO_ALL_SPACE: /[^\s]+/g,
} as const;

export const PAGE_SIZE_TABLE = 20;

export const TYPE_FILE_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL || '';

export const PAGINATION_TABLE_CONFIG: TablePaginationConfig = {
  pageSize: PAGE_SIZE_TABLE,
  showLessItems: true,
  showSizeChanger: false,
};

export const KEY_ACTIVE_LICENSE_FROALA_EDITOR = import.meta.env.VITE_KEY_ACTIVE_LICENSE_FROALA_EDITOR;

export const NETWORK_CONFIG = {
  TIMEOUT: 10000,
  USE_TOKEN: true,
  WITH_CREDENTIALS: false,
} as const;

export const FILE_ACCEPT = {
  IMAGE: '.png,.jpeg,.jpg,.gif',
} as const;

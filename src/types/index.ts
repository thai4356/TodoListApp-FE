import type { Key } from 'react';
import { PermissionRes } from './SwaggerTypeUser';

export type BaseResponse<T> = {
  code?: number;
  data: T;
  message?: string;
  errors?: Record<string, object>;
  total_record: number;
  current_page: number;
};

export enum ESendOtpReq {
  ZNS = '0',
  EMAIL = '1',
  SMS = '2',
}

export enum EPurposeSendOtpReq {
  PASSWORD_RESET,
  REGISTRATION,
}

export enum EButtonPattern {
  PRIMARY,
  ADD,
  UPDATE,
  DELETE,
  FOOTER,
  SEARCH,
  EXPORT,
}

export enum Status {
  INACTIVE,
  ACTIVE,
}

export enum SupportStatus {
  WAITING,
  PROCESSING,
  DONE,
}

export enum LogStatus {
  INIT,
  INIT_SUCCESS,
  INIT_FAIL,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
}

export type BulkDeleteBody = { ids: Key[] };

export type ScreenType = PermissionRes['permission'];

export type QueryParamsType = Record<string | number, any>;

export enum RoleType {
  PROVIDER_DEVICE = 1,
  PROVIDER_CONTENT = 2,
  MERCHANT = 4,
}

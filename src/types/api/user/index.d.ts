/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RoleCompanyMember, TypeApi } from 'config/enum';
import type { BaseResponse } from 'types/api';

export type GetUserListRequest = {
  page: number;
  roleId?: number;
  deleted?: boolean;
  name?: string;
  roleType?: string;
  type: TypeApi;
};

export type QueryExportUser = {
  name?: string;
  ids?: number[];
};

export type SearchUserRequest = {
  key: string;
  roleId: string;
  page?: number;
};

export type UserResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  code: null | string;
  name: string;
  phone: null | string;
  email: string;
  address: null;
  gender: null | number;
  avatarId: null;
  roleId: null | number;
  status: number;
  birthday: null | string;
  accessToken: null;
  roleName: null | string;
  roleActions: null;
  role: null;
  roleType: null;
  avatar?: Avatar;
  roleCompany?: RoleCompanyMember;
};

export interface Avatar {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  originUrl: string;
  thumbUrl: string;
  type: number;
  width: number;
  height: number;
  size: number;
}

export type Channel = {
  createdAt: string;
  deleted: boolean;
  id: number;
  name: string;
  updatedAt: string;
};

export type UserDebt = {
  unsecuredLoans: number;
  bail: number;
  debt: number;
  deposit: number;
  agentCode: any;
  agentId: any;
  agentName: any;
  branchCode: any;
  branchName: any;
  createdAt: string;
  deleted: boolean;
  id: number;
  name: any;
  status: number;
  updatedAt: string;
  userId: number;
};

export type Branch = {
  createdAt: any;
  updatedAt: any;
  deleted: boolean;
  id: number;
  code: string;
  parentId: any;
  imageId: any;
  type: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  provinceCode: string;
  areaCode: string;
  countryCode: string;
};

export type Agent = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  parentId: any;
  channelId: any;
  logoId: number;
  branchId: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  type: number;
  status: number;
  expiresDate: any;
  companyInfo: any;
  userAgentLinkeds: any;
  unsecuredLoans: any;
  bail: any;
  debt: number;
  deposit: number;
  logo: any;
};

export type GetDetailRoleUserResponse = {
  group: number;
  actions: Action[];
  groupName: string;
};

export type Action = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  name: string;
  group: any;
  key: any;
  type: any;
  selected: boolean;
};

export type Role = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  name: string;
  type: number;
  roleActionIds: any;
  roleActions: RoleAction[];
};

export type RoleAction = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  name: string;
  group: number;
  key: number;
  type: number;
  selected: boolean;
};

export type AddUserRequest = UpdateUserRequest & {
  password: string;
  recaptchaToken?: string;
};

export type AddUserResponse = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  code: any;
  name: string;
  phone: string;
  email: string;
  address: string;
  gender: any;
  avatarId: any;
  roleId: any;
  status: number;
  birthday: any;
  accessToken: any;
  roleName: any;
  roleActions: any;
  role: any;
  roleType: any;
  avatar: any;
};

export type UpdateUserRequest = {
  id?: string | number;
  name?: string;
  email?: string;
  roleId?: string | number | null;
  userDebt?: {
    unsecuredLoans?: number;
    bail?: number;
  };
  phone?: string;
  channelId?: number | null;
  birthday?: string | null;
  agentId?: number;
  branchId?: number;
  code?: string;
  address?: string;
  gender?: number;
  job?: string;
  description?: string;
  avatarId?: number;
};

export type DeleteUserResponse = object;

// export type RestoreUserResponse = DeleteUserResponse

export type UpdateUserResponse = object;

export type UpdatePermissionActionRequest = {
  id: number;
  roleActionIds: number[];
};

export type UpdatePermissionActionResponse = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  name: string;
  type: number;
  roleActionIds: any;
  roleActions: any;
};

export type UpdateRoleUserResponse = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  name: string;
  type: number;
  roleActionIds: any;
  roleActions: any;
};

export type AddRoleUserResponse = UpdateRoleUserResponse;

export type AddRoleUserRequest = {
  name: string;
  type: number;
};

export type UpdateRoleUserRequest = { id: number } & AddRoleUserRequest;

export type DeleteRoleUserResponse = {
  message: string;
};

export type ChannelResponse = {
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  id: number;
  name: string;
};

export type ResetUserPasswordResponse = object;

export type ResetUserPasswordRequest = {
  userId: number;
  newPass: string;
};

export type ImportExcelUser = DeleteRoleUserResponse;

export type GetStaffRequest = {
  page: number;
  name?: string;
  type: TypeApi;
};

export type GetStaffResponse = UserResponse;

export type RolePermissionResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  name: string;
  type: number;
  roleActionIds: any;
  roleActions: any;
};

export type UserInitialState = {
  pending?: boolean;
  error?: boolean;
  pendingImportUser?: boolean;
  responseRolesUser?: Role[];
  responseUserList?: BaseResponse<UserResponse[]>;
  responseAddUser?: AddUserResponse;
  responseUpdateUser?: UpdateUserResponse;
  responseDeleteUser?: DeleteUserResponse;
  // responseRestoreUser?: RestoreUserResponse
  responseDetailRoleUser?: GetDetailRoleUserResponse[];
  responseRoleActions?: RoleAction[];
  responseDetailRoleAction?: RoleAction;
  responseUpdatePermissionActionUser?: UpdatePermissionActionResponse;
  responseAddRoleUser?: AddRoleUserResponse;
  responseUpdateRoleUser?: UpdateRoleUserResponse;
  responseDeleteRoleUser?: DeleteRoleUserResponse;
  responseAllChannels?: BaseResponse<ChannelResponse[]>;
  responseDetailUser?: UserResponse;
  responseRoleUserByPermissison?: Role[];
  responseResetUserPassword?: BaseResponse<ResetUserPasswordResponse>;
  responseImportUser?: ImportExcelUser;
  responseStaffList?: BaseResponse<GetStaffResponse[]>;
  responseRolePermission?: BaseResponse<RolePermissionResponse[]>;
};

export type AccountResponse = {
  id: number;
  name: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  code: null | string;
  phone: null | string;
  address: null;
  gender: null | number;
  avatarId: null;
  roleId: null | number;
  birthday: null | string;
  accessToken: null;
  roleName: null | string;
  roleActions: null;
  role: null;
  roleType: null;
};

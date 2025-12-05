/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpdateUserReq {
  name: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
  /** @format int32 */
  userId: number;
  phone: string;
  email?: string;
  /** @format int32 */
  roleId?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseUserDetailRes {
  data?: UserDetailRes;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface RoleDetail {
  /** @format int32 */
  roleId?: number;
  roleName?: string;
}

export interface UserDetailRes {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  avaId: number;
}





export interface EditMyProfileReq {
  name: string;
  email?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  avatarId?: number;
}

export interface IdsRequest {
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  ids: number[];
}

export interface BaseResponseListInteger {
  data?: number[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface ChangePasswordReq {
  oldPassword: string;
  /**
   * @minLength 6
   * @maxLength 2147483647
   */
  newPassword: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface BaseResponseObject {
  data?: object;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface ChangePasswordUserReq {
  /** @format int32 */
  userId: number;
  newPassword: string;
  confirmPassword: string;
  valid?: boolean;
}

export interface AddUserBaseReq {
  name: string;
  phone?: string;
  email: string;
  address?: string;
  password: string;
  confirmPassword: string;
  /** @format int32 */
  roleId: number;
  valid?: boolean;
}

export interface BaseResponseUser {
  data?: User;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface User {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  phone?: string;
  email?: string;
  name?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  companyId?: number;
  /** @format int32 */
  roleId?: number;
  /** @format int32 */
  avatarId?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}


export interface Permission {
  /** @format int32 */
  id: number;
  isView?: boolean;
  isWrite?: boolean;
  isApproval?: boolean;
  isDecision?: boolean;
}

export interface UpdateRoleReq {
  name: string;
  note?: string;
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
  /** @format int32 */
  id: number;
}

export interface AddRoleReq {
  name: string;
  note?: string;
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  permissions: Permission[];
}

export interface BaseResponseUploadFile {
  data?: UploadFile;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface UploadFile {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  originFilePath?: string;
  thumbFilePath?: string;
  originUrl?: string;
  thumbUrl?: string;
  /**
   * Kiểu file upload: 0 - IMAGE, 1 - VIDEO_YOUTUBE, 2 - PDF
   * @format int32
   */
  type?: number;
  /** @format int32 */
  width?: number;
  /** @format int32 */
  height?: number;
  /** @format int32 */
  duration?: number;
  /** @format int64 */
  size?: number;
}

export interface UpdateMyCompanyReq {
  nameBusiness?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseCompany {
  data?: Company;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface Company {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  code?: string;
  /** @format int32 */
  agencyId?: number;
  name?: string;
  email?: string;
  address?: string;
  /** @format int32 */
  logoId?: number;
  taxCode?: string;
  hotline?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface SendOtpReq {
  phone?: string;
  email?: string;
  type: "0" | "1" | "2";
  fullname?: string;
  purpose: number;
  recaptchaToken: string;
  valid?: boolean;
}

export interface BaseResponseSendOtp {
  data?: SendOtp;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface SendOtp {
  /** @format int32 */
  id?: number;
  email?: string;
  phone?: string;
  otp?: string;
}

export interface RegisterUser {
  /** @format int32 */
  fullname?: string;
  email?: string;
  password: string;
  confirmPassword: string;
  /** @format int32 */
  codeId: number;
  code: string;
  avatar?: File | null;
}

export interface BaseResponseUserLoginRes {
  data?: UserLoginRes;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}
export interface ProviderDeviceRes {
  /** @format int32 */
  id?: number;
  code: string,
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  status?: number;
}

export interface UpdateProviderDeviceReq {
  providerDeviceId: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  status?: number;
}

export interface AddProviderDeviceReq {
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
}
export interface DeviceRes {
  /** @format int32 */
  id?: number;
  code: string,
  name?: string;
  model?: string;
  serial?: string;
  providerDeviceId?: number;
  providerDevice?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddDeviceReq {
  name: string;
  model: string;
  serial: string;
  providerDeviceId: number;
}

export interface UpdateDeviceReq {
  id: number;
  name: string;
  model: string;
  serial: string;
  providerDeviceId: number;
}

export interface ProviderContentRes {
  /** @format int32 */
  id?: number;
  code: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  status?: number;
}

export interface AddProviderContentReq {
  name: string;
  phone: string;
  email: string;
  address: string;
  tax_code: string;
  description?: string;
}

export interface UpdateProviderContentReq {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
}
export interface SongRes {
  /** @format int32 */
  id?: number;
  code: string;
  name?: string;
  singer?: string;
  author?: string;
  status?: number;
}

export interface AddSongReq {
  name: string;
  singer: string;
  author: string;
  providerContentId: number;
}

export interface UpdateSongReq {
  songId: number;
  name: string;
  singer: string;
  author: string;
  status: number;
}

export interface PartnerLicenseRes {
  /** @format int32 */
  id?: number;
  name?: string;
  status?: number;
}

export interface AddPartnerLicenseReq {
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
  status: number;
}

export interface UpdatePartnerLicenseReq {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
  status: number;
}
export interface MerchantRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  status?: number;
}

export interface UpdateMerchantReq {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
  status: number;
}

export interface MerchantBranchRes {
  /** @format int32 */
  id?: number;
  merchantId?: number;
  address?: string;
  status?: number;
}

export interface AddMerchantBranchReq {
  merchantId: number;
  address: string;
  status: number;
}

export interface UpdateMerchantBranchReq {
  id: number;
  address: string;
  description?: string;
}

export interface TransactionRes {
  /** @format int32 */
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  referenceCode?: string;
  createdBy?: string;
  merchantId?: number;
  amount?: number;
  paymentGateway?: string;
  note?: string;
  description?: string;
  type?: number;
  status?: number;
  paymentUrl?: string;
}

export interface AddTransactionReq {
  amount: number;
  paymentGateway: string;
  message: string;
}


export interface PermissionRes {
  /** @format int32 */
  id: number;
  title?: string;
  permission?:
  | "DASHBOARD"
  | "AGENCY"
  | "AGENCY_STAFF"
  | "BUSINESS"
  | "BUSINESS_STAFF"
  | "BUSINESS_CONFIG_SERVICE"
  | "BUSINESS_LOG"
  | "BUSINESS_CONVERSION_METRIC"
  | "BUSINESS_PACKAGE_SERVICE"
  | "HELP"
  | "ROLE"
  | "ACCOUNT"
  | "DEVICE"
  | "PROVIDER_CONTENT"
  | "PROVIDER_DEVICE"
  | "SONG"
  | "PARTNER_LICENSE"
  | "MERCHANT"
  | "MERCHANT_BRANCH"
  | "ROLE"
  | "PERMISSION"
  | "TRANSACTION"
  | "DOCUMENT";

  parentPermission?: "STATISTIC" | "CONFIG" | "FEATURE" | "AGENCY" | "BUSINESS" | "UTILITIES" | "ACCOUNT";
  isView?: boolean;
  isWrite?: boolean;
  isApproval?: boolean;
  isDecision?: boolean;
}

export interface UserLoginRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  role?: RoleDetail;
  accessToken?: string;
  address?: string;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  /** @format int32 */
  companyId?: number;
  companyName?: string;
  avatar?: UploadFile;
  permissions?: PermissionRes[];
}

export interface UserListRes {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export interface UserLoginReq {
  email: string;
  passwordHashed: string;
  recaptchaToken: string;
}

export interface ForgotPasswordReq {
  /** @format int32 */
  codeId: number;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
  valid?: boolean;
}

export interface BaseResponseString {
  data?: string;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListUserRes {
  data?: UserRes[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface LogoInfo {
  /** @format int32 */
  id?: number;
  originUrl?: string;
}

export interface UserRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  deleted?: number;
  /** @format date-time */
  birthday?: string;
  /**
   * Giới tính: 0 - Nam, 1 - Nữ, 2 - Khác
   * @format int32
   */
  gender?: number;
  role?: RoleDetail;
  avatar?: LogoInfo;
}

export interface BaseResponseUserInfoResNew {
  data?: UserInfoResNew;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface UserInfoResNew {
  sub?: string;
  msisdn?: string;
  verify?: boolean;
  message?: string;
  mobile_id?: string;
  registration_mobile_id?: string;
}

export interface BaseResponseOverviewSummaryResponse {
  data?: OverviewSummaryResponse;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface OverviewSummaryResponse {
  /** @format int64 */
  totalCompanies?: number;
  /** @format int64 */
  totalAgencies?: number;
  /** @format int64 */
  totalRevenue?: number;
  /** @format int64 */
  totalAuthentications?: number;
  /** @format int64 */
  totalCurrentMonthExpense?: number;
}

export interface BaseResponseListRevenueLineChartResponse {
  data?: RevenueLineChartResponse[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface ChartResponse {
  name?: string;
  /** @format int64 */
  value?: number;
}

export interface RevenueLineChartResponse {
  name?: string;
  data?: ChartResponse[];
}

export interface BaseResponseListMultiLineChartResponse {
  data?: MultiLineChartResponse[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface MultiLineChartResponse {
  telco?: string;
  data?: ChartResponse[];
}

export interface BaseResponseListConversionMetricsResponse {
  data?: [];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AuthLogResponse {
  /** @format int32 */
  id?: number;
  code?: string;
  /** @format int32 */
  licenseId?: number;
  licenseName?: string;
  /**
   * Nhà mạng: 0 - VIETTEL, 1 - MOBIFONE, 2 - VINAPHONE, 3 - VIETNAM_MOBILE, 4 - MOBILCAST
   * @format int32
   */
  telcoType?: number;
  telcoCode?: string;
  msisdn?: string;
  state?: string;
  scope?: string;
  redirectUri?: string;
  ip?: string;
  verified?: boolean;
  /** @format int32 */
  type?: number;
  note?: string;
  /** Trạng thái log:  0 - INIT, 1 - INIT_SUCCESS, 2 - INIT_FAIL, 3 - VERIFY_CODE_SUCCESS, 4 - VERIFY_CODE_FAIL */
  status?: "0" | "1" | "2" | "3" | "4";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface BaseResponseListAuthLogResponse {
  data?: AuthLogResponse[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseListRoleRes {
  data?: RoleRes[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface RoleRes {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  objectId?: number;
  name?: string;
  note?: string;
  /**
   * Loại quyền hạn của người dùng: 0 - ADMIN, 1 - AGENCY, 2 -SERVICE_PROVIDER
   * @format int32
   */
  type?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  permissions?: PermissionRes[];
}

export interface BaseResponseListPermissionRes {
  data?: PermissionRes[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface BaseResponseRoleRes {
  data?: RoleRes;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface EkycSessionRes {
  /** @format int32 */
  count?: number;
  next?: string;
  previous?: string;
  results?: Results[];
}

export interface Metadata {
  is_sdk?: boolean;
}

export interface Results {
  id?: string;
  customer?: string;
  user_id?: string;
  is_success?: boolean;
  review_status?: string;
  review_zone?: string;
  status?: string;
  metadata?: Metadata;
  result?: object;
  created?: string;
  updated_at?: string;
}

export interface RequestLogsRes {
  /** @format int32 */
  count?: number;
  next?: string;
  /** @format double */
  previous?: number;
  results?: Results[];
}

export interface CustomersRes {
  /** @format int32 */
  count?: number;
  next?: string;
  /** @format double */
  previous?: number;
  results?: Results[];
}

export interface BaseResponseListDocument {
  data?: Document[];
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface Document {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  name?: string;
  description?: string;
  content?: string;
  /** @format int32 */
  imageId?: number;
  /** Ngôn ngữ sử dụng: 0 - vi, 1 - en, 2 - de */
  language?: "0" | "1" | "2";
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface BaseResponseDocument {
  data?: Document;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface AgencyInfo {
  /** @format int32 */
  agencyId?: number;
  agencyName?: string;
}

export interface BaseResponseCompanyRes {
  data?: CompanyRes;
  message?: string;
  errors?: Record<string, string>;
  /** @format int64 */
  total_record?: number;
  /** @format int32 */
  current_page?: number;
}

export interface CompanyRes {
  /** @format int32 */
  id?: number;
  code?: string;
  nameBusiness?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  hotline?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  agency?: AgencyInfo;
  logo?: LogoInfo;
}

export interface ProviderDeviceRes {
  /** @format int32 */
  id?: number;
  code: string,
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface UpdateProviderDeviceReq {
  providerDeviceId: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddProviderDeviceReq {
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
}

export interface DeviceRes {
  /** @format int32 */
  id?: number;
  code: string,
  name?: string;
  model?: string;
  serial?: string;
  providerDeviceId?: number;
  providerDevice?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddDeviceReq {
  name: string;
  model: string;
  serial: string;
  providerDeviceId: number;
}

export interface UpdateDeviceReq {
  id: number;
  name: string;
  model: string;
  serial: string;
  providerDeviceId: number;
}

export interface ProviderContentRes {
  /** @format int32 */
  id?: number;
  code: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddProviderContentReq {
  name: string;
  phone: string;
  email: string;
  address: string;
  tax_code: string;
  description?: string;
}

export interface UpdateProviderContentReq {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
}

export interface SongRes {
  /** @format int32 */
  id?: number;
  code: string;
  name?: string;
  singer?: string;
  author?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddSongReq {
  name: string;
  singer: string;
  author: string;
  providerContentId: number;
}

export interface UpdateSongReq {
  songId: number;
  name: string;
  singer: string;
  author: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface PartnerLicenseRes {
  /** @format int32 */
  id?: number;
  name?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddPartnerLicenseReq {
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface UpdatePartnerLicenseReq {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface MerchantRes {
  /** @format int32 */
  id?: number;
  code?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface UpdateMerchantReq {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  description?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface MerchantBranchRes {
  /** @format int32 */
  id?: number;
  merchantId?: number;
  address?: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
}

export interface AddMerchantBranchReq {
  merchantId: number;
  address: string;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status: number;
}

export interface UpdateMerchantBranchReq {
  id: number;
  address: string;
  description?: string;
}

export interface TransactionRes {
  /** @format int32 */
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  code?: string;
  referenceCode?: string;
  createdBy?: string;
  merchantId?: number;
  amount?: number;
  paymentGateway?: string;
  note?: string;
  description?: string;
  type?: number;
  /**
   * Trạng thái sử dụng:  0 - INACTIVE, 1 - ACTIVE
   * @format int32
   */
  status?: number;
  paymentUrl?: string;
}

export interface AddTransactionReq {
  amount: number;
  paymentGateway: string;
  message: string;
}


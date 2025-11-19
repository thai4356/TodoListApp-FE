import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, getAuthorization, HTTPMethod } from 'config/api';
import { APP, QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import { app } from 'routes';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import {
  AddUserBaseReq,
  BaseResponseUser,
  BaseResponseUserDetailRes,
  BaseResponseUserLoginRes,
  ChangePasswordReq,
  ChangePasswordUserReq,
  EditMyProfileReq,
  UpdateUserReq,
  UserRes,
} from 'types/SwaggerTypeUser';

const url = {
  getAdmins: 'v1/get-admins',
  getUsers: 'v1/user/members',
  getProfile: 'v1/user/detail',
  getMyProfile: 'v1/user/members',
  addUser: 'v1/user/add-user',
  updateProfileUser: 'v1/user/update-member',
  updateProfile: 'v1/user/edit-my-profile',
  updatePassword: 'v1/user/change-my-password',
  updatePasswordAnotherCompany: 'v1/user/change-password-member',
  uploadImage: 'v1/media/upload-image',
  deleteUsers: 'v1/user/delete-members',
};

const useGetMyCompanyProfile = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MY_COMPANY_PROFILE],
    queryFn: () => {
      return fetcher<BaseResponseUserLoginRes>({
        method: HTTPMethod.GET,
        url: url.getMyProfile,
      });
    },
    enabled: app === APP.USER && !!getAuthorization(),
    staleTime: Infinity,
  });

const useGetMeCompany = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ME],
    queryFn: () => {
      return fetcher<BaseResponseUserLoginRes>({
        method: HTTPMethod.GET,
        url: url.getMyProfile,
      });
    },
    enabled: app === APP.USER && !!getAuthorization(),
    staleTime: Infinity,
  });
};

const useGetCompanyUsers = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_USERS, params],
    queryFn: () => {
      return fetcher<BaseResponse<UserRes[]>>({
        method: HTTPMethod.GET,
        url: url.getUsers,
        params: params,
      });
    },
  });

const useGetProfile = (params: { accountId?: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_USERS, params.accountId],
    queryFn: () =>
      fetcher<BaseResponseUserDetailRes>({
        method: HTTPMethod.GET,
        url: `${url.getProfile}/${params.accountId}`,
      }),
    enabled: options?.enabled && !!params.accountId,
  });

const useCreateCompanyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddUserBaseReq>): Promise<BaseResponseUser> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addUser,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
      notifySuccess(t('notification.field_successfully', { field: t('create_account') }));
    },
  });
};

const useUploadImage = () => {
  return useMutation({
    mutationFn: (body: { file: File }) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.uploadImage,
        data: body,
      });
    },
  });
};

const useSelfUpdateCompanyPassword = () => {
  return useMutation({
    mutationFn: (body: Partial<ChangePasswordReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updatePassword,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('password') }));
    },
  });
};

const useUpdateCompanyUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<UpdateUserReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProfileUser,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('auth.account') }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
    },
  });
};

const useSelfUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<EditMyProfileReq>): Promise<BaseResponseUserDetailRes> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProfile,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MY_COMPANY_PROFILE] });
      notifySuccess(t('notification.update_successfully', { field: t('personal_information') }));
    },
  });
};

const useUpdateOtherCompanyPassword = () => {
  return useMutation({
    mutationFn: (body: Partial<ChangePasswordUserReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updatePasswordAnotherCompany,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('password') }));
    },
  });
};

const useBulkDeleteCompanyUsers = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteUsers,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_USERS] });
      notifySuccess(t('notification.delete_successfully', { field: t('auth.account') }));
    },
  });
};

export {
  useBulkDeleteCompanyUsers,
  useCreateCompanyUser,
  useGetCompanyUsers,
  useGetMeCompany,
  useGetMyCompanyProfile,
  useGetProfile,
  useSelfUpdateCompanyPassword,
  useSelfUpdateCompanyProfile,
  useUpdateCompanyUser,
  useUpdateOtherCompanyPassword,
  useUploadImage,
};

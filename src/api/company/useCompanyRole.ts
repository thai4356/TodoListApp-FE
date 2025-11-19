import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification.ts';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import { t } from 'i18next';
import type { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import type { AddRoleReq, PermissionRes, RoleRes, UpdateRoleReq } from 'types/SwaggerTypeUser.ts';
import { useInfiniteQueryScroll } from '../useInfiniteQueryScroll.ts';

const url = {
  get: 'v1/role/list',
  getPermissions: 'v1/role/permissions',
  getDetailRole: 'v1/role/detail',
  add: 'v1/role/add',
  update: 'v1/role/update',
  delete: 'v1/role/delete',
};

const useGetCompanyRoles = (params: QueryParamsType) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_ROLES, params],
    queryFn: () =>
      fetcher<BaseResponse<RoleRes[]>>({
        method: HTTPMethod.GET,
        url: url.get,
        params: params,
      }),
  });
};

const useGetCompanyPermissions = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_PERMISSIONS],
    queryFn: () =>
      fetcher<BaseResponse<PermissionRes[]>>({
        method: HTTPMethod.GET,
        url: url.getPermissions,
      }),
  });
};

const useGetDetailCompanyRole = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_ROLE, id],
    queryFn: () =>
      fetcher<BaseResponse<RoleRes>>(
        {
          method: HTTPMethod.GET,
          url: `${url.getDetailRole}/${id}`,
        },
        { hiddenError: true },
      ),
    enabled: !!id,
  });
};

const useCreateCompanyRole = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<AddRoleReq | { permissions: PermissionRes[] }>): Promise<BaseResponse<RoleRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.add,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.create_successfully', { field: t('role') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_ROLES] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_ROLE] });
    },
  });
};

const useUpdateCompanyRole = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateRoleReq | { permissions: PermissionRes[] }>): Promise<BaseResponse<RoleRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.update,
        data: body,
      });
    },
    onSuccess: () => {
      notifySuccess(t('notification.update_successfully', { field: t('role') }));
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_ROLES] });
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_ROLE] });
    },
  });
};

const useBulkDeleteCompanyRoles = () => {
  const q = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.delete,
        data: body,
      });
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: [QUERY_KEY.GET_COMPANY_ROLES] });
      notifySuccess(t('notification.delete_successfully', { field: t('role') }));
    },
  });
};

const useInfiniteRoles = () => {
  return useInfiniteQueryScroll<RoleRes>({
    queryKey: [QUERY_KEY.GET_INFINITE_ROLES],
    url: url.get,
  });
};

export {
  useBulkDeleteCompanyRoles,
  useCreateCompanyRole,
  useGetCompanyPermissions,
  useGetCompanyRoles,
  useGetDetailCompanyRole,
  useInfiniteRoles,
  useUpdateCompanyRole,
};

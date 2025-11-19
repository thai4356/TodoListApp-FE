import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { AddProviderDeviceReq, ProviderDeviceRes, UpdateProviderDeviceReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';
const url = {
  createProviderDevice: 'v1/provider-device/create',
  getProviderDevice: 'v1/provider-device/list',
  getProviderDeviceDetail: 'v1/provider-device/detail',
  updateProviderDevice: 'v1/provider-device/update',
  deleteProviderDevice: 'v1/provider-device/delete',
  addProviderDevice: 'v1/provider-device/add',
};

const useGetProviderDevice = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PROVIDER_DEVICES, params],
    queryFn: () => {
      return fetcher<BaseResponse<ProviderDeviceRes[]>>({
        method: HTTPMethod.GET,
        url: url.getProviderDevice,
        params: params,
      });
    },
  });

const useGetProviderDeviceDetail = (params: { providerDeviceId: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PROVIDER_DEVICE_DETAIL, params.providerDeviceId],
    queryFn: () => {
      return fetcher<BaseResponse<ProviderDeviceRes>>({
        method: HTTPMethod.GET,
        url: `${url.getProviderDeviceDetail}/${params.providerDeviceId}`,
      });
    },
    enabled: options?.enabled && !!params.providerDeviceId,
  });

const useCreateProviderDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddProviderDeviceReq>): Promise<BaseResponse<ProviderDeviceRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addProviderDevice,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PROVIDER_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('create_provider_device') }));
    },
  });
};

const useUpdateProviderDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateProviderDeviceReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProviderDevice,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PROVIDER_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('update_provider_device') }));
    },
  });
};

const useBulkDeleteProviderDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteProviderDevice,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PROVIDER_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_provider_device') }));
    },
  });
};

export {
  useGetProviderDevice,
  useGetProviderDeviceDetail,
  useCreateProviderDevice,
  useUpdateProviderDevice,
  useBulkDeleteProviderDevice,
};

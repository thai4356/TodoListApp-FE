import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { AddDeviceReq, DeviceRes, UpdateDeviceReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';

const url = {
  getDevice: 'v1/device/list',
  getDeviceDetail: 'v1/device/detail',
  updateDevice: 'v1/device/update',
  deleteDevice: 'v1/device/delete',
  addDevice: 'v1/device/add',
};

const useGetDevice = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_DEVICES, params],
    queryFn: () => {
      return fetcher<BaseResponse<DeviceRes[]>>({
        method: HTTPMethod.GET,
        url: url.getDevice,
        params: params,
      });
    },
  });

const useGetDeviceDetail = (params: { deviceId: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_DEVICE_DETAIL, params.deviceId],
    queryFn: () => {
      return fetcher<BaseResponse<DeviceRes>>({
        method: HTTPMethod.GET,
        url: `${url.getDeviceDetail}/${params.deviceId}`,
      });
    },
    enabled: options?.enabled && !!params.deviceId,
  });

const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddDeviceReq>): Promise<BaseResponse<DeviceRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addDevice,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('create_device') }));
    },
  });
};

const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateDeviceReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateDevice,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('update_device') }));
    },
  });
};

const useBulkDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteDevice,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_device') }));
    },
  });
};

export { useGetDevice, useGetDeviceDetail, useCreateDevice, useUpdateDevice, useBulkDeleteDevice };

import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { AddProviderContentReq, ProviderContentRes, UpdateProviderContentReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';
const url = {
  createProviderContent: 'v1/provider-content/create',
  getProviderContent: 'v1/provider-content/list',
  getProviderContentDetail: 'v1/provider-content',
  updateProviderContent: 'v1/provider-content/update',
  deleteProviderContent: 'v1/provider-content/delete',
  addProviderContent: 'v1/provider-content/add',
};

const useGetProviderContent = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PROVIDER_CONTENTS, params],
    queryFn: () => {
      return fetcher<BaseResponse<ProviderContentRes[]>>({
        method: HTTPMethod.GET,
        url: url.getProviderContent,
        params: params,
      });
    },
});

const useGetProviderContentDetail = (params: { providerContentId: number }, options?: { enabled?: boolean }) => useQuery({
    queryKey: [QUERY_KEY.GET_PROVIDER_CONTENT_DETAIL, params.providerContentId],
    queryFn: () => {
      return fetcher<BaseResponse<ProviderContentRes>>({
        method: HTTPMethod.GET,
        url: `${url.getProviderContentDetail}/${params.providerContentId}`,
      });
    },
    enabled: options?.enabled && !!params.providerContentId,
  });


const useCreateProviderContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddProviderContentReq>): Promise<BaseResponse<ProviderContentRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addProviderContent,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PROVIDER_CONTENTS] });
      notifySuccess(t('notification.field_successfully', { field: t('create_provider_content') }));
    },
  });
};

const useUpdateProviderContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateProviderContentReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateProviderContent,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PROVIDER_CONTENTS] });
      notifySuccess(t('notification.field_successfully', { field: t('update_provider_content') }));
    },
  });
};

const useBulkDeleteProviderContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteProviderContent,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PROVIDER_CONTENTS] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_provider_content') }));
    },
  });
};

export {
  useGetProviderContent,
  useGetProviderContentDetail,
  useCreateProviderContent,
  useUpdateProviderContent,
  useBulkDeleteProviderContent,
};

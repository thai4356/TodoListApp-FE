import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { MerchantRes, UpdateMerchantReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';
const url = {
  getMerchant: 'v1/merchant/list',
  getMerchantDetail: 'v1/merchant/detail',
  updateMerchant: 'v1/merchant/update',
  deleteMerchant: 'v1/merchant/delete',
};

const useGetMerchant = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MERCHANTS, params],
    queryFn: () => {
      return fetcher<BaseResponse<MerchantRes[]>>({
        method: HTTPMethod.GET,
        url: url.getMerchant,
        params: params,
      });
    },
  });

const useGetMerchantDetail = (params: { merchantId: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MERCHANT_DETAIL, params.merchantId],
    queryFn: () => {
      return fetcher<BaseResponse<MerchantRes>>({
        method: HTTPMethod.GET,
        url: `${url.getMerchantDetail}/${params.merchantId}`,
      });
    },
    enabled: options?.enabled && !!params.merchantId,
  });

const useUpdateMerchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateMerchantReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateMerchant,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MERCHANTS] });
      notifySuccess(t('notification.field_successfully', { field: t('update_merchant') }));
    },
  });
};

const useBulkDeleteMerchant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteMerchant,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MERCHANTS] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_merchant') }));
    },
  });
};

export { useGetMerchant, useGetMerchantDetail, useUpdateMerchant, useBulkDeleteMerchant };

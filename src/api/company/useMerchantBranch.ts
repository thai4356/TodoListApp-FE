import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { AddMerchantBranchReq, MerchantBranchRes, UpdateMerchantBranchReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';
const url = {
  getMerchantBranch: 'v1/merchant-branch/list',
  getMerchantBranchDetail: 'v1/merchant-branch/detail',
  updateMerchantBranch: 'v1/merchant-branch/update',
  deleteMerchantBranch: 'v1/merchant-branch/delete',
  addMerchantBranch: 'v1/merchant-branch/add',
};

const useGetMerchantBranch = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MERCHANT_BRANCHES, params],
    queryFn: () => {
      return fetcher<BaseResponse<MerchantBranchRes[]>>({
        method: HTTPMethod.GET,
        url: url.getMerchantBranch,
        params: params,
      });
    },
  });

const useGetMerchantBranchDetail = (params: { merchantBranchId: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MERCHANT_BRANCH_DETAIL, params.merchantBranchId],
    queryFn: () => {
      return fetcher<BaseResponse<MerchantBranchRes>>({
        method: HTTPMethod.GET,
        url: `${url.getMerchantBranchDetail}/${params.merchantBranchId}`,
      });
    },
    enabled: options?.enabled && !!params.merchantBranchId,
  });

const useCreateMerchantBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddMerchantBranchReq>): Promise<BaseResponse<MerchantBranchRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addMerchantBranch,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_DEVICES] });
      notifySuccess(t('notification.field_successfully', { field: t('create_merchant_branch') }));
    },
  });
};

const useUpdateMerchantBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateMerchantBranchReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateMerchantBranch,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MERCHANT_BRANCHES] });
      notifySuccess(t('notification.field_successfully', { field: t('update_merchant_branch') }));
    },
  });
};

const useBulkDeleteMerchantBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteMerchantBranch,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MERCHANT_BRANCHES] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_merchant_branch') }));
    },
  });
};

export {
  useGetMerchantBranch,
  useGetMerchantBranchDetail,
  useCreateMerchantBranch,
  useUpdateMerchantBranch,
  useBulkDeleteMerchantBranch,
};

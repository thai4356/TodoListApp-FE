import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { BaseResponse, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { AddTransactionReq, TransactionRes } from 'types/SwaggerTypeUser';
import { t } from 'i18next';

const url = {
  getTransaction: 'v1/transaction/list',
  getTransactionDetail: 'v1/transaction/detail',
  createTransaction: 'v1/transaction/add-transaction',
};

const useGetTransaction = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_TRANSACTIONS, params],
    queryFn: () => {
      return fetcher<BaseResponse<TransactionRes[]>>({
        method: HTTPMethod.GET,
        url: url.getTransaction,
        params: params,
      });
    },
  });

const useGetTransactionDetail = (params: { transactionId: number }, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_TRANSACTION_DETAIL, params.transactionId],
    queryFn: () => {
      return fetcher<BaseResponse<TransactionRes>>({
        method: HTTPMethod.GET,
        url: `${url.getTransactionDetail}/${params.transactionId}`,
      });
    },
    enabled: options?.enabled && !!params.transactionId,
  });
};

const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddTransactionReq>): Promise<BaseResponse<TransactionRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.createTransaction,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TRANSACTIONS] });
      notifySuccess(t('notification.create_successfully', { field: t('transaction') }));
    },
  });
};

export { useGetTransaction, useGetTransactionDetail, useCreateTransaction };

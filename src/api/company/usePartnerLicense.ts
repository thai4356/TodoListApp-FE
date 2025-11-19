import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { AddPartnerLicenseReq, PartnerLicenseRes, UpdatePartnerLicenseReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';

const url = {
  getPartnerLicense: 'v1/partner-license/list',
  getPartnerLicenseDetail: 'v1/partner-license',
  updatePartnerLicense: 'v1/partner-license/update',
  deletePartnerLicense: 'v1/partner-license/delete',
  addPartnerLicense: 'v1/partner-license/add',
};

const useGetPartnerLicense = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PARTNER_LICENSES, params],
    queryFn: () => {
      return fetcher<BaseResponse<PartnerLicenseRes[]>>({
        method: HTTPMethod.GET,
        url: url.getPartnerLicense,
        params: params,
      });
    },
  });

const useGetPartnerLicenseDetail = (params: { partnerLicenseId: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_PARTNER_LICENSE_DETAIL, params.partnerLicenseId],
    queryFn: () => {
      return fetcher<BaseResponse<PartnerLicenseRes>>({
        method: HTTPMethod.GET,
        url: `${url.getPartnerLicenseDetail}/${params.partnerLicenseId}`,
      });
    },
    enabled: options?.enabled && !!params.partnerLicenseId,
  });

const useCreatePartnerLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddPartnerLicenseReq>): Promise<BaseResponse<PartnerLicenseRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addPartnerLicense,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PARTNER_LICENSES] });
      notifySuccess(t('notification.field_successfully', { field: t('create_partner_license') }));
    },
  });
};

const useUpdatePartnerLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdatePartnerLicenseReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updatePartnerLicense,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PARTNER_LICENSES] });
      notifySuccess(t('notification.field_successfully', { field: t('update_partner_license') }));
    },
  });
};

const useBulkDeletePartnerLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deletePartnerLicense,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_PARTNER_LICENSES] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_partner_license') }));
    },
  });
};

export {
  useGetPartnerLicense,
  useGetPartnerLicenseDetail,
  useCreatePartnerLicense,
  useUpdatePartnerLicense,
  useBulkDeletePartnerLicense,
};

import { useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { QUERY_KEY } from 'config/constants';
import {
  BaseResponseListMultiLineChartResponse,
  BaseResponseListRevenueLineChartResponse,
  BaseResponseOverviewSummaryResponse,
} from 'types/SwaggerTypeUser';

const baseUrl = 'v1/statistic';
const url = {
  getSummary: baseUrl + '/overview-summary',
  getRevenue: baseUrl + '/get-chart-revenue',
  getAuth: baseUrl + '/get-chart-auth',
} as const;

const useGetCompanySummary = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_OVERVIEW],
    queryFn: () =>
      fetcher<BaseResponseOverviewSummaryResponse>({
        method: HTTPMethod.GET,
        url: url.getSummary,
      }),
  });
};

const useGetCompanyRevenue = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_REVENUE],
    queryFn: () =>
      fetcher<BaseResponseListRevenueLineChartResponse>({
        method: HTTPMethod.GET,
        url: url.getRevenue,
      }),
  });
};

const useGetCompanyAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_COMPANY_AUTH],
    queryFn: () =>
      fetcher<BaseResponseListMultiLineChartResponse>({
        method: HTTPMethod.GET,
        url: url.getAuth,
      }),
  });
};

export { useGetCompanyAuth, useGetCompanyRevenue, useGetCompanySummary };

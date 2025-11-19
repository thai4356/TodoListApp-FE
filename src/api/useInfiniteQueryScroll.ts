import { useInfiniteQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { PAGE_SIZE_TABLE } from 'config/constants';
import { useMemo } from 'react';
import { BaseResponse, QueryParamsType } from 'types';

export const useInfiniteQueryScroll = <T>({
  queryKey,
  url,
  params,
  enabled,
}: {
  queryKey: string[];
  url: string;
  params?: QueryParamsType;
  enabled?: boolean;
}) => {
  const { data, ...props } = useInfiniteQuery({
    queryKey: [...queryKey, params],
    queryFn: ({ pageParam }): Promise<BaseResponse<T[]>> => {
      return fetcher({
        method: HTTPMethod.GET,
        url,
        params: {
          page: pageParam,
          ...params,
        },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * lastPage.current_page < lastPage.total_record / PAGE_SIZE_TABLE
        ? lastPage.current_page + 1
        : undefined;
    },
    enabled,
  });
  const flatData = useMemo(() => data?.pages.flatMap((d) => d.data) ?? [], [data]);

  return { data: flatData, ...props };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useDebounce } from 'hooks';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

type StateHook<T extends Record<any, any>, U> = {
  params: T;
  searchParams?: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
  setParams: Dispatch<SetStateAction<T>>;
  searchValue?: string;
  setSearchValue: Dispatch<SetStateAction<string | undefined>>;
  handleChangePagination: (
    pagination: TablePaginationConfig,
    filters?: Record<string, FilterValue | null>,
    sorter?: SorterResult<U> | SorterResult<U>[],
  ) => void;
};

type DebounceHook = [string | undefined, Dispatch<SetStateAction<string | undefined>>];

const useDebounceSearch = (initialValue?: string): DebounceHook => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  return [debouncedSearchValue, setSearchValue];
};

export const useSearchFilters = <T extends Record<any, any>, U = any>(initialValue: T): StateHook<T, U> => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useDebounceSearch();
  const [params, setParams] = useState<T>({ ...initialValue });

  useEffect(() => {
    if (searchValue !== undefined) {
      setParams((params) => ({
        ...params,
        searchKeyword: searchValue,
        page: 0,
      }));
    }
  }, [searchValue]);

  const handleChangePagination = useCallback(
    (
      pagination: TablePaginationConfig,
      _?: Record<string, FilterValue | null>,
      sorter?: SorterResult<U> | SorterResult<U>[],
    ) => {
      if (!sorter) {
        setParams((p) => ({
          ...p,
          page: pagination.current ? pagination.current - 1 : 0,
        }));
        return;
      }

      setParams((p) => ({
        ...p,
        page: pagination.current ? pagination.current - 1 : 0,
      }));
    },
    [],
  );

  return {
    params,
    setParams,
    searchValue,
    setSearchValue,
    handleChangePagination,
  };
};

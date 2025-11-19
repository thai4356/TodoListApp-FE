import { PAGE_SIZE_TABLE } from 'config/constants';

export const numericalOrder = (
  index: number,
  pageNumber: number | undefined,
  pageSize: number = PAGE_SIZE_TABLE,
): string | number => {
  if (!pageNumber && pageNumber !== 0) {
    return '-';
  }
  return index + 1 + pageSize * pageNumber;
};

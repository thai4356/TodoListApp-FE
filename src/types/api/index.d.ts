export type ErrorResponse = {
  code?: string;
  data: {
    message: string;
  };
  status?: number;
  statusText?: string;
};

export type BaseResponse<T> = {
  data?: T;
  message: string;
  totalRecord?: number;
};

export type IdRequest = {
  id: number;
};

export type IdsRequest = {
  ids: number[];
};

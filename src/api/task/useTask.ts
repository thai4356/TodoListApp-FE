import { useMutation, useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import { TaskDetailRes, AddTaskBaseReq } from 'types/SwaggerTypeTask';
import { QUERY_KEY } from 'config/constants';

const url = {
  create: 'v1/task',
};

export const useCreateTask = () =>
  useMutation({
    mutationFn: ({ currentUserId, data }: any) =>
      fetcher({
        method: HTTPMethod.POST,
        url: `v1/tasks?currentUserId=${currentUserId}`,
        data,
      }),
  });

export const useUpdateTask = () =>
  useMutation({
    mutationFn: ({ id, currentUserId, data }: any) =>
      fetcher({
        method: HTTPMethod.PATCH,
        url: `/v1/tasks/${id}?currentUserId=${currentUserId}`,
        data,
      }),
  });

  export const useDeleteTask = () =>
  useMutation({
    mutationFn: ({ id, currentUserId }: any) =>
      fetcher({
        method: HTTPMethod.DELETE,
        url: `/v1/tasks/${id}?currentUserId=${currentUserId}`,
      }),
  });


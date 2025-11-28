import { useMutation } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";

export const useCreateTask = () =>
  useMutation({
    mutationFn: ({
      currentUserId,
      data,
    }: {
      currentUserId: number | string;
      data: any;
    }) =>
      fetcher({
        method: HTTPMethod.POST,
        url: `v1/tasks?currentUserId=${currentUserId}`,
        data,
      }),
  });

export const useUpdateTask = () =>
  useMutation({
    mutationFn: ({
      id,
      currentUserId,
      data,
    }: {
      id: number | string;
      currentUserId: number | string;
      data: any;
    }) =>
      fetcher({
        method: HTTPMethod.PATCH,
        url: `/v1/tasks/${id}?currentUserId=${currentUserId}`,
        data,
      }),
  });

export const useDeleteTask = () =>
  useMutation({
    mutationFn: ({
      id,
      currentUserId,
    }: {
      id: number | string;
      currentUserId: number | string;
    }) =>
      fetcher({
        method: HTTPMethod.DELETE,
        url: `/v1/tasks/${id}?currentUserId=${currentUserId}`,
      }),
  });

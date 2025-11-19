import { fetcher } from 'config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HTTPMethod } from 'config/api';
import { AddSongReq, SongRes, UpdateSongReq } from 'types/SwaggerTypeUser';
import { BaseResponse, BulkDeleteBody, QueryParamsType } from 'types';
import { QUERY_KEY } from 'config/constants';
import { notifySuccess } from 'components/custom/Notification';
import { t } from 'i18next';
const url = {
  getSong: 'v1/song/list',
  getSongDetail: 'v1/song/detail',
  updateSong: 'v1/song/update',
  deleteSong: 'v1/song/delete',
  addSong: 'v1/song/add',
};

const useGetSong = (params: QueryParamsType) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_SONGS, params],
    queryFn: () => {
      return fetcher<BaseResponse<SongRes[]>>({
        method: HTTPMethod.GET,
        url: url.getSong,
        params: params,
      });
    },
  });

const useGetSongDetail = (params: { songId: number }, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_SONG_DETAIL, params.songId],
    queryFn: () => {
      return fetcher<BaseResponse<SongRes>>({
        method: HTTPMethod.GET,
        url: `${url.getSongDetail}/${params.songId}`,
      });
    },
    enabled: options?.enabled && !!params.songId,
  });

const useCreateSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Partial<AddSongReq>): Promise<BaseResponse<SongRes>> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.addSong,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_SONGS] });
      notifySuccess(t('notification.field_successfully', { field: t('create_song') }));
    },
  });
};

const useUpdateSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateSongReq>) => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.updateSong,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_SONGS] });
      notifySuccess(t('notification.field_successfully', { field: t('update_song') }));
    },
  });
};

const useBulkDeleteSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BulkDeleteBody): Promise<unknown> => {
      return fetcher({
        method: HTTPMethod.POST,
        url: url.deleteSong,
        data: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_SONGS] });
      notifySuccess(t('notification.field_successfully', { field: t('delete_song') }));
    },
  });
};

export { useGetSong, useGetSongDetail, useCreateSong, useUpdateSong, useBulkDeleteSong };

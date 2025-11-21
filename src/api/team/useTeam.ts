import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { t } from 'i18next';
import { AddTeamBaseReq, TeamDetailRes } from 'types/SwaggerTypeTeam';
import { QUERY_KEY } from 'config/constants';

const url = {
  createTeam: 'v1/team/create',
  getTeamByUser: 'v1/team/by-user',
  addMember: (teamId: number) => `v1/team/${teamId}/members`,
};

type AddMemberPayload = {
  teamId: number;
  userId: number;
  currentUserId: number;
};

export const useGetTeamByUser = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_TEAM_BY_USER],
    queryFn: () =>
      fetcher<TeamDetailRes[]>({
        method: HTTPMethod.GET,
        url: url.getTeamByUser,
      }),
  });

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      body: Omit<AddTeamBaseReq, 'user'>,
    ): Promise<TeamDetailRes> =>
      fetcher<TeamDetailRes>({
        method: HTTPMethod.POST,
        url: url.createTeam,
        data: body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TEAM_BY_USER],
      });
      notifySuccess(t('notification.field_successfully', { field: 'Tạo team' }));
    },
  });
};

export const useAddMemberToTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddMemberPayload): Promise<TeamDetailRes> =>
      fetcher<TeamDetailRes>({
        method: HTTPMethod.POST,
        url: url.addMember(payload.teamId),
        params: { currentUserId: payload.currentUserId },
        data: { userId: payload.userId },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TEAM_BY_USER],
      });
      notifySuccess(t('notification.field_successfully', { field: 'Thêm thành viên' }));
    },
  });
};

// src/api/team/useTeam.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from 'components/custom/Notification';
import { fetcher, HTTPMethod } from 'config/api';
import { t } from 'i18next';
import { AddTeamBaseReq, TeamDetailRes } from 'types/SwaggerTypeTeam';
import { useSelector } from 'react-redux';
import { APP, QUERY_KEY } from 'config/constants';
import { UserLoginRes } from 'types/SwaggerTypeUser';

const url = {
  createTeam: 'v1/team/create',
  getTeamByUser: 'v1/team/by-user',
};

// Lấy team bất kỳ mà user hiện tại thuộc về (owner hoặc member)
export const useGetTeamByUser = (userId?: number) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_TEAM_BY_USER, userId],
    queryFn: () =>
      fetcher<TeamDetailRes>({
        method: HTTPMethod.GET,
        url: url.getTeamByUser,
        params: { userId },
      }),
    enabled: !!userId,
  });

// Tạo team, tự lấy currentUserId từ Redux, tự set AddTeamBaseReq.user
export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  const userLogin = useSelector(
    (state: any) => state.user?.[APP.USER] as UserLoginRes | undefined,
  );
  const currentUserId = userLogin?.id;

  return useMutation({
    mutationFn: async (body: Omit<AddTeamBaseReq, 'user'>): Promise<TeamDetailRes> => {
      if (!currentUserId) {
        throw new Error('User not logged in');
      }

      return fetcher({
        method: HTTPMethod.POST,
        url: url.createTeam,
        data: {
          ...body,
          user: currentUserId, // owner id
        },
        params: { currentUserId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_TEAM_BY_USER] });
      notifySuccess(t('notification.field_successfully', { field: 'Tạo team' }));
    },
  });
};

// (không cần export default)

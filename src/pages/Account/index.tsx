import { Card, Spin, Alert, Avatar, Typography, Divider } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import type { BaseResponse } from 'types';
import type { UserDetailRes } from 'types/SwaggerTypeUser';

const { Text, Title } = Typography;

export default function UserInfoPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-self-info'],
    queryFn: () =>
      fetcher<BaseResponse<UserDetailRes>>({
        method: HTTPMethod.GET,
        url: 'v1/user/me',
      }),
  });

  const user = data?.data;

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          Account info
        </Title>
      }
      style={{
        maxWidth: 480,
        margin: '0 auto',
        borderRadius: 16,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
      }}
    >
      {isError && (
        <Alert
          type="error"
          message="Không thể tải thông tin người dùng"
          description={(error as any)?.message || 'Đã có lỗi xảy ra'}
          className="mb-4"
          showIcon
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        user && (
          <div className="flex flex-col items-center gap-4">

            <div style={{ textAlign: 'center' }}>
              <Title level={4} style={{ marginBottom: 4 }}>
                {user.name}
              </Title>
              <Text type="secondary">{user.email}</Text>
            </div>

            <Divider />

            
          </div>
        )
      )}
    </Card>
  );
}

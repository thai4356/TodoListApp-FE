import { Card, Table, Spin, Alert, Avatar, Typography, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetcher, HTTPMethod } from 'config/api';
import type { BaseResponse } from 'types';
import type { UserListRes } from 'types/SwaggerTypeUser';

const { Text, Title } = Typography;

export default function UserListPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-users'],
    queryFn: () =>
      fetcher<BaseResponse<UserListRes[]>>({
        method: HTTPMethod.GET,
        url: 'v1/user/members',
      }),
  });

  const users = data?.data ?? [];

  const columns = [
    
    {
      title: 'User',
      key: 'user',
      render: (_: any, record: UserListRes) => (
        <div className="flex items-center gap-3">
          <Avatar
            style={{
              backgroundColor: '#1890ff',
              verticalAlign: 'middle',
            }}
            size="large"
          >
            {record.fullName?.[0]?.toUpperCase() || '?'}
          </Avatar>
          <div>
            <Text strong>{record.fullName}</Text>
            <div style={{ fontSize: 12, color: '#888' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: string) =>
        role ? <Tag color="green">{role}</Tag> : <Tag color="default">User</Tag>,
    },
  ];

  return (
    <Card
      title={<Title level={4} style={{ margin: 0 }}>👥 User Members</Title>}
      style={{
        borderRadius: 16,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
      }}
    >
      {isError && (
        <Alert
          type="error"
          message="Failed to load user list"
          description={(error as any)?.message || 'Unknown error'}
          className="mb-4"
          showIcon
        />
      )}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey={(r) => String((r as any).id)}
          dataSource={users}
          columns={columns}
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        />
      )}
    </Card>
  );
}

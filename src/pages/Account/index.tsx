import { Card, Spin, Alert, Typography, Divider, Avatar, Row, Col } from 'antd';
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

  // Cloudinary only
  const avatarUrl = user?.avatarFile?.originUrl || null;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '32px auto',
        padding: '0 16px',
      }}
    >
      <Card
        style={{
          borderRadius: 16,
          padding: '24px 32px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* ERRORS */}
        {isError && (
          <Alert
            type="error"
            message="Không thể tải thông tin người dùng"
            description={(error as any)?.message || 'Đã có lỗi xảy ra'}
            className="mb-4"
            showIcon
          />
        )}

        {/* LOADING */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          user && (
            <>
              {/* Header section */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Avatar
                  src={avatarUrl || undefined}
                  size={140}
                  style={{
                    border: '3px solid #f0f0f0',
                  }}
                />
                <Title level={3} style={{ marginTop: 16 }}>
                  {user.fullName}
                </Title>
                <Text type="secondary" style={{ fontSize: 16 }}>
                  {user.email}
                </Text>
              </div>

              <Divider />

              {/* INFO SECTIONS */}
              <div style={{ marginTop: 24 }}>
                <Title level={4}>Thông tin cá nhân</Title>

                <Card
                  style={{
                    borderRadius: 12,
                    marginTop: 12,
                    padding: 16,
                    background: '#fafafa',
                  }}
                >
                  <Row style={{ marginBottom: 12 }}>
                    <Col span={8}>
                      <Text strong>Mã người dùng:</Text>
                    </Col>
                    <Col span={16}>
                      <Text>{user.id}</Text>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: 12 }}>
                    <Col span={8}>
                      <Text strong>Họ và tên:</Text>
                    </Col>
                    <Col span={16}>
                      <Text>{user.fullName}</Text>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: 12 }}>
                    <Col span={8}>
                      <Text strong>Email:</Text>
                    </Col>
                    <Col span={16}>
                      <Text>{user.email}</Text>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: 12 }}>
                    <Col span={8}>
                      <Text strong>Ngày tạo:</Text>
                    </Col>
                    <Col span={16}>
                      <Text>{user.createdAt}</Text>
                    </Col>
                  </Row>
                </Card>
              </div>
            </>
          )
        )}
      </Card>
    </div>
  );
}

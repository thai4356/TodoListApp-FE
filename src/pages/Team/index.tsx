import { useState } from 'react';
import { useSelector } from 'react-redux';
import { APP } from 'config/constants';
import { UserLoginRes } from 'types/SwaggerTypeUser';
import { useCreateTeam, useGetTeamByUser } from 'api/team/useTeam';
import { Button, Card, List, Modal, Form, Input, Spin, Tag } from 'antd';

const TeamPage = () => {
  // lấy user hiện tại từ Redux
  const userLogin = useSelector(
    (state: any) => state.user?.[APP.USER] as UserLoginRes | undefined,
  );
  const currentUserId = userLogin?.id;

  const { data: team, isLoading, refetch } = useGetTeamByUser(currentUserId);
  const { mutate: createTeam, isPending } = useCreateTeam();

  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const handleCreateTeam = (values: { name: string; description: string }) => {
    createTeam(values, {
      onSuccess: () => {
        form.resetFields();
        setOpenModal(false);
        refetch();
      },
    });
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <Card
        title={team ? `Team: ${team.name}` : 'Team của tôi'}
        extra={
          <Button
            type="primary"
            onClick={() => setOpenModal(true)}
            disabled={!currentUserId}
          >
            Tạo team
          </Button>
        }
      >
        {!currentUserId ? (
          <div>Vui lòng đăng nhập để xem team.</div>
        ) : isLoading ? (
          <Spin />
        ) : team ? (
          <>
            <p>
              <b>Mô tả:</b> {team.description}
            </p>
            <p>
              <b>Owner:</b> {team.owner?.name || team.owner?.email}
            </p>

            <b>Thành viên:</b>
            <List
              style={{ marginTop: 8 }}
              dataSource={team.members}
              renderItem={(m) => (
                <List.Item>
                  <Tag>{m.role}</Tag>
                  <span style={{ marginLeft: 8 }}>
                    {m.fullName || m.email} ({m.email})
                  </span>
                </List.Item>
              )}
            />
          </>
        ) : (
          <div>Hiện tại bạn chưa thuộc team nào.</div>
        )}
      </Card>

      <Modal
        open={openModal}
        title="Tạo team mới"
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        confirmLoading={isPending}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreateTeam}>
          <Form.Item
            label="Tên team"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên team' }]}
          >
            <Input placeholder="Nhập tên team" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả team" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamPage;

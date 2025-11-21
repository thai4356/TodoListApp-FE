import { useState } from 'react';
import { useGetTeamByUser, useAddMemberToTeam } from 'api/team/useTeam';
import { Button, Card, List, Tag, Collapse, Alert } from 'antd';
import { TeamDetailRes } from 'types/SwaggerTypeTeam';
import ModalCreateTeam from './components/AddTeamModal';

const { Panel } = Collapse;

const getCurrentUserId = (): number | null => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return (
      parsed.id ||
      parsed.userId ||
      (parsed.user && parsed.user.id) ||
      null
    );
  } catch {
    return null;
  }
};

const TeamPage = () => {
  const { data: teams, isError, error, refetch } = useGetTeamByUser();
  const [openModal, setOpenModal] = useState(false);

  const currentUserId = getCurrentUserId();
  const { mutate: addMemberToTeam } = useAddMemberToTeam();

  const handleAddMember = (team: TeamDetailRes) => {
    if (!currentUserId) {
      alert('Không tìm thấy user hiện tại.');
      return;
    }

    const value = window.prompt('Nhập userId cần thêm:');
    if (!value) return;

    const userId = Number(value);
    if (Number.isNaN(userId)) {
      alert('UserId không hợp lệ');
      return;
    }

    addMemberToTeam(
      { teamId: team.id, userId, currentUserId },
      {
        onSuccess: () => refetch(),
        onError: (e: any) => alert(e?.message || 'Lỗi thêm thành viên'),
      },
    );
  };

  const renderBody = () => {
    if (isError) {
      return (
        <Alert
          type="error"
          message="Không thể tải danh sách team"
          description={(error as any)?.message || 'Đã có lỗi xảy ra'}
          showIcon
        />
      );
    }

    const list = teams || [];

    if (!list.length) {
      return <div>Hiện tại bạn chưa thuộc team nào.</div>;
    }

    return (
      <Collapse accordion>
        {list.map((team: TeamDetailRes) => {
          const isOwner =
            !!currentUserId && team.owner && team.owner.id === currentUserId;

          return (
            <Panel
              header={`Team: ${team.name}`}
              key={team.id}
              extra={
                isOwner && (
                  <Button size="small" onClick={() => handleAddMember(team)}>
                    Thêm thành viên
                  </Button>
                )
              }
            >
              <p>
                <b>Mô tả:</b> {team.description}
              </p>
              <p>
                <b>Owner:</b> {team.owner?.fullname || team.owner?.email}
              </p>

              <b>Thành viên:</b>
              <List
                style={{ marginTop: 8 }}
                dataSource={team.members}
                locale={{ emptyText: 'Chưa có thành viên nào.' }}
                renderItem={(m) => (
                  <List.Item key={m.id}>
                    <Tag>{m.role}</Tag>
                    <span style={{ marginLeft: 8 }}>
                      {m.fullName || m.email} ({m.email})
                    </span>
                  </List.Item>
                )}
              />
            </Panel>
          );
        })}
      </Collapse>
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <Card
        title="Team của tôi"
        extra={<Button type="primary" onClick={() => setOpenModal(true)}>Tạo team</Button>}
      >
        {renderBody()}
      </Card>

      <ModalCreateTeam
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          refetch();
        }}
      />
    </div>
  );
};

export default TeamPage;

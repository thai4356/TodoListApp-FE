// src/pages/team/index.tsx

import { useState, useEffect } from 'react';
import { useGetTeamByUser, useAddMemberToTeam } from 'api/team/useTeam';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  List,
  Tag,
  Alert,
  Input,
  Select,
  Avatar,
  Row,
  Col,
  Empty,
} from 'antd';
import {
  UsergroupAddOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { TeamDetailRes } from 'types/SwaggerTypeTeam';
import ModalCreateTeam from './components/AddTeamModal';
import { fetcher, HTTPMethod } from 'config/api';
import './index.scss';

const { Search } = Input;
const { Option } = Select;

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

const THUMB_COLORS = [
  "linear-gradient(135deg, #f97316, #ec4899)",
  "linear-gradient(135deg, #3b82f6, #6366f1)",
  "linear-gradient(135deg, #10b981, #22c55e)",
  "linear-gradient(135deg, #ef4444, #f43f5e)",
  "linear-gradient(135deg, #a855f7, #d946ef)",
  "linear-gradient(135deg, #14b8a6, #06b6d4)",
  "linear-gradient(135deg, #facc15, #f59e0b)",
];

const getColorByTeamId = (teamId: number) => {
  const index = teamId % THUMB_COLORS.length;
  return THUMB_COLORS[index];
};


const TeamPage = () => {
  const { data: teams, isError, error, refetch } = useGetTeamByUser();
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();
  const { mutate: addMemberToTeam } = useAddMemberToTeam();

  // ============================
  // 1. Progress state
  // ============================
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  // ============================
  // 2. API lấy tasks theo team
  // ============================
  const fetchTeamTasks = async (teamId: number) => {
    try {
      return await fetcher<any[]>({
        method: HTTPMethod.GET,
        url: `/v1/tasks?teamId=${teamId}&includeDeleted=false`,
      });
    } catch {
      return [];
    }
  };

  // ============================
  // 3. Load progress cho từng team
  // ============================
  useEffect(() => {
    if (!teams || !teams.length) return;

    const loadProgress = async () => {
      const result: Record<number, number> = {};

      for (const team of teams) {
        const tasks = await fetchTeamTasks(team.id);

        if (!tasks.length) {
          result[team.id] = 0;
          continue;
        }

        const total = tasks.length;
        const done = tasks.filter((t) => t.status === 'done').length;
        result[team.id] = Math.round((done / total) * 100);
      }

      setProgressMap(result);
    };

    loadProgress();
  }, [teams]);

  // ============================
  // Add member
  // ============================
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

  // ============================
  // Filter team
  // ============================
  const filteredTeams = (teams || []).filter((team) => {
    const matchSearch =
      !search ||
      team.name.toLowerCase().includes(search.toLowerCase()) ||
      (team.description || '').toLowerCase().includes(search.toLowerCase());

    const matchStatus = !statusFilter || statusFilter === 'all';

    return matchSearch && matchStatus;
  });

  // Render UI
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

    if (!filteredTeams.length) {
      return (
        <Empty description="Hiện tại bạn chưa thuộc team nào." className="team-empty" />
      );
    }

    return (
      <Row gutter={[24, 24]} className="team-grid">
        {filteredTeams.map((team) => {
          const isOwner =
            !!currentUserId && team.owner && team.owner.id === currentUserId;

          return (
            <Col xs={24} sm={12} xl={8} key={team.id}>
              <Card
                className="team-card"
                hoverable
                bodyStyle={{ padding: 20 }}
                onClick={() => navigate(`/team/${team.id}`)}
              >
                <div className="team-card-header">
                  <Tag className="team-card-status">Group</Tag>
                  <div
                    className="team-card-thumbnail"
                    style={{ background: getColorByTeamId(team.id) }}
                  />
                </div>

                {/* Title */}
                <h3 className="team-card-title">{team.name}</h3>
                <p className="team-card-subtitle">
                  {team.description || 'Không có mô tả.'}
                </p>

                {/* Meta */}
                <div className="team-card-meta">
                  <div className="team-card-meta-item">
                    <UsergroupAddOutlined />
                    <span>{team.members?.length || 0} members</span>
                  </div>
                  <div className="team-card-meta-item">
                    <span>Owner:</span>
                    <span>{team.owner?.fullname || team.owner?.email || '—'}</span>
                  </div>
                </div>

                <div className="team-card-progress">
                  <div className="team-card-progress-bar">
                    <div
                      className="team-card-progress-bar-fill"
                      style={{ width: `${progressMap[team.id] || 0}%` }}
                    />
                  </div>

                  <span className="team-card-progress-text">
                    {progressMap[team.id] || 0}%
                  </span>
                </div>


                {/* FOOTER */}
                <div className="team-card-footer">
                  <Avatar.Group maxCount={4} size="small">
                    {team.members?.slice(0, 4).map((m) => (
                      <Avatar key={m.user_id}>
                        {(m.fullName || m.email || '?').charAt(0)}
                      </Avatar>
                    ))}
                  </Avatar.Group>

                  <div className="team-card-footer-actions">
                    {isOwner && (
                      <Button
                        size="small"
                        type="link"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddMember(team);
                        }}
                      >
                        + Thêm thành viên
                      </Button>
                    )}
                    <ArrowRightOutlined className="team-card-arrow" />
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <div className="team-page">
      <main className="team-main">
        {/* Header */}
        <header className="team-header">
          <div className="team-header-left">
            <h1 className="team-header-title">Current Team</h1>
            <Button
              type="primary"
              className="team-btn-new"
              onClick={() => setOpenModal(true)}
            >
              New Team
            </Button>
          </div>

          {/* Search + Filter */}
          <div className="team-header-right">
            <Search
              placeholder="Type to search..."
              allowClear
              onSearch={setSearch}
              onChange={(e) => setSearch(e.target.value)}
              className="team-search"
            />
            <Select
              className="team-status-select"
              value={statusFilter || 'all'}
              onChange={(v) => setStatusFilter(v)}
            >
              <Option value="all">All status</Option>
              <Option value="live">Live</Option>
              <Option value="on_target">On Target</Option>
            </Select>
          </div>
        </header>

        {/* Content */}
        <section className="team-content">{renderBody()}</section>
      </main>

      {/* Modal tạo team */}
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

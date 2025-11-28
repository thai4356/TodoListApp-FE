import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetcher, HTTPMethod } from "config/api";
import { TeamDetailRes } from "types/SwaggerTypeTeam";
import { TaskDetailRes } from "types/SwaggerTypeTask";
import { Button, Avatar } from "antd";
import { useState } from "react";
import AddTaskModal from "./components/AddTaskModal";
import TaskDetailModal from "./components/TaskDetailModal";
import AddMemberModal from "./components/AddMemberModal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./index.scss";

const normalizeStatus = (status: string) =>
  status.toUpperCase().replace(/\s/g, "_") as "TODO" | "IN_PROGRESS" | "DONE";

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDetailRes | null>(null);

  const queryClient = useQueryClient();

  // ========= UPDATE TASK API =========
  const updateTask = useMutation({
    mutationFn: ({ id, currentUserId, data }: any) =>
      fetcher({
        method: HTTPMethod.PATCH,
        url: `/v1/tasks/${id}?currentUserId=${currentUserId}`,
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TASKS_BY_TEAM", teamId],
      });
    },
  });

  // ========= GET USER ID =========
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("S0VZX0FVVEhfSU5GT01BVElPTgAP==");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Number(payload.sub);
    } catch {
      return null;
    }
  };

  const currentUserId = getUserIdFromToken();

  // ========= LOAD TEAM =========
  const { data: team } = useQuery({
    queryKey: ["TEAM_DETAIL", teamId],
    queryFn: () =>
      fetcher<TeamDetailRes>({
        method: HTTPMethod.GET,
        url: `v1/team/${teamId}`,
      }),
  });

  // ========= LOAD TASKS =========
  const { data: tasks = [] } = useQuery({
    queryKey: ["TASKS_BY_TEAM", teamId],
    queryFn: () =>
      fetcher<TaskDetailRes[]>({
        method: HTTPMethod.GET,
        url: `/v1/tasks?teamId=${teamId}&includeDeleted=false`,
      }),
  });

  if (!team) return <p>Loading...</p>;

  // ========= GROUP TASKS =========
  const board = {
    TODO: [] as TaskDetailRes[],
    IN_PROGRESS: [] as TaskDetailRes[],
    DONE: [] as TaskDetailRes[],
  };

  tasks.forEach((t) => {
    const key = normalizeStatus(t.status || "");
    board[key].push(t);
  });

  const handleTaskClick = (t: TaskDetailRes) => {
    setSelectedTask(t);
    setOpenTaskModal(true);
  };

  // ========= DRAG & DROP =========
  const handleDrop = (
    e: React.DragEvent,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE"
  ) => {
    const taskId = Number(e.dataTransfer.getData("taskId"));
    if (!taskId) return;

    updateTask.mutate({
      id: taskId,
      currentUserId,
      data: { status: newStatus },
    });
  };

  return (
    <div className="kanban-page">
      <div className="kanban-header">
        <Button type="default" onClick={() => setOpenAddMember(true)}>
          + Add Member
        </Button>

        <h1>{team.name}</h1>
        <Button type="primary" onClick={() => setOpenAddModal(true)}>
          + New Task
        </Button>
      </div>

      <div className="kanban-columns">
        {/* TODO */}
        <div
          className="kanban-col"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "TODO")}
        >
          <h3>To Do</h3>

          {board.TODO.map((t) => (
            <div
              className={`task-card status-${t.status} priority-${t.priority}`}

              key={t.id}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("taskId", String(t.id))
              }
              onClick={() => handleTaskClick(t)}
            >
              <div className="task-title">{t.title}</div>

              <div className="task-meta">

                <span>Due date : {t.dueDate}</span>
              </div>

              <Avatar size="small">
                {(t.assignee?.fullName || t.assignee?.email || "U").charAt(0)}
              </Avatar>
            </div>
          ))}
        </div>

        {/* IN PROGRESS */}
        <div
          className="kanban-col in-progress"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "IN_PROGRESS")}
        >
          <h3>In Progress</h3>

          {board.IN_PROGRESS.map((t) => (
            <div
              className={`task-card status-${t.status} priority-${t.priority}`}

              key={t.id}
              draggable
              data-id={t.id}
              onDragStart={(e) => {
                e.dataTransfer.setData("taskId", String(t.id));
                e.currentTarget.classList.add("dragging");
              }}
              onDragEnd={(e) => e.currentTarget.classList.remove("dragging")}
              onClick={() => handleTaskClick(t)}
            >
              <div className="task-title">{t.title}</div>

              <div className="task-meta">

                <span> Due date : {t.dueDate}</span>
              </div>

              <Avatar size="small">
                {(t.assignee?.fullName || t.assignee?.email || "U").charAt(0)}
              </Avatar>
            </div>
          ))}
        </div>

        {/* DONE */}
        <div
          className="kanban-col"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "DONE")}
        >
          <h3>Done</h3>

          {board.DONE.map((t) => (
            <div
              className={`task-card status-${t.status} priority-${t.priority}`}

              key={t.id}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("taskId", String(t.id))
              }
              onClick={() => handleTaskClick(t)}
            >
              <div className="task-title">{t.title}</div>

              <div className="task-meta">
                <span>Due date : {t.dueDate}</span>
              </div>

              <Avatar size="small">
                {(t.assignee?.fullName || t.assignee?.email || "U").charAt(0)}
              </Avatar>
            </div>
          ))}
        </div>
      </div>

      {/* MODALS */}
      <AddTaskModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        teamId={Number(teamId)}
        currentUserId={currentUserId}
        members={team.members}
      />

      <TaskDetailModal
        open={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
        task={selectedTask}
        currentUserId={currentUserId}
        members={team.members}
      />

      <AddMemberModal
        open={openAddMember}
        onClose={() => setOpenAddMember(false)}
        teamId={Number(teamId)}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default TeamDetailPage;

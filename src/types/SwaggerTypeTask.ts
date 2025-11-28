/* ------------------ TASK MODELS ------------------ */

export interface AddTaskBaseReq {
  teamId: number;
  assigneeId: number;

  title: string;
  description?: string;

  status?: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: "LOW" | "NORMAL" | "HIGH";

  dueDate?: string; // "2025-11-30"
}

export interface TaskDetailRes {
  id: number;
  teamId: number;
  assigneeId: number;

  title: string;
  description?: string;

  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: "low" | "medium" | "high";

  dueDate?: string;

  createdAt?: string;
  updatedAt?: string;

  assignee?: {
    id: number;
    fullName?: string;
    email?: string;
  };
}

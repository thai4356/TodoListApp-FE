import { Modal, Form, Input, Select, DatePicker, Button, Avatar } from "antd";
import dayjs from "dayjs";
import { TaskDetailRes } from "types/SwaggerTypeTask";
import { useUpdateTask } from "api/task/useTask";
import { useDeleteTask } from "api/task/useTask";
import { TeamMemberRes } from "types/SwaggerTypeTeam";

type Props = {
  open: boolean;
  onClose: () => void;
  currentUserId: number | null;
  members: TeamMemberRes[];
  task: TaskDetailRes | null;
};

const TaskDetailModal = ({
  open,
  onClose,
  currentUserId,
  members,
  task,
}: Props) => {
  const [form] = Form.useForm();

  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  if (!task) return null;

  form.setFieldsValue({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    assigneeId: task.assignee?.id,
    dueDate: task.dueDate ? dayjs(task.dueDate) : null,
  });

  // UPDATE
  const handleUpdate = (values: any) => {
    if (!currentUserId) return;

    const payload = {
      ...values,
      teamId: task.teamId,
      dueDate: values.dueDate
        ? dayjs(values.dueDate).format("YYYY-MM-DD")
        : null,
    };

    updateMutation.mutate(
      {
        id: task.id,
        currentUserId,
        data: payload,
      },
      {
        onSuccess: () => {
          onClose();
          window.location.reload();
        },
      }
    );
  };

  // DELETE
  const handleDelete = () => {
    if (!currentUserId || !task) return;

    if (!window.confirm("Bạn có chắc chắn muốn xóa task này?")) return;

    deleteMutation.mutate(
      { id: task.id, currentUserId },
      {
        onSuccess: () => {
          onClose();
          window.location.reload();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`Task: ${task.title}`}
      footer={[
        <Button
          key="delete"
          danger
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          onClick={() => form.submit()}
          loading={updateMutation.isPending}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter title..." />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="assigneeId" label="Assign To">
          <Select placeholder="Select member">
            {members.map((m) => (
              <Select.Option value={m.user_id} key={m.user_id}>
                {m.fullName || m.email}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="priority" label="Priority">
          <Select
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Urgent", value: "urgent" },
            ]}
          />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select
            options={[
              { label: "To Do", value: "todo" },
              { label: "In Progress", value: "in_progress" },
              { label: "Done", value: "done" },
            ]}
          />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskDetailModal;

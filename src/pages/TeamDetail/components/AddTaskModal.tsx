import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useCreateTask } from "api/task/useTask";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;



const AddTaskModal = ({ open, onClose, teamId, currentUserId, members }: any) => {
  const [form] = Form.useForm();
  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      createTask(
        {
          currentUserId,
          data: {
            teamId: teamId,
            assigneeId: values.assigneeId,
            title: values.title,
            description: values.description || "",
            status: values.status,
            priority: values.priority,
            dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
          },
        },
        {
          onSuccess: () => {
            form.resetFields();
            onClose();
            window.location.reload(); 
          },
        }
      );
    });
  };

  return (
    <Modal
      open={open}
      title="Create Task"
      okText="Create"
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={isPending}
    >
      <Form form={form} layout="vertical">
        {/* ----------- TITLE ----------- */}
        <Form.Item
          label="Task Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter task title..." />
        </Form.Item>

        {/* ----------- DESCRIPTION ----------- */}
        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Task description..." />
        </Form.Item>

        {/* ----------- ASSIGNEE ----------- */}
        <Form.Item
          label="Assign To"
          name="assigneeId"
          rules={[{ required: true, message: "Please select a member" }]}
        >
          <Select
            placeholder="Select member..."
            onChange={(value) => form.setFieldValue("assigneeId", value)}
          >
            {members?.map((m: any) => (
              <Option key={m.user_id} value={m.user_id}>
                {m.fullName || m.email}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* ----------- STATUS ----------- */}
        <Form.Item
          label="Status"
          name="status"
          initialValue="TODO"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="TODO">TODO</Option>
            <Option value="IN_PROGRESS">IN_PROGRESS</Option>
            <Option value="DONE">DONE</Option>
          </Select>
        </Form.Item>

        {/* ----------- PRIORITY ----------- */}
        <Form.Item
          label="Priority"
          name="priority"
          initialValue="NORMAL"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="LOW">LOW</Option>
            <Option value="NORMAL">NORMAL</Option>
            <Option value="HIGH">HIGH</Option>
          </Select>
        </Form.Item>

        {/* ----------- DUE DATE ----------- */}
        <Form.Item label="Due Date" name="dueDate">
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            disabledDate={(d) => d && d < dayjs().startOf("day")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;

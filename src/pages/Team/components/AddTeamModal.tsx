import { Modal, Form, Input, Button } from 'antd';
import { useCreateTeam } from 'api/team/useTeam';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
  currentUserId?: number;
};

const AddTeamModal = ({ open, onClose, onCreated, currentUserId }: Props) => {
  const [form] = Form.useForm();
  const { mutate: createTeam, isPending } = useCreateTeam();

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (values: { name: string; description: string }) => {
    if (!currentUserId) return;

    createTeam(
      {
        request: {
          ...values,
          user: currentUserId, // AddTeamBaseReq.user: number
        },
        currentUserId,
      },
      {
        onSuccess: () => {
          form.resetFields();
          onClose();
          onCreated?.();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      title="Create New Team"
      onCancel={onClose}
      onOk={handleOk}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={isPending} onClick={handleOk} disabled={!currentUserId}>
          Create
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Team Name"
          name="name"
          rules={[{ required: true, message: 'Please enter team name' }]}
        >
          <Input placeholder="Enter team name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter team description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTeamModal;

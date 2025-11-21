import { Form, Input, Modal } from 'antd';
import { useCreateTeam } from 'api/team/useTeam';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddTeamModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const { mutate: createTeam, isPending } = useCreateTeam();

  const handleSubmit = (values: any) => {
    createTeam(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  // Reset form khi mở lại modal
  useEffect(() => {
    if (!open) form.resetFields();
  }, [open]);

  return (
    <Modal
      open={open}
      title="Tạo team mới"
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={isPending}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
  );
};

export default AddTeamModal;

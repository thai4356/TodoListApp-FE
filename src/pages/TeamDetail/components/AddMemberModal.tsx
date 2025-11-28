import { Modal, Input, Button } from "antd";
import { useState } from "react";
import { fetcher, HTTPMethod } from "config/api";
import { notifySuccess } from "components/custom/Notification";

type AddMemberModalProps = {
  open: boolean;
  onClose: () => void;
  teamId: number;
  currentUserId: number;
};


const AddMemberModal = ({
  open,
  onClose,
  teamId,
  currentUserId,
}: AddMemberModalProps) => {
  const [email, setEmail] = useState("");

  const handleAdd = async () => {
    await fetcher({
      method: HTTPMethod.POST,
      url: `/v1/team/${teamId}/members?currentUserId=${currentUserId}`,
      data: { email },
    });

    notifySuccess("Invitation sent.");
    setEmail("");
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} onOk={handleAdd} title="Add Member">
      <Input
        placeholder="Enter email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Modal>
  );
};

export default AddMemberModal;

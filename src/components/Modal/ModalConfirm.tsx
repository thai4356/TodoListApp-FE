import { DeleteOutlined } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';
import { t } from 'i18next';
import './index.scss';

type ModalConfirm = 'delete' | 'normal'; // custom more type if needed

const iconModal = (type?: ModalConfirm) => {
  switch (type) {
    case 'delete':
      return <DeleteOutlined className="fill-red-500" />;
    default:
      return null;
  }
};

const titleModal = (type?: ModalConfirm) => {
  switch (type) {
    case 'delete':
      return t('are_you_sure_want_to_delete');
    default:
      return null;
  }
};

const contentModal = (type?: ModalConfirm) => {
  switch (type) {
    case 'delete':
      return t('this_action_can_not_be_undo');
    default:
      return null;
  }
};

const okeTextModal = (type?: ModalConfirm) => {
  switch (type) {
    case 'delete':
      return t('delete');
    default:
      return t('agree');
  }
};

const openModalConfirm = (props: { modalType: ModalConfirm } & ModalFuncProps) => {
  const { cancelText = t('cancel'), modalType = 'normal', ...restProps } = props;
  const icon = restProps.icon ?? iconModal(modalType);
  const title = restProps.title ?? titleModal(modalType);
  const content = restProps.content ?? contentModal(modalType);
  const okText = restProps.okText ?? okeTextModal(modalType);

  return Modal.confirm({
    title,
    content,
    cancelText,
    okText,
    className: 'modal-confirm-custom',
    zIndex: 1200,
    centered: true,
    okButtonProps: { danger: modalType === 'delete' },
    closable: true,
    icon,
    ...restProps,
  });
};

export default openModalConfirm;

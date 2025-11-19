import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useResize } from 'hooks';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { clearModal, removeModal } from 'store/slices/modalSlice.ts';
import { RootState } from 'types/store';
import './index.scss';
import { useSelector } from 'react-redux';

const ModalPortal = memo(() => {
  const isOpenModal = true;

  const modalList = useSelector((state: RootState) => state.modal.modalList);
  const { screenHeight } = useResize();
  const location = useLocation();
  const handleCancel = (afterClosed: (() => void) | undefined) => () => {
    afterClosed?.();
    removeModal();
  };

  useEffect(() => {
    clearModal();
  }, [location]);

  return modalList.map((modal, index) => {
    const zIndexModal = modal.options?.zIndex ?? 1001;
    return (
      <Modal
        footer={null}
        key={index}
        open={isOpenModal}
        className={`modal-portal ${modal.options?.className}`}
        styles={{
          body: {
            height: modal.options?.subtractHeight ? screenHeight - modal.options.subtractHeight : undefined,
          },
        }}
        zIndex={zIndexModal + index}
        centered
        onCancel={handleCancel(modal.options?.afterClosed)}
        width={modal.options?.width}
        closable={false}
        maskClosable={false}
        destroyOnClose={!!modal.options?.destroyOnClose}
        title={
          <div className={`title-wrap__modal-portal ${!modal.options?.title && 'no-title'}`}>
            <div className="title__modal-portal">{modal.options?.title}</div>
            <CloseOutlined onClick={handleCancel(modal.options?.afterClosed)} />
          </div>
        }
      >
        {modal.content}
      </Modal>
    );
  });
});

export default ModalPortal;

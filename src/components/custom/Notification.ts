import { notification } from 'antd';
import { t } from 'i18next';
import { ReactNode } from 'react';

const notifySuccess = (message: ReactNode = t('success'), description?: ReactNode, duration = 2) =>
  notification.success({
    message,
    description,
    duration,
    placement: 'topRight',
  });

const notifyError = (message: ReactNode, description?: ReactNode, duration?: number) =>
  notification.error({
    message,
    description,
    duration,
    placement: 'topRight',
  });

export { notifyError, notifySuccess };

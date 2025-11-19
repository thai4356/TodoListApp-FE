import type { ErrorResponse } from 'types/api';

import { message, notification } from 'antd';

const handleApiError = (err?: ErrorResponse) => {
  if (err) {
    if (err.data.message) {
      notification.warning({
        message: 'Notification',
        description: err.data.message,
        duration: 9,
        placement: 'topRight',
      });
    } else if (err.status) {
      switch (+err.status) {
        case 500:
          message.error('Please check the server!', 9);
          break;

        case 401:
          message.error('Please log in before using!', 9);
          break;

        case 400:
          message.error('Please check your operation again!', 9);
          break;

        default:
          message.error('Please check your system!', 9);
          break;
      }
    } else {
      message.error('Please check your Internet connection!', 9);
    }
  } else {
    message.error('Please check your Internet connection!', 9);
  }
};

export default handleApiError;

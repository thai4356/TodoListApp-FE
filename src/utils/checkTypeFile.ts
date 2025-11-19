// import type { UploadFile } from 'antd/lib/upload';

import { message } from 'antd';

// import { message } from 'antd';

/**
 * @param file
 * @param arrayTypeCheck
 * @param typeFile 'IMAGE', ... default Image
 * @returns
 */

function checkTypeFile(
  file: File,
  // | UploadFile<HTMLInputElement | File>,
  arrayTypeCheck: string[],
  isShowMessage?: boolean,
): boolean {
  let flag = false;

  arrayTypeCheck.forEach((item) => {
    if (file.type?.trim().includes(item.trim())) {
      flag = true;

      return flag;
    }
  });

  if (!flag && isShowMessage) {
    message.warning(
      arrayTypeCheck.reduce(
        (prev, curr, index) => (prev += `${curr.trim()}${index < arrayTypeCheck.length - 1 ? ', ' : ''}`),
        `Please select ${arrayTypeCheck.length <= 1 ? 'a file' : 'the file list'} format from the list of `,
      ) + ' formats',
    );
  }

  return flag;
}

export default checkTypeFile;

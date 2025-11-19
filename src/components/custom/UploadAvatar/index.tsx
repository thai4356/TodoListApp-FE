import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { FILE_ACCEPT } from 'config/constants';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseResponseUploadFile, LogoInfo } from 'types/SwaggerTypeUser';

const UploadAvatar = ({
  setAvatar,
  logo,
}: {
  logo?: LogoInfo;
  setAvatar: Dispatch<SetStateAction<BaseResponseUploadFile['data']>>;
}) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>(
    logo
      ? [
          {
            uid: logo?.id?.toString() ?? 'uid',
            name: logo?.id?.toString() ?? 'name',
            url: logo?.originUrl,
          },
        ]
      : [],
  );

  const onPreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src ?? '';
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleChange: (info: UploadChangeParam<UploadFile<BaseResponseUploadFile>>) => void = ({ file, fileList }) => {
    setFileList(fileList);

    if (file.status === 'done') {
      setAvatar(file.response?.data);
    }
  };

  return (
    <>
      <p className="text-base font-semibold">Avatar</p>
      <Upload
        action={`${import.meta.env.VITE_BASE_API_URL}/api/v1/media/upload-image`}
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        accept={FILE_ACCEPT.IMAGE}
        name="file"
        onChange={handleChange}
        className="mb-3"
      >
        {fileList.length >= 1 ? null : (
          <Button style={{ border: 0, background: 'none' }}>
            <PlusOutlined />
            <div style={{ marginTop: 0 }}>{t('upload')}</div>
          </Button>
        )}
      </Upload>
    </>
  );
};

export default UploadAvatar;

import { Form, Input, Skeleton } from 'antd';
import { useGetDeviceDetail, useUpdateDevice } from 'api/company/useDevice';
import { useCreateDevice } from 'api/company/useDevice';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import {
  FormAddUpdateDeviceSchema,
  validationAddUpdateDeviceForm,
} from 'pages/DeviceList/components/ModalAddUpdateDevice/validationAddUpdateDeviceForm';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';

export const ModalAddUpdateDevice = ({ deviceId, screen }: { deviceId: number; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateDeviceForm(t));
  const { mutate: createDevice } = useCreateDevice();
  const { mutate: updateDevice } = useUpdateDevice();
  const { data: getDeviceDetail, isFetching } = useGetDeviceDetail({ deviceId: deviceId }, { enabled: !!deviceId });

  const formItems: IFormBoxItem<FormAddUpdateDeviceSchema>[] = [
    {
      name: 'name',
      label: t('device_name'),
      required: true,
      children: <Input placeholder={t('device_name')} />,
    },
    {
      name: 'model',
      label: t('model'),
      required: true,
      children: <Input placeholder={t('model')} />,
    },
    {
      name: 'serial',
      label: t('serial'),
      required: true,
      children: <Input placeholder={t('serial')} />,
    },

    {
      name: 'status',
      label: t('status'),
      required: true,
      hidden: !deviceId,
      children: <SelectStatus />,
    },
  ];

  const handleCreateDeviceSubmit = (value: FormAddUpdateDeviceSchema) => {
    if (deviceId) {
      updateDevice(
        {
          ...value,
          id: deviceId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    } else {
      createDevice(value, {
        onSuccess: () => {
          removeModal();
        },
      });
    }
  };

  return isFetching ? (
    <Skeleton active />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...getDeviceDetail?.data,
      }}
      onFinish={handleCreateDeviceSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!deviceId} htmlType="submit" screen={screen} />
    </Form>
  );
};

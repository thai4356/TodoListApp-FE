import { Form, Input, Skeleton } from 'antd';
import { useGetProviderDeviceDetail, useUpdateProviderDevice } from 'api/company/useProviderDevice';
import { useCreateProviderDevice } from 'api/company/useProviderDevice';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import {
  FormAddUpdateProviderDeviceSchema,
  validationAddUpdateProviderDeviceForm,
} from 'pages/ProviderDevice/components/ModalAddUpdateProviderDevice/validationAddUpdateProviderDeviceForm';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';

export const ModalAddUpdateProviderDevice = ({
  providerDeviceId,
  screen,
}: {
  providerDeviceId: number;
  screen: ScreenType;
}) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateProviderDeviceForm(t));
  const { mutate: createProviderDevice } = useCreateProviderDevice();
  const { mutate: updateProviderDevice } = useUpdateProviderDevice();
  const { data: getProviderDeviceDetail, isFetching } = useGetProviderDeviceDetail(
    { providerDeviceId: providerDeviceId },
    { enabled: !!providerDeviceId },
  );

  const formItems: IFormBoxItem<FormAddUpdateProviderDeviceSchema>[] = [
    {
      name: 'name',
      label: t('provider_device_name'),
      required: true,
      children: <Input placeholder={t('provider_device_name')} />,
    },
    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('phone')} />,
    },
    {
      name: 'email',
      label: t('email'),
      required: true,
      children: <Input placeholder={t('email')} />,
    },
    {
      name: 'address',
      label: t('address'),
      required: true,
      children: <Input placeholder={t('address')} />,
    },
    {
      name: 'taxCode',
      label: t('tax_code'),
      required: true,
      children: <Input placeholder={t('tax_code')} />,
    },
    {
      name: 'description',
      label: t('description'),
      required: true,
      children: <Input placeholder={t('description')} />,
    },
    {
      name: 'status',
      label: t('status'),
      required: true,
      hidden: !providerDeviceId,
      children: <SelectStatus />,
    },
  ];

  const handleCreateProviderDeviceSubmit = (value: FormAddUpdateProviderDeviceSchema) => {
    if (providerDeviceId) {
      updateProviderDevice(
        {
          ...value,
          providerDeviceId: providerDeviceId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    } else {
      createProviderDevice(value, {
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
        ...getProviderDeviceDetail?.data,
      }}
      onFinish={handleCreateProviderDeviceSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!providerDeviceId} htmlType="submit" screen={screen} />
    </Form>
  );
};

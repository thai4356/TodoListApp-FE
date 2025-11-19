import { Form, Input, Skeleton } from 'antd';
import { useGetProviderContentDetail, useUpdateProviderContent } from 'api/company/useProviderContent';
import { useCreateProviderContent } from 'api/company/useProviderContent';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import {
  FormAddUpdateProviderContentSchema,
  validationAddUpdateProviderContentForm,
} from './validationAddUpdateProviderContentForm';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { useTranslation } from 'react-i18next';

export const ModalAddUpdateProviderContent = ({
  providerContentId,
  screen,
}: {
  providerContentId: number;
  screen: ScreenType;
}) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateProviderContentForm(t));
  const { mutate: createProviderContent } = useCreateProviderContent();
  const { mutate: updateProviderContent } = useUpdateProviderContent();
  const { data: getProviderContentDetail, isFetching } = useGetProviderContentDetail(
    { providerContentId: providerContentId },
    { enabled: !!providerContentId },
  );

  const formItems: IFormBoxItem<FormAddUpdateProviderContentSchema>[] = [
    {
      name: 'name',
      label: t('provider_content_name'),
      required: true,
      children: <Input placeholder={t('provider_content_name')} />,
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
      name: 'description',
      label: t('description'),
      required: true,
      children: <Input placeholder={t('description')} />,
    },

      {
      name: 'taxCode',
      label: t('tax_code'),
      required: true,
      hidden: !providerContentId,
      children: <Input placeholder={t('tax_code')} />,
    },
    {
      name: 'status',
      label: t('status'),
      required: true,
      hidden: !providerContentId,
      children: <SelectStatus />,
    },

    {
      name: 'tax_code',
      label: t('tax_code'),
      required: true,
      hidden: !!providerContentId,
      children: <Input placeholder={t('tax_code')} />,
    },
  ];

  const handleCreateProviderContentSubmit = (value: FormAddUpdateProviderContentSchema) => {
    if (providerContentId) {
      updateProviderContent(
        {
          ...value,
          id: providerContentId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    } else {
      createProviderContent(value, {
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
        ...getProviderContentDetail?.data,
      }}
      onFinish={handleCreateProviderContentSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!providerContentId} htmlType="submit" screen={screen} />
    </Form>
  );
};

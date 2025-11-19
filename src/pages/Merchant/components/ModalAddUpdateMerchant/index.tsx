import { Form, Input, Skeleton } from 'antd';
import { useGetMerchantDetail } from 'api/company/useMerchant';
import { useUpdateMerchant } from 'api/company/useMerchant';
import { SelectStatus } from 'components/atomic/common/Status';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { validationAddUpdateMerchantForm } from './validationAddUpdateMerchantForm';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { FormAddUpdateMerchantSchema } from './validationAddUpdateMerchantForm';

export const ModalAddUpdateMerchant = ({ merchantId, screen }: { merchantId: number; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateMerchantForm(t));
  const { mutate: updateMerchant } = useUpdateMerchant();
  const { data: getMerchantDetail, isFetching } = useGetMerchantDetail(
    { merchantId: merchantId },
    { enabled: !!merchantId },
  );

  const formItems: IFormBoxItem<FormAddUpdateMerchantSchema>[] = [
    {
      name: 'name',
      label: t('merchant_name'),
      required: true,
      children: <Input placeholder={t('merchant_name')} />,
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
      children: <Input placeholder={t('description')} />,
    },

    {
      name: 'status',
      label: t('status'),
      hidden: !merchantId,
      required: true,
      children: <SelectStatus />,
    },
  ];

  const handleCreateMerchantSubmit = (value: FormAddUpdateMerchantSchema) => {
    if (merchantId) {
      updateMerchant(
        {
          ...value,
          id: merchantId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
  };

  return isFetching ? (
    <Skeleton active />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...getMerchantDetail?.data,
      }}
      onFinish={handleCreateMerchantSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!merchantId} htmlType="submit" screen={screen} />
    </Form>
  );
};

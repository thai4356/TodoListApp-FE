import { useValidation } from 'hooks/form/useValidation';
import { useTranslation } from 'react-i18next';
import { ScreenType } from 'types';
import {
  FormAddUpdateMerchantBranchSchema,
  validationAddUpdateMerchantBranchForm,
} from './validationAddUpdateMerchantBranchForm';
import {
  useCreateMerchantBranch,
  useGetMerchantBranchDetail,
  useUpdateMerchantBranch,
} from 'api/company/useMerchantBranch';
import { IFormBoxItem } from 'types/components';
import { Form, Input, Select, Skeleton } from 'antd';
import { removeModal } from 'store/slices/modalSlice';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useGetMerchant } from 'api/company/useMerchant';

export const ModalAddUpdateMerchantBranch = ({
  merchantBranchId,
  screen,
}: {
  merchantBranchId: number;
  screen: ScreenType;
}) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateMerchantBranchForm(t));
  const { mutate: createMerchantBranch } = useCreateMerchantBranch();
  const { mutate: updateMerchantBranch } = useUpdateMerchantBranch();
  const { data: getMerchantBranchDetail, isFetching } = useGetMerchantBranchDetail(
    { merchantBranchId: merchantBranchId },
    { enabled: !!merchantBranchId },
  );

  const { data: merchant} = useGetMerchant({ page: 0, size: 1000 });

  const formItems: IFormBoxItem<FormAddUpdateMerchantBranchSchema>[] = [
    {
      name: 'address',
      label: t('address'),
      children: <Input placeholder={t('address')} />,
    },
    {
      name: 'description',
      label: t('description'),
      children: <Input placeholder={t('description')} />,
    },
    {
      name: 'merchantId',
      label: t('merchant'),
      children: (
        <Select
          placeholder={t('merchant')}
          options={merchant?.data?.map((item) => ({ label: item.name, value: item.id })) ?? []}
        />
      ),
    },
  ];

  const handleCreateMerchantBranchSubmit = (value: FormAddUpdateMerchantBranchSchema) => {
    if (merchantBranchId) {
      updateMerchantBranch(
        {
          ...value,
          id: merchantBranchId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    } else {
      createMerchantBranch(value, {
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
        ...getMerchantBranchDetail?.data,
      }}
      onFinish={handleCreateMerchantBranchSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!merchantBranchId} htmlType="submit" screen={screen} />
    </Form>
  );
};

import { Form, Input, InputNumber, Skeleton } from 'antd';
import { useCreateTransaction } from 'api/company/useTransaction';
import { useGetTransactionDetail } from 'api/company/useTransaction';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { FormAddTransactionSchema, validationAddTransactionForm } from './validationAddTransactionForm';

export const ModalAddTransaction = ({
  transactionId,
  screen,
}: {
  transactionId: number;
  screen: ScreenType;
}) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddTransactionForm());
  const { mutate: createTransaction } = useCreateTransaction();
  const { data: getTransactionDetail, isFetching } = useGetTransactionDetail(
    { transactionId: transactionId },
    { enabled: !!transactionId },
  );

  const formItems: IFormBoxItem<FormAddTransactionSchema>[] = [
    {
      name: 'amount',
      label: t('amount'),
      required: true,
      children: <InputNumber placeholder={t('amount')} />,
    },
    {
      name: 'paymentGateway',
      label: t('payment_gateway'),
      required: true,
      children: <Input placeholder={t('payment_gateway')} />,
    },
    {
      name: 'message',
      label: t('message'),
      required: true,
      children: <Input placeholder={t('message')} />,
    },

  ];

  const handleCreateTransactionSubmit = (value: FormAddTransactionSchema) => {
    createTransaction({ ...value, amount: Number(value.amount) }, {
      onSuccess: () => {
        removeModal();
      },
    });
  };

  return isFetching ? (
    <Skeleton active />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...getTransactionDetail?.data,
      }}
      onFinish={handleCreateTransactionSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!transactionId} htmlType="submit" screen={screen} />
    </Form>
  );
};

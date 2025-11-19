import { Form, Input } from 'antd';
import { useUpdateOtherCompanyPassword } from 'api/company/useCompany';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { REGEX } from 'config/constants';
import { useValidation } from 'hooks';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { IFormBoxItem } from 'types/components';
import { z } from 'zod';

const changePasswordSchema = (t: TFunction) => {
  return z
    .object({
      newPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .regex(REGEX.PASSWORD, { message: t('error_message.invalid_password') })
        .min(8, t('error_message.min_length_field', { field: t('auth.new_password'), length: 8 })),
      confirmPassword: z
        .string({
          required_error: t('error_message.min_length_field', { field: t('auth.new_password'), length: 8 }),
        })
        .regex(REGEX.PASSWORD, { message: t('error_message.invalid_password') })
        .min(8, t('error_message.please_enter_field', { field: t('auth.new_password') })),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });
};

type FormChangePasswordSchema = z.infer<ReturnType<typeof changePasswordSchema>>;

const ModalChangeAdminCompanyPassword = ({ id }: { id: number }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(changePasswordSchema(t));
  const { mutate: updateCompanyPassword } = useUpdateOtherCompanyPassword();

  const formItems: IFormBoxItem<FormChangePasswordSchema>[] = [
    {
      name: 'newPassword',
      label: t('auth.new_password'),
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.new_password') })} />,
    },
    {
      name: 'confirmPassword',
      label: t('auth.confirm_new_password'),
      required: true,
      rules: [
        rule,
        {
          validator(_, value) {
            if (value === form.getFieldValue('newPassword')) {
              return Promise.resolve();
            }
            return Promise.reject(t('error_message.field_not_match', { field: t('auth.password') }));
          },
        },
      ],
      children: (
        <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.confirm_new_password') })} />
      ),
    },
  ];

  const handleSubmitForm = (value: FormChangePasswordSchema) => {
    updateCompanyPassword({ ...value, userId: id }, { onSuccess: () => removeModal() });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
      <FormBoxItem listItems={formItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer isUpdate />
    </Form>
  );
};

export default ModalChangeAdminCompanyPassword;

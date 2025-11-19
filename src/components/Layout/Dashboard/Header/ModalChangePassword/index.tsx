import { Form, Input } from 'antd';
import { useSelfUpdateCompanyPassword } from 'api/company/useCompany';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice.ts';
import { IFormBoxItem } from 'types/components';
import { ChangePasswordReq } from 'types/SwaggerTypeUser.ts';
import { changePasswordSchema, FormChangePasswordSchema } from './validationChangePassword';
import { useValidation } from 'hooks';

const ModalChangePassword = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(changePasswordSchema(t));
  const { mutate: updateCompanyPassword } = useSelfUpdateCompanyPassword();

  const formItems: IFormBoxItem<FormChangePasswordSchema>[] = [
    {
      name: 'oldPassword',
      label: t('old_password'),
      required: true,
      children: <Input.Password placeholder={t('placeholder.enter_field', { field: t('old_password') })} />,
    },
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

  const handleSubmitForm = (value: ChangePasswordReq) => {
    updateCompanyPassword(
      { ...value },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
      <FormBoxItem listItems={formItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />

      <ButtonGlobal.Footer isUpdate />
    </Form>
  );
};

export default ModalChangePassword;

import { Button, Form, Input, Select, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useSentOTPProvider } from 'api';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import { PUBLIC_ROUTERS } from 'routes';
import { openModal } from 'store/slices/modalSlice';
import { IFormBoxItem } from 'types/components';
import ModalVerifyPhoneNumber from './components/ModalVerifyPhoneNumber';
import { FormRegisterProviderSchema, registerProviderSchema } from './validationRegisterForm';
import { useValidation } from 'hooks';

export const RegisterPage = () => {
  const { t } = useTranslation();

  const [form, rule] = useValidation(registerProviderSchema());
  const { mutate: sentOTP, isPending } = useSentOTPProvider();

  const handleSubmitForm = (values: FormRegisterProviderSchema): void => {
    const allValues = form.getFieldsValue();

    console.log("🔥 FULL FORM BEFORE OTP:", allValues);

    sentOTP(
      {
        email: allValues.email,
        type: allValues.type,
        purpose: allValues.purpose,
        fullname: allValues.fullname,
      },
      {
        onSuccess: (res) => {
          console.log("🔥 OTP RESPONSE:", res.data);

          openModal({
            content: (
              <ModalVerifyPhoneNumber
                registerFormValue={allValues}
                otpRes={res.data}
              />
            ),
            options: { title: t('auth.verify_phone_number'), width: 800 },
          });
        },
      },
    );
  };

  const formItems: IFormBoxItem<FormRegisterProviderSchema>[] = [
    { name: 'email', label: t('auth.email'), required: true, children: <Input /> },
    { name: 'fullname', label: t('Your name'), required: true, children: <Input /> },
    { name: 'type', label: t('Receive otp with'), required: true,
      children: <Select><Select.Option value="1">Send email</Select.Option></Select> },
    { name: 'purpose', label: t('Purpose'), required: true,
      children: <Select><Select.Option value="1">Create new account</Select.Option></Select> },
    { name: 'password', label: t('Password'), required: true, children: <Input.Password /> },
    { name: 'confirmPassword', label: t('Confirm password'), required: true, children: <Input.Password /> },
  ];

  return (
    <AppAuthentication title={t('auth.register')}>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm}>

        <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />

        {/* FIX QUAN TRỌNG */}
        <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
        >
          <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
            <div>Upload</div>
          </Upload>
        </Form.Item>

        <Button htmlType="submit" type="primary" loading={isPending} block>
          Register
        </Button>

        <div className="mt-4 text-center italic">
          Already have account?
          <Link to={PUBLIC_ROUTERS.LOGIN} className="ml-2 text-primary">Login</Link>
        </div>
      </Form>
    </AppAuthentication>
  );
};

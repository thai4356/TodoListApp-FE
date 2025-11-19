import { Button, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useSentOTPProvider } from 'api';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';

import { PUBLIC_ROUTERS } from 'routes';
import { openModal } from 'store/slices/modalSlice';
import { EPurposeSendOtpReq, ESendOtpReq } from 'types';
import { IFormBoxItem } from 'types/components';
import ModalVerifyPhoneNumber from './components/ModalVerifyPhoneNumber';
import { FormRegisterProviderSchema, registerProviderSchema } from './validationRegisterForm';
import { useValidation } from 'hooks';

export const RegisterPage = () => {
  const { t } = useTranslation();

  const [form, rule] = useValidation(registerProviderSchema());
  const { mutate: sentOTP, isPending } = useSentOTPProvider();


  const handleSubmitForm = (values: FormRegisterProviderSchema): void => {
    sentOTP(
      {
        email: values.email,
        type: values.type,
        purpose: values.purpose,
        fullname: values.fullname
      },
      {
        onSuccess: (res) => {
          openModal({
            content: <ModalVerifyPhoneNumber registerFormValue={{ ...values }} otpRes={res.data} />,
            options: {
              title: t('auth.verify_phone_number'),
              width: 800,
            },
          });
        },
        onError: () => { },
      },
    );
  };



  const formItems: IFormBoxItem<FormRegisterProviderSchema>[] = [
    {
      name: 'email',
      label: t('auth.email'),
      required: true,
      children: (
        <Input placeholder={t('placeholder.enter_field', { field: t('auth.email') })} />
      ),
    },

    {
      name: 'fullname',
      label: t('Your name'),
      required: true,
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.fullname') })} />,
    },

    {
      name: 'type',
      label: t('Receive otp with'),
      required: true,
      children: (
        <Select placeholder="Select type">
          <Select.Option value="1">Send email</Select.Option>
        </Select>
      ),
    },

    {
      name: 'purpose',
      label: t('Purpose'),
      required: true,
      children: (
        <Select placeholder="Select type">
          <Select.Option value="1">Create new account</Select.Option>
        </Select>
      ),
    },
    {
      name: 'password',
      label: t('Enter password'),
      required: true,
      children: <Input.Password placeholder="Enter password" />,
    },

    // THÊM CONFIRM PASSWORD
    {
      name: 'confirmPassword',
      label: t('Confirm your password'),
      required: true,
      children: <Input.Password placeholder="Confirm password" />,
    },
  ];


  return (
    <AppAuthentication title={t('auth.register')}>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm}>

        <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />

        <div>
          <Button htmlType="submit" type="primary" loading={isPending} block className="mt-10 font-semibold">
            {t('Register')}
          </Button>

          <div className="mt-4 text-center italic">
            {t('Already have account')}
            <Link to={PUBLIC_ROUTERS.LOGIN} className="ml-2 cursor-pointer font-semibold text-primary">
              {t('Login')}
            </Link>
          </div>
        </div>
      </Form>
    </AppAuthentication>
  );
};

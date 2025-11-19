import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { REGEX } from 'config/constants';

import { useSentOTPProvider } from 'api';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import { useAuthContext } from 'components/Layout/Auth/authProvider';
import { TFunction } from 'i18next';
import { PUBLIC_ROUTERS } from 'routes';
import { openModal } from 'store/slices/modalSlice';
import { EPurposeSendOtpReq, ESendOtpReq } from 'types';
import { z } from 'zod';
import ModalVerifyPhoneNumber from './components/ModalVerifyPhoneNumber';
import { useValidation } from 'hooks';

const schema = (t: TFunction) =>
  z.object({
    phone: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.phone') }) })
      .max(11, t('error_message.max_length_field', { field: t('phone'), length: 11 }))
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('auth.phone') })),
  });
type FormSchema = z.infer<ReturnType<typeof schema>>;

export const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));
  const { mutate: sentOTP, isPending } = useSentOTPProvider();
  const { recaptchaToken, refreshCaptcha } = useAuthContext();

  const handleSubmitForm = (values: FormSchema) => {
    sentOTP(
      {
        purpose: EPurposeSendOtpReq.PASSWORD_RESET,
        type: ESendOtpReq.ZNS,
        phone: values.phone,
        recaptchaToken,
      },
      {
        onSuccess: (res) => {
          openModal({
            content: <ModalVerifyPhoneNumber otpRes={res.data} />,
            options: {
              title: t('auth.verify_phone_number'),
              width: 800,
            },
          });
        },
        onError: () => {
          refreshCaptcha();
        },
      },
    );
  };

  return (
    <AppAuthentication title={t('auth.forgot_password')}>
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} className={classes['authentication_form']}>
        <div className="relative">
          <Form.Item name="phone" label={t('auth.phone')} rules={[rule]}>
            <Input placeholder={t('placeholder.enter_field', { field: t('auth.phone') })} />
          </Form.Item>
          <div className="absolute right-0 top-0">
            <Link to={PUBLIC_ROUTERS.LOGIN} className="text-sm text-primary no-underline">
              <span>{t('auth.back_to_login')}</span>
            </Link>
          </div>
        </div>
        <Button
          block
          htmlType="submit"
          loading={isPending}
          type="primary"
          className="flex h-10 items-center justify-center font-semibold"
        >
          {t('auth.continue')}
        </Button>
      </Form>
    </AppAuthentication>
  );
};

import { Button, Form, Input } from 'antd';
import { useRegisterProvider } from 'api';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTERS } from 'routes';
import { removeModal } from 'store/slices/modalSlice';
import { SendOtp } from 'types/SwaggerTypeUser';
import { z } from 'zod';
import { FormRegisterProviderSchema } from '../validationRegisterForm';
import { useValidation } from 'hooks';

const schema = (t: TFunction) =>
  z.object({
    code: z
      .string({ required_error: t('error_message.please_enter_field', { field: t('auth.otp') }) })
      .min(1, t('error_message.please_enter_field', { field: t('auth.otp') })),
  });
type FormSchema = z.infer<ReturnType<typeof schema>>;

const ModalVerifyPhoneNumber = ({
  registerFormValue,
  otpRes,
}: {
  registerFormValue: FormRegisterProviderSchema;
  otpRes: SendOtp;
}) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));
  const { mutate: register, isPending } = useRegisterProvider();
  const navigate = useNavigate();

  const handleConfirmPhone = (value: FormSchema) => {
    register(
      {
        ...registerFormValue,
        code: value.code,
        codeId: otpRes.id,
      },
      {
        onSuccess() {
          navigate(PRIVATE_ROUTERS.BUSINESS.OVERVIEW);
          removeModal();
        },
        onError() {
          form.setFields([
            {
              name: 'code',
              errors: ['OTP không đúng'],
            },
          ]);
        },
      },
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleConfirmPhone}>
      <Form.Item name="code" label={t('auth.otp_code')} required rules={[rule]}>
        <Input placeholder={t('placeholder.enter_field', { field: t('auth.otp_code') })} />
      </Form.Item>
      <div>
        <Button htmlType="submit" type="primary" loading={isPending} block className="mb-10 font-semibold">
          {t('auth.verify')}
        </Button>
      </div>
    </Form>
  );
};

export default ModalVerifyPhoneNumber;

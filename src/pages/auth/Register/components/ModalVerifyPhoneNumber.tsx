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
    const formData = new FormData();

    formData.append("email", registerFormValue.email);
    formData.append("fullname", registerFormValue.fullname);
    formData.append("password", registerFormValue.password);
    formData.append("confirmPassword", registerFormValue.confirmPassword);
    formData.append("type", registerFormValue.type);
    formData.append("purpose", registerFormValue.purpose.toString());
    formData.append("code", value.code);
    formData.append("codeId", String(otpRes.id ?? ""));

    // FIX QUAN TRỌNG — avatar là fileList[]
    if (registerFormValue.avatar?.[0]?.originFileObj) {
      formData.append("avatar", registerFormValue.avatar[0].originFileObj);
    }

    // Log tất cả FormData để debug
    console.log("🔥 FORM DATA SEND:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    register(formData, {
      onSuccess() {
        navigate(PRIVATE_ROUTERS.BUSINESS.OVERVIEW);
        removeModal();
      },
      onError() {
        form.setFields([{ name: 'code', errors: ['OTP không đúng'] }]);
      },
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleConfirmPhone}>
      <Form.Item name="code" label={t('auth.otp_code')} required rules={[rule]}>
        <Input placeholder={t('placeholder.enter_field', { field: t('auth.otp_code') })} />
      </Form.Item>
      <Button
        htmlType="submit"
        type="primary"
        loading={isPending}
        block
        className="mb-10 font-semibold"
      >
        {t('auth.verify')}
      </Button>
    </Form>
  );
};

export default ModalVerifyPhoneNumber;

import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { REGEX } from 'config/constants';

import { useLoginProvider } from 'api';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { AppAuthentication } from 'components/Layout/Auth/AppAuthentication';
import classes from 'components/Layout/Auth/AppAuthentication/AppAuthentication.module.scss';
import { useAuthContext } from 'components/Layout/Auth/authProvider';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { PUBLIC_ROUTERS } from 'routes';
import { IFormBoxItem } from 'types/components';
import { z } from 'zod';
import { useValidation } from 'hooks';

const schema = (t: TFunction) =>
  z.object({
    email: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.email') }),
      })
      .email(t('error_message.field_invalid', { field: t('auth.email') })), 
    passwordHashed: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.passwordHashed') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('auth.passwordHashed') })),
  });

type FormSchema = z.infer<ReturnType<typeof schema>>;

export const LoginPage = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(schema(t));
  const { refreshCaptcha } = useAuthContext();

  const { mutateAsync: login, isPending } = useLoginProvider();

  const handleSubmitForm = (values: FormSchema): void => {
    login(
      {
        email: values.email.trim(),
        passwordHashed: values.passwordHashed.trim(),
      },
      {
        onError: () => {
          refreshCaptcha();
        },
      },
    );
  };

  const formListItems: IFormBoxItem<FormSchema>[] = [
    {
      name: 'email',
      label: t('auth.email'),
      children: <Input placeholder={t('placeholder.enter_field', { field: t('auth.email') })} />,
    },
    {
      name: 'passwordHashed',
      label: t('auth.password'),
      children: (
        <div className="relative">
          <Input.Password placeholder={t('placeholder.enter_field', { field: t('auth.password') })} />
          <Link
            to={PUBLIC_ROUTERS.FORGOT_PASSWORD}
            className="absolute right-0 top-[-28px] text-sm text-primary no-underline"
          >
            <span>{t('auth.forgot_password')}</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AppAuthentication title={t('auth.login')} description={t('auth.paragraph.login_description')}>
      <Form
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={handleSubmitForm}
        initialValues={
          import.meta.env.DEV
            ? {
              email: '@gmail.com',
              passwordHashed: '123456',
            }
            : undefined
        }
        className={classes['authentication_form']}
      >
        <FormBoxItem listItems={formListItems} defaultSpan={24} columnGap={[20, 5]} rule={rule} />
        <div className={classes['login_button']}>
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isPending}
            className="mt-10 flex items-center justify-center font-semibold"
          >
            {t('auth.login')}
          </Button>
          <div className="mt-4 text-center italic">
            {t('auth.not_account')}.
            <Link to={PUBLIC_ROUTERS.REGISTER} className="ml-2 cursor-pointer font-semibold text-primary">
              {t('auth.register')}
            </Link>
          </div>
        </div>
      </Form>
    </AppAuthentication>
  );
};

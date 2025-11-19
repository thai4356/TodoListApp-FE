import { DatePicker, Form, Input, Skeleton } from 'antd';
import { useCreateCompanyUser, useGetProfile, useUpdateCompanyUser } from 'api/company/useCompany.ts';
import { SelectGender } from 'components/atomic/common/Gender.tsx';
import { SelectRoleType } from 'components/atomic/common/RoleType';
import { SelectStatus } from 'components/atomic/common/Status.tsx';
import SelectCompanyRole from 'components/atomic/company/CompanySelectRole.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import UploadAvatar from 'components/custom/UploadAvatar/index.tsx';
import { FORMAT_DATE } from 'config/constants';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';
import { BaseResponseUploadFile } from 'types/SwaggerTypeUser.ts';
import { FormAddUpdateAccountSchema, validationAddUpdateAccountForm } from './validationAddUpdateAccountForm.ts';
import { useValidation } from 'hooks';

export const ModalCreateUpdateAccount = ({ userId, screen }: { userId: number | undefined; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateAccountForm(t, !!userId));
  const { mutate: createUserAccount } = useCreateCompanyUser();
  const { mutate: updateUserAccount } = useUpdateCompanyUser();
  const [avatar, setAvatar] = useState<BaseResponseUploadFile['data']>();

  const { data: getProfile, isFetching } = useGetProfile({ accountId: userId }, { enabled: !!userId });

  const formItems: IFormBoxItem<FormAddUpdateAccountSchema>[] = [
    {
      name: 'name',
      label: t('name_account'),
      required: true,
      children: <Input placeholder={t('name_account')} />,
    },

    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('phone')} />,
    },
    {
      name: 'address',
      label: t('address'),
      hidden: !userId,
      children: <Input placeholder={t('address')} />,
    },
    {
      label: t('group_permission'),
      required: true,
      hidden: !userId,
      children: <SelectRoleType disabled />,
    },
    {
      name: 'roleId',
      label: t('role'),
      required: true,
      children: <SelectCompanyRole />,
    },
    {
      name: 'gender',
      label: t('gender'),
      hidden: !userId,
      children: <SelectGender />,
    },
    {
      name: 'birthday',
      label: t('birthday'),
      required: true,
      hidden: !userId,
      children: (
        <DatePicker
          allowClear={false}
          className={'w-full'}
          format={FORMAT_DATE.ASIA_HO_CHI_MINH}
          disabledDate={(d) => d > dayjs()}
        />
      ),
    },
    {
      name: 'status',
      label: t('status'),
      hidden: !userId,
      required: true,
      children: <SelectStatus screen={screen} />,
    },
    {
      name: 'password',
      label: t('password'),
      hidden: !!userId,
      required: true,
      children: <Input.Password placeholder={t('password')} />,
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
      hidden: !!userId,
      required: true,
      rules: [
        rule,
        {
          validator(_, value) {
            if (value === form.getFieldValue('password')) {
              return Promise.resolve();
            }
            return Promise.reject(t('error_message.field_not_match', { field: t('auth.password') }));
          },
        },
      ],
      children: <Input.Password placeholder={t('confirmPassword')} />,
    },
  ];

  const handleCreateAccountSubmit = (value: FormAddUpdateAccountSchema) => {
    if (userId) {
      updateUserAccount(
        {
          ...value,
          userId: userId,
          avatarId: avatar?.id,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    }
    createUserAccount(value, {
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
        ...getProfile?.data,
        roleId: getProfile?.data?.role?.roleId,
        birthday: getProfile?.data?.birthday ? dayjs(getProfile?.data.birthday) : '',
      }}
      onFinish={handleCreateAccountSubmit}
      autoComplete="off"
    >
      {userId && <UploadAvatar setAvatar={setAvatar} />}
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!userId} htmlType="submit" screen={screen} />
    </Form>
  );
};

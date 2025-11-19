import { DatePicker, Form, Input, Skeleton } from 'antd';
import { useGetMyCompanyProfile, useSelfUpdateCompanyProfile } from 'api/company/useCompany.ts';
import { SelectGender } from 'components/atomic/common/Gender.tsx';
import { SelectRoleType } from 'components/atomic/common/RoleType.tsx';
import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem.tsx';
import { FORMAT_DATE } from 'config/constants';
import { ERoleType } from 'config/enum/role.ts';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { IFormBoxItem } from 'types/components';
import { FormUpdateProfile, validationUpdateAccount } from './validationUpdateAccount.ts';
import { useValidation } from 'hooks';

const ModalUpdateCompanyAccount = () => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationUpdateAccount(t));

  const { data: myProfile, isFetching } = useGetMyCompanyProfile();
  const { mutate: updateProfile, isPending } = useSelfUpdateCompanyProfile();

  const formItems: IFormBoxItem<FormUpdateProfile>[] = [
    {
      name: 'name',
      label: t('name_account'),
      required: true,
      children: <Input placeholder={t('name_account')} />,
    },
    {
      name: 'email',
      label: t('email'),
      children: <Input placeholder={t('email')} />,
    },
    {
      name: 'address',
      label: t('address'),
      children: <Input placeholder={t('address')} />,
    },
    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('phone')} disabled />,
    },
    {
      label: t('group_permission'),
      children: <SelectRoleType disabled defaultValue={ERoleType.COMPANY} />,
    },
    {
      name: 'gender',
      label: t('gender'),
      children: <SelectGender />,
    },
    {
      label: t('role'),
      children: <Input defaultValue={myProfile?.data?.role?.roleName} disabled readOnly />,
    },
    {
      name: 'birthday',
      label: t('birthday'),
      required: true,
      children: (
        <DatePicker
          allowClear={false}
          className={'w-full'}
          format={FORMAT_DATE.ASIA_HO_CHI_MINH}
          disabledDate={(d) => d > dayjs()}
        />
      ),
    },
  ];

  const handleUpdateSubmit = (values: FormUpdateProfile) => {
    updateProfile(
      {
        ...values,
        birthday: values.birthday && dayjs(values.birthday).format(FORMAT_DATE.API),
      },
      {
        onSuccess: () => {
          removeModal();
        },
      },
    );
  };

  return isFetching ? (
    <Skeleton active />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...myProfile?.data,
        birthday: myProfile?.data?.birthday ? dayjs(myProfile?.data.birthday) : '',
      }}
      onFinish={handleUpdateSubmit}
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 5]} rule={rule} />
      <ButtonGlobal.Footer isUpdate loading={isPending} />
    </Form>
  );
};

export default ModalUpdateCompanyAccount;

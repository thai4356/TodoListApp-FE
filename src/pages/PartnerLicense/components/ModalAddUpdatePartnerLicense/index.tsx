import { Form, Input, Skeleton } from 'antd';
import { useUpdatePartnerLicense } from 'api/company/usePartnerLicense';
import { useCreatePartnerLicense } from 'api/company/usePartnerLicense';
import { useGetPartnerLicenseDetail } from 'api/company/usePartnerLicense';

import ButtonGlobal from 'components/custom/Button';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import { useValidation } from 'hooks';
import {
  FormAddUpdatePartnerLicenseSchema,
  validationAddUpdatePartnerLicenseForm,
} from 'pages/PartnerLicense/components/ModalAddUpdatePartnerLicense/validationAddUpdatePartnerLicenseForm';
import { useTranslation } from 'react-i18next';
import { removeModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { IFormBoxItem } from 'types/components';

export const ModalAddUpdatePartnerLicense = ({
  partnerLicenseId,
  screen,
}: {
  partnerLicenseId: number;
  screen: ScreenType;
}) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdatePartnerLicenseForm(t));
  const { mutate: createPartnerLicense } = useCreatePartnerLicense();
  const { mutate: updatePartnerLicense } = useUpdatePartnerLicense();
  const { data: getPartnerLicenseDetail, isFetching } = useGetPartnerLicenseDetail(
    { partnerLicenseId: partnerLicenseId },
    { enabled: !!partnerLicenseId },
  );

  const formItems: IFormBoxItem<FormAddUpdatePartnerLicenseSchema>[] = [
    {
      name: 'name',
      label: t('partner_license_name'),
      required: true,
      children: <Input placeholder={t('partner_license_name')} />,
    },
    {
      name: 'phone',
      label: t('phone'),
      required: true,
      children: <Input placeholder={t('phone')} />,
    },
    {
      name: 'email',
      label: t('email'),
      required: true,
      children: <Input placeholder={t('email')} />,
    },
    {
      name: 'address',
      label: t('address'),
      required: true,
      children: <Input placeholder={t('address')} />,
    },

    {
      name: 'taxCode',
      label: t('tax_code'),
      hidden: !partnerLicenseId,
      required: true,
      children: <Input placeholder={t('tax_code')} />,
    },
    {
      name: 'tax_code',
      label: t('tax_code'),
      required: true,
      hidden: !!partnerLicenseId,
      children: <Input placeholder={t('tax_code')} />,
    },
    {
      name: 'description',
      label: t('description'),
      children: <Input placeholder={t('description')} />,
    },
  ];

  const handleCreatePartnerLicenseSubmit = (value: FormAddUpdatePartnerLicenseSchema) => {
    if (partnerLicenseId) {
      updatePartnerLicense(
        {
          ...value,
          id: partnerLicenseId,
        },
        {
          onSuccess: () => {
            removeModal();
          },
        },
      );
      return;
    } else {
      createPartnerLicense(value, {
        onSuccess: () => {
          removeModal();
        },
      });
    }
  };

  return isFetching ? (
    <Skeleton active />
  ) : (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...getPartnerLicenseDetail?.data,
      }}
      onFinish={handleCreatePartnerLicenseSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <ButtonGlobal.Footer isUpdate={!!partnerLicenseId} htmlType="submit" screen={screen} />
    </Form>
  );
};

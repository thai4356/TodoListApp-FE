import { SelectProps } from "antd";
import { SelectGlobal } from "components/custom/Select";
import { useTranslation } from "react-i18next";

export const SelectScopeMobileId = (props: SelectProps) => {
  const { t } = useTranslation();
  const options = [
    {
      label: 'Public',
      value: 'public',
    },
    {
      label: 'Mobile-id',
      value: 'mobile-id',
    },
  ];
  return <SelectGlobal options={options} placeholder={t('placeholder.select_field', { field: t('scope') })} {...props} />;
};
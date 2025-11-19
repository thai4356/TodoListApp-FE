import { SelectProps } from 'antd';
import { SelectGlobal } from 'components/custom/Select';
import { useTranslation } from 'react-i18next';

export const SelectScope = (props: SelectProps) => {
  const { t } = useTranslation();
  const options = [
    {
      label: 'EKYC',
      value: 'ekyc',
    },
    {
      label: 'Mobile-id',
      value: 'mobile-id',
    },
  ];
  return (
    <SelectGlobal options={options} placeholder={t('placeholder.select_field', { field: t('scope') })} {...props} />
  );
};

import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { getRoleType } from 'config/enum';
import { useTranslation } from 'react-i18next';
import { RoleType } from 'types';

const roleTypeOptions = [
  {
    label: 'provider_device',
    value: RoleType.PROVIDER_DEVICE,
  },
  {
    label: 'provider_content',
    value: RoleType.PROVIDER_CONTENT,
  },
  {
    label: 'merchant',
    value: RoleType.MERCHANT,
  },
];

const SelectRoleType = (props: SelectProps) => {
  const { t } = useTranslation();

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('role') })}
      options={roleTypeOptions}
      value={props.value ?? getRoleType()}
      defaultValue={props.defaultValue ?? getRoleType()}
      {...props}
    />
  );
};

export { SelectRoleType };

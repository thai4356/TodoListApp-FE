import type { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { ICStatus } from 'components/icon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenType, Status } from 'types';
import { checkPermission } from 'utils/checkPermission';

const map = {
  [Status.ACTIVE]: 'active',
  [Status.INACTIVE]: 'inactive',
};

const useStatusValues = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label: t(
            map[
              item as unknown as keyof {
                [key in Status]: string;
              }
            ],
          ),
          value: Number(item),
        };
      }),
    [t],
  );
};

const DisplayStatus = ({ value }: { value: Status }) => {
  return <ICStatus className={value === Status.ACTIVE ? 'text-primary' : 'text-gray-500'} />;
};

const SelectStatus = (props: SelectProps & { screen?: ScreenType }) => {
  const { t } = useTranslation();
  const statusOption = useStatusValues();
  const permission = checkPermission(props.screen);

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('status') })}
      options={statusOption}
      disabled={permission ? !permission.isApproval : props.disabled}
      {...props}
    />
  );
};

export { DisplayStatus, SelectStatus };

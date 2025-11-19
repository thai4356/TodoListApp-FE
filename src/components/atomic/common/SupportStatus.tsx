import type { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenType, SupportStatus } from 'types';
import { checkPermission } from 'utils/checkPermission';

const map = {
  [SupportStatus.WAITING]: 'waiting',
  [SupportStatus.PROCESSING]: 'processing',
  [SupportStatus.DONE]: 'done',
};

const useSupportStatusValues = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label: t(
            map[
              item as unknown as keyof {
                [key in SupportStatus]: string;
              }
            ],
          ),
          value: Number(item),
        };
      }),
    [t],
  );
};

const DisplaySupportStatus = ({ value }: { value: SupportStatus }) => {
  const { t } = useTranslation();
  const classNameStrategy = (value: SupportStatus) => {
    switch (value) {
      case SupportStatus.DONE:
        return 'text-green-500';
      case SupportStatus.PROCESSING:
        return 'text-blue-400';
      case SupportStatus.WAITING:
      default:
        return 'text-red-500';
    }
  };
  return <div className={classNameStrategy(value) + ' font-semibold'}>{t(map[value])}</div>;
};

const SelectSupportStatus = (props: SelectProps & { screen?: ScreenType }) => {
  const { t } = useTranslation();
  const statusOption = useSupportStatusValues();
  const permission = checkPermission(props.screen);

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('status') })}
      disabled={permission ? !permission.isApproval : props.disabled}
      options={statusOption}
      {...props}
    />
  );
};

export { DisplaySupportStatus, SelectSupportStatus };

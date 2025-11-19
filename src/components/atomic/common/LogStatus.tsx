import type { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogStatus } from 'types';

const map = {
  [LogStatus.INIT]: 'init',
  [LogStatus.INIT_FAIL]: 'init_fail',
  [LogStatus.INIT_SUCCESS]: 'init_success',
  [LogStatus.VERIFY_CODE_FAIL]: 'verify_code_fail',
  [LogStatus.VERIFY_CODE_SUCCESS]: 'verify_code_success',
};

const useLogStatusValues = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label: t(
            map[
              item as unknown as keyof {
                [key in LogStatus]: string;
              }
            ],
          ),
          value: Number(item),
        };
      }),
    [t],
  );
};

const DisplayLogStatus = ({ value }: { value: LogStatus }) => {
  const { t } = useTranslation();
  const classNameStrategy = (value: LogStatus) => {
    switch (value) {
      case LogStatus.VERIFY_CODE_SUCCESS:
        return 'text-green-500';
      case LogStatus.INIT:
      case LogStatus.INIT_SUCCESS:
        return 'text-blue-400';
      case LogStatus.INIT_FAIL:
      case LogStatus.VERIFY_CODE_FAIL:
      default:
        return 'text-red-500';
    }
  };
  return <div className={classNameStrategy(value) + ' font-semibold'}>{t(map[value])}</div>;
};

const SelectLogStatus = (props: SelectProps) => {
  const { t } = useTranslation();
  const statusOption = useLogStatusValues();

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('status') })}
      options={statusOption}
      allowClear={props.allowClear ?? true}
      {...props}
    />
  );
};

export { DisplayLogStatus, SelectLogStatus };

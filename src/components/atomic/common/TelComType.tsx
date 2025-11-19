import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { ETelComType } from 'config/enum';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const map = {
  [ETelComType.MOBIFONE]: 'MOBIFONE',
  [ETelComType.VIETTEL]: 'VIETTEL',
  [ETelComType.VINAPHONE]: 'VINAPHONE',
};

const useTelComTypeValues = () => {
  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label:
            map[
              item as unknown as keyof {
                [key in ETelComType]: string;
              }
            ],
          value: Number(item),
        };
      }),
    [],
  );
};

const DisplayTelComType = ({ value }: { value: ETelComType }) => {
  return useMemo(() => map[value], [value]);
};

const SelectTelComType = (props: SelectProps) => {
  const { t } = useTranslation();
  const options = useTelComTypeValues();

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('telephone_company') })}
      options={options}
      {...props}
    />
  );
};

export { DisplayTelComType, SelectTelComType };

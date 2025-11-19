import { SelectProps } from 'antd/lib';
import { SelectGlobal } from 'components/custom/Select';
import { Gender } from 'config/enum';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const map = {
  [Gender.MALE]: 'male',
  [Gender.FEMALE]: 'female',
};

const useGenderValues = () => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      Object.keys(map).map((item) => {
        return {
          label: t(
            map[
            item as unknown as keyof {
              [key in Gender]: string;
            }
            ],
          ),
          value: Number(item),
        };
      }),
    [t],
  );
};

const DisplayGender = ({ value }: { value: Gender }) => {
  const { t } = useTranslation();

  return useMemo(() => t(map[value]), [t, value]);
};

const SelectGender = (props: SelectProps) => {
  const { t } = useTranslation();
  const genderOption = useGenderValues();
  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('gender') })}
      options={genderOption}
      {...props}
    />
  );
};

export { DisplayGender, SelectGender };

/* eslint-disable react-refresh/only-export-components */
import type { SwitchCustomProps } from 'types/components';

import { Switch } from 'antd';
import { memo, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SwitchCustom = ({ isChecked, id, onChange }: SwitchCustomProps) => {
  const [searchParams] = useSearchParams();

  const [isCheckedInside, setIsCheckedInside] = useState<boolean>(isChecked || false);

  const handleChangeSwitch = (checked: boolean): void => {
    setIsCheckedInside((prevState) => !prevState);
    onChange(checked, id);
  };

  useMemo((): void => {
    setIsCheckedInside(isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, searchParams.get('id')]);

  return <Switch checked={isCheckedInside} onChange={handleChangeSwitch} />;
};

export default memo(SwitchCustom);

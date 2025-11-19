import { useCallback, useState } from 'react';

export const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(!!defaultValue);

  return {
    value,
    setValue,
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
    toggle: useCallback(() => setValue((x) => !x), []),
  };
};

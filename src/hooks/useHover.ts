import { useState, type RefObject } from 'react';

import { useEventListener } from '.';

export function useHover<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>): boolean {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (!value) {
      setValue(true);
    }
  };
  const handleMouseLeave = () => {
    if (value) {
      setValue(false);
    }
  };

  useEventListener('mouseenter', handleMouseEnter, elementRef);
  useEventListener('mouseleave', handleMouseLeave, elementRef);

  return value;
}

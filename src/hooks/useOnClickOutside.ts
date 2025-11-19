import { RefObject } from 'react';

import { useEventListener } from '.';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, (event) => {
    // Do nothing if clicking ref's element or descendent elements
    if (!ref?.current || ref?.current.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
}

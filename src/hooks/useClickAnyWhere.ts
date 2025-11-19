import { useEventListener } from '.';

type Handler = (event: MouseEvent) => void;

export const useClickAnyWhere = (handler: Handler) => {
  useEventListener('click', (event) => {
    handler(event);
  });
};

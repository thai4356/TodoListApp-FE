import { useIsomorphicLayoutEffect } from '.';

export const useDocumentTitle = (title: string): void => {
  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};

import { useBoolean } from 'hooks';
import { createContext, useContext } from 'react';

type DashboardCtx = {
  isCollapsed: ReturnType<typeof useBoolean>;
};

export const DashboardContext = createContext<DashboardCtx | null>(null);

export const useDashboardContext = () => {
  const c = useContext(DashboardContext);
  if (c) return c;
  throw new Error('DashboardContext is null');
};

import type { ReactNode } from 'react';
import type { ScreenType } from 'types/index';
import { checkPermission } from 'utils/checkPermission';
import NotFound from '../../pages/NotFound/NotFound';

const Permission = ({
  screen,
  children,
  noAccess = <NotFound />,
}: {
  children: ReactNode;
  noAccess?: ReactNode;
  screen?: ScreenType;
}) => {
  if (!screen) return children;

  const permissions = checkPermission(screen);

  if (permissions?.isView) return children;
  return noAccess;
};

export default Permission;

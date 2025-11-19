import { app } from 'routes';
import store from 'store';
import { ScreenType } from 'types';

// must use inside components or custom hooks
export const checkPermission = (screen: ScreenType) => {
  const permissions = store.getState().user[app]?.permissions;
  return permissions?.find((p) => p.permission === screen);
};
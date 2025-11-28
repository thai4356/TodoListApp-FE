import AuthLayout from 'components/Layout/Auth';
import { PrivateRoute } from 'components/Layout/Dashboard/PrivateRoute';
import { APP } from 'config/constants';
import { NotFoundPage } from 'pages/NotFound';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import { faCashRegister, faCircleUser, faComputer, faFeather, faFileInvoiceDollar, faHandshake, faHouse, faMusic, faPerson, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Permission from 'components/permission';
import { ForgotPasswordPage } from 'pages/auth/ForgotPassword';
import { LoginPage } from 'pages/auth/Login';
import { RegisterPage } from 'pages/auth/Register';
import OverviewPage from 'pages/Overview';
import { ScreenType } from 'types';
import { checkPermission } from 'utils/checkPermission';
import { PRIVATE_ROUTERS, PUBLIC_ROUTERS } from './router';
import CompanyListAccount from 'pages/UserListAccount';
import TeamDetailPage from 'pages/TeamDetail';

import ProviderDevice from 'pages/ProviderDevice';
import ProviderContent from 'pages/ProviderContent';
import DeviceList from 'pages/DeviceList';
import Song from 'pages/song';
import PartnerLicense from 'pages/PartnerLicense';
import Merchant from 'pages/Merchant';
import MerchantBranch from 'pages/MerchantBranch';
import Role from 'pages/Role';
import Transaction from 'pages/Transaction';

import UserListPage from 'pages/UserListAccount';
import UserInfoPage from 'pages/Account';
import TeamPage from 'pages/Team';

export { PRIVATE_ROUTERS, PUBLIC_ROUTERS } from './router';

export type Routes = RouteObject & {
  path: string;
  name?: string; // not need to wrap translation
  screen?: ScreenType;
  icon?: string | JSX.Element;
  hidden?: boolean;
  children?: Routes[] | undefined;
  element?: JSX.Element;
};

const getApp = () => {
  return APP.USER;
};
export const app = getApp();

export const navigateToPublicRoute = () => PUBLIC_ROUTERS.LOGIN;
export const navigateToPrivateRoute = () => {
  return PRIVATE_ROUTERS.BUSINESS.OVERVIEW;
};

const publicRoutes: RouteObject[] = [
  { path: PUBLIC_ROUTERS.LOGIN, element: <LoginPage /> },
  { path: PUBLIC_ROUTERS.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: PUBLIC_ROUTERS.REGISTER, element: <RegisterPage /> },
  { path: '*', element: <Navigate to={navigateToPublicRoute()} /> },
] as const;

const businessRoutes: Routes[] = [
  {
    path: PRIVATE_ROUTERS.BUSINESS.BASE,
    name: 'account',
    element: <Navigate to={PRIVATE_ROUTERS.BUSINESS.ACCOUNT} />,
    hidden: true,
  },
  // {
  //   path: PRIVATE_ROUTERS.BUSINESS.OVERVIEW,
  //   element: <OverviewPage />,
  //   name: 'overview',
  //   screen: 'DASHBOARD',
  //   icon: <FontAwesomeIcon icon={faHouse} />,
  // },
  // {
  //   path: PRIVATE_ROUTERS.BUSINESS.ACCOUNT,
  //   element: <CompanyListAccount />,
  //   name: 'account',
  //   screen: 'ACCOUNT',
  //   icon: <FontAwesomeIcon icon={faCircleUser} />,
  // },

  {
    path: PRIVATE_ROUTERS.BUSINESS.PROVIDER_DEVICE,
    element: <ProviderDevice />,
    name: 'provider_device',
    screen: 'PROVIDER_DEVICE',
    icon: <FontAwesomeIcon icon={faComputer} />,
  },
  {
    path: PRIVATE_ROUTERS.BUSINESS.PROVIDER_CONTENT,
    element: <ProviderContent />,
    name: 'provider_content',
    screen: 'PROVIDER_CONTENT',
    icon: <FontAwesomeIcon icon={faFeather} />,
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.DEVICE,
    element: <DeviceList />,
    name: 'device',
    screen: 'DEVICE',
    icon: <FontAwesomeIcon icon={faCashRegister} />,
  },


  {
    path: PRIVATE_ROUTERS.BUSINESS.SONG,
    element: <Song />,
    name: 'song',
    screen: 'SONG',
    icon: <FontAwesomeIcon icon={faMusic} />,
  },


  {
    path: PRIVATE_ROUTERS.BUSINESS.PARTNER_LICENSE,
    element: <PartnerLicense />,
    name: 'partner_license',
    screen: 'PARTNER_LICENSE',
    icon: <FontAwesomeIcon icon={faHandshake} />,
  },


  {
    path: PRIVATE_ROUTERS.BUSINESS.MERCHANT,
    element: <Merchant />,
    name: 'merchant',
    screen: 'MERCHANT',
    icon: <FontAwesomeIcon icon={faShop} />,
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.MERCHANT_BRANCH,
    element: <MerchantBranch />,
    name: 'merchant_branch',
    screen: 'MERCHANT_BRANCH',
    icon: <FontAwesomeIcon icon={faShop} />,
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.ROLE,
    element: <Role />,
    name: 'role',
    screen: 'ROLE',
    icon: <FontAwesomeIcon icon={faPerson} />,
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.TRANSACTION,
    element: <Transaction />,
    name: 'transaction',
    screen: 'TRANSACTION',
    icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
  },
  {
    path: '*',
    hidden: true,
    element: <Navigate to={PRIVATE_ROUTERS.BUSINESS.OVERVIEW} />,
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.USER,
    element: <UserListPage />,
    name: 'user'
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.ACCOUNT,
    element: <UserInfoPage />,
    name: 'account info'
  },

  {
    path: PRIVATE_ROUTERS.BUSINESS.TEAM,
    element: <TeamPage />,
    name: 'My team'
  },

  {
    path: '/team/:teamId',
    element: <TeamDetailPage />,
  }

];

const checkPermissionView = (menu: Routes[]): Routes[] => {
  const result: Routes[] = [];
  for (const item of menu) {
    // if permission = undefined => permission not require
    const hasViewPermission = item.screen ? checkPermission(item.screen)?.isView : true;
    const filteredChildren = item.children ? checkPermissionView(item.children) : [];
    if (hasViewPermission) {
      if (filteredChildren.length)
        result.push({
          ...item,
          children: filteredChildren,
        } as Routes);
      else if (item.children === undefined)
        result.push({
          ...item,
        });
    }
  }
  return result;
};

export const useCompanyRoutes = () => checkPermissionView(businessRoutes);

const transformToRouteObjects = (routes: Routes[]): RouteObject[] => {
  return routes.map((route) => {
    const { path, element, children, screen, ...rest } = route;

    if (children?.length) {
      return {
        path,
        children: transformToRouteObjects(children),
      };
    }
    return {
      ...rest,
      path,
      element: <Permission screen={screen}>{element}</Permission>,
    };
  });
};

export const routers = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: publicRoutes,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: PRIVATE_ROUTERS.BUSINESS.BASE,
        children: transformToRouteObjects(businessRoutes),
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

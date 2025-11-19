import { Layout } from 'antd';
import ModalPortal from 'components/Modal/ModalPortal';
import { checkLoginUser } from 'config/api';
import { Navigate } from 'react-router-dom';
import { navigateToPublicRoute } from 'routes';
import DashboardLayout from '.';

export const PrivateRoute = () => {
  return checkLoginUser() ? (
    <Layout>
      <ModalPortal />
      <DashboardLayout />
    </Layout>
  ) : (
    <Navigate to={navigateToPublicRoute()} />
  );
};

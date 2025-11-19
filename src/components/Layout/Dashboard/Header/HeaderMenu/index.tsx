import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, BreadcrumbProps } from 'antd';
import { t } from 'i18next';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { navigateToPrivateRoute, Routes, useCompanyRoutes } from 'routes';

const generateBreadcrumbs = (routes: Routes[], currentPath: string): BreadcrumbProps['items'] => {
  const findBreadcrumbPath = (routes: Routes[], path?: string): { label: React.ReactNode; path?: string }[] | null => {
    for (const route of routes) {
      if (route.path && path && matchPath(route.path, path)) {
        if (route.index) {
          return [{ label: t(String(route.name)), path: undefined }];
        }
        return [{ label: t(String(route.name)), path: undefined }];
      }

      if (route.children) {
        const childPath = findBreadcrumbPath(route.children, path);
        if (childPath) {
          return [{ label: <Link to={route.path}>{t(String(route.name))}</Link>, path: route.path }, ...childPath];
        }
      }
    }
    return null;
  };

  const breadcrumbPath = findBreadcrumbPath(routes, currentPath);

  if (!breadcrumbPath) {
    return [];
  }

  return breadcrumbPath.map((item) => ({
    key: item.path,
    title: item.label,
    href: item.path,
  }));
};

export default function HeaderMenu() {
  const location = useLocation();
  const businessRoutes = useCompanyRoutes();
  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to={navigateToPrivateRoute()}>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      ),
    },
    ...(generateBreadcrumbs(businessRoutes, location.pathname) ?? []),
  ];

  return <Breadcrumb items={breadcrumbItems} className="w-full gap-3 text-lg" />;
}

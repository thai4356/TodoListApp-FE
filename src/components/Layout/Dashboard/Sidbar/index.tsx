import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Image, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigateToPrivateRoute, Routes, useCompanyRoutes } from 'routes';
import { ScreenType } from 'types';
import { RootState } from 'types/store';
import { useDashboardContext } from '../dashboardProvider';
import logoITS from '/images/logo_its.png';
import logoITSCollapse from '/images/logo_its_sidebar.png';

type MenuItem = ItemType & {
  permission?: ScreenType;
  children?: MenuItem[];
};

const mapRoutesToMenuItems = (routes: Routes[]): MenuItem[] => {
  const transformRoutes = (routes: Routes[]): MenuItem[] => {
    return routes
      .filter((route) => !route.hidden || route.children?.length)
      .map((route) => {
        const { name, icon, children, path } = route;
        const indexRoute = children?.find((c) => c.index) as Routes;

        if (indexRoute) {
          //if is indexRoute, render immediately index, not dropdown children
          return {
            key: indexRoute.path,
            label: t(String(indexRoute.name)),
            icon: indexRoute.icon,
            children: indexRoute.children?.length ? transformRoutes(indexRoute.children) : undefined,
          };
        }
        return {
          key: path,
          label: t(name ?? ''),
          icon: icon,
          children: children?.length ? transformRoutes(children) : undefined,
        };
      });
  };

  return transformRoutes(routes);
};

export const Sidebar = () => {
  const { isCollapsed } = useDashboardContext();
  const location = useLocation();
  const currentUser = useSelector((state: RootState) => state.user);
  const lang = useSelector((state: RootState) => state.locale).lang;
  const navigate = useNavigate();
  const businessRoutes = useCompanyRoutes();

  const [sidebarActiveKey, setSidebarActiveKey] = useState<string[]>([location.pathname]);

  const menuItems = useMemo(() => {
    return mapRoutesToMenuItems(businessRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, lang, location.pathname]);

  useEffect(() => {
    menuItems.forEach((item) => {
      const key = String(item?.key);
      if (!key) return;
      if (location.pathname.startsWith(key)) {
        setSidebarActiveKey([key, location.pathname]);
      }
    });
  }, [location.pathname, menuItems]);

  return (
    <div className="flex h-dvh flex-col justify-between gap-3 pb-2">
      <Link to={navigateToPrivateRoute()} className="my-3 flex justify-center">
        {!isCollapsed.value ? (
          <Image preview={false} src={logoITS} alt="Logo ITS" width={120} height={80} />
        ) : (
          <Image preview={false} src={logoITSCollapse} alt="Logo ITS" width={50} height={40} />
        )}
      </Link>

      <Menu
        className="flex-1 overflow-y-auto"
        selectedKeys={sidebarActiveKey}
        onClick={({ key }) => navigate(key)}
        theme="light"
        mode="inline"
        items={menuItems}
      />
      <div className={isCollapsed.value ? 'place-self-center' : 'mr-3 place-self-end'}>
        <Button
          type="text"
          className="w-full"
          icon={
            isCollapsed.value ? (
              <FontAwesomeIcon icon={faSquareCaretRight} size="xl" />
            ) : (
              <FontAwesomeIcon icon={faSquareCaretLeft} size="xl" />
            )
          }
          onClick={() => {
            isCollapsed.toggle();
          }}
        />
      </div>
    </div>
  );
};

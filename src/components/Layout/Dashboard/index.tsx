import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { FOOTER_CONTENT } from 'config/constants';

import { useBoolean } from 'hooks';
import classes from './Dashboard.module.scss';
import { DashboardContext } from './dashboardProvider';
import AppHeader from './Header';
import { Sidebar } from './Sidbar';
const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = () => {
  const isCollapsed = useBoolean(false);

  return (
    <DashboardContext.Provider value={{ isCollapsed }}>
      <Layout className={`h-screen ${classes.dashboard}`}>
        <Layout hasSider>
          <Sider
            collapsed={isCollapsed.value}
            trigger={null}
            collapsible
            theme="light"
            width={250}
            style={{
              borderRight: '1px #f0f0f0 solid',
            }}
            className="z-10 overflow-y-auto"
          >
            <Sidebar />
          </Sider>

          <Layout>
            <Header>
              <AppHeader />
            </Header>

            <Layout className={classes['layout-collapsed']}>
              <Content className="bg-zinc-100 p-4">
                <Content className="h-[calc(100vh-120px)] rounded bg-white p-4">
                  <Outlet />
                </Content>
              </Content>
            </Layout>

            <Footer className="flex items-center justify-end bg-primary p-0 text-xs font-bold text-white">
              <FontAwesomeIcon icon={faCopyright} className="mr-2 flex items-center rounded-full" /> {FOOTER_CONTENT}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;

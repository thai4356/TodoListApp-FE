import { App, ConfigProvider as ConfigProviderAntd, theme } from 'antd';
import enLocale from 'antd/locale/en_US';
import viLocale from 'antd/locale/vi_VN';
import { COLOR_PRIMARY, LANG } from 'config/constants';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/store';
const { defaultAlgorithm } = theme;

export default function ConfigProvider({ children }: { children: ReactNode }) {
  const lang = useSelector((state: RootState) => state.locale).lang;

  return (
    <ConfigProviderAntd
      locale={lang !== LANG.VI ? enLocale : viLocale}
      theme={{
        token: {
          colorPrimary: COLOR_PRIMARY,
          fontFamily: 'Inter',
          colorBgTextHover: 'rgba(0,0,0,0.01)',
        },
        hashed: false,
        algorithm: defaultAlgorithm,
        components: {
          Breadcrumb: {
            linkColor: COLOR_PRIMARY,
            linkHoverColor: 'rgba(0, 145, 140, 0.5)',
            separatorMargin: 12,
          },
          Menu: {
            itemColor: 'rgba(0,0,0,0.35)',
            itemSelectedBg: 'rgba(0, 145, 140, 0.1)',
            itemHoverColor: 'rgba(0, 145, 140, 0.8)',
            itemActiveBg: 'rgba(0, 145, 140, 0.05)',
            fontSize: 15,
            iconMarginInlineEnd: 16,
            groupTitleFontSize: 20,
          },
          Tabs: {
            fontSize: 15,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProviderAntd>
  );
}

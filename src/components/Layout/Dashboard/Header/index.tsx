import type { MenuProps } from 'antd';

import { Dropdown, Image } from 'antd';
import HeaderMenu from 'components/Layout/Dashboard/Header/HeaderMenu';
import { LANG } from 'config/constants';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { app } from 'routes';
import store from 'store';
import { setLang } from 'store/slices/localeSlice';
import { openModal } from 'store/slices/modalSlice';
import { logoutUser } from 'store/slices/userSlice';
import { RootState } from 'types/store';
import ModalChangePassword from './ModalChangePassword';
import defaultAvatar from '/images/default-avatar-bpthumb.png';
import ModalUpdateCompanyAccount from './ModalUpdateCompanyAccount/index';

enum EMenu {
  PROFILE,
  ACCOUNT,
  CHANG_PASSWORD,
  LOGOUT,
  CHANGE_LANG,
}

export const KEY_LIST_CUSTOMER = 'KEY_LIST_CUSTOMER';
export const KEY_UPDATE_LIST_CUSTOMER = 'KEY_UPDATE_LIST_CUSTOMER';

const AppHeader = () => {
  const { t, i18n } = useTranslation();
  const lang = store.getState().locale.lang;

  const currentUser = useSelector((state: RootState) => state.user);

  const changeLang = () => {
    if (lang !== LANG.EN) {
      setLang(LANG.EN);
      i18n.changeLanguage(LANG.EN);
      return;
    }

    setLang(LANG.VI);
    i18n.changeLanguage(LANG.VI);
  };

  const itemsMenuDropdown = useMemo((): MenuProps['items'] => {
    const items: MenuProps['items'] = [
      {
        key: EMenu.ACCOUNT,
        label: t('account_information'),
        onClick: () =>
          openModal({
            content: <ModalUpdateCompanyAccount />,
            options: {
              width: 1000,
              title: t('account_information'),
            },
          }),
      },
      {
        key: EMenu.CHANG_PASSWORD,
        label: t('change_password'),
        onClick: () =>
          openModal({
            content: <ModalChangePassword />,
            options: {
              width: 1000,
              title: t('update_field', { field: t('password') }),
            },
          }),
      },
      {
        key: EMenu.CHANGE_LANG,
        label: lang === LANG.EN ? 'Tiếng việt' : 'English',
        onClick: () => changeLang(),
      },
      {
        key: EMenu.LOGOUT,
        label: t('log_out'),
        onClick: logoutUser,
      },
    ];
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, lang]);

  return (
    <div className="flex h-full items-center justify-between px-8">
      <HeaderMenu />

      <div className="flex h-full w-full items-center justify-end gap-3">
        <Dropdown
          menu={{
            items: itemsMenuDropdown,
          }}
          placement="bottom"
          className="h-full"
        >
          <div>
            <div className="flex h-full items-center justify-between">
              <div className="flex h-full w-10 items-center overflow-hidden">
                <Image
                  src={currentUser?.[app]?.avatar?.originUrl ?? defaultAvatar}
                  alt={'avatar'}
                  preview={false}
                  className="flex w-full cursor-pointer items-center overflow-hidden rounded-full object-cover"
                  title={'avatar'}
                  width={38}
                  height={38}
                />
              </div>
              <div className="ms-2 cursor-pointer leading-none">
                <p className="truncate text-sm font-medium">{currentUser?.[app]?.email}</p>
              </div>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default AppHeader;

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

import { Table, Tooltip } from 'antd';

import { COLOR_PRIMARY, PAGE_SIZE_TABLE } from 'config/constants';
import { useWindowSize } from 'hooks';

import { ArrowLeftOutlined, EditOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonGlobal from 'components/custom/Button';
import { DeleteIcon, ViewIcon } from 'components/icon';
import { EActionKey } from 'config/enum';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenType } from 'types';
import { checkPermission } from 'utils/checkPermission';
import { numericalOrder } from 'utils/numericalOrder';

const TableGlobal = <T extends Record<any, any>>({
  rowKey = 'id',
  className,
  defaultPageSize = PAGE_SIZE_TABLE,
  subtractHeight = 320,
  scroll,
  currentPage,
  totalItems,
  rowSelection,
  columns = [],
  hasNumericalOrder = true,
  ...props
}: TableProps<T> & {
  columns: ColumnsType<T> | undefined;
  currentPage?: number;
  defaultPageSize?: number;
  totalItems: number | undefined;
  subtractHeight?: number;
  hasNumericalOrder?: boolean;
}) => {
  const { height } = useWindowSize();
  const { t } = useTranslation();
  const cols: ColumnsType<T> = hasNumericalOrder
    ? [
        {
          title: t('numerical_order'),
          fixed: 'left',
          width: 100,
          render: (_, __, index) => numericalOrder(index, currentPage, defaultPageSize),
        },
        ...columns,
      ]
    : columns;

  return (
    <Table<T>
      className={`mt-2 ${className} bg-white`}
      size="small"
      rowKey={rowKey}
      pagination={{
        total: totalItems,
        pageSize: defaultPageSize,
        current: currentPage !== undefined ? currentPage + 1 : undefined, // api return page begin from 0
        showTotal: (total) => `${t('total')}: ${total}`,
        showSizeChanger: false,
      }}
      rowSelection={
        rowSelection
          ? {
              ...rowSelection,
              fixed: 'left',
              columnWidth: 50,
            }
          : undefined
      }
      columns={cols}
      scroll={{
        x: scroll?.x ?? 1410,
        y: subtractHeight ? height - subtractHeight : undefined,
      }}
      {...props}
    />
  );
};

export type ActionRow = {
  action: VoidFunction | undefined;
  children: JSX.Element | undefined;
  tooltip?: string;
  key: string | EActionKey;
};

export const ActionsRow = ({
  onView,
  onChangePassword,
  onUpdate,
  onDelete,
  onGetList,
  onGetLicenses,
  screen,
  additionalAction,
}: {
  onView?: VoidFunction;
  onChangePassword?: VoidFunction;
  onUpdate?: VoidFunction;
  onDelete?: VoidFunction;
  onGetList?: VoidFunction;
  onGetLicenses?: VoidFunction;
  screen?: ScreenType;
  additionalAction?: ActionRow[];
}) => {
  const { t } = useTranslation();
  const permission = checkPermission(screen);

  const actions: ActionRow[] = [
    {
      action: onView,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onView}
          icon={<ViewIcon />}
        />
      ),
      tooltip: 'view',
      key: EActionKey.View,
    },
    {
      action: onChangePassword,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onChangePassword}
          icon={<LockOutlined />}
        />
      ),
      tooltip: 'change_password',
      key: EActionKey.ChangePassword,
    },
    {
      action: onUpdate,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onUpdate}
          icon={<EditOutlined />}
        />
      ),
      tooltip: 'update',
      key: EActionKey.Update,
    },
    {
      action: onGetLicenses,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer rounded-md border border-blue-200 bg-white !px-1 py-1 text-primary hover:bg-primary hover:text-white"
          onClick={onGetLicenses}
          icon={<SettingOutlined />}
        />
      ),
      tooltip: 'service',
      key: EActionKey.ConfigLicense,
    },
    {
      action: onGetList,
      children: (
        <ButtonGlobal
          type="default"
          className="min-w-8 cursor-pointer place-content-center rounded-md border border-blue-200 bg-white !px-1 py-1 hover:text-white"
          onClick={onGetList}
          icon={<FontAwesomeIcon icon={faUserGroup} className="text-primary" fill={COLOR_PRIMARY} />}
        />
      ),
      tooltip: 'get_list',
      key: EActionKey.GetList,
    },
    {
      action: onDelete,
      children: permission?.isDecision ? (
        <ButtonGlobal
          type="text"
          className="min-w-8 cursor-pointer place-content-center rounded-md border border-blue-200 bg-white !px-1 py-1"
          onClick={onDelete}
          icon={<DeleteIcon />}
        />
      ) : undefined,
      tooltip: 'delete',
      key: EActionKey.Delete,
    },
  ];

  return (
    <div className="flex place-content-center gap-2">
      {(additionalAction?.length ? [...additionalAction, ...actions] : actions).map((action) => (
        <Fragment key={action.key}>
          {action.action &&
            (action.tooltip ? <Tooltip title={t(action.tooltip)}>{action.children}</Tooltip> : action.children)}
        </Fragment>
      ))}
    </div>
  );
};

export const HeaderTable = ({
  title,
  getListPage = false,
  disableDelete,
  onCreate,
  onBulkDelete,
  onExport,
  screen,
}: {
  title: string;
  getListPage?: boolean;
  disableDelete?: boolean;
  onCreate?: () => void;
  onBulkDelete?: () => void;
  onExport?: {
    onClick: () => void;
    loading: boolean;
  };
  screen?: ScreenType;
}) => {
  const permission = checkPermission(screen);

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className={`text-xl font-bold`}>
        {getListPage && <ArrowLeftOutlined className="mr-3 cursor-pointer" onClick={() => window.history.back()} />}
        <span>{title}</span>
      </div>
      <div className="flex justify-between gap-2">
        {onCreate && (screen ? permission?.isWrite : true) && <ButtonGlobal.Add onClick={() => onCreate?.()} />}
        {onBulkDelete && (screen ? permission?.isDecision : true) && (
          <ButtonGlobal.Delete onClick={() => onBulkDelete?.()} disabled={disableDelete} />
        )}
        {onExport && <ButtonGlobal.Export loading={onExport.loading} onClick={() => onExport.onClick?.()} />}
      </div>
    </div>
  );
};

export default TableGlobal;

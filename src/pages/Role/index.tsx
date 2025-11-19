import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { RoleRes } from 'types/SwaggerTypeUser';
import { openModal } from 'store/slices/modalSlice';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { ModalAddUpdateRole } from './components/ModalAddUpdateRole';
import { useBulkDeleteCompanyRoles, useGetCompanyRoles } from 'api/company/useCompanyRole';

const screen: ScreenType = 'ROLE';

const Role = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: role, isFetching } = useGetCompanyRoles(params);
  const { mutateAsync: deleteRole } = useBulkDeleteCompanyRoles();

  const columns: ColumnsType<RoleRes> = [
    {
      title: t('name'),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: t('note'),
      dataIndex: 'note',
      ellipsis: true,
    },
    {
      title: t('type'),
      dataIndex: 'type',
      ellipsis: true,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 100,
      render: (value) => {
        return <DisplayStatus value={value} />;
      },
    },
    {
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <ActionsRow
          onDelete={() => handleBulkDelete(record.id)}
          onUpdate={() => handleCreateUpdate(record)}
          screen={screen}
        />
      ),
    },
  ];

  const handleCreateUpdate = (role?: RoleRes) => {
    openModal({
      content: <ModalAddUpdateRole roleId={role?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_role'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        deleteRole(
          {
            ids: id ? [id] : selectedKey,
          },
          {
            onSuccess: () => setSelectedKey([]),
          },
        ),
    });
  };

  return (
    <div>
      <HeaderTable
        title={t('role')}
        onCreate={() => handleCreateUpdate()}
        onBulkDelete={handleBulkDelete}
        disableDelete={!selectedKey.length}
        screen={screen}
      />
      <div className="my-2 flex gap-2">
        <SelectStatus
          className="w-80"
          onChange={(value) => setParams((pre) => ({ ...pre, status: value }))}
          allowClear
        />
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('role')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={role?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={role?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default Role;

import { ColumnsType } from 'antd/lib/table';
import { useBulkDeleteCompanyUsers, useGetCompanyUsers } from 'api/company/useCompany';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import { notifyError } from 'components/custom/Notification';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import ModalChangeAdminCompanyPassword from 'components/Modal/ModalChangeAdminCompanyPassword';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { Key } from 'react';
import { useTranslation } from 'react-i18next';
import { openModal } from 'store/slices/modalSlice';
import { ScreenType } from 'types';
import { UserRes } from 'types/SwaggerTypeUser.ts';
import { ModalCreateUpdateAccount } from './components/ModalAddUpdateAccount';
import { useSelectTableRow, useSearchFilters } from 'hooks';

const screen: ScreenType = 'ACCOUNT';

const CompanyListAccount = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });

  const { data: userAccount, isFetching } = useGetCompanyUsers(params);
  const { mutateAsync: deleteUserAccount } = useBulkDeleteCompanyUsers();

  // const handleCreateUpdate = (user?: UserRes) => {
  //   openModal({
  //     content: <ModalCreateUpdateAccount userId={user?.id} screen={screen} />,
  //     options: {
  //       title: t('view_account'),
  //       width: 800,
  //     },
  //   });
  // };

  const handleChangePassword = (id?: number) => {
    if (id === undefined) return notifyError('user not found');
    openModal({
      content: <ModalChangeAdminCompanyPassword id={id} />,
      options: {
        title: t('update_field', { field: t('auth.password') }),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        deleteUserAccount(
          {
            ids: id ? [id] : selectedKey,
          },
          {
            onSuccess: () => setSelectedKey([]),
          },
        ),
    });
  };

  const columns: ColumnsType<UserRes> = [
  {
    title: t('full_name'),
    dataIndex: 'fullName',
    key: 'fullName',
    ellipsis: true,
  },
  {
    title: t('email'),
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
  },
  {
    title: t('status'),
    dataIndex: 'deleted',
    key: 'deleted',
    width: 100,
    render: (value) => <DisplayStatus value={value} />,
  },
  {
    title: t('action'),
    key: 'action',
    width: 200,
    fixed: 'right',
    render: (_, record) => (
      <ActionsRow
        onDelete={() => handleBulkDelete(record.id)}
        // onUpdate={() => handleCreateUpdate(record)}
        onChangePassword={() => handleChangePassword(record.id)}
        screen={screen}
      />
    ),
  },
];

  return (
    <div>
      <HeaderTable
        title={`${t('field_management', { field: t('auth.account') })}`}
        // onCreate={() => handleCreateUpdate()}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('full_name')} />
      </div>

      <TableGlobal
        columns={columns}
        dataSource={userAccount?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={userAccount?.total_record}
        currentPage={params.page}
        rowKey="id" 
      />
    </div>
  );
};

export default CompanyListAccount;

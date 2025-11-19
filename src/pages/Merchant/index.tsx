import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { MerchantRes } from 'types/SwaggerTypeUser';
import { openModal } from 'store/slices/modalSlice';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { useBulkDeleteMerchant } from 'api/company/useMerchant';
import { useGetMerchant } from 'api/company/useMerchant';
import { ModalAddUpdateMerchant } from './components/ModalAddUpdateMerchant';

const screen: ScreenType = 'MERCHANT';

const Merchant = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: merchant, isFetching } = useGetMerchant(params);
  const { mutateAsync: deleteMerchant } = useBulkDeleteMerchant();

  const columns: ColumnsType<MerchantRes> = [
    {
      title: t('code'),
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: t('merchant_name'),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      ellipsis: true,
    },
    {
      title: t('email'),
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: t('address'),
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: t('tax_code'),
      dataIndex: 'taxCode',
      ellipsis: true,
    },
    {
      title: t('description'),
      dataIndex: 'description',
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

  const handleCreateUpdate = (merchant?: MerchantRes) => {
    openModal({
      content: <ModalAddUpdateMerchant merchantId={merchant?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_merchant'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        deleteMerchant(
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
        title={t('merchant')}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('merchant_name')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={merchant?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={merchant?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default Merchant;

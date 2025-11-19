import { ColumnsType } from 'antd/es/table';
import { SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { MerchantBranchRes} from 'types/SwaggerTypeUser';
import { openModal } from 'store/slices/modalSlice';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { useBulkDeleteMerchantBranch, useGetMerchantBranch } from 'api/company/useMerchantBranch';
import { ModalAddUpdateMerchantBranch } from './components/ModalAddUpdateMerchantBranch';

const screen: ScreenType = 'MERCHANT_BRANCH';

const MerchantBranch = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: merchantBranch, isFetching } = useGetMerchantBranch(params);
  const { mutateAsync: deleteMerchantBranch } = useBulkDeleteMerchantBranch();

  const columns: ColumnsType<MerchantBranchRes> = [
    {
      title: t('code'),
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: t('merchant_id'),
      dataIndex: 'merchantId',
      ellipsis: true,
    },
    {
      title: t('address'),
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: t('description'),
      dataIndex: 'description',
      ellipsis: true,
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

  const handleCreateUpdate = (merchantBranch?: MerchantBranchRes) => {
    openModal({
      content: <ModalAddUpdateMerchantBranch merchantBranchId={merchantBranch?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_merchant_branch'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () => 
        deleteMerchantBranch(
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
        title={t('merchant_branch')}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('merchant_branch')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={merchantBranch?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={merchantBranch?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default MerchantBranch;

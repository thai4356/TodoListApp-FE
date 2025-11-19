import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { TransactionRes } from 'types/SwaggerTypeUser';
import { openModal } from 'store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
import { useGetTransaction } from 'api/company/useTransaction';
import { ModalAddTransaction } from './components/ModalAddTransaction';

const screen: ScreenType = 'TRANSACTION';

const Transaction = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: transaction, isFetching } = useGetTransaction(params);

  const columns: ColumnsType<TransactionRes> = [
    {
      title: t('code'),
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: t('reference_code'),
      dataIndex: 'referenceCode',
      ellipsis: true,
    },
    {
      title: t('merchant_id'),
      dataIndex: 'merchantId',
      ellipsis: true,
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      ellipsis: true,
    },
    {
      title: t('payment_gateway'),
      dataIndex: 'paymentGateway',
      ellipsis: true,
    },
    {
      title: t('message'),
      dataIndex: 'message',
      ellipsis: true,
    },
    {
      title: t('note'),
      dataIndex: 'note',
      ellipsis: true,
    },
    {
      title: t('description'),
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      ellipsis: true,
    },

    {
      title: t('created_by'),
      dataIndex: 'createdBy',
      ellipsis: true,
    },
    {
      title: t('updated_by'),
      dataIndex: 'updatedBy',
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
          onUpdate={() => handleCreateUpdate(record)}
          screen={screen}
        />
      ),
    },
  ];

  const handleCreateUpdate = (transaction?: TransactionRes) => {
    openModal({
      content: <ModalAddTransaction transactionId={transaction?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_transaction'),
        width: 800,
      },
    });
  };


  return (
    <div>
      <HeaderTable
        title={t('transaction')}
        onCreate={() => handleCreateUpdate()}

        disableDelete={!selectedKey.length}
        screen={screen}
      />
      <div className="my-2 flex gap-2">
        <SelectStatus
          className="w-80"
          onChange={(value) => setParams((pre) => ({ ...pre, status: value }))}
          allowClear
        />
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('transaction')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={transaction?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={transaction?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default Transaction;

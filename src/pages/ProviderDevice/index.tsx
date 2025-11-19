import { ColumnsType } from 'antd/es/table';
import { useBulkDeleteProviderDevice, useGetProviderDevice } from 'api/company/useProviderDevice';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { ProviderDeviceRes } from 'types/SwaggerTypeUser';
import { ModalAddUpdateProviderDevice } from './components/ModalAddUpdateProviderDevice';
import { openModal } from 'store/slices/modalSlice';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useTranslation } from 'react-i18next';

const screen: ScreenType = 'PROVIDER_DEVICE';

const ProviderDevice = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: providerDevice, isFetching } = useGetProviderDevice(params);
  const { mutateAsync: deleteProviderDevice } = useBulkDeleteProviderDevice();

  const columns: ColumnsType<ProviderDeviceRes> = [
    {
      title: t('code'),
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: t('provider_device_name'),
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

  const handleCreateUpdate = (providerDevice?: ProviderDeviceRes) => {
    openModal({
      content: <ModalAddUpdateProviderDevice providerDeviceId={providerDevice?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_provider_device'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        deleteProviderDevice(
          { 
            ids: id ? [id] : selectedKey,
          },
          { 
            onSuccess: () => setSelectedKey([]) 
          },
        ),
    });
  };

  return (
    <div>
      <HeaderTable
        title={t('provider_device')}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('provider_device_name')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={providerDevice?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={providerDevice?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default ProviderDevice;

import { ColumnsType } from 'antd/es/table';
import { useBulkDeleteDevice, useGetDevice } from 'api/company/useDevice';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { DeviceRes } from 'types/SwaggerTypeUser';
import { ModalAddUpdateDevice } from './components/ModalAddUpdateDevice';
import { openModal } from 'store/slices/modalSlice';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useTranslation } from 'react-i18next';

const screen: ScreenType = 'DEVICE';

const Device = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: device, isFetching } = useGetDevice(params);
  const { mutateAsync: deleteDevice } = useBulkDeleteDevice();

  const columns: ColumnsType<DeviceRes> = [
    {
      title: t('code'),
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: t('device_name'),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: t('model'),
      dataIndex: 'model',
      ellipsis: true,
    },
    {
      title: t('serial'),
      dataIndex: 'serial',
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

  const handleCreateUpdate = (device?: DeviceRes) => {
    openModal({
      content: <ModalAddUpdateDevice deviceId={device?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_device'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        deleteDevice(
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
        title={t('device_list')}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('device_name')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={device?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={device?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default Device;

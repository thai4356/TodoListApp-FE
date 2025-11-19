import TableGlobal, { ActionsRow } from 'components/custom/Table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { HeaderTable } from 'components/custom/Table';
import { useSearchFilters } from 'hooks/useSearchFilters';
import { useSelectTableRow } from 'hooks/useSelectTableRow';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import { ScreenType } from 'types';
import { ColumnsType } from 'antd/es/table';
import { ProviderContentRes } from 'types/SwaggerTypeUser';
import { useBulkDeleteProviderContent, useGetProviderContent } from 'api/company/useProviderContent';
import { openModal } from 'store/slices/modalSlice';
import { useTranslation } from 'react-i18next';
import { ModalAddUpdateProviderContent } from './components/ModalAddUpdateProviderContent';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';

const screen: ScreenType = 'PROVIDER_CONTENT';

const ProviderContent = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: providerContent, isFetching } = useGetProviderContent(params);
  const { mutateAsync: deleteProviderContent } = useBulkDeleteProviderContent();
  const columns: ColumnsType<ProviderContentRes> = [
    {
      title: t('code'),
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: t('provider_content_name'),
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

  const handleCreateUpdate = (providerContent?: ProviderContentRes) => {
    openModal({
      content: <ModalAddUpdateProviderContent providerContentId={providerContent?.id ?? 0} screen={screen} />,
      options: {
        title: t('view_provider_content'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () =>
        deleteProviderContent(
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
        title={t('provider_content')}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('provider_content_name')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={providerContent?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={providerContent?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default ProviderContent;

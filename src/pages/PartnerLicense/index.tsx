import { ColumnsType } from 'antd/es/table';
import { DisplayStatus, SelectStatus } from 'components/atomic/common/Status';
import { InputSearchGlobal } from 'components/custom/Input/InputSearchGlobal';
import TableGlobal, { ActionsRow, HeaderTable } from 'components/custom/Table';
import { useSearchFilters, useSelectTableRow } from 'hooks';
import { ScreenType } from 'types';
import { PartnerLicenseRes } from 'types/SwaggerTypeUser';
import { openModal } from 'store/slices/modalSlice';
import { Key } from 'antd/es/table/interface';
import openModalConfirm from 'components/Modal/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { useBulkDeletePartnerLicense, useGetPartnerLicense } from 'api/company/usePartnerLicense';
import { ModalAddUpdatePartnerLicense } from './components/ModalAddUpdatePartnerLicense';

const screen: ScreenType = 'PARTNER_LICENSE';

const PartnerLicense = () => {
  const { t } = useTranslation();
  const { handleSelectRow, selectedKey, setSelectedKey } = useSelectTableRow();
  const { params, setParams, setSearchValue, handleChangePagination } = useSearchFilters({
    page: 0,
  });
  const { data: partnerLicense, isFetching } = useGetPartnerLicense(params);
  const { mutateAsync: deletePartnerLicense } = useBulkDeletePartnerLicense();

  const columns: ColumnsType<PartnerLicenseRes> = [
    {
      title: t('code'),
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: t('partner_license_name'),
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

  const handleCreateUpdate = (partnerLicense?: PartnerLicenseRes) => {
    openModal({
            content: <ModalAddUpdatePartnerLicense partnerLicenseId={partnerLicense?.id ?? 0} screen={screen} />,
            options: {
        title: t('view_partner_license'),
        width: 800,
      },
    });
  };

  const handleBulkDelete = (id?: Key) => {
    openModalConfirm({
      modalType: 'delete',
      onOk: () => 
        deletePartnerLicense(
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
        title={t('partner_license')}
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
        <InputSearchGlobal onChange={(e) => setSearchValue(e.target.value)} tooltip={t('partner_license_name')} />
      </div>
      <TableGlobal
        columns={columns}
        dataSource={partnerLicense?.data}
        onChange={handleChangePagination}
        rowSelection={{ onChange: handleSelectRow }}
        loading={isFetching}
        totalItems={partnerLicense?.total_record}
        currentPage={params.page}
      />
    </div>
  );
};

export default PartnerLicense;

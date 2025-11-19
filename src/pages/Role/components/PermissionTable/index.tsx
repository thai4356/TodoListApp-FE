import { Table, Form, Checkbox } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { PermissionRes } from 'types/SwaggerTypeUser';

interface PermissionTableProps {
  permissions: PermissionRes[];
  loading?: boolean;
}

export const PermissionTable = ({ permissions, loading }: PermissionTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnsType<PermissionRes> = [
    {
      title: t('permission_name'),
      dataIndex: 'title',
      key: 'title',
      width: '40%',
    },
    {
      title: t('view'),
      key: 'isView',
      align: 'center',
      render: (_, record) => (
        <Form.Item 
          name={['permissions', record.id, 'isView']}
          valuePropName="checked" 
          noStyle
        >
          <Checkbox disabled={record.isView === null} />
        </Form.Item>
      ),
    },
    {
      title: t('write'),
      key: 'isWrite',
      align: 'center',
      render: (_, record) => (
        <Form.Item 
          name={['permissions', record.id, 'isWrite']} 
          valuePropName="checked" 
          noStyle
        >
          <Checkbox disabled={record.isWrite === null} />
        </Form.Item>
      ),
    },
    {
      title: t('approve'),
      key: 'isApproval',
      align: 'center',
      render: (_, record) => (
        <Form.Item 
          name={['permissions', record.id, 'isApproval']} 
          valuePropName="checked" 
          noStyle
        >
          <Checkbox disabled={record.isApproval === null} />
        </Form.Item>
      ),
    },
    {
      title: t('decide'),
      key: 'isDecision',
      align: 'center',
      render: (_, record) => (
        <Form.Item 
          name={['permissions', record.id, 'isDecision']} 
          valuePropName="checked" 
          noStyle
        >
          <Checkbox disabled={record.isDecision === null} />
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <h3 className="mb-2">{t('permissions')}</h3>
      <Table
        dataSource={permissions}
        columns={columns}
        rowKey="id"
        pagination={false}
        loading={loading}
        size="middle"
        bordered
      />
    </div>
  );
};

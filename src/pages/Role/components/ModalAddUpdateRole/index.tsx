import { useTranslation } from 'react-i18next';
import { ScreenType } from 'types';
import { FormAddUpdateRoleSchema, validationAddUpdateRoleForm } from './validationAddUpdateRoleForm';
import { useValidation } from 'hooks';
import { useGetDetailCompanyRole } from 'api/company/useCompanyRole';
import { IFormBoxItem } from 'types/components';
import { Form, Input, Skeleton } from 'antd';
import { removeModal } from 'store/slices/modalSlice';
import FormBoxItem from 'components/custom/Form/FormBoxItem';
import ButtonGlobal from 'components/custom/Button';
import { PermissionTable } from '../PermissionTable';
import { SelectStatus } from 'components/atomic/common/Status';
import { useCreateCompanyRole, useGetCompanyPermissions, useUpdateCompanyRole } from 'api/company/useCompanyRole';

export const ModalAddUpdateRole = ({ roleId, screen }: { roleId: number; screen: ScreenType }) => {
  const { t } = useTranslation();
  const [form, rule] = useValidation(validationAddUpdateRoleForm());
  const { mutate: createRole } = useCreateCompanyRole();
  const { mutate: updateRole } = useUpdateCompanyRole();
  const { data: getRoleDetail, isFetching: isFetchingRole } = useGetDetailCompanyRole(roleId);
  const { data: permissionsData, isFetching: isFetchingPermissions } = useGetCompanyPermissions();

  const roleType = getRoleDetail?.data?.type;

  const formItems: IFormBoxItem<FormAddUpdateRoleSchema>[] = [
    {
      name: 'name',
      label: t('role_name'),
      required: true,
      children: <Input placeholder={t('role_name')} />,
    },
    {
      name: 'note',
      label: t('note'),
      children: <Input placeholder={t('note')} />,
    },
    {
      name: 'status',
      label: t('status'),
      children: <SelectStatus />,
    },
  ];

  const handleCreateRoleSubmit = (values: FormAddUpdateRoleSchema) => {
    const permissions = Object.entries(values.permissions || {})
      .map(([id, perms]: [string, any]) => ({
        id: Number(id),
        ...perms,
      }))
      .filter((perm) => Object.values(perm).some((v) => v === true));

    const submitData = {
      ...values,
      type: roleType,
      permissions,
    };

    if (roleId) {
      updateRole({ ...submitData, id: roleId }, { onSuccess: () => removeModal() });
    } else {
      createRole(submitData, { onSuccess: () => removeModal() });
    }
  };

  if (isFetchingRole || isFetchingPermissions) {
    return <Skeleton active />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={
        roleId && getRoleDetail?.data
          ? {
              name: getRoleDetail.data.name,
              note: getRoleDetail.data.note,
              type: getRoleDetail.data.type,
              status: getRoleDetail.data.status,
              permissions: getRoleDetail.data.permissions?.reduce(
                (acc, perm) => {
                  acc[perm.id ?? ''] = {
                    isView: perm.isView === true,
                    isWrite: perm.isWrite === true,
                    isApproval: perm.isApproval === true,
                    isDecision: perm.isDecision === true,
                  };
                  return acc;
                },
                {} as Record<string, any>,
              ),
            }
          : undefined
      }
      onFinish={handleCreateRoleSubmit}
      autoComplete="off"
    >
      <FormBoxItem listItems={formItems} columnGap={[20, 10]} rule={rule} />
      <PermissionTable permissions={permissionsData?.data || []} />
      <ButtonGlobal.Footer isUpdate={!!roleId} htmlType="submit" screen={screen} />
    </Form>
  );
};

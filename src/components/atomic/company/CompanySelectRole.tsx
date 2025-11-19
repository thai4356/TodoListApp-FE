import { SelectProps } from 'antd/lib';
import { useGetDetailCompanyRole, useInfiniteRoles } from 'api/company/useCompanyRole';
import { SelectGlobal } from 'components/custom/Select';
import { t } from 'i18next';
import { UIEvent, useMemo } from 'react';

const useRoleValue = (id: number) => {
  const { data: roles, fetchNextPage, isFetching } = useInfiniteRoles();
  const { data: detailRole, isFetching: fetchingDetail } = useGetDetailCompanyRole(id);

  const options = useMemo(() => {
    return (roles.every((role) => detailRole?.data.name && role.id !== id) ? [...roles, detailRole?.data] : roles).map(
      (role) => ({
        label: role?.name,
        value: role?.id,
      }),
    );
  }, [roles, id, detailRole]);

  return { options, fetchNextPage, loading: isFetching || fetchingDetail };
};

const SelectCompanyRole = (props: SelectProps) => {
  const { fetchNextPage, loading, options } = useRoleValue(props.value);

  const handleScroll = (e: UIEvent) => {
    const target = e.target as HTMLDivElement;
    const isScrollToBottom = target.scrollTop + target.offsetHeight === target.scrollHeight;

    if (isScrollToBottom) {
      fetchNextPage();
    }
  };

  return (
    <SelectGlobal
      placeholder={t('placeholder.select_field', { field: t('role') })}
      onPopupScroll={handleScroll}
      loading={loading}
      options={options}
      {...props}
    />
  );
};

export default SelectCompanyRole;

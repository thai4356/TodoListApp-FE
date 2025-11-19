import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, InputProps, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

export const InputSearchGlobal = ({ tooltip, ...props }: InputProps & { tooltip?: string | string[] }) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={
        tooltip
          ? `${t('search')}: ${Array.isArray(tooltip) ? tooltip.join(', ').toLocaleLowerCase() : tooltip.toLocaleLowerCase()}`
          : undefined
      }
      placement="topLeft"
    >
      <Input
        allowClear
        placeholder={t('enter_search')}
        prefix={<FontAwesomeIcon icon={faSearch} />}
        className={`w-full ${props.className}`}
        {...props}
      />
    </Tooltip>
  );
};

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import { InputProps } from 'antd/lib';
import { useCopyToClipboard } from 'hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SecretCodeInput = (props: InputProps & { code?: string }) => {
  const { t } = useTranslation();
  const [, handleCopy] = useCopyToClipboard();
  const [success, setSuccess] = useState(false);

  return (
    <Input.Password
      {...props}
      placeholder={t('placeholder.enter_field', { field: 'Secret Code' })}
      readOnly
      addonAfter={
        props?.code && (
          <p
            className="w-full cursor-pointer p-1"
            onClick={async () => {
              const isCpSuccess = await handleCopy(props?.code ?? '');
              if (isCpSuccess) setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 2000);
            }}
          >
            {success ? <FontAwesomeIcon icon={faCheck} className="text-primary" /> : <FontAwesomeIcon icon={faCopy} />}
          </p>
        )
      }
    />
  );
};

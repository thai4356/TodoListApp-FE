import { z } from 'zod';
import { TFunction } from 'i18next';
import { REGEX } from 'config/constants';

export const validationAddUpdateProviderDeviceForm = (t: TFunction) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('provider_device_name') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('provider_device_name') })),
    phone: z.string().regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('phone') })),
    email: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('auth.email') }),
      })
      .email(t('error_message.field_invalid', { field: t('auth.email') })),
    address: z.string().min(1, t('error_message.please_enter_field', { field: t('address') })),
    taxCode: z.string().min(1, t('error_message.please_enter_field', { field: t('tax_code') })),
    description: z.string().optional(),
    status: z.number().optional(),
  });
export type FormAddUpdateProviderDeviceSchema = z.infer<ReturnType<typeof validationAddUpdateProviderDeviceForm>>;

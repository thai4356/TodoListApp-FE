import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationAddUpdateMerchantForm = (t: TFunction) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('merchant_name') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('merchant_name') })),
    phone: z
      .string()
      .min(1, t('error_message.please_enter_field', { field: t('phone') }))
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('phone') })),
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
export type FormAddUpdateMerchantSchema = z.infer<ReturnType<typeof validationAddUpdateMerchantForm>>;

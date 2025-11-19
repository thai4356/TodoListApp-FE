import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationUpdateAccount = (t: TFunction) =>
  z.object({
    avatarId: z.number().optional(),
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('name_account') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('name_account') })),
    email: z.string().email().optional(),
    address: z.any().optional(),
    phone: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('phone') }),
      })
      .regex(REGEX.PHONE, t('error_message.field_invalid', { field: t('phone') }))
      .max(11, t('error_message.max_length_field', { field: t('phone'), length: 11 }))
      .optional()
      .nullable(),
    birthday: z.any().optional(),
    gender: z.any().optional(),
  });

export type FormUpdateProfile = z.infer<ReturnType<typeof validationUpdateAccount>>;

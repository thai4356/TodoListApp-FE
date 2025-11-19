import { REGEX } from 'config/constants';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const changePasswordSchema = (t: TFunction) =>
  z
    .object({
      oldPassword: z
        .string({ required_error: t('error_message.please_enter_field', { field: t('old_password') }) })
        .regex(REGEX.PASSWORD, { message: t('error_message.invalid_password') })
        .min(8, t('error_message.min_length_field', { field: t('old_password'), length: 8 })),
      newPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .regex(REGEX.PASSWORD, { message: t('error_message.invalid_password') })
        .min(8, t('error_message.min_length_field', { field: t('auth.new_password'), length: 8 })),
      confirmPassword: z
        .string({
          required_error: t('error_message.please_enter_field', { field: t('auth.new_password') }),
        })
        .regex(REGEX.PASSWORD, { message: t('error_message.invalid_password') })
        .min(8, t('error_message.min_length_field', { field: t('auth.new_password'), length: 8 })),
      valid: z.boolean().optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('error_message.field_not_match', { field: t('password') }),
      path: ['confirmPassword'],
    });
export type FormChangePasswordSchema = z.infer<ReturnType<typeof changePasswordSchema>>;

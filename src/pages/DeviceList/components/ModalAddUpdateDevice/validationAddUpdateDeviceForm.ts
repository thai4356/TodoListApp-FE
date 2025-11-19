import { TFunction } from 'i18next';
import { z } from 'zod';

export const validationAddUpdateDeviceForm = (t: TFunction) =>
  z.object({
    name: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('device_name') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('device_name') })),
    model: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('model') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('model') })),
    serial: z
      .string({
        required_error: t('error_message.please_enter_field', { field: t('serial') }),
      })
      .min(1, t('error_message.please_enter_field', { field: t('serial') })),
    status: z.number().optional(),
  });
export type FormAddUpdateDeviceSchema = z.infer<ReturnType<typeof validationAddUpdateDeviceForm>>;

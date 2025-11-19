import { TFunction } from 'i18next';
import { z } from 'zod';


export const validationAddUpdateMerchantBranchForm = (t: TFunction) =>
  z.object({
    address: z.string().min(1, { message: t('error_message.please_enter_field', { field: t('address') }) }),
    description: z.string().optional(),
    merchantId: z.number().min(1, { message: t('error_message.please_enter_field', { field: t('merchant') }) }),
  });
export type FormAddUpdateMerchantBranchSchema = z.infer<ReturnType<typeof validationAddUpdateMerchantBranchForm>>;

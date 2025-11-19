import { z } from 'zod';

export const validationAddTransactionForm = () =>
  z.object({
    amount: z.number(),
    paymentGateway: z.string(),
    message: z.string().optional(),
  });

export type FormAddTransactionSchema = z.infer<ReturnType<typeof validationAddTransactionForm>>;

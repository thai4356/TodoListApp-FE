import { z } from 'zod';

export const validationAddUpdateRoleForm = () =>
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    note: z.string().optional(),
    type: z.number().optional(),
    status: z.number().optional(),
    permissions: z.array(
      z.object({
        id: z.number(),
        isView: z.boolean().optional(),
        isWrite: z.boolean().optional(),
        isApproval: z.boolean().optional(),
        isDecision: z.boolean().optional()
      })
    ).optional(),
  });

export type FormAddUpdateRoleSchema = z.infer<ReturnType<typeof validationAddUpdateRoleForm>>;

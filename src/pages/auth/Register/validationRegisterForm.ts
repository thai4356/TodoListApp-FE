import { z } from 'zod';

export const registerProviderSchema = () =>
  z.object({
    email: z.string().email(),
    type: z.enum(["0", "1", "2"]),
    purpose: z.coerce.number(),
    fullname: z.string().min(1, "Full name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()

  })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export type FormRegisterProviderSchema = z.infer<ReturnType<typeof registerProviderSchema>>;

import z from 'zod';

export const LoginSchema = z.object({
  email: z.email().min(1, { error: "Email can't be empty" }).trim(),
  password: z.string().min(1, { error: "Password can't be empty" }).trim(),
});

export type TLoginForm = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  first_name: z.string().min(1, { error: "First name can't be empty" }).trim(),
  last_name: z.string().min(1, { error: "Last name can't be empty" }).trim(),
  display_name: z.string().optional(),
  email: z.email().min(1, { error: "Email can't be empty" }).trim(),
  password: z
    .string()
    .min(8, { error: 'Password atleast has to be 8 characters' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'Password must contain only alphanumeric characters',
    })
    .regex(/[A-Za-z]+/, {
      message: 'Password must contain alphabets',
    })
    .regex(/[0-9]+/, {
      message: 'Password must contain numbers',
    })
    .trim(),
});

export type TRegisterForm = z.infer<typeof RegisterSchema>;

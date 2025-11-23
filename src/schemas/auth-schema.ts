import z from 'zod';

export const LoginSchema = z.object({
  email: z.email().min(1, { message: "Email can't be empty" }),
  password: z.string().min(1, { message: "Password can't be empty" }),
});

export type TLoginForm = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  first_name: z.string().min(1, { message: "First name can't be empty" }),
  last_name: z.string().min(1, { message: "Last name can't be empty" }),
  display_name: z.string().optional(),
  email: z.email().min(1, { message: "Email can't be empty" }),
  password: z
    .string()
    .min(8, { message: 'Password atleast has to be 8 characters' }),
});

export type TRegisterForm = z.infer<typeof RegisterSchema>;

import z from 'zod';

export const LoginSchema = z.object({
  email: z.email().min(1, { message: "Email can't be empty" }),
  password: z.string().min(1, { message: "Password can't be empty" }),
});

export type TLoginForm = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().optional(),
  email: z.email().min(1, { message: "Email can't be empty" }),
  password: z.string().min(1, { message: "Password can't be empty" }),
});

export type TRegisterForm = z.infer<typeof RegisterSchema>;

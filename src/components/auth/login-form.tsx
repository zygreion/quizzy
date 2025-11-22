'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useRouter } from 'next/navigation';
import { login } from '@/actions/auth';
import { Spinner } from '../ui/spinner';
import { LoginSchema, TLoginForm } from '@/schemas/auth-schema';

const defaultValues: TLoginForm = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    const user = await login(data);

    if (!user) {
      setError('root', { message: 'Invalid email or password' });
      return;
    }

    reset();
    router.push('/');
  });

  return (
    <Form {...form}>
      <form
        className="flex grow flex-col justify-between gap-18"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="youremail@example.com"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} required />
                  </FormControl>

                  {errors.root && (
                    <span className="text-destructive text-sm">
                      {errors.root.message}
                    </span>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button type="submit" className="w-full hover:cursor-pointer">
            {!isSubmitting ? 'Sign In' : <Spinner />}
          </Button>

          <div className="text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?
            </span>{' '}
            <Link href="/auth/register">
              <span className="underline-offset-4 hover:underline">
                Register
              </span>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}

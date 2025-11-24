'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useRouter } from 'next/navigation';
import { RegisterSchema, TRegisterForm } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { register } from '@/actions/auth';
import { Spinner } from '../ui/spinner';

const defaultValues: TRegisterForm = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
};

export default function RegisterForm() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const form = useForm<TRegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    const newData: TRegisterForm = {
      email: data.email,
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      password: data.password,
    };

    const user = await register(newData);

    if (!user) {
      setError('email', { message: 'Email has already used' });

      return;
    }

    setIsAuthorized(true);
    reset();
    router.refresh();
  });

  return (
    <Form {...form}>
      <form
        className="flex grow flex-col justify-between gap-18"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-4">
            <FormField
              control={control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="John" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Doe" required />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
                  <FormMessage />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            type="submit"
            className="w-full hover:cursor-pointer"
            disabled={isAuthorized}
          >
            {!isSubmitting ? 'Sign Up' : <Spinner />}
          </Button>

          <div className="text-sm">
            <span className="text-muted-foreground">
              Already have an account?
            </span>{' '}
            <Link href="/auth/login">
              <span className="underline-offset-4 hover:underline">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}

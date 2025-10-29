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
import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import { RegisterSchema, TRegisterForm } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { register } from '@/actions/auth';
import { Spinner } from '../ui/spinner';

const defaultValues: TRegisterForm = {
  name: '',
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

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      const user = await register(data);

      if (!user) {
        setError('email', { message: 'Email is already used' });

        return;
      }

      setIsAuthorized(true);
      reset();
      router.push('/auth/login');
    }),
    []
  );

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="John Doe"
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
          <Button type="submit" className="w-full hover:cursor-pointer">
            {!isSubmitting ? 'Sign Up' : <Spinner />}
          </Button>
          <Link
            href="/auth/login"
            className="inline-block text-sm underline-offset-4 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </Form>
  );
}

'use server';

import { withErrorHandling } from '@/lib/error-helper';
import { TLoginForm, TRegisterForm } from '@/schemas/auth-schema';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(loginData: TLoginForm) {
  const supabase = await createClient();

  return await withErrorHandling(async () => {
    const { data, error } = await supabase.auth.signInWithPassword(loginData);
    if (error) throw new Error(error.message);

    return data.user;
  });
}

export async function register(registerData: TRegisterForm) {
  const { email, password, first_name, last_name } = registerData;
  const supabase = await createClient();

  return await withErrorHandling(async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
          display_name: `${first_name} ${last_name}`,
        },
      },
    });

    if (error) throw new Error(error.message);

    return data.user;
  });
}

export async function logout() {
  const supabase = await createClient();

  return await withErrorHandling(
    async () => {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw new Error(error.message);
    },
    { finallyFn: () => redirect('/') }
  );
}

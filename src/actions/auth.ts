'use server';

import { TLoginForm, TRegisterForm } from '@/schemas/auth-schema';
import { createClient } from '@/lib/supabase/server';
import { Account } from '@/types';

export async function login(loginData: TLoginForm) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword(loginData);
    if (error) throw new Error(error.message);

    // Get user personal info + preference
    const { data: account, error: accountError } = await supabase
      .from('users')
      .select(
        `
        *,
        preference:user_preference(amount, category_id, difficulty, type)
        `
      )
      .eq('id', data.user.id)
      .single();

    if (accountError) {
      throw new Error(accountError.message);
    }

    return account as Account;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function register(registerData: TRegisterForm) {
  const { email, password, first_name, last_name } = registerData;
  const supabase = await createClient();

  try {
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
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut({ scope: 'local' });
  // if (error) throw new Error(error.message);
  return error;
}

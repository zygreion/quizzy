'use server';

import { TLoginForm, TRegisterForm } from '@/schemas/auth-schema';
import { createClient } from '@/utils/supabase/server';

export async function login(loginData: TLoginForm) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  } catch (error) {
    console.error(error);
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

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logout() {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      return 'success';
    }
  } catch (error) {
    return null;
  }
}

'use server';

import { TLoginForm } from '@/schemas/auth-schema';
import { createClient } from '@/utils/supabase/server';

export async function login(loginData: TLoginForm) {
  const supabase = await createClient();

  try {
    const { data } = await supabase.auth.signInWithPassword(loginData);
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function register(registerData: TLoginForm) {
  const supabase = await createClient();

  try {
    const { data } = await supabase.auth.signUp(registerData);
    return data.user;
  } catch (error) {
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

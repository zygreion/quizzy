'use server';

import { createClient } from '@/utils/supabase/server';

interface TUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

export async function getUser() {
  const supabase = await createClient();

  try {
    const { data, error: claimsError } = await supabase.auth.getClaims();

    if (claimsError) {
      throw new Error(claimsError.message);
    } else if (!data) {
      throw new Error('No claims found');
    }

    const userId = data?.claims.sub;

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      display_name: user.display_name,
    } as TUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

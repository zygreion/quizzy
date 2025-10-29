'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUser() {
  const supabase = await createClient();

  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    return null;
  }
}

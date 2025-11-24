'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserBase } from './profile';

export async function getUserServer() {
  const supabase = await createClient();
  return await getUserBase(supabase);
}

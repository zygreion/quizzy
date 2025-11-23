'use server';

import { createClient } from '@/utils/supabase/server';
import { getUserBase } from './profile';

export async function getUserServer() {
  const supabase = await createClient();
  return await getUserBase(supabase);
}

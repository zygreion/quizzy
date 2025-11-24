import { createClient } from '@/lib/supabase/client';
import { getUserBase } from './profile';

export async function getUserClient() {
  const supabase = createClient();
  return await getUserBase(supabase);
}

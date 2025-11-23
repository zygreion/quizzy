import { createClient } from '@/utils/supabase/client';
import { getUserBase } from './profile';

export async function getUserClient() {
  const supabase = createClient();
  return await getUserBase(supabase);
}

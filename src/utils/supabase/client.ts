import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/config';
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

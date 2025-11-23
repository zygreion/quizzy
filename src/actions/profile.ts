import { User } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getUserBase(
  supabase: SupabaseClient<any, 'public', 'public', any, any>
) {
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

    return user as User;
  } catch (error) {
    console.error(error);
    return null;
  }
}

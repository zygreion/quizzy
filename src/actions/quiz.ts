'use server';

import { withErrorHandling } from '@/lib/error-helper';
import { createClient } from '@/lib/supabase/server';
import { Preference } from '@/types';

interface TPreference extends Omit<Preference, 'category'> {
  category_id: number;
}

export async function updatePreference(preference: TPreference) {
  const supabase = await createClient();

  return await withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('user_preference')
      .upsert(preference, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as Preference;
  });
}

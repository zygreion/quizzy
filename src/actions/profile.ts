'use server';

import { createClient } from '@/utils/supabase/server';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

export async function getUser() {
  const supabase = await createClient();

  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function getProfile() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) {
      throw new Error(getUserError.message);
    } else if (!user) {
      throw new Error('User not logged in!');
    }

    const { data: profile, error: getProfileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (getProfileError) {
      throw new Error(getProfileError.message);
    }

    return {
      id: user.id,
      email: user.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      display_name: profile.display_name,
    } as Profile;
  } catch (error) {
    console.error(error);
    return null;
  }
}

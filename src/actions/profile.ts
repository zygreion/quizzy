'use server';

import { createClient } from '@/lib/supabase/server';
import { TProfileSchema } from '@/schemas/profile-schema';
import { User } from '@/types';

const publicImageBucketsUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/`;

export async function saveProfile(data: TProfileSchema) {
  const supabase = await createClient();
  let avatar_url = data.avatar_url;

  try {
    if (data.avatar_image) {
      const file = data.avatar_image;
      const filePath = `${data.id}/${file.name}`;

      // Remove existing image
      if (avatar_url) {
        const relativePath = decodeURI(avatar_url).replace(
          publicImageBucketsUrl,
          ''
        );
        
        await supabase.storage.from('images').remove([relativePath]);
      }

      // Upload to buckets
      const { error: imageError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (imageError) throw new Error(imageError.message);

      // Get public url
      const { data: publicImageData } = await supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      avatar_url = publicImageData.publicUrl;
    }

    const { data: userData, error } = await supabase
      .from('users')
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        display_name: data.display_name,
        avatar_url: avatar_url,
      })
      .eq('id', data.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // console.log(data);
    return userData as User;
  } catch (err) {
    console.error(err);
  }
}

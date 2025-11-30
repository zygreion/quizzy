'use client';

import { saveProfile } from '@/actions/profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useAccountStore } from '@/hooks/use-account-store';
import {
  IMAGE_TYPES,
  ProfileSchema,
  TProfileSchema,
} from '@/schemas/profile-schema';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const {
    id,
    email,
    avatar_url,
    first_name,
    last_name,
    display_name,
    setUser,
  } = useAccountStore((state) => state);
  const [preview, setPreview] = useState<User['avatar_url']>(undefined);

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      id,
      email,
      avatar_url,
      first_name,
      last_name,
      display_name,
      avatar_image: undefined,
    },
  });

  const {
    getValues,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    reset({
      id,
      email,
      avatar_url: avatar_url ?? '',
      first_name,
      last_name,
      display_name,
      avatar_image: getValues('avatar_image'),
    });
  }, [
    id,
    email,
    avatar_url,
    first_name,
    last_name,
    display_name,
    reset,
    preview,
    getValues,
  ]);

  const onSubmit = handleSubmit(async (data) => {
    const profile = await saveProfile(data);
    if (!profile) return;

    setUser(profile);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="size-35">
            <AvatarImage
              src={preview ?? avatar_url}
              alt="PP"
              className="object-cover"
            />
            <AvatarFallback className="text-3xl">
              {display_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <FormField
            control={control}
            name="avatar_image"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Avatar Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file); // set File ke react-hook-form
                        if (IMAGE_TYPES.includes(file.type)) {
                          setPreview(URL.createObjectURL(file));
                        }
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} disabled required />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} disabled required />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid items-start gap-6 md:grid-cols-2 md:gap-4">
          <FormField
            control={control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name </FormLabel>
                <FormControl>
                  <Input type="text" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          {!isSubmitting ? 'Save' : <Spinner />}
        </Button>
      </form>
    </Form>
  );
}

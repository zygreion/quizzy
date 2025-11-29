import z from 'zod';

export const IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

export const ProfileSchema = z.object({
  id: z.string().min(1, { message: "Id can't be empty" }),
  email: z.email().min(1, { message: "Email can't be empty" }),
  first_name: z.string().min(1, { message: "First name can't be empty" }),
  last_name: z.string().min(1, { message: "Last name can't be empty" }),
  display_name: z.string().min(1, { message: "Display name can't be empty" }),
  avatar_url: z.string().optional(),
  avatar_image: z
    .instanceof(File)
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: 'Only image files are allowed (jpg, png, gif, webp, svg)',
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: 'File size must be less than 1MB',
    })
    .optional(),
});

export type TProfileSchema = z.infer<typeof ProfileSchema>;

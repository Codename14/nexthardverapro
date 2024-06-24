import { z } from 'zod';
import { DEFAULT_IMG } from './constants';

export const productFormSchema = z
    .object({
        name: z.string().trim().min(1, { message: 'Name is required' }).max(40, { message: 'more than 40' }),
        description: z.string().min(1, { message: 'description name is required' }).max(900, { message: 'more than 900' }),
        place: z.string(),
        new: z.boolean(),
        price: z.string().min(1, { message: 'Price is required' }).max(9999999, { message: 'Price is too high' }),
        tumbnailUrl: z.union([z.literal(''), z.string().trim().url({ message: 'Must be a valid URL' })]),
        category_id: z.string(),
    })
    // actionbe nem működik
    .transform((data) => ({
        ///itt lehet megadni default valut
        ...data,
        price: Number(data?.price),
        tumbnailUrl: data?.tumbnailUrl || DEFAULT_IMG,
    }));

export type productZodFormType = z.infer<typeof productFormSchema>;

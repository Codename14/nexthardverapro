import { z } from 'zod';
import { DEFAULT_IMG } from './constants';

export const detailsMaxLength = 900;
export const nameMaxLength = 40;

export const productIdSchema = z.string().min(1, { message: 'Id is required' });
export const profileFormSchema = z.object({
    username: z.string().min(1, { message: 'Name is required' }).max(nameMaxLength, { message: 'more than 40' }),
    country: z.string().min(1, { message: 'Country is required' }).max(nameMaxLength, { message: 'more than 40' }),
});

export const productFormSchema = z
    .object({
        name: z.string().trim().min(1, { message: 'Name is required' }).max(nameMaxLength, { message: 'more than 40' }),
        description: z.string().min(1, { message: 'description name is required' }).max(detailsMaxLength, { message: 'more than 900' }),
        place: z.string().min(1, { message: 'Place is required' }).max(nameMaxLength, { message: 'more than 40' }),
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

export const messageScema = z.object({
    message: z.string().trim().min(1, { message: 'Message is required' }).max(900, { message: 'more than 900' }),
    receiver_id: z.string(),
    product_id: z.string(),
});

export type messageZodFormType = z.infer<typeof messageScema>;
export type productZodFormType = z.infer<typeof productFormSchema>;
export type profileZodFormType = z.infer<typeof profileFormSchema>;

import { z } from 'zod';
import { DEFAULT_IMG } from './constants';

export const detailsMaxLength = 900;
export const nameMaxLength = 40;

//ide az összes translation kelleni fog
type MessageKeys = 'name' | 'price' | 'price_to_high' | 'text_to_long' | 'place' | 'description' | 'url';

export const productIdSchema = z.string().min(1, { message: 'Id is required' });
export const profileFormSchema = z.object({
    username: z.string().min(1, { message: 'Name is required' }).max(nameMaxLength, { message: 'more than 40' }),
    country: z.string().min(1, { message: 'Country is required' }).max(nameMaxLength, { message: 'more than 40' }),
});

export const productFormSchema = (t: (arg: MessageKeys) => string) =>
    z
        .object({
            name: z
                .string()
                .trim()
                .min(1, { message: t('name') })
                .max(nameMaxLength, { message: t('text_to_long') + nameMaxLength }),
            description: z
                .string()
                .min(1, { message: t('description') })
                .max(detailsMaxLength, { message: t('text_to_long') + detailsMaxLength }),
            place: z
                .string()
                .min(1, { message: t('place') })
                .max(nameMaxLength, { message: t('text_to_long') + nameMaxLength }),
            new: z.boolean(),
            price: z
                .string()
                .min(1, { message: t('price') })
                .max(9999999, { message: t('price_to_high') }),
            tumbnailUrl: z.union([
                z.literal(''),
                z
                    .string()
                    .trim()
                    .url({ message: t('url') }),
            ]),
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

const t = (arg: MessageKeys) => arg;
const schema = productFormSchema(t);

export type messageZodFormType = z.infer<typeof messageScema>;
// export type productZodFormType = z.infer<typeof productFormSchema>;
export type productZodFormType = z.infer<typeof schema>;
export type profileZodFormType = z.infer<typeof profileFormSchema>;

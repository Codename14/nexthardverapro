'use client';
import { DEFAULT_IMG } from '@/lib/constants';
import prisma from '@/lib/pismaDB';
import { detailsMaxLength, nameMaxLength, productFormSchema, productZodFormType } from '@/lib/validation';
import { handleAddNewProduct } from './action/action';
import { categories } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { SubmitButton } from '@/components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AddProductForm({ categories }: { categories: categories[] }) {
    // name: z.string().trim().min(1, { message: 'Name is required' }).max(30, { message: 'more than 30' }),
    // description: z.string().min(1, { message: 'description name is required' }).max(900, { message: 'more than 900' }),
    // place: z.string(),
    // new: z.boolean(),
    // status: z.string(),
    // price: z.number().min(1, { message: 'Price is required' }).max(9999999, { message: 'Price is too high' }),
    // tumbnailUrl: z.union([z.literal(''), z.string().trim().url({ message: 'Must be a valid URL' })]),
    // userName: z.string(),
    // category_id: z.string(),

    const {
        register,
        reset,
        watch,
        getValues,
        handleSubmit, //ez pedig onSubmitnál lenne jó
        trigger, //azért kell mert action attributumot használjuk
        formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<productZodFormType>({ resolver: zodResolver(productFormSchema) });

    const name = watch('name');
    const description = watch('description');

    return (
        <>
            <section>
                <h1 className='section-title'>Termék eladása</h1>
                <form
                    action={async (formData) => {
                        // REACT HOOK FORMS
                        const result = await trigger();
                        if (!result) return;
                        // flushSync(() => setIsOpen(false)); //előbb fogja megcsinálni, kiveszi az optimalizált state egyszerre updateléséből
                        const productData = getValues();
                        // ha üres akkor tegye bele az imaget
                        productData.tumbnailUrl = productData.tumbnailUrl || DEFAULT_IMG;

                        const res = await handleAddNewProduct(productData);
                        if (res && !res.success) {
                            toast.error(res?.error);
                        } else {
                            toast.success('Sikeresen létrehoztuk a hirdetésed');
                            reset();
                        }
                    }}
                    className='flex flex-col'
                >
                    <label htmlFor=''>Képek</label>
                    {/* <input {...register('tumbnailUrl')} className='input--primary' type='file' /> */}
                    <input {...register('tumbnailUrl')} className='input--primary' type='text' />
                    <label htmlFor=''>Hirdetés címe</label>
                    <input className='input--primary' placeholder='name' {...register('name')} />
                    <span>
                        {name ? name.length : 0} / {nameMaxLength}
                    </span>

                    <input className='input--primary' type='number' placeholder='price' {...register('price')} />
                    <select className='input--primary' {...register('category_id')}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <p>{isValid ? 'valid' : 'invalid'}</p>
                    <input {...register('place')} className='input--primary' type='text' placeholder='place' />
                    <textarea {...register('description')} className='input--primary' rows={10} placeholder='description' />
                    <span>
                        {' '}
                        <span>
                            {description ? description.length : 0} / {detailsMaxLength}
                        </span>
                    </span>
                    <input {...register('new', { valueAsNumber: true })} type='checkbox' className='input--primary' />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                    {errors.new && <p className='text-red-500'>{errors.new.message}</p>}
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    {errors.tumbnailUrl && <p className='text-red-500'>{errors.tumbnailUrl.message}</p>}
                    <SubmitButton disabled={isSubmitting} className='btn btn--primary' pendingText='Sending...'>
                        Submit
                    </SubmitButton>
                </form>
            </section>
        </>
    );
}

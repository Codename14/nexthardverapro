'use client';
import { DEFAULT_IMG } from '@/lib/constants';
import { detailsMaxLength, nameMaxLength, productFormSchema, productZodFormType } from '@/lib/validation';
import { handleAddNewProduct, handleEditProduct } from '../../(private)/account/action/action';
import { categories, products } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { SubmitButton } from '@/components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LoadingIcon from '@/components/LoadingIcon';

interface Props {
    categories: categories[];
    productEdit?: products;
}

export default function ManageProductForm({ categories, productEdit }: Props) {
    const t = useTranslations('form');

    // az error translationon miatt kell
    const e = useTranslations('form_errors');
    const formSchema = productFormSchema(e);

    const pathName = usePathname();
    const isEdit = pathName.includes('edit');
    // console.log('productEdit', productEdit);
    // console.log('pathName', pathName);

    const {
        register,
        reset,
        watch,
        getValues,
        handleSubmit, //ez pedig onSubmitnál lenne jó
        trigger, //azért kell mert action attributumot használjuk
        formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<productZodFormType>({
        resolver: zodResolver(formSchema),
        defaultValues:
            isEdit && productEdit
                ? {
                      name: productEdit.name,
                      description: productEdit.description,
                      price: productEdit.price,
                      place: productEdit.place,
                      category_id: productEdit.category_id,
                      tumbnailUrl: productEdit.tumbnailUrl,
                  }
                : undefined,
    });

    const name = watch('name');
    const description = watch('description');

    return (
        <>
            <section>
                <h1 className='section-title'>{isEdit ? t('edit_product') : t('add_new_product')}</h1>
                <form
                    action={async (formData) => {
                        const result = await trigger();
                        if (!result) return;
                        // flushSync(() => setIsOpen(false)); //előbb fogja megcsinálni, kiveszi az optimalizált state egyszerre updateléséből
                        const productData = getValues();
                        // productData.price = Number(productData.price);
                        // console.log('alakítás', typeof productData.price);
                        productData.tumbnailUrl = productData.tumbnailUrl || DEFAULT_IMG;

                        let res;
                        if (isEdit && productEdit) {
                            res = await handleEditProduct(productData, productEdit.id);
                        } else {
                            res = await handleAddNewProduct(productData);
                        }
                        if (res && !res.success) {
                            toast.error(res?.error);
                        } else {
                            toast.success(isEdit ? t('product_update_message') : t('product_add_message'));
                            reset();
                        }
                    }}
                    className='flex flex-col'
                >
                    {/* <input {...register('tumbnailUrl')} className='input--primary' type='file' /> */}
                    <div className='input-control'>
                        <input {...register('tumbnailUrl')} className='input--primary' type='text' placeholder={t('product_img_url') + '*'} />
                        {errors.tumbnailUrl && <p className='form-message error'>{errors.tumbnailUrl.message}</p>}
                    </div>
                    <div className='input-control'>
                        <input className='input--primary' placeholder={t('product_title') + '*'} {...register('name')} />
                        <span className='form-message right'>
                            {name ? name.length : 0} / {nameMaxLength}
                        </span>
                        {errors.name && <p className='form-message error'>{errors.name.message}</p>}
                    </div>
                    <div className='input-control'>
                        {errors.price && <p className='form-message error'>{errors.price.message}</p>}
                        <input className='input--primary' type='number' placeholder={t('product_price') + '*'} {...register('price')} />
                    </div>
                    <div className='input-control'>
                        <select className='input--primary' {...register('category_id')}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='input-control'>
                        <input {...register('place')} className='input--primary' type='text' placeholder={t('product_place') + '*'} />
                        {errors.place && <p className='form-message error'>{errors.place.message}</p>}
                    </div>
                    <div className='input-control'>
                        <textarea {...register('description')} className='input--primary' rows={10} placeholder={t('porduct_details') + '*'} />
                        {errors.description && <p className='form-message error'>{errors.description.message}</p>}
                        <span className='form-message right'>
                            {description ? description.length : 0} / {detailsMaxLength}
                        </span>
                    </div>
                    <div className='input-control'>
                        <div className='flex my-2'>
                            <p>{t('new')}</p>
                            <input {...register('new', { valueAsNumber: true })} type='checkbox' className='' />
                        </div>
                        {errors.new && <p className='form-message error'>{errors.new.message}</p>}
                    </div>
                    <SubmitButton
                        disabled={isSubmitting || !isDirty}
                        className='btn btn--primary'
                        pendingText={
                            <span className='flex gap-2'>
                                <span>{isEdit ? t('update_btn') : t('save_btn')}</span>
                                {<LoadingIcon />}
                            </span>
                        }
                    >
                        {isEdit ? t('update_btn') : t('save_btn')}
                    </SubmitButton>
                </form>
            </section>
        </>
    );
}

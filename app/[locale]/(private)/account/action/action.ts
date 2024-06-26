'use server';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { productFormSchema, productIdSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export async function handleAddNewProduct(formData: unknown) {
    const locale = await getLocale();
    const user = await readUserData();

    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }

    const validatedProductData = productFormSchema.safeParse(formData);
    if (!validatedProductData.success) {
        return {
            success: false,
            error: 'Error wrong data.',
        };
    } else {
        try {
            console.log('validatedProductData', validatedProductData);
            await prisma.products.create({
                data: { ...validatedProductData.data, user_id: user.id, status: 'active', user_email: user.email },
            });
        } catch (error) {
            return {
                success: false,
                error: 'Error has occured. Please try again.',
            };
        }
    }
    revalidatePath('/', 'page');
    redirect(`/${locale}/account/`);
}
export async function handleEditProduct(formData: unknown, id: string) {
    const locale = await getLocale();
    const user = await readUserData();
    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }
    console.log('id', id);
    const validatedProductData = productFormSchema.safeParse(formData);
    // const validatedProductId = productIdSchema.safeParse(id);
    // if (!validatedProductData.success || !validatedProductId) {
    if (!validatedProductData.success) {
        return {
            success: false,
            error: 'Error wrong data.',
        };
    } else {
        try {
            console.log('validatedProductData', validatedProductData);
            await prisma.products.update({
                where: { id: id },
                data: { ...validatedProductData.data },
            });
        } catch (error) {
            return {
                success: false,
                error: 'Error has occured. Please try again.',
            };
        }
        revalidatePath('/', 'page');
        redirect(`/${locale}/account/`);
    }
}

export async function handleDeleteProduct(id: string) {
    const locale = await getLocale();
    const user = await readUserData();
    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }

    try {
        const isOwn = await prisma.products.findUnique({
            where: { id: id },
            select: { user_id: true },
        });
        if (isOwn && isOwn.user_id === user.id) {
            await prisma.products.update({
                where: { id: id },
                data: {
                    status: 'deleted',
                },
            });
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error has occured. Please try again.',
        };
    }
    revalidatePath('/', 'page');
    redirect(`/${locale}/account/`);
}

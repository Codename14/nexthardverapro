'use server';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { productFormSchema, productIdSchema, profileFormSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/navigation';

export async function handleAddNewProduct(formData: unknown) {
    // const locale = await getLocale();
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
    redirect(`/account/`);
}
export async function handleEditProduct(formData: unknown, id: string) {
    // const locale = await getLocale();
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
            const isItOwn = await prisma.products.findUnique({
                where: { id: id },
                select: { user_id: true },
            });
            if (isItOwn && isItOwn.user_id === user.id) {
                await prisma.products.update({
                    where: { id: id },
                    data: { ...validatedProductData.data },
                });
            } else {
                return {
                    success: false,
                    error: 'Permission Denied',
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Error has occured. Please try again.',
            };
        }
        revalidatePath('/', 'page');
        redirect(`/account/`);
    }
}
export async function handleDeleteProduct(id: string) {
    // const locale = await getLocale();
    const user = await readUserData();
    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }

    try {
        const isItOwn = await prisma.products.findUnique({
            where: { id: id },
            select: { user_id: true },
        });
        if (isItOwn && isItOwn.user_id === user.id) {
            await prisma.products.update({
                where: { id: id },
                data: {
                    status: 'deleted',
                },
            });
        } else {
            return {
                success: false,
                error: 'Permission Denied',
            };
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error has occured. Please try again.',
        };
    }
    revalidatePath('/', 'page');
    redirect(`/account/`);
}

export async function handleEditProfileData(formData: unknown) {
    const user = await readUserData();
    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }

    const validatedProfileData = profileFormSchema.safeParse(formData);
    if (!validatedProfileData.success) {
        return {
            success: false,
            error: 'Error wrong data.',
        };
    } else {
        console.log('validatedProfileData', validatedProfileData);
        try {
            await prisma.user_data.update({
                where: { user_id: user.id },
                data: { country: validatedProfileData.data.country, name: validatedProfileData.data.username },
            });
        } catch (error) {
            return {
                success: false,
                error: 'Error has occured. Please try again.',
            };
        }
    }
    revalidatePath('/', 'page');
    redirect(`/account/`);
}

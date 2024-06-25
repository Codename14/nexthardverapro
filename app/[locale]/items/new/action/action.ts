'use server';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { productFormSchema, productIdSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleAddNewProduct(formData: unknown) {
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
                error: 'Error here.',
            };
        }
    }
}
export async function handleEditProduct(formData: unknown, id: string) {
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
                error: 'Error here.',
            };
        }
        revalidatePath('/', 'page');
        // redirect('/items/' + id);
    }
}

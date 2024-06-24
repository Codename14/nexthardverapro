'use server';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { productFormSchema } from '@/lib/validation';

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

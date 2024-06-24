'use server';

import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { revalidatePath } from 'next/cache';

export async function handleLike({ productID }: { productID: string }) {
    const user = await readUserData();
    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }
    console.log('userid', user.id);

    const product = await prisma.products.findUnique({
        where: {
            id: productID,
        },
    });
    if (!product) {
        return {
            success: false,
            error: 'Error wrong data.',
        };
    }
    if (product.likes.includes(user.id)) {
        console.log('benne van');
        try {
            await prisma.products.update({
                where: {
                    id: productID,
                },
                data: {
                    likes: {
                        set: product.likes.filter((like) => like !== user.id),
                    },
                },
            });
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: 'Error here.',
            };
        }
    } else {
        try {
            await prisma.products.update({
                where: {
                    id: productID,
                },
                data: {
                    likes: {
                        push: user.id,
                    },
                },
            });
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: 'Error here.',
            };
        }
    }
    revalidatePath('/items/[slug]', 'page');
}

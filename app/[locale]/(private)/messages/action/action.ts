'use server';

import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { sleep } from '@/lib/utils';
import { messageScema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

export async function handleSendMessage(formData: unknown) {
    // await sleep(1000);
    const user = await readUserData();
    if (!user) {
        return {
            success: false,
            error: 'There is no user.',
        };
    }
    //validation
    const validateMessageData = messageScema.safeParse(formData);
    if (!validateMessageData.success) {
        return {
            success: false,
            error: 'Error wrong data.',
        };
    } else {
        // console.log('valid', validateMessageData);
        try {
            console.log('validatedProductData', validateMessageData);
            console.log('senderID', user.id);
            await prisma.user_message.create({
                data: { ...validateMessageData.data, sender_id: user.id },
            });
        } catch (error) {
            console.log('error', error);
            return {
                success: false,
                error: 'Message not sent. Try again.' + error,
            };
        }
        // revalidatePath('/messages', 'page');
    }
}

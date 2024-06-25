import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import MessageDetails from './MessageDetails';
import prisma from '@/lib/pismaDB';
import { readUserData } from '@/lib/actions';
import Messages from './Messages';
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await readUserData();
    if (!user) {
        redirect('/');
    }

    // csak a saját üzenetek lekérdezése
    const messages = await prisma.user_message.findMany({
        where: {
            OR: [{ sender_id: user?.id }, { receiver_id: user?.id }],
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    const uniqueMessages = messages.filter((message, index, self) => index === self.findIndex((m) => m.product_id === message.product_id));

    const messageProducts = await prisma.products.findMany({
        where: {
            id: {
                in: uniqueMessages.map((message) => message.product_id),
            },
        },
    });

    return (
        <>
            {/* <p>{JSON.stringify(messageProducts)}</p> */}
            <div className='under-navbar text-center'>
                <Messages uniqueMessages={uniqueMessages} messages={messages} ownID={user.id} messageProducts={messageProducts} />
            </div>
        </>
    );
}

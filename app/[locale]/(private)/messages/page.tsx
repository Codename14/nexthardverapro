import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { redirect } from 'next/navigation';
import Messages from './Messages';
import { createClient } from '@/lib/supabase/client';
import { createSerClient } from '@/lib/supabase/server';

interface MessageParams {
    param: string; //productID
    param2: string; //userID
}

export default async function Page({ searchParams }: { searchParams: MessageParams }) {
    const user = await readUserData();
    if (!user) {
        redirect('/');
    }
    // // csak a saját üzenetek lekérdezése
    const messages = await prisma.user_message.findMany({
        where: {
            OR: [{ sender_id: user?.id }, { receiver_id: user?.id }],
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    // const supabase = createSerClient();
    // const { data: messages, error } = await supabase
    //     .from('user_message') // A tábla neve
    //     .select('*'); // Minden oszlopot lekér
    // // .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`) // OR feltétel a sender_id és receiver_id-re
    // // .order('createdAt', { ascending: true }); // Rendezés createdAt szerint növekvő sorrendben

    // if (error) {
    //     console.error('Hiba a lekérdezés során', error);
    //     return;
    // }

    //a címekhez minden egyes termékből legyen 1 üzi
    //TODO: itt érdemes lenne utolsó üzit tárolni
    const uniqueMessages = messages.filter((message, index, self) => index === self.findIndex((m) => m.product_id === message.product_id));
    // console.log('uniqueMessages', uniqueMessages.length);

    const messageProducts = await prisma.products.findMany({
        where: {
            OR: [
                {
                    id: {
                        in: uniqueMessages.map((message) => message.product_id),
                    },
                },
                {
                    id: searchParams.param,
                },
            ],
        },
    });
    const messageUsers = await prisma.user_data.findMany({
        where: {
            user_id: {
                in: uniqueMessages.flatMap((message) => [message.receiver_id, message.sender_id]),
            },
        },
        select: {
            user_id: true, // Vagy használja az azonosító mező nevét, ha az eltér
            email: true,
        },
    });

    return (
        <>
            {/* <p>{user.email}</p> */}
            <div className='under-navbar text-center'>
                <Messages
                    messageUsers={messageUsers}
                    uniqueMessages={uniqueMessages}
                    messages={messages}
                    ownID={user.id}
                    messageProducts={messageProducts}
                />
            </div>
        </>
    );
}

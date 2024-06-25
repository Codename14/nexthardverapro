'use client';
import MessageDetails from './MessageDetails';
import { products, user_message } from '@prisma/client';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
interface Props {
    uniqueMessages: user_message[];
    messages: user_message[];
    ownID: string;
    messageProducts: products[];
}
export default function Messages({ uniqueMessages, messages, ownID, messageProducts }: Props) {
    const [activeProductMessageID, setAtiveProductMessageID] = useState<null | string>(null);
    const receiverID = messages[0]?.receiver_id === ownID ? messages[0]?.sender_id : messages[0]?.receiver_id;
    const activeProduct = messageProducts.find((product) => product.id === activeProductMessageID);

    //NOT WORKING
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const channel = supabase
            .channel('realtime messages')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'user_message',
                },
                () => {
                    router.refresh();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);

    return (
        <>
            <section className='message-section  screen-container'>
                <div className='message-sidebar'>
                    <form className='message-search'>
                        <div className='search-input'>
                            <input type='text' placeholder='keresés' />
                        </div>
                    </form>
                    <p>my id {ownID.slice(-4)}</p>
                    <div className='message__header-wrapper'>
                        {uniqueMessages.map((message, i) => (
                            // itt az ID-t úgy kell kezelni, hogy ne a sendert írja ki, hanem azt amelyik nem mi vagyunk
                            <button
                                onClick={() => setAtiveProductMessageID(message.product_id)}
                                className={`message__header-item ${activeProductMessageID === message.product_id ? 'active' : ''}`}
                                key={message.id}
                            >
                                <div className='header__img'>
                                    <Image src={DEFAULT_IMG} alt={message.id} fill />
                                </div>
                                <div className='header__body'>
                                    {/* <h4 className='header__sender-name'>{message.sender_id.slice(-4)}</h4> */}
                                    <h4 className='header__sender-name'>{ownID === message.sender_id ? message.receiver_id : message.sender_id}</h4>
                                    <p className='header__message'>{message.message}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <MessageDetails activeProduct={activeProduct} messages={messages} ownID={ownID} receiverID={receiverID} />
            </section>
        </>
    );
}

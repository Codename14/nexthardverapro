'use client';
import MessageDetails from './MessageDetails';
import { products, user_message } from '@prisma/client';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdSell } from 'react-icons/md';
interface Props {
    uniqueMessages: user_message[];
    messages: user_message[];
    ownID: string;
    messageProducts: products[];
    messageUsers: any;
}
export default function Messages({ messageUsers, uniqueMessages, messages, ownID, messageProducts }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const searchParams = useSearchParams();
    const paramProductID = searchParams.get('param');
    const paramUserID = searchParams.get('param2');
    // Ez azért kell hogy a létező beszélgetésnél ne jelenjen meg új is
    const isSentMessage = uniqueMessages.some(
        (item) => item.product_id === paramProductID && (item.sender_id === paramUserID || item.receiver_id === paramUserID)
    );
    const [activeProductMessageID, setAtiveProductMessageID] = useState<null | string>(paramProductID);

    const csakID = messages[0]?.receiver_id === ownID ? messages[0]?.sender_id : messages[0]?.receiver_id;
    const receiverID = paramUserID ? (activeProductMessageID === paramProductID ? paramUserID : csakID) : csakID;

    const activeProduct = messageProducts.find((product) => product.id === activeProductMessageID);

    //NOT WORKING
    const supabase = createClient();
    const router = useRouter();
    // console.log('receiverID', receiverID);
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
    console.log('fasz', messageUsers);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <section className='message-section  screen-container'>
                <div className='message-sidebar'>
                    <div className='message-search'>
                        <div className='search-input'>
                            <input
                                className={` mb-1 ${uniqueMessages.length === 0 && 'not-found'}`}
                                type='text'
                                placeholder='Kereső'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    {/* <form className='message-search' onSubmit={handleSearch}>
                        <div className='search-input'>
                            <input type='text' placeholder='keresés' />
                        </div>
                    </form> */}
                    <div className='message__header-wrapper'>
                        {searchParams.get('param') && !isSentMessage && (
                            <button
                                onClick={() => setAtiveProductMessageID(paramProductID)}
                                className={`message__header-item ${activeProductMessageID === paramProductID ? 'active' : ''}`}
                            >
                                <div className='header__img'>
                                    <Image src={DEFAULT_IMG} alt='fasz' fill />
                                </div>
                                <div className='header__body'>
                                    <h4 className='header__sender-name'>{paramUserID?.slice(-4)}</h4>
                                    <p className='header__message'></p>
                                </div>
                            </button>
                        )}
                        {uniqueMessages.map((message, i) => {
                            const senderID = ownID === message.sender_id ? message.receiver_id : message.sender_id;
                            const senderUser = messageUsers.find((user: any) => user.user_id === senderID);
                            const product = messageProducts.find((product) => product.id === message.product_id);
                            return (
                                <button
                                    onClick={() => setAtiveProductMessageID(message.product_id)}
                                    className={`message__header-item ${activeProductMessageID === message.product_id ? 'active' : ''}`}
                                    key={message.id}
                                >
                                    <div className='header__img'>
                                        <Image src={DEFAULT_IMG} alt={message.id} fill />
                                    </div>
                                    <div className='header__body'>
                                        <h4 className='header__sender-name'>
                                            {/* {senderID} */}
                                            {senderUser?.email}
                                        </h4>
                                        <p className='header__message text--light'>{product?.name}</p>
                                        {/* <p className='header__message'>{message.message}</p> */}
                                        <span className='flex gap-0 justify-start text--light'>
                                            {ownID === product?.user_id && (
                                                <>
                                                    <MdSell size={20} /> saját
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <MessageDetails activeProduct={activeProduct} messages={messages} ownID={ownID} receiverID={receiverID} />
            </section>
        </>
    );
}

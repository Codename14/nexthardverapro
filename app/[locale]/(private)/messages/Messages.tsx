'use client';
import MessageDetails from './MessageDetails';
import { products, user_message } from '@prisma/client';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdSell } from 'react-icons/md';
import { redirect } from '@/navigation';
import { useTranslations } from 'next-intl';
import { DiVim } from 'react-icons/di';
import { LuMessageCircle } from 'react-icons/lu';
import Link from 'next/link';
interface MessageUserType {
    user_id: string | null;
    email: string | null;
}
interface Props {
    uniqueMessages: user_message[];
    messages: user_message[];
    ownID: string;
    messageProducts: products[];
    messageUsers: MessageUserType[];
}

export default function Messages({ messageUsers, uniqueMessages, messages, ownID, messageProducts }: Props) {
    const t = useTranslations('Messages');

    const [searchTerm, setSearchTerm] = useState('');
    const searchParams = useSearchParams();
    const paramProductID = searchParams.get('param');
    const paramUserID = searchParams.get('param2');
    // Ez azért kell hogy ha írnánk egy új hirdetésre, de már írtunk rá, akkor azt dobja fel ne újat
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
        console.log('update');
        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    let paramSenderData, paramProductData;
    if (paramUserID && paramProductID) {
        paramSenderData = messageUsers.find((user: MessageUserType) => user.user_id === paramUserID);
        paramProductData = messageProducts.find((product: products) => product.id === paramProductID);

        if (paramProductData?.status !== 'active') {
            redirect('/messages');
        }

        // console.log('paramSenderName', paramSenderData);
    }
    const handleGoBackOnMobile = () => {
        setAtiveProductMessageID(null);
    };

    return (
        <>
            <section className='message-section screen-container'>
                <div className={`message-sidebar ${activeProduct ? 'message-mobile-inactive' : 'message-mobile-active'}`}>
                    <div className='message-search'>
                        <div className='search-input'>
                            <input
                                className={` mb-1 ${uniqueMessages.length === 0 && 'not-found'}`}
                                type='text'
                                placeholder={t('search_placeholder')}
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
                        {paramProductID && paramUserID && !isSentMessage && (
                            <button
                                onClick={() => setAtiveProductMessageID(paramProductID)}
                                className={`message__header-item opacity-50 ${activeProductMessageID === paramProductID ? 'active' : ''}`}
                            >
                                <div className='header__img'>
                                    <Image src={DEFAULT_IMG} alt='img' fill />
                                </div>
                                <div className='header__body'>
                                    <h4 className='header__sender-name'>{paramSenderData?.email}</h4>
                                    <p className='header__message'>{paramProductData?.name}</p>
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
                                                    <MdSell size={20} /> {t('own')}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                        {uniqueMessages.length === 0 && (
                            <>
                                <div className='glass-card flex p-2 py-4 text-left gap-4 active'>
                                    <LuMessageCircle size={35} className='mt-4 mb-2' />
                                    <p>{t('no_messages')}</p>
                                </div>
                                <Link href={'/'} className='btn btn--primary mt-2'>
                                    {t('no_messages_desc')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <MessageDetails
                    activeProduct={activeProduct}
                    messages={messages}
                    ownID={ownID}
                    receiverID={receiverID}
                    onGoBackMobile={handleGoBackOnMobile}
                />
            </section>
        </>
    );
}

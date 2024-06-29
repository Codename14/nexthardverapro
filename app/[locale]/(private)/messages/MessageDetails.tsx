'use client';
import { DEFAULT_IMG } from '@/lib/constants';
import { messageScema, messageZodFormType } from '@/lib/validation';
import { Link } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { products, user_message } from '@prisma/client';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FaIcons, FaImage } from 'react-icons/fa6';
import { toast } from 'sonner';
import { handleSendMessage } from './action/action';
import { useTranslations } from 'next-intl';
import LoadingIcon from '@/components/LoadingIcon';
import { RiArrowGoBackFill } from 'react-icons/ri';

interface Props {
    // activeProductMessageID: string | null;
    messages: user_message[];
    ownID: string;
    receiverID: string;
    activeProduct: products | undefined;
    onGoBackMobile: () => void;
}

export default function MessageDetails({ messages, ownID, receiverID, activeProduct, onGoBackMobile }: Props) {
    const t = useTranslations('Messages');

    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
        setValue,
        setError,
    } = useForm<messageZodFormType>({ resolver: zodResolver(messageScema) });
    const messageValue = watch('message');
    const handleArrowKeys = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsEmojiOpen(false);
        }
    };
    const handleEmoji = (emoji: EmojiClickData) => {
        console.log(emoji);
        setValue('message', `${messageValue}${emoji.emoji}`);
    };
    const onSubmit = async (data: FieldValues) => {
        const res = await handleSendMessage(data);
        if (res && !res.success) {
            toast.error(res.error);
        }
        reset({ message: '' });
    };
    useEffect(() => {
        setValue('receiver_id', receiverID);
    }, [receiverID, setValue]);

    useEffect(() => {
        if (activeProduct && activeProduct.id) {
            setValue('product_id', activeProduct.id);
        }
    }, [activeProduct, setValue]);
    return (
        <>
            {activeProduct?.id && (
                <div className={`message-wrapper ${activeProduct ? 'message-mobile-active' : 'message-mobile-inactive'}`}>
                    <button onClick={() => onGoBackMobile()} className='message-back-mobile'>
                        <RiArrowGoBackFill size={30} className='icon' />
                    </button>
                    <Link href={`/items/${activeProduct.id}`} className='message-product-title'>
                        {activeProduct.status === 'active' ? (
                            <>
                                <div className='message-title-img'>
                                    <Image src={activeProduct.tumbnailUrl} alt={'product image'} fill />
                                </div>
                                <h3 className='text-light'>{activeProduct?.name}</h3>
                                <h4 className='message-title'>{activeProduct?.price} Ft</h4>
                            </>
                        ) : (
                            <h4 className='text-center flex small-title'>
                                {activeProduct?.name} - {t('deleted_product')}
                            </h4>
                        )}
                    </Link>

                    <div className='messages-container'>
                        <div className='messages'>
                            {messages.map(
                                (message) =>
                                    activeProduct?.id === message.product_id && (
                                        <div className={`message-details ${message.sender_id === ownID ? 'own' : ''}`} key={message.id}>
                                            <div className='user-img'>
                                                <Image src={DEFAULT_IMG} alt={'aaa'} fill />
                                            </div>
                                            <div className='message-text'>
                                                <p>{message.message}</p>
                                                <span className='text--light'>{JSON.stringify(message.createdAt)}</span>
                                            </div>
                                            {/* <p className='header__message'>{message.product_id.slice(-4)}</p> */}

                                            {/* <p>{message.sender_id.slice(-4)}</p> */}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                    {/* <p>{isValid ? '' : "Message can't be empty"}</p> */}
                    <form className='message-action' onSubmit={handleSubmit(onSubmit)}>
                        <FaImage size={25} />
                        <input className='hidden' {...register('receiver_id')} />
                        <input className='hidden' {...register('product_id')} />
                        <input
                            {...register('message')}
                            onKeyDown={(event) => {
                                handleArrowKeys(event);
                            }}
                            onFocus={() => setIsEmojiOpen(false)}
                            className='input--primary'
                        />
                        <button type='button' onClick={() => setIsEmojiOpen((prev) => !prev)} className='btn--emoji'>
                            <FaIcons size={25} />
                        </button>
                        {/* {isEmojiOpen && ( */}
                        <div
                            className='emoji-picker'
                            onKeyDown={(event) => {
                                handleArrowKeys(event);
                            }}
                        >
                            <EmojiPicker open={isEmojiOpen} onEmojiClick={handleEmoji} />
                        </div>
                        <button disabled={!isValid} className='btn btn--primary'>
                            <span className='flex gap-2'>
                                {t('send')}
                                {isSubmitting && <LoadingIcon />}
                            </span>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

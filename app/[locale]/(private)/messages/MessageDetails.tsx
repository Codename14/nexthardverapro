'use client';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaIcons, FaImage } from 'react-icons/fa6';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';

export default function MessageDetails() {
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        setValue,
        setError,
    } = useForm({});
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

    return (
        <>
            <div className='message-wrapper'>
                <div className='messages-container'>
                    <div className='message'>
                        <div className='flex'>
                            <div className='user-img'>
                                <Image src={DEFAULT_IMG} alt={'aaa'} fill />
                            </div>
                            <p className='message-text'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ab debitis neque molestias, cum corporis recusandae
                                perspiciatis autem voluptates itaque.
                            </p>
                        </div>
                        <p>5 min ago</p>
                    </div>
                </div>
                <form className='message-action'>
                    <FaImage size={25} />
                    <input
                        {...register('message', {
                            required: 'Message is required',
                        })}
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
                    {/* )} */}
                    <button className='btn btn--primary'>Küldés</button>
                </form>
            </div>
        </>
    );
}

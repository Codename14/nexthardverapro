'use client';
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';
import { FaIcons, FaImage } from 'react-icons/fa6';

export default function MessageDetails() {
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    return (
        <>
            <div className='message-wrapper'>
                <div className='messages-container'>
                    <div className='message-sender'>Nagy Ali</div>
                    <div className='message-text'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ab debitis neque molestias, cum corporis recusandae
                        perspiciatis autem voluptates itaque.
                    </div>
                </div>
                <form className='message-action'>
                    <FaImage size={25} />
                    <input className='input--primary' type='text' />
                    <button type='button' onClick={() => setIsEmojiOpen((prev) => !prev)} className='btn--emoji'>
                        <FaIcons size={25} />
                    </button>
                    {/* {isEmojiOpen && ( */}
                    <div className='emoji-picker'>
                        <EmojiPicker open={isEmojiOpen} />
                    </div>
                    {/* )} */}
                    <button className='btn btn--primary'>Küldés</button>
                </form>
            </div>
        </>
    );
}

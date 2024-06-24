'use client';
import { handleLike } from '@/actions/action';
import React, { useTransition } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { SubmitButton } from './SubmitButton';
import LoadingIcon from './LoadingIcon';

export default function LikeButton({ likesLength, productID, likeState }: { likesLength: number; productID: string; likeState: boolean }) {
    return (
        <>
            <form action={async () => handleLike({ productID })}>
                <SubmitButton
                    className='item__like'
                    pendingText={
                        <p className='flex'>
                            {likeState ? <IoIosHeart size={30} /> : <IoIosHeartEmpty size={30} />}
                            <LoadingIcon />
                        </p>
                    }
                >
                    <p className='flex'>
                        {likeState ? <IoIosHeart size={30} /> : <IoIosHeartEmpty size={30} />}
                        <span className=''> {likesLength > 0 ? likesLength : 0}</span>
                    </p>
                </SubmitButton>
            </form>
        </>
    );
}

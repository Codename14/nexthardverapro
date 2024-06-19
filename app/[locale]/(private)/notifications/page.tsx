import React from 'react';
import FavoriteIcon from '../wishlist/FavoriteIcon';
import { IoIosNotifications } from 'react-icons/io';

export default function Page() {
    return (
        <>
            <div className='under-navbar text-center screen-container card-padding '>
                <h1 className='section-title'>Értesítések</h1>
                <div className='mt-10 mb-6'>
                    <div className='flex mb-2 mt-4'>
                        <IoIosNotifications size={60} color={'var(--text-100)'} />
                    </div>
                    <h2 className='small-title'>Még nem jött értesítésed</h2>
                    <p className='mx-auto'>Itt lesznek láthatók az értesítéseid</p>
                </div>
            </div>
        </>
    );
}

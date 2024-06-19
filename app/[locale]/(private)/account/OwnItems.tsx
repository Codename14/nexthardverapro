import React from 'react';
import FavoriteIcon from '../wishlist/FavoriteIcon';
import { Link } from '@/navigation';
import { FaAccusoft, FaStar } from 'react-icons/fa6';
import { FaArrowAltCircleRight } from 'react-icons/fa';

export default function OwnItems() {
    return (
        <div>
            <div className='mt-10 mb-6'>
                <div className='flex mb-2 mt-4'>
                    <FaAccusoft size={50} color={'var(--primary)'} />
                </div>
                <h2 className='small-title'>Sajnos nincs aktív hirdetésed</h2>
                <p className='mx-auto'>Itt láthatod a hirdetéseid</p>
            </div>
            <Link href={'/items/new'} className='btn btn--primary mt-4 btn--wicon'>
                Feladok <FaArrowAltCircleRight size={25} />
            </Link>
        </div>
    );
}

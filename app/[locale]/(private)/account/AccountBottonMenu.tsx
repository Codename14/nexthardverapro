'use client';
import { useState } from 'react';
import { FaProductHunt } from 'react-icons/fa6';
import OwnRatings from './OwnRatings';
import OwnItems from './OwnItems';

export default function AccountBottonMenu() {
    const [menu, setMenu] = useState('products');
    return (
        <div>
            <section className='account__menu'>
                <div className='flex gap-2 action'>
                    <button onClick={() => setMenu('products')} className={`btn btn--outlined acc__title ${menu === 'products' ? 'active' : ''}`}>
                        Hirdetéseim
                    </button>
                    <button onClick={() => setMenu('ratings')} className={`btn btn--outlined acc__title ${menu === 'ratings' ? 'active' : ''}`}>
                        Értékeléseim
                    </button>
                </div>
            </section>
            <section>{menu === 'products' ? <OwnItems /> : <OwnRatings />}</section>
        </div>
    );
}

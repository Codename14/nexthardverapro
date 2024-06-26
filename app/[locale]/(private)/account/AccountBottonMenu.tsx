'use client';
import { useState } from 'react';
import { FaProductHunt } from 'react-icons/fa6';
import OwnRatings from './OwnRatings';
import OwnItems from './OwnItems';
import { products } from '@prisma/client';

interface Props {
    ownProducts: products[];
    itsMe: boolean;
}

export default function AccountBottonMenu({ ownProducts, itsMe }: Props) {
    const [menu, setMenu] = useState('products');
    return (
        <div>
            <section className='account__menu'>
                <div className='flex gap-2 action'>
                    <button onClick={() => setMenu('products')} className={`btn btn--outlined acc__title ${menu === 'products' ? 'active' : ''}`}>
                        {itsMe ? 'Hirdetéseim' : 'Hirdetések'}
                    </button>
                    <button onClick={() => setMenu('ratings')} className={`btn btn--outlined acc__title ${menu === 'ratings' ? 'active' : ''}`}>
                        {itsMe ? 'Értékeléseim' : 'Értékelesek'}
                    </button>
                </div>
            </section>
            <section>{menu === 'products' ? <OwnItems ownProducts={ownProducts} itsMe={itsMe} /> : <OwnRatings />}</section>
        </div>
    );
}

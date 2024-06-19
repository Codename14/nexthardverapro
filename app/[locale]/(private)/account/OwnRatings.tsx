import React from 'react';
import { FaStar } from 'react-icons/fa6';

export default function OwnRatings() {
    return (
        <div>
            <div>
                <div className='mt-10 mb-6'>
                    <div className='flex mb-2 mt-4'>
                        <FaStar size={50} color={'var(--primary)'} />
                    </div>
                    <h2 className='small-title'>Sajnos még nem értékelt senki sem</h2>
                    <p className='mx-auto'>Itt jelennek meg az értékeléseid</p>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';

export default function ProductDeleteBtn() {
    return (
        <button className='btn--delete'>
            <FaDeleteLeft size={30} />
        </button>
    );
}

import React from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { handleDeleteProduct } from './action/action';
export default function ProductDeleteBtn() {
    return (
        <button className='btn--delete' onClick={() => handleDeleteProduct('12312')}>
            <FaDeleteLeft size={30} />
        </button>
    );
}

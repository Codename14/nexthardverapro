import React from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { handleDeleteProduct } from './action/action';
import { useDeleteContext } from '@/contexts/DeleteContext';
import { products } from '@prisma/client';

export default function ProductDeleteBtn({ product }: { product: products }) {
    const { isOpen, setIsOpen, setActiveProduct } = useDeleteContext();

    return (
        <button
            className=''
            onClick={() => {
                setIsOpen(true), setActiveProduct(product);
            }}
        >
            <FaDeleteLeft size={30} className='icon--delete' />
        </button>
    );
}

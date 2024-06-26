import React from 'react';
import { handleDeleteProduct } from './action/action';
import { useDeleteContext } from '@/contexts/DeleteContext';
import { products } from '@prisma/client';
import { MdDelete } from 'react-icons/md';

export default function ProductDeleteBtn({ product }: { product: products }) {
    const { isOpen, setIsOpen, setActiveProduct } = useDeleteContext();

    return (
        <button
            className=''
            onClick={() => {
                setIsOpen(true), setActiveProduct(product);
            }}
        >
            <MdDelete size={30} className='icon--delete' />
        </button>
    );
}

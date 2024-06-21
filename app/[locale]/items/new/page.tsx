import prisma from '@/lib/pismaDB';
import React from 'react';
import AddProductForm from './AddProductForm';

export default async function Page() {
    const categories = await prisma.categories.findMany();

    return (
        <>
            <AddProductForm categories={categories} />
        </>
    );
}

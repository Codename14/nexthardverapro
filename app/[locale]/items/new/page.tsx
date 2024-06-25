import prisma from '@/lib/pismaDB';
import React from 'react';
import ManageProductForm from './ManageProductForm';

export default async function Page() {
    const categories = await prisma.categories.findMany();

    return (
        <>
            <ManageProductForm categories={categories} />
        </>
    );
}

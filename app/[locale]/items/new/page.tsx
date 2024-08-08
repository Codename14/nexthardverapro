import prisma from '@/lib/pismaDB';
import React from 'react';
import ManageProductForm from './ManageProductForm';
import { readUserData } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Page() {
    const categories = await prisma.categories.findMany();

    const user = await readUserData();
    if (!user) {
        redirect('/');
    }

    return (
        <>
            <ManageProductForm categories={categories} />
        </>
    );
}

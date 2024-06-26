import prisma from '@/lib/pismaDB';
import React from 'react';
import ManageProductForm from '../../new/ManageProductForm';
import { redirect } from 'next/navigation';
import { readUserData } from '@/lib/actions';

interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const user = await readUserData();

    const categories = await prisma.categories.findMany();
    const product = await prisma.products.findFirst({
        where: {
            id: params.slug,
            status: 'active',
        },
    });

    if (!product || !user || product.user_id !== user.id) {
        redirect('/');
    }

    return (
        <>
            <ManageProductForm categories={categories} productEdit={product} />
        </>
    );
}

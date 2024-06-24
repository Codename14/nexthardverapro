import prisma from '@/lib/pismaDB';
import React from 'react';
import Image from 'next/image';

interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const products = await prisma.products.findMany({
        where: {
            // price: { gt: 105000 },
            id: params.slug,
        },
    });
    return (
        <>
            {products.map((product) => (
                <div className='product__item glass-card' key={product.id}>
                    <div className='product__image'>
                        <Image alt={product.name} src={product.tumbnailUrl} fill />
                    </div>
                    <p className='product__name'>{product.name}</p>
                    <p className='product__price'>{product.price} Ft</p>
                    <p className='product__price'>{product.user_id}</p>
                </div>
            ))}
        </>
    );
}

import prisma from '@/lib/pismaDB';
import React from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { readUserData } from '@/lib/actions';
import { toast } from 'sonner';

export default async function Products() {
    const user = await readUserData();
    const products = await prisma.products.findMany({
        where: {
            // price: { gt: 105000 },
            user_id: user?.id,
        },
    });

    // const supabase = createClient();
    // const { data: products, error } = await supabase.from('products').select('*');
    // if (error) {
    //     return <div>{error.message}</div>;
    // }
    return (
        <div className='limit-width'>
            <p>{user?.id}</p>
            <section className='products-grid'>
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
            </section>
        </div>
    );
}

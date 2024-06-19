import prisma from '@/lib/pismaDB';
import React from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { readUserData } from '@/lib/actions';
import { toast } from 'sonner';
import SearchBar from '@/components/SearchBar';
import { Link } from '@/navigation';
import { CiHeart } from 'react-icons/ci';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

export default async function Products() {
    const user = await readUserData();
    const products = await prisma.products.findMany({
        where: {
            // price: { gt: 105000 },
            // user_id: user?.id,
        },
    });

    // const supabase = createClient();
    // const { data: products, error } = await supabase.from('products').select('*');
    // if (error) {
    //     return <div>{error.message}</div>;
    // }
    return (
        <section className='products-grid mb-6'>
            {products.map((product) => (
                <Link href={`/items/${product.id}`} className='product__item glass-card' key={product.id}>
                    <div className='product__image'>
                        <Image alt={product.name} src={product.tumbnailUrl} fill />
                    </div>
                    <p className='product__name'>{product.name}</p>
                    <p className='product__price'>{product.price} Ft</p>
                    <p className=' text--light'>{product.user_id}</p>
                    <button className='product__like'>{true ? <IoIosHeart size={45} /> : <IoIosHeartEmpty size={45} />}</button>
                </Link>
            ))}{' '}
            {products.map((product) => (
                <Link href={`/items/${product.id}`} className='product__item glass-card' key={product.id}>
                    <div className='product__image'>
                        <Image alt={product.name} src={product.tumbnailUrl} fill />
                    </div>
                    <p className='product__name'>{product.name}</p>
                    <p className='product__price'>{product.price} Ft</p>
                    <p className=' text--light'>{product.user_id}</p>
                </Link>
            ))}{' '}
            {products.map((product) => (
                <Link href={`/items/${product.id}`} className='product__item glass-card' key={product.id}>
                    <div className='product__image'>
                        <Image alt={product.name} src={product.tumbnailUrl} fill />
                    </div>
                    <p className='product__name'>{product.name}</p>
                    <p className='product__price'>{product.price} Ft</p>
                    <p className=' text--light'>{product.user_id}</p>
                </Link>
            ))}{' '}
            {products.map((product) => (
                <Link href={`/items/${product.id}`} className='product__item glass-card' key={product.id}>
                    <div className='product__image'>
                        <Image alt={product.name} src={product.tumbnailUrl} fill />
                    </div>
                    <p className='product__name'>{product.name}</p>
                    <p className='product__price'>{product.price} Ft</p>
                    <p className=' text--light'>{product.user_id}</p>
                </Link>
            ))}
        </section>
    );
}

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
import { FaSearch } from 'react-icons/fa';

export default async function Products({ categoryID, query }: { categoryID: string | undefined; query: string | undefined }) {
    const user = await readUserData();
    console.log('query:', query);
    const products = await prisma.products.findMany({
        where: {
            category_id: categoryID,
            name: { contains: query?.toLowerCase(), mode: 'insensitive' },

            // price: { gt: 105000 },
            // user_id: user?.id?.toLowerCase(),
        },
    });

    // const supabase = createClient();
    // const { data: products, error } = await supabase.from('products').select('*');
    // if (error) {
    //     return <div>{error.message}</div>;
    // }
    return (
        <>
            {products.length === 0 ? (
                <div className='flex flex-col'>
                    <FaSearch size={40} className='mb-2 mt-6' />
                    <p className='font-bold'>Sajnos nincs találat</p>
                </div>
            ) : (
                <p className='text--light mx-auto'>Találatok száma: {products.length}</p>
            )}
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
        </>
    );
}

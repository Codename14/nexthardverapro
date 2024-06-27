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
import { FaSearch, FaUser } from 'react-icons/fa';
import LikeButton from '@/components/LikeButton';
import { useTranslations } from 'next-intl';

export default async function Products({ categoryID, query }: { categoryID: string | undefined; query: string | undefined }) {
    const t = useTranslations('Products');

    const user = await readUserData();
    // console.log('query:', query);

    // const supabase = createClient();
    // const { data: products, error } = await supabase.from('products').select('*');
    // if (error) {
    //     return <div>{error.message}</div>;
    // }
    const products = await prisma.products.findMany({
        where: {
            category_id: categoryID,
            name: { contains: query?.toLowerCase(), mode: 'insensitive' },
            status: 'active',
            // user_id: user?.id?.toLowerCase(),
            // price: { gt: 105000 },
        },
        orderBy: { created_at: 'desc' },
    });

    return (
        <>
            {products.length === 0 ? (
                <div className='flex flex-col'>
                    <FaSearch size={40} className='mb-2 mt-6' />
                    <p className='font-bold'>{t('no_search_result')}</p>
                </div>
            ) : (
                <p className='text--light mx-auto'>
                    {t('search_count')} {products.length}:
                </p>
            )}
            <section className='products-grid mb-6'>
                {products.map((product) => (
                    <div className='product__item glass-card' key={product.id}>
                        <div className='product__image'>
                            <Link href={`/items/${product.id}`}>
                                <Image alt={product.name} src={product.tumbnailUrl} fill />
                            </Link>
                            {user && (
                                <LikeButton likesLength={product.likes.length} productID={product.id} likeState={product.likes.includes(user?.id)} />
                            )}
                        </div>
                        <div className='product__body'>
                            <p className='product__name text--light'>{product.name}</p>
                            <p className='product__des text--light'>{product.description}</p>
                            {/* <div className='product__user product__line'>
                                <FaUser />
                                <p>{product.user_email}</p>
                            </div> */}
                            <p className='product__price'>{product.price} Ft</p>
                        </div>
                    </div>
                ))}{' '}
            </section>
        </>
    );
}

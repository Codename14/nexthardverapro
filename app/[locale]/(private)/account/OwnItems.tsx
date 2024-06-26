import React from 'react';
import { Link } from '@/navigation';
import { FaAccusoft } from 'react-icons/fa6';
import { FaArrowAltCircleRight, FaHeart, FaPlaceOfWorship } from 'react-icons/fa';
import { products } from '@prisma/client';
import Image from 'next/image';
import ProductDeleteBtn from './ProductDeleteBtn';
import { MdEdit } from 'react-icons/md';
export default function OwnItems({ ownProducts, itsMe }: { ownProducts: products[]; itsMe: boolean }) {
    return (
        <>
            {ownProducts && ownProducts.length > 0 ? (
                <div className='acc__product-list '>
                    {ownProducts.map((product) => (
                        <div className='acc__product-item' key={product.id}>
                            <Link href={`/items/${product.id}`} className='acc__product-image'>
                                <Image alt={product.name} src={product.tumbnailUrl} fill />
                            </Link>
                            <div className='acc__product-body'>
                                <div className='flex justify-between'>
                                    <Link href={`/items/${product.id}`} className='acc__product-name '>
                                        {product.name}
                                    </Link>
                                    {itsMe && (
                                        <div className='flex gap-2'>
                                            <Link href={`/items/${product.id}/edit`}>
                                                <MdEdit size={30} className='icon' />
                                            </Link>
                                            <ProductDeleteBtn product={product} />
                                        </div>
                                    )}
                                </div>
                                <div className='flex gap-2 justify-start'>
                                    <FaPlaceOfWorship size={20} />
                                    <p className='acc__product-price'>{product.place}</p>
                                </div>
                                <div className='flex justify-between mt-auto'>
                                    <p className='acc__product-likes'>
                                        {product.likes.length > 0 ? product.likes.length : 0} <FaHeart size={20} />
                                    </p>
                                    <p className='acc__product-price'>{product.price} Ft</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className='mt-10 mb-6'>
                        <div className='flex mb-2 mt-4'>
                            <FaAccusoft size={50} color={'var(--primary)'} />
                        </div>
                        <h2 className='small-title'>Sajnos nincs aktív hirdetésed</h2>
                        <p className='mx-auto'>Itt láthatod a hirdetéseid</p>
                    </div>
                    <Link href={'/items/new'} className='btn btn--primary mt-4 btn--wicon'>
                        Feladok <FaArrowAltCircleRight size={25} />
                    </Link>
                </>
            )}
        </>
    );
}
